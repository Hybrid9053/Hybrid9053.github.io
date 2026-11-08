/** Site-wide configuration. */

export const site = {
  url: "https://ibrahybrid.me",
  name: "IbraHybrid",
  title: "Ibrahim Abdalla Sharif (Hybrid) — Software Engineer, AI Developer & Cybersecurity Specialist",
  shortTitle: "IbraHybrid — Ibrahim Abdalla Sharif",
  description:
    "Ibrahim Abdalla Sharif (Hybrid) is a software engineer, AI developer and cybersecurity specialist in Zanzibar, Tanzania, and the founder of ZanHybrid. Engineering ideas into intelligent systems.",
  locale: "en_US",
  themeColor: "#07080b",
} as const;

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Research", href: "/#research" },
  { label: "Writing", href: "/writing" },
  { label: "Services", href: "/#services" },
] as const;
