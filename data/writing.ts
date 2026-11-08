/**
 * Articles. Every entry below is a PLANNED article — none are published yet.
 * To publish one: set status to "published", add a `date` (YYYY-MM-DD) and fill `body`.
 * Planned articles are labelled in the UI, excluded from the sitemap and marked noindex.
 */

export type Article = {
  slug: string;
  title: string;
  summary: string;
  topics: string[];
  status: "planned" | "draft" | "published";
  date?: string;
  readingTime?: string;
  outline: string[];
  body?: { heading: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "industrial-anomaly-detection-with-ml",
    title: "Understanding Industrial Anomaly Detection with Machine Learning",
    summary: "Why learning “normal” beats classifying “broken” when defects are rare, explained through MVTec AD.",
    topics: ["Computer vision", "Machine learning"],
    status: "planned",
    outline: [
      "Why defect detection is an unsupervised problem",
      "A tour of the MVTec AD benchmark",
      "Feature-based approaches to modelling normality",
      "Scoring, thresholds and localisation",
      "Lessons from building a Streamlit demo",
    ],
  },
  {
    slug: "local-llm-applications-with-ollama",
    title: "Building Local LLM Applications with Ollama",
    summary: "Running models on your own hardware — trade-offs, tooling and a practical app architecture.",
    topics: ["LLM systems", "Local AI"],
    status: "planned",
    outline: [
      "When local models make sense",
      "Setting up Ollama and Open WebUI",
      "Choosing model sizes for your hardware",
      "Connecting a backend through the Ollama API",
      "Privacy and deployment considerations",
    ],
  },
  {
    slug: "efficient-ai-quantization-pruning-coresets",
    title: "Efficient AI: Quantization, Pruning and Coreset Selection",
    summary: "Three ways to make models smaller and faster, and what each costs in accuracy.",
    topics: ["Efficient AI", "Research"],
    status: "planned",
    outline: [
      "Why efficiency matters outside big labs",
      "Quantization: fewer bits per weight",
      "Pruning: removing what the model doesn't use",
      "Coreset selection: training on less, smarter data",
      "Measuring the trade-offs honestly",
    ],
  },
  {
    slug: "api-driven-whatsapp-applications",
    title: "Designing API-Driven WhatsApp Applications",
    summary: "Architecture patterns for conversational apps that move money and talk to external APIs.",
    topics: ["Backend", "APIs"],
    status: "planned",
    outline: [
      "Conversations as state machines",
      "Webhooks, retries and idempotency",
      "Integrating payment gateways safely",
      "Confirmation design for financial actions",
      "Testing with sandboxes and mocks",
    ],
  },
  {
    slug: "understanding-model-context-protocol",
    title: "Understanding Model Context Protocol (MCP)",
    summary: "How MCP lets AI agents use tools and data sources through one open interface.",
    topics: ["AI agents", "MCP"],
    status: "planned",
    outline: [
      "The problem MCP solves",
      "Clients, servers, tools and resources",
      "Using MCP servers from coding agents",
      "Security boundaries for tool-using agents",
    ],
  },
  {
    slug: "secure-resilient-network-architectures",
    title: "Exploring Secure and Resilient Network Architectures",
    summary: "Layering, fallback and threat models for networks that keep working under pressure.",
    topics: ["Cybersecurity", "Networking"],
    status: "planned",
    outline: [
      "Defining resilience versus security",
      "Layered architectures and their trade-offs",
      "Designing for graceful degradation",
      "Threat modelling a network design",
    ],
  },
  {
    slug: "business-automation-with-n8n",
    title: "Building Intelligent Business Automation with n8n",
    summary: "Combining workflow automation with LLMs to remove repetitive business work.",
    topics: ["Automation", "LLM systems"],
    status: "planned",
    outline: [
      "Where automation pays off first",
      "n8n fundamentals: triggers, nodes and data",
      "Adding an LLM step responsibly",
      "Human-in-the-loop review",
      "Monitoring automations in production",
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const publishedArticles = () => articles.filter((a) => a.status === "published");
