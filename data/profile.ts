/**
 * Personal identity & contact details.
 * Edit this file to update anything about Ibrahim that appears on the site.
 */

export const profile = {
  brand: "IbraHybrid",
  name: "Ibrahim Abdalla Sharif",
  alias: "Hybrid",
  roles: ["Software Engineer", "Cybersecurity Specialist", "AI Developer"],
  altPositioning: "Software Engineer & AI Systems Developer",
  location: "Zanzibar, Tanzania",
  university: "State University of Zanzibar (SUZA)",
  founderOf: { name: "ZanHybrid", url: "https://zanhybrid.co.tz" },

  tagline: "Engineering Ideas into Intelligent Systems.",
  secondaryTagline: "Think Hybrid. Build Intelligent.",
  intro:
    "I build intelligent software, AI-powered applications and secure digital systems. My work combines software engineering, machine learning, automation and cybersecurity to solve practical problems.",

  /** Set to the real image path in /public (e.g. "/portrait.jpg") once supplied. */
  portrait: null as string | null,

  /**
   * Set to the real CV path in /public (e.g. "/Ibrahim-Abdalla-Sharif-CV.pdf")
   * to enable the "Download CV" button. Leave null until a final CV is supplied.
   */
  cv: null as string | null,
} as const;

export const contact = {
  /** Professional email — always shown first. */
  email: "ibrahim@zanhybrid.co.tz",
  /** Personal email — secondary, shown less prominently. */
  personalEmail: "mosiour9053@gmail.com",
} as const;

export type SocialKey = "github" | "linkedin" | "kaggle" | "zanhybrid";

export const socials: { key: SocialKey; label: string; handle: string; href: string }[] = [
  { key: "github", label: "GitHub", handle: "Hybrid9053", href: "https://github.com/Hybrid9053" },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "ibrahim-abdalla",
    href: "https://www.linkedin.com/in/ibrahim-abdalla-40331933a",
  },
  {
    key: "kaggle",
    label: "Kaggle",
    handle: "ibrahimabdallasharif",
    href: "https://www.kaggle.com/ibrahimabdallasharif",
  },
  { key: "zanhybrid", label: "ZanHybrid", handle: "zanhybrid.co.tz", href: "https://zanhybrid.co.tz" },
];

export const about = {
  heading: "Beyond Writing Code.",
  paragraphs: [
    "I am Ibrahim Abdalla Sharif, known as Hybrid, a Computer Science student at the State University of Zanzibar and the Founder & CEO of ZanHybrid.",
    "My interests span full-stack software engineering, artificial intelligence, cybersecurity and digital infrastructure.",
    "I enjoy designing and developing systems that solve real-world problems, from intelligent conversational applications and machine learning platforms to secure network architectures and business automation tools.",
    "My technical approach combines practical engineering, continuous research and experimentation. I am particularly interested in local and cloud-based AI systems, efficient machine learning, computer vision, API integrations and secure infrastructure.",
    "Through my work, I aim to contribute to the development of intelligent, reliable and accessible digital solutions in Tanzania and beyond.",
  ],
  brandStatement:
    "Hybrid is the combination of software engineering, artificial intelligence, cybersecurity and infrastructure — understanding how systems connect, then building practical solutions from them.",
  principles: [
    { title: "Understand the system", body: "Look past the tool to the architecture it lives in." },
    { title: "Build what is practical", body: "Prefer working, reliable software over clever demos." },
    { title: "Secure by default", body: "Treat security as a design constraint, not an afterthought." },
    { title: "Keep researching", body: "Experiment, measure and write down what was learned." },
  ],
} as const;
