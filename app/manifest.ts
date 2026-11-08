import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.shortTitle,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#07080b",
    theme_color: "#07080b",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
