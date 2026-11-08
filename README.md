# ibrahybrid.me

Personal engineering portfolio of **Ibrahim Abdalla Sharif (Hybrid)** — Software Engineer · Cybersecurity Specialist · AI Developer.

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and lucide-react. No other runtime dependencies.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint         # ESLint
npx tsc --noEmit     # type check
npm run build && npm start   # production build
```

Copy `.env.example` to `.env.local` to test the contact form locally.

## Editing content

All personal content lives in `data/` — no UI code needs to change.

| File | Contains |
|---|---|
| `data/profile.ts` | Name, roles, bio, emails, social links, **portrait** and **CV** switches |
| `data/skills.ts` | Skill groups (no percentages, by design) |
| `data/projects.ts` | Project case studies, status, repo/demo links |
| `data/career.ts` | Experience, founder note, education, research interests, timeline |
| `data/writing.ts` | Articles (all currently `planned`) |
| `data/services.ts` | Services and collaboration CTA |
| `lib/site.ts` | Site URL, SEO title/description, navigation |

- **Portrait:** put the image in `public/` and set `profile.portrait = "/portrait.jpg"`. The hero switches from the IH system diagram to the photo.
- **CV:** put the PDF in `public/` and set `profile.cv = "/Ibrahim-Abdalla-Sharif-CV.pdf"`. A "Download CV" button appears in the hero.
- **Project links:** set `repoUrl` / `demoUrl` on a project; until then the page shows "coming soon".
- **Publishing an article:** set `status: "published"`, add `date` and `body`. It then appears in the sitemap and becomes indexable (planned articles are `noindex`).

## Structure

```
app/                 routes, metadata, sitemap, robots, OG image, icons, API
  api/contact/       contact form endpoint (Resend REST API)
  projects/[slug]/   case-study pages
  writing/           article index + article template
components/
  brand/             Logo + IH monogram
  layout/            Navbar, ThemeToggle, Footer
  sections/          Hero, About, Skills, Projects, Experience, Research, Services, Contact
  projects/          ProjectCard, ProjectGrid (filter), ArchitectureFlow
  contact/           ContactForm
  seo/               JSON-LD, analytics placeholder
  ui/                shared primitives
data/                all editable content
lib/                 site config, contact validation, OG helpers
proxy.ts             returns real 404s for unknown project/article slugs
public/brand/        logo-dark.svg, logo-light.svg, monogram.svg, avatar.svg
```

## Contact form

`POST /api/contact` validates input server-side and sends the message through the [Resend](https://resend.com) REST API. Spam protection: honeypot field, minimum fill time, same-origin check, body size cap and a best-effort per-IP rate limit.

Set in **Vercel → Project → Settings → Environment Variables** (server-only; never prefix with `NEXT_PUBLIC_`):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | API key from Resend |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `IbraHybrid <contact@ibrahybrid.me>` |
| `CONTACT_TO_EMAIL` | `ibrahim@zanhybrid.co.tz` (default) |

Until these are set, the form shows a friendly message pointing visitors to the email address.

Verifying `ibrahybrid.me` in Resend adds DNS records (SPF/DKIM, usually on a `send` subdomain). Add exactly what Resend shows. They don't conflict with the website records below.

## Analytics (optional, off by default)

Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=ibrahybrid.me` to load cookieless Plausible analytics. Nothing loads otherwise.

---

## Deployment: GitHub → Vercel → Namecheap

### 1. GitHub repository

```bash
cd ~/ibrahybrid
git init
git add -A
git commit -m "Initial portfolio"
# Create an empty repo (no README) at https://github.com/new, e.g. Hybrid9053/ibrahybrid.me
git remote add origin https://github.com/Hybrid9053/ibrahybrid.me.git
git branch -M main
git push -u origin main
```

### 2. Import into Vercel

1. Go to https://vercel.com/new and sign in with GitHub.
2. Import the repository. Vercel detects Next.js, so keep the default build settings.
3. Add the environment variables from the table above (they can also be added later).
4. Click **Deploy**. You get a `*.vercel.app` URL. Check it before touching DNS.

### 3. Add the custom domain

1. Vercel → Project → **Settings → Domains** → add `ibrahybrid.me`.
2. When offered, also add `www.ibrahybrid.me` and choose **redirect www → ibrahybrid.me**. The site's canonical URLs, sitemap and Open Graph tags all use the non-www apex `https://ibrahybrid.me`.
3. Vercel then shows the **exact DNS records** to create, typically an `A` record for the apex (`@`) and a `CNAME` for `www`. **Copy the values Vercel shows for your project; don't use values from blog posts or old docs.**

### 4. Configure DNS in Namecheap

> First, note your existing records (screenshot **Advanced DNS**). Don't delete or change anything until Vercel has shown you its required records.

1. Namecheap → **Domain List** → `ibrahybrid.me` → **Manage**.
2. Under **Nameservers**, make sure **Namecheap BasicDNS** is selected. Otherwise the Advanced DNS records won't apply.
3. Open **Advanced DNS** → **Host Records**:
   - Remove only the records that conflict with the new ones: any existing `A` record on host `@`, any `CNAME`/`URL Redirect` on `@` or `www`, and Namecheap's default parking records.
   - Add the `A` record for host `@` with the value Vercel showed.
   - Add the `CNAME` record for host `www` with the value Vercel showed.
   - Keep **MX/TXT** records for email (any that exist) untouched.
4. Save. Propagation usually takes minutes, occasionally up to 48 hours.

### 5. HTTPS verification

Back in Vercel → Domains, both entries should turn to **Valid Configuration**. Vercel then issues the TLS certificate automatically. Check:

```bash
curl -sI https://ibrahybrid.me | head -1          # HTTP/2 200
curl -sI http://ibrahybrid.me | grep -i location  # → https://ibrahybrid.me/
curl -sI https://www.ibrahybrid.me | grep -i location  # → https://ibrahybrid.me/
dig +short ibrahybrid.me A
dig +short www.ibrahybrid.me CNAME
```

### 6. After launch

- Submit `https://ibrahybrid.me/sitemap.xml` in Google Search Console (verify with a DNS TXT record).
- Test the contact form once with Resend configured.
- Run Lighthouse against the live URL.
