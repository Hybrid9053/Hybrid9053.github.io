import { Fragment } from "react";

/** Renders a linear workflow. Steps containing " / " are shown as parallel branches. */
export function ArchitectureFlow({ steps, caption, compact = false }: { steps: string[]; caption?: string; compact?: boolean }) {
  return (
    <figure>
      {caption && <figcaption className="label mb-3">{caption}</figcaption>}
      <ol className={`flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center ${compact ? "md:gap-1.5" : "md:gap-2"}`}>
        {steps.map((step, i) => {
          const branches = step.split(" / ");
          return (
            <Fragment key={step}>
              <li className="flex gap-1.5 md:flex-col">
                {branches.map((b) => (
                  <span
                    key={b}
                    className={`inline-flex items-center gap-2 rounded-lg border bg-bg font-mono text-muted ${
                      compact ? "px-2 py-1 text-[0.7rem]" : "px-3 py-1.5 text-xs"
                    } ${i === 0 || i === steps.length - 1 ? "border-accent/40 text-fg" : "border-line"}`}
                  >
                    {!compact && <span className="text-subtle">{String(i + 1).padStart(2, "0")}</span>}
                    {b}
                  </span>
                ))}
              </li>
              {i < steps.length - 1 && (
                <li aria-hidden="true" className="pl-4 text-accent md:pl-0">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </figure>
  );
}
