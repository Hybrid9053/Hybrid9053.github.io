import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x flex min-h-[70dvh] flex-col items-start justify-center py-20">
        <p className="font-mono text-sm text-accent">
          <span className="text-subtle">$</span> GET {"<route>"} → <span className="text-fg">404</span>
        </p>
        <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-7xl">Signal lost.</h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          This route doesn&apos;t resolve to anything — it may have moved, or never existed.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/#work" variant="ghost">
            View work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
