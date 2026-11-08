import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { publishedArticles } from "@/data/writing";
import { site } from "@/lib/site";

/** Planned (unpublished) articles are intentionally excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/writing`, changeFrequency: "monthly", priority: 0.6 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...publishedArticles().map((a) => ({
      url: `${site.url}/writing/${a.slug}`,
      lastModified: a.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
