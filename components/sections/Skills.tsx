import { Section } from "@/components/ui/primitives";
import { DomainIcon } from "@/components/ui/DomainIcon";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="expertise"
      index="02"
      eyebrow="Technical expertise"
      title="Four domains, one connected practice."
      intro="The tools I work with, grouped by the problems they solve. No percentages — the projects below are the evidence."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <article key={g.id} className="card card-hover p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <DomainIcon name={g.icon} />
              <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{g.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{g.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-[0.75rem] text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
