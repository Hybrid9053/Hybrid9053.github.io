import { validateContact } from "@/lib/contact";

/**
 * POST /api/contact
 *
 * Delivers contact messages through the Resend REST API (no SDK dependency).
 * Secrets stay server-side — configure in Vercel → Project → Settings → Environment Variables:
 *   RESEND_API_KEY      required — Resend API key
 *   CONTACT_FROM_EMAIL  required — sender on a Resend-verified domain, e.g. "IbraHybrid <contact@ibrahybrid.me>"
 *   CONTACT_TO_EMAIL    optional — defaults to ibrahim@ibrahybrid.me
 *
 * Spam protection: honeypot field, minimum fill time, origin check, size cap and
 * a best-effort per-IP rate limit (in-memory; resets on cold start).
 */

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_MS = 3_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear(); // bound memory
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  // Same-origin only
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ error: "forbidden" }, 403);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);
    raw = JSON.parse(text);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("bad body");
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  const now = Date.now();

  // Honeypot: real users never see or fill this field. Pretend success.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return json({ ok: true });
  }

  // Timing check: bots submit instantly.
  const startedAt = Number(raw.startedAt);
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS || now - startedAt > 24 * 3_600_000) {
    return json({ error: "invalid_request" }, 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip, now)) return json({ error: "rate_limited" }, 429);

  const result = validateContact(raw);
  if (!result.ok) return json({ error: "validation", fields: result.errors }, 422);
  const { name, email, topic, message } = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "ibrahim@ibrahybrid.me";
  if (!apiKey || !from) {
    console.error("[contact] RESEND_API_KEY / CONTACT_FROM_EMAIL not configured");
    return json({ error: "not_configured" }, 503);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${email}/${startedAt}`.slice(0, 256),
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: [email],
        subject: `[ibrahybrid.me] ${topic} — ${name}`,
        text: `New message from ibrahybrid.me\n\nName:  ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}\n`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
      return json({ error: "delivery_failed" }, 502);
    }
  } catch (err) {
    console.error("[contact] delivery error", err);
    return json({ error: "delivery_failed" }, 502);
  }

  return json({ ok: true });
}
