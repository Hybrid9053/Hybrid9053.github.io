import { Section } from "@/components/ui/primitives";
import { about } from "@/data/profile";
import { timeline } from "@/data/career";

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title={about.heading}>
      <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="space-y-5 text-[1.075rem] leading-relaxed text-muted text-pretty">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl leading-relaxed text-fg" : ""}>
                {p}
              </p>
            ))}
          </div>

          <figure className="mt-10 rounded-2xl border border-line bg-surface p-6 md:p-8">
            <p className="label text-accent">Brand statement</p>
            <blockquote className="mt-3 font-display text-xl leading-snug text-fg md:text-2xl">
              “{about.brandStatement}”
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs text-subtle">— Think Hybrid. Build Intelligent.</figcaption>
          </figure>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {about.principles.map((p) => (
              <div key={p.title} className="bg-bg p-5">
                <dt className="font-display font-medium text-fg">{p.title}</dt>
                <dd className="mt-1 text-sm text-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="label">Timeline</h3>
          <ol className="relative mt-6 border-l border-line pl-7">
            {timeline.map((t, i) => (
              <li key={i} className="relative pb-8 last:pb-0">
                <span
                  className={`absolute -left-[33px] top-1.5 size-2.5 rounded-full ring-4 ring-bg ${
                    t.date === "Now" ? "bg-accent anim-pulse" : "bg-line-strong"
                  }`}
                  aria-hidden="true"
                />
                <p className="font-mono text-xs text-accent">{t.date}</p>
                <p className="mt-1 font-display font-medium text-fg">{t.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
