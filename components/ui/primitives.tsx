import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { statusLabels, type ProjectStatus } from "@/data/projects";

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 md:py-28 ${className}`}>
      <div className="container-x">
        <header className="mb-12 max-w-2xl md:mb-16">
          <p className="label flex items-center gap-3">
            {index && <span className="text-accent">{index}</span>}
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 id={headingId} className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance md:text-[2.75rem] md:leading-[1.1]">
            {title}
          </h2>
          {intro && <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.72rem] text-muted">
      {children}
    </span>
  );
}

const statusTone: Record<ProjectStatus, string> = {
  completed: "text-emerald-400 light:text-emerald-700",
  "in-development": "text-accent",
  research: "text-accent-2",
  experimentation: "text-amber-300 light:text-amber-700",
  planned: "text-subtle",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-wider ${statusTone[status]}`}>
      <span className="size-1.5 rounded-full bg-current anim-pulse" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-fg text-bg hover:bg-accent hover:text-accent-ink"
      : "border border-line-strong text-fg hover:border-accent hover:text-accent";
  const content = (
    <>
      {children}
      <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}
