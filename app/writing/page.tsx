import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/ui/primitives";
import { articles } from "@/data/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical writing and engineering notes by Ibrahim Abdalla Sharif on AI systems, efficient ML, APIs and secure networks.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const published = articles.filter((a) => a.status === "published");
  const upcoming = articles.filter((a) => a.status !== "published");

  return (
    <div className="container-x py-14 md:py-20">
      <header className="max-w-2xl">
        <p className="label">Research & technical writing</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">Writing.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Notes on what I build and research. Articles are published here as they are finished — everything marked
          <span className="font-mono text-sm text-fg"> Planned </span>is on the roadmap, not yet written.
        </p>
      </header>

      {published.length > 0 && (
        <section aria-labelledby="published" className="mt-16">
          <h2 id="published" className="label">Published</h2>
          <ArticleList items={published} />
        </section>
      )}

      <section aria-labelledby="planned" className="mt-16">
        <h2 id="planned" className="label">Planned articles · {upcoming.length}</h2>
        <ArticleList items={upcoming} />
      </section>
    </div>
  );
}

function ArticleList({ items }: { items: typeof articles }) {
  return (
    <ul className="mt-6 divide-y divide-line border-y border-line">
      {items.map((a, i) => (
        <li key={a.slug}>
          <Link href={`/writing/${a.slug}`} className="group grid gap-3 py-7 md:grid-cols-[4rem_1fr_auto] md:items-start md:gap-8">
            <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="block font-display text-xl font-semibold tracking-tight group-hover:text-accent md:text-2xl">{a.title}</span>
              <span className="mt-2 block text-muted">{a.summary}</span>
              <span className="mt-4 flex flex-wrap gap-1.5">
                {a.topics.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </span>
            </span>
            <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-subtle">
              {a.status === "published" ? a.date : "Planned"}
              <ArrowUpRight size={16} className="group-hover:text-accent" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
