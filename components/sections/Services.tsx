import { Lock } from "lucide-react";
import { Section } from "@/components/ui/primitives";
import { DomainIcon } from "@/components/ui/DomainIcon";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section
      id="services"
      index="06"
      eyebrow="Services & collaboration"
      title="Available for selected projects."
      intro="I take on a limited number of engagements where engineering, AI and security genuinely need to work together. Business engagements are delivered through ZanHybrid."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <article key={s.id} className="card card-hover flex flex-col p-6">
            <DomainIcon name={s.icon} />
            <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {s.items.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-2 h-px w-2.5 shrink-0 bg-accent" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            {"note" in s && s.note && (
              <p className="mt-auto flex gap-2 pt-5 text-xs leading-relaxed text-subtle">
                <Lock size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                {s.note}
              </p>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
