import { contact, profile, socials } from "@/data/profile";
import { site } from "@/lib/site";

/** schema.org Person + WebSite structured data. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: profile.name,
        alternateName: ["Hybrid", "Ibrahim Hybrid", "IbraHybrid"],
        url: site.url,
        email: `mailto:${contact.email}`,
        jobTitle: "Software Engineer, AI Developer & Cybersecurity Specialist",
        description: site.description,
        address: { "@type": "PostalAddress", addressLocality: "Zanzibar", addressCountry: "TZ" },
        affiliation: { "@type": "CollegeOrUniversity", name: "State University of Zanzibar", alternateName: "SUZA" },
        worksFor: { "@type": "Organization", name: "ZanHybrid", url: "https://zanhybrid.co.tz" },
        knowsAbout: ["Software engineering", "Artificial intelligence", "Machine learning", "Computer vision", "Cybersecurity", "LLM systems"],
        sameAs: socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#person` },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped is safe to inline
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
