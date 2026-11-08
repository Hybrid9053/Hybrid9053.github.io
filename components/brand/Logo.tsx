import Link from "next/link";

/**
 * IH monogram — an "I" and an "H" joined by a dashed link trace.
 * The node on the H crossbar marks where systems connect: the "hybrid" point.
 */
export function Monogram({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="3.25" strokeLinecap="round">
        <path d="M14 14v20" />
        <path d="M24 14v20" />
        <path d="M34 14v20" />
        <path d="M24 24h10" />
      </g>
      <path d="M14 24h10" stroke="var(--accent)" strokeWidth="1.75" strokeDasharray="1.5 3" strokeLinecap="round" />
      <circle cx="29" cy="24" r="3" fill="var(--accent)" />
      <circle cx="14" cy="24" r="1.8" fill="var(--accent)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 text-fg ${className}`}
      aria-label="IbraHybrid — home"
    >
      <Monogram size={32} className="transition-transform duration-300 group-hover:rotate-[-4deg]" />
      <span className="font-display text-[1.05rem] font-semibold tracking-tight">
        Ibra<span className="text-accent">Hybrid</span>
      </span>
    </Link>
  );
}
