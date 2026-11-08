import Link from "next/link";
import { ArrowRight, FlaskConical, GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/primitives";
import { education, researchInterests } from "@/data/career";
import { projects } from "@/data/projects";
import { articles } from "@/data/writing";

export function Research() {
  const submissions = projects.filter((p) => p.research);

  return (
    <Section
      id="research"
      index="05"
      eyebrow="Education & research"
      title="Learning in public, researching with intent."
    >
      <div className="grid gap-14 lg:grid-cols-2">
        {/* Education timeline */}
        <div>
          <h3 className="label flex items-center gap-2">
            <GraduationCap size={14} aria-hidden="true" /> Education & training
          </h3>
          <ol className="mt-6 space-y-4">
            {education.map((e) => (
              <li key={e.title} className="card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-lg font-semibold tracking-tight">{e.title}</h4>
                  <span className="font-mono text-xs text-accent">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{e.subtitle}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {e.areas.map((a) => (
                    <li key={a} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[0.7rem] text-muted">
                      {a}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="label flex items-center gap-2">
              <FlaskConical size={14} aria-hidden="true" /> Research interests
            </h3>
            <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {researchInterests.map((r, i) => (
                <li key={r} className="flex items-baseline gap-3 bg-bg p-4 text-sm text-fg">
                  <span className="font-mono text-[0.7rem] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label">Submissions</h3>
            <ul className="mt-6 space-y-3">
              {submissions.map((p) => (
                <li key={p.slug} className="rounded-2xl border border-accent-2/30 bg-accent-2/5 p-5">
                  <p className="font-mono text-xs text-accent-2">{p.research!.status} · demo paper</p>
                  <p className="mt-2 font-display text-lg font-semibold">“{p.research!.title}”</p>
                  <p className="mt-1 text-sm text-muted">{p.research!.venue}</p>
                  <Link href={`/projects/${p.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg hover:text-accent">
                    Related project: {p.title} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-subtle">Submission status only — not an acceptance or publication.</p>
          </div>

          <div id="writing-preview">
            <div className="flex items-baseline justify-between">
              <h3 className="label">Technical writing</h3>
              <Link href="/writing" className="text-sm text-muted hover:text-fg">
                All articles →
              </Link>
            </div>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {articles.slice(0, 4).map((a) => (
                <li key={a.slug}>
                  <Link href={`/writing/${a.slug}`} className="group flex items-baseline justify-between gap-4 py-3.5">
                    <span className="text-sm text-fg group-hover:text-accent">{a.title}</span>
                    <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-wider text-subtle">
                      {a.status === "published" ? a.date : "Planned"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
