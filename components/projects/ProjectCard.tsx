import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge, Tag } from "@/components/ui/primitives";
import { ArchitectureFlow } from "@/components/projects/ArchitectureFlow";
import { categoryLabels, type Project } from "@/data/projects";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article
      className={`card card-hover group relative flex h-full flex-col p-6 md:p-8 ${large ? "lg:col-span-2" : ""}`}
      data-categories={project.categories.join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-subtle">
          {project.index} · {project.categories.map((c) => categoryLabels[c]).join(" / ")}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-[1.7rem]">
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-muted">{project.summary}</p>

      <div className={`mt-6 grid gap-6 ${large ? "lg:grid-cols-2" : ""}`}>
        <div>
          <p className="label">Problem</p>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-4">{project.problem}</p>
        </div>
        {project.architecture && large && (
          <div className="relative z-10 pointer-events-none">
            <ArchitectureFlow steps={project.architecture.steps} caption={project.architecture.caption} compact />
          </div>
        )}
      </div>

      {project.research && (
        <p className="mt-6 rounded-lg border border-accent-2/30 bg-accent-2/5 px-3 py-2 text-xs text-muted">
          <span className="font-mono text-accent-2">Research · </span>
          Demo paper “{project.research.title}” submitted to the {project.research.venue}.
        </p>
      )}

      <div className="mt-auto flex items-end justify-between gap-4 pt-7">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.slice(0, large ? 7 : 5).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </article>
  );
}
