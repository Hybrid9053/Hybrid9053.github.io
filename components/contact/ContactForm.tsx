"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { limits, topics, validateContact, type ContactErrors } from "@/lib/contact";
import { contact } from "@/data/profile";

type State = "idle" | "submitting" | "success" | "error";

const errorCopy: Record<string, string> = {
  rate_limited: "Too many messages in a short time. Please try again in a few minutes.",
  not_configured: "The form isn't connected yet.",
  delivery_failed: "The message couldn't be delivered right now.",
};

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState("");
  const [count, setCount] = useState(0);
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const check = validateContact(values);
    if (!check.ok) {
      setErrors(check.errors);
      const first = Object.keys(check.errors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setServerError("");
    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...check.data, website: values.website ?? "", startedAt: startedAt.current }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setState("success");
        form.reset();
        setCount(0);
      } else {
        if (body.fields) setErrors(body.fields);
        setServerError(errorCopy[body.error] ?? "Something went wrong.");
        setState("error");
      }
    } catch {
      setServerError("Network error — please check your connection.");
      setState("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field =
    "mt-2 w-full rounded-xl border bg-bg px-4 py-3 text-fg placeholder:text-subtle transition-colors focus:border-accent focus:outline-none focus-visible:outline-none";
  const border = (k: keyof ContactErrors) => (errors[k] ? "border-red-400/70" : "border-line hover:border-line-strong");

  if (state === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card flex flex-col items-start p-8 outline-none">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check size={20} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold">Message sent.</h3>
        <p className="mt-2 text-muted">Thank you — I&apos;ll reply to the email address you provided.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 text-sm text-accent hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium">Name</label>
          <input id="cf-name" name="name" autoComplete="name" maxLength={limits.name} required
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined}
            className={`${field} ${border("name")}`} placeholder="Your name" />
          {errors.name && <p id="cf-name-err" className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-medium">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" maxLength={limits.email} required
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined}
            className={`${field} ${border("email")}`} placeholder="you@company.com" />
          {errors.email && <p id="cf-email-err" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-topic" className="text-sm font-medium">Topic</label>
        <select id="cf-topic" name="topic" required defaultValue=""
          aria-invalid={!!errors.topic} aria-describedby={errors.topic ? "cf-topic-err" : undefined}
          className={`${field} ${border("topic")} appearance-none`}>
          <option value="" disabled>Choose a topic…</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.topic && <p id="cf-topic-err" className="mt-1.5 text-xs text-red-400">{errors.topic}</p>}
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="cf-message" className="text-sm font-medium">Message</label>
          <span className="font-mono text-xs text-subtle" aria-hidden="true">{count}/{limits.message}</span>
        </div>
        <textarea id="cf-message" name="message" rows={6} maxLength={limits.message} required
          onChange={(e) => setCount(e.target.value.length)}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={`${field} ${border("message")} resize-y`} placeholder="What are you building, and where can I help?" />
        {errors.message && <p id="cf-message-err" className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mt-5 flex gap-2.5 rounded-xl border border-red-400/40 bg-red-400/5 p-3.5 text-sm text-fg outline-none">
          <CircleAlert size={16} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
          <p>
            {serverError} You can always email{" "}
            <a href={`mailto:${contact.email}`} className="text-accent underline-offset-2 hover:underline">{contact.email}</a>.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-xs text-subtle">Your details are used only to reply to you.</p>
        <button type="submit" disabled={state === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink disabled:cursor-wait disabled:opacity-70">
          {state === "submitting" ? (
            <><LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> Sending…</>
          ) : (
            <><Send size={15} aria-hidden="true" /> Send message</>
          )}
        </button>
      </div>
    </form>
  );
}
