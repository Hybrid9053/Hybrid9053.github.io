import Link from "next/link";
import { Monogram } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/icons/BrandIcons";
import { contact, profile, socials } from "@/data/profile";
import { nav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Monogram size={36} />
            <div>
              <p className="font-display font-semibold">
                Ibra<span className="text-accent">Hybrid</span>
              </p>
              <p className="text-sm text-subtle">{profile.name}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Software Engineering × Artificial Intelligence × Cybersecurity.
            <br />
            Built with curiosity. Engineered with purpose.
          </p>
          <a href={`mailto:${contact.email}`} className="mt-5 inline-block font-mono text-sm text-fg hover:text-accent">
            {contact.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="label">Navigate</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-muted hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label">Elsewhere</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-muted hover:text-fg"
                >
                  <SocialIcon name={s.key} size={15} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {profile.name}. All rights reserved.</p>
          <p className="font-mono">{profile.location} · {profile.secondaryTagline}</p>
        </div>
      </div>
    </footer>
  );
}
