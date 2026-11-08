/**
 * Abstract "hybrid system" diagram: four engineering domains connected through
 * the IH monogram core. Pure SVG + CSS — no JS, no canvas, negligible cost.
 */
const nodes = [
  { x: 200, y: 62, label: "SOFTWARE", sub: "APIs · Web · Mobile" },
  { x: 338, y: 200, label: "AI / ML", sub: "LLMs · Vision" },
  { x: 200, y: 338, label: "SECURITY", sub: "OSINT · Networks" },
  { x: 62, y: 200, label: "INFRA", sub: "Linux · Cloud · DNS" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <div
        className="absolute inset-[12%] rounded-full opacity-80 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
        aria-hidden="true"
      />
      <svg viewBox="0 0 400 400" className="relative h-full w-full" role="img" aria-labelledby="hv-title hv-desc">
        <title id="hv-title">Hybrid systems diagram</title>
        <desc id="hv-desc">
          Software engineering, AI and machine learning, cybersecurity and infrastructure, all connected through a central IH core.
        </desc>

        {/* orbits */}
        <circle cx="200" cy="200" r="138" fill="none" stroke="var(--line-strong)" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="92" fill="none" stroke="var(--line)" />

        {/* cross-links between neighbouring domains */}
        <g stroke="var(--line-strong)" fill="none" strokeWidth="1">
          <path d="M200 62 Q 300 100 338 200" />
          <path d="M338 200 Q 300 300 200 338" />
          <path d="M200 338 Q 100 300 62 200" />
          <path d="M62 200 Q 100 100 200 62" />
        </g>

        {/* spokes with flowing signal */}
        <g stroke="var(--accent)" strokeWidth="1.25" fill="none" strokeLinecap="round">
          {nodes.map((n, i) => (
            <line
              key={n.label}
              x1="200"
              y1="200"
              x2={n.x}
              y2={n.y}
              className="anim-flow"
              style={{ animationDelay: `${i * -0.6}s`, opacity: 0.7 }}
            />
          ))}
        </g>

        {/* domain nodes */}
        {nodes.map((n, i) => {
          const below = n.y < 200;
          const ty = below ? n.y - 30 : n.y + 32;
          const isSide = n.y === 200;
          return (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="14" fill="var(--surface)" stroke="var(--line-strong)" />
              <circle cx={n.x} cy={n.y} r="4" fill={i % 2 ? "var(--accent-2)" : "var(--accent)"} className="anim-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
              <text
                x={n.x}
                y={isSide ? n.y + 34 : ty}
                textAnchor="middle"
                className="fill-fg font-mono"
                style={{ fontSize: 10.5, letterSpacing: "0.14em" }}
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={(isSide ? n.y + 34 : ty) + 14}
                textAnchor="middle"
                className="fill-subtle font-mono"
                style={{ fontSize: 8.5 }}
              >
                {n.sub}
              </text>
            </g>
          );
        })}

        {/* core monogram */}
        <g transform="translate(164 164)">
          <rect x="0" y="0" width="72" height="72" rx="18" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
          <g transform="scale(1.5)" stroke="var(--fg)" strokeWidth="3.25" strokeLinecap="round" fill="none">
            <path d="M14 14v20" />
            <path d="M24 14v20" />
            <path d="M34 14v20" />
            <path d="M24 24h10" />
          </g>
          <g transform="scale(1.5)">
            <path d="M14 24h10" stroke="var(--accent)" strokeWidth="1.75" strokeDasharray="1.5 3" strokeLinecap="round" />
            <circle cx="29" cy="24" r="3" fill="var(--accent)" />
            <circle cx="14" cy="24" r="1.8" fill="var(--accent)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
