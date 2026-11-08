"use client";

import { useState, type ReactNode } from "react";
import { categoryLabels, type ProjectCategory } from "@/data/projects";

type Filter = "all" | ProjectCategory;

/**
 * Category filter. Cards are server-rendered children; without JavaScript every
 * project is still visible. Filtering hides non-matching cards via data attributes.
 */
export function ProjectGrid({
  categories,
  counts,
  children,
}: {
  categories: ProjectCategory[];
  counts: Record<string, number>;
  children: ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const options: Filter[] = ["all", ...categories];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = filter === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {o === "all" ? "All" : categoryLabels[o]}
              <span className={`ml-2 font-mono text-xs ${active ? "text-bg/60" : "text-subtle"}`}>{counts[o]}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {counts[filter]} {filter === "all" ? "" : categoryLabels[filter as ProjectCategory]} projects
      </p>
      <div className="project-grid grid gap-4 lg:grid-cols-2" data-filter={filter}>
        {children}
      </div>
      {/* Hide cards whose categories don't include the active filter */}
      <style>{categories
        .map((c) => `.project-grid[data-filter="${c}"] > :not([data-categories~="${c}"]){display:none}`)
        .join("")}</style>
    </div>
  );
}
