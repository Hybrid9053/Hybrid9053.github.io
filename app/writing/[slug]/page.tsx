import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { Tag } from "@/components/ui/primitives";
import { articles, getArticle } from "@/data/writing";
import { profile } from "@/data/profile";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const isPublished = a.status === "published";
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/writing/${a.slug}` },
    // Planned outlines are thin content — keep them out of search results until published.
    robots: isPublished ? undefined : { index: false, follow: true },
    openGraph: isPublished
      ? { type: "article", title: a.title, description: a.summary, publishedTime: a.date, authors: [profile.name] }
      : undefined,
  };
}

/** Article template. Renders `body` when published; otherwise shows the planned outline. */
export default async function ArticlePage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const isPublished = a.status === "published" && a.body;

  return (
    <article className="container-x max-w-3xl py-14 md:py-20">
      <Link href="/writing" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft size={15} aria-hidden="true" /> All writing
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-subtle">
          <span>{isPublished ? a.date : "Planned article"}</span>
          {a.readingTime && <span>· {a.readingTime}</span>}
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl md:leading-[1.1]">{a.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">{a.summary}</p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {a.topics.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="mt-8 border-t border-line pt-5 text-sm text-muted">
          By <span className="text-fg">{profile.name}</span>
        </p>
      </header>

      {isPublished ? (
        <div className="prose-x mt-12 space-y-10">
          {a.body!.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-semibold text-fg">{s.heading}</h2>
              <div className="mt-4">{s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <div className="flex gap-3 rounded-xl border border-dashed border-line-strong bg-surface p-5 text-sm text-muted">
            <FileText size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <p>This article hasn&apos;t been written yet. Below is the planned outline — check back, or get in touch if this topic is useful to you.</p>
          </div>
          <h2 className="label mt-10">Planned outline</h2>
          <ol className="mt-5 space-y-3">
            {a.outline.map((o, i) => (
              <li key={o} className="flex gap-4 rounded-lg border border-line p-4">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-fg">{o}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}
