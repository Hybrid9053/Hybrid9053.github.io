/** Technical expertise grouped by domain. No proficiency percentages — by design. */

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  icon: "code" | "brain" | "shield" | "server";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "software",
    title: "Software Engineering",
    summary: "Full-stack web, mobile and API development.",
    icon: "code",
    items: [
      "Python",
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "Express.js",
      "Fastify",
      "React Native",
      "FastAPI",
      "Spring Boot",
      "REST API development",
      "Full-stack development",
      "Mobile application development",
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence & Machine Learning",
    summary: "LLM integration, local & cloud deployment, efficient ML.",
    icon: "brain",
    items: [
      "Ollama",
      "Open WebUI",
      "AWS Bedrock",
      "Anthropic API",
      "Claude Code CLI",
      "Firecrawl CLI",
      "Model Context Protocol (MCP)",
      "Scikit-learn",
      "Computer vision",
      "Anomaly detection",
      "LLM integration",
      "Local & cloud AI deployment",
      "Model efficiency research",
    ],
  },
  {
    id: "security",
    title: "Cybersecurity",
    summary: "Authorized testing, OSINT and secure network design.",
    icon: "shield",
    items: [
      "Penetration testing",
      "OSINT",
      "Network security auditing",
      "Kali Linux",
      "Network analysis",
      "Protocol camouflage research",
      "Secure infrastructure practices",
    ],
  },
  {
    id: "infra",
    title: "Infrastructure & Developer Tools",
    summary: "The tooling that ships and runs the work.",
    icon: "server",
    items: [
      "Git & GitHub",
      "Docker",
      "Linux",
      "Windows 11",
      "Visual Studio Code",
      "GitHub Copilot",
      "Android Studio",
      "ADB",
      "Netlify",
      "DNS management",
      "Zoho Mail",
      "API integrations",
    ],
  },
];

/** Compact capability indicators used in the hero. */
export const capabilities = ["Full-stack", "LLM systems", "Computer vision", "Security", "Infrastructure"];
