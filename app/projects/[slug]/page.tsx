import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Image as ImageIcon } from "lucide-react";
import { StatusBadge, Tag } from "@/components/ui/primitives";
import { ArchitectureFlow } from "@/components/projects/ArchitectureFlow";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import { categoryLabels, getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.title} — IbraHybrid`, description: p.summary, url: `/projects/${p.slug}`, type: "article" },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x pb-14 pt-10 md:pb-20 md:pt-14">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft size={15} aria-hidden="true" /> All work
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-xs text-subtle">
              Case study {p.index} · {p.categories.map((c) => categoryLabels[c]).join(" / ")}
            </span>
            <StatusBadge status={p.status} />
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance md:text-6xl md:leading-[1.05]">
            {p.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-muted text-pretty">{p.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {p.repoUrl ? (
              <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm hover:border-accent hover:text-accent">
                <GitHubIcon size={15} /> Repository
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-4 py-2 text-sm text-subtle">
                <GitHubIcon size={15} /> Repository — coming soon
              </span>
            )}
            {p.demoUrl ? (
              <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm text-bg hover:bg-accent hover:text-accent-ink">
                Live demo <ArrowRight size={15} aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-4 py-2 text-sm text-subtle">
                Live demo — not yet public
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="container-x grid gap-14 py-14 md:py-20 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-14">
          {p.statusNote && (
            <p className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
              <span className="font-mono text-xs uppercase tracking-wider text-fg">Status · </span>
              {p.statusNote}
            </p>
          )}

          <section aria-labelledby="problem">
            <h2 id="problem" className="label text-accent">The problem</h2>
            <p className="mt-4 font-display text-2xl leading-snug text-fg text-pretty">{p.problem}</p>
          </section>

          <section aria-labelledby="approach" className="prose-x">
            <h2 id="approach" className="label text-accent">Technical approach</h2>
            <p className="mt-4 text-lg">{p.approach}</p>
          </section>

          {p.architecture && (
            <section aria-labelledby="architecture" className="card p-6 md:p-8">
              <h2 id="architecture" className="font-display text-xl font-semibold">Architecture</h2>
              <div className="mt-6">
                <ArchitectureFlow steps={p.architecture.steps} caption={p.architecture.caption} />
              </div>
            </section>
          )}

          {p.sections.map((s) => (
            <section key={s.heading} className="prose-x">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{s.heading}</h2>
              <div className="mt-4">
                {s.body?.map((b, k) => <p key={k}>{b}</p>)}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          {p.research && (
            <section className="rounded-2xl border border-accent-2/30 bg-accent-2/5 p-6">
              <h2 className="label text-accent-2">Related research</h2>
              <p className="mt-3 font-display text-xl font-semibold">Demo paper: “{p.research.title}”</p>
              <p className="mt-1 text-muted">{p.research.venue}</p>
              <p className="mt-3 font-mono text-xs text-subtle">Status: {p.research.status}. Not yet accepted or published.</p>
            </section>
          )}

          <section aria-labelledby="media">
            <h2 id="media" className="font-display text-2xl font-semibold tracking-tight">Media</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {p.media.map((m) => (
                <figure key={m} className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-strong bg-surface text-subtle">
                  <ImageIcon size={22} aria-hidden="true" />
                  <figcaption className="font-mono text-xs">{m} — screenshot coming soon</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div>
            <h2 className="label">Highlights</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span className="mt-2 h-px w-2.5 shrink-0 bg-accent" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label">Technologies</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/projects/${next.slug}`} className="container-x group flex items-center justify-between gap-6 py-10">
          <span>
            <span className="label">Next case study</span>
            <span className="mt-2 block font-display text-2xl font-semibold group-hover:text-accent md:text-3xl">{next.title}</span>
          </span>
          <ArrowRight className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
}
