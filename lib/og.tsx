/** Shared monogram for next/og image routes (Satori needs explicit colours). */
export function OgMonogram({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#0d0f14" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
      <g stroke="#eceef3" strokeWidth="3.25" strokeLinecap="round">
        <path d="M14 14v20" />
        <path d="M24 14v20" />
        <path d="M34 14v20" />
        <path d="M24 24h10" />
      </g>
      <path d="M14 24h10" stroke="#22d3ee" strokeWidth="1.75" strokeDasharray="1.5 3" strokeLinecap="round" />
      <circle cx="29" cy="24" r="3" fill="#22d3ee" />
      <circle cx="14" cy="24" r="1.8" fill="#22d3ee" />
    </svg>
  );
}
