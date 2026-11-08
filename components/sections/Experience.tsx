import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { Section } from "@/components/ui/primitives";
import { Monogram } from "@/components/brand/Logo";
import { experience, founderNote } from "@/data/career";

export function Experience() {
  return (
    <Section id="experience" index="04" eyebrow="Experience" title="Building ZanHybrid.">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {experience.map((e) => (
          <article key={e.org} className="card p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-accent">{e.period}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{e.role}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg hover:text-accent">
                    <Building2 size={14} aria-hidden="true" /> {e.org}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" /> {e.location}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-6 leading-relaxed text-muted">{e.description}</p>
            <h4 className="label mt-8">Responsibilities</h4>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {e.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-muted">
                  <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <aside aria-labelledby="founder-title" className="relative overflow-hidden rounded-2xl border border-accent/25 bg-surface p-6 md:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full blur-3xl" style={{ background: "var(--glow)" }} aria-hidden="true" />
          <p className="label text-accent">Founder note</p>
          <h3 id="founder-title" className="mt-3 font-display text-2xl font-semibold tracking-tight">{founderNote.heading}</h3>
          <p className="mt-4 leading-relaxed text-muted">{founderNote.body}</p>

          <div className="mt-7 grid gap-3">
            {[founderNote.personal, founderNote.company].map((b, i) => (
              <a
                key={b.name}
                href={b.url}
                target={i === 1 ? "_blank" : undefined}
                rel={i === 1 ? "noopener noreferrer" : undefined}
                className="group rounded-xl border border-line bg-bg p-4 transition-colors hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 font-display font-semibold">
                    {i === 0 ? <Monogram size={24} /> : <Building2 size={20} className="text-accent-2" aria-hidden="true" />}
                    {b.name}
                  </span>
                  <span className="font-mono text-[0.7rem] text-subtle group-hover:text-fg">{b.url.replace("https://", "")}</span>
                </div>
                <ul className="mt-2.5 space-y-1 text-sm text-muted">
                  {b.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
