/** Services offered for selected professional projects. */

export const services = [
  {
    id: "software",
    title: "Software Engineering",
    icon: "code",
    items: ["Business websites", "Web applications", "Mobile application development", "Backend systems", "REST APIs", "Custom integrations"],
  },
  {
    id: "ai",
    title: "AI Development",
    icon: "brain",
    items: ["AI chatbots", "RAG applications", "LLM integration", "AI workflow automation", "Intelligent document processing", "Local AI deployment"],
  },
  {
    id: "security",
    title: "Cybersecurity",
    icon: "shield",
    note: "Authorized and ethical engagements only — work begins after written scope and permission.",
    items: ["Authorized security assessments", "Network security reviews", "OSINT research", "Security configuration reviews"],
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    icon: "compass",
    items: ["Technology architecture", "Digital transformation", "API integration", "AI adoption for businesses"],
  },
] as const;

export const collaborationCta = "Have an idea, technical challenge or project? Let's build something meaningful.";
