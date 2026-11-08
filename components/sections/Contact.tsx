import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialIcon } from "@/components/icons/BrandIcons";
import { contact, socials } from "@/data/profile";
import { collaborationCta } from "@/data/services";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-20 md:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 rotate-180" aria-hidden="true" />
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="label flex items-center gap-3">
            <span className="text-accent">07</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance md:text-5xl md:leading-[1.08]">
            {collaborationCta.split("? ")[0]}?{" "}
            <span className="text-gradient">{collaborationCta.split("? ")[1]}</span>
          </h2>

          <a
            href={`mailto:${contact.email}`}
            className="group mt-10 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent"
          >
            <span className="flex items-center gap-4">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Mail size={19} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-subtle">Professional email</span>
                <span className="block font-mono text-fg sm:text-lg">{contact.email}</span>
              </span>
            </span>
            <ArrowUpRight size={18} className="text-muted group-hover:text-accent" aria-hidden="true" />
          </a>

          <ul className="mt-4 grid grid-cols-2 gap-3">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-line p-3.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <SocialIcon name={s.key} size={17} />
                  <span className="min-w-0">
                    <span className="block text-fg">{s.label}</span>
                    <span className="block truncate font-mono text-[0.7rem] text-subtle">{s.handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-subtle">
            Personal: <a href={`mailto:${contact.personalEmail}`} className="hover:text-muted">{contact.personalEmail}</a>
          </p>
        </div>

        <div>
          <ContactForm />
          <noscript>
            <p className="mt-4 text-sm text-muted">
              The form needs JavaScript. Email{" "}
              <a href={`mailto:${contact.email}`} className="text-accent">{contact.email}</a> instead.
            </p>
          </noscript>
        </div>
      </div>
    </section>
  );
}
