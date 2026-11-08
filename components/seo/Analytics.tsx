import Script from "next/script";

/**
 * Privacy-conscious analytics placeholder.
 * Off by default: nothing loads unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set
 * (Plausible is cookieless and needs no consent banner). Swap for another provider here if preferred.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";
  return <Script defer data-domain={domain} src={src} strategy="afterInteractive" />;
}
