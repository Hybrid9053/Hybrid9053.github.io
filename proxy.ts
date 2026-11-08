import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";
import { articles } from "@/data/writing";

/**
 * Return a real 404 status for unknown project/article slugs.
 * (With Cache Components, `dynamicParams = false` is unavailable and a streamed
 * notFound() would keep a 200 status.) Rewriting to an unmatched path renders
 * app/not-found.tsx with status 404.
 */
const known = new Set([...projects.map((p) => `/projects/${p.slug}`), ...articles.map((a) => `/writing/${a.slug}`)]);

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, "");
  if (!known.has(path)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
}

export const config = {
  matcher: ["/projects/:slug", "/writing/:slug"],
};
