import { ImageResponse } from "next/og";
import { OgMonogram } from "@/lib/og";

export const alt = "IbraHybrid — Ibrahim Abdalla Sharif. Engineering Ideas into Intelligent Systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#07080b",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          color: "#eceef3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <OgMonogram size={72} />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>
            Ibra<span style={{ color: "#22d3ee" }}>Hybrid</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#a1a9b8" }}>Ibrahim Abdalla Sharif</div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, marginTop: 16, maxWidth: 980 }}>
            Engineering Ideas into&nbsp;<span style={{ color: "#22d3ee" }}>Intelligent Systems.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#6b7383" }}>
          <span>Software Engineer · Cybersecurity Specialist · AI Developer</span>
          <span>ibrahybrid.me</span>
        </div>
      </div>
    ),
    size,
  );
}
