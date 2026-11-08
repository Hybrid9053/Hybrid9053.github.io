/**
 * Project case studies.
 *
 * Honesty rules applied here:
 *  - `status` must reflect reality: completed | in-development | research | experimentation | planned
 *  - No claims of production traffic, revenue, profits or accepted papers unless verified.
 *  - `repoUrl` / `demoUrl` stay null until a real public link exists (the UI shows "coming soon").
 */

export type ProjectStatus = "completed" | "in-development" | "research" | "experimentation" | "planned";
export type ProjectCategory = "ai" | "software" | "security" | "fintech";

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "AI & ML",
  software: "Software",
  security: "Security",
  fintech: "Fintech",
};

export const statusLabels: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-development": "In development",
  research: "Research",
  experimentation: "Experimentation",
  planned: "Planned",
};

export type Section = { heading: string; body?: string[]; bullets?: string[] };

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  statusNote?: string;
  problem: string;
  approach: string;
  /** Linear workflow rendered as a flow diagram. Use " / " inside a step for parallel branches. */
  architecture?: { caption: string; steps: string[] };
  highlights: string[];
  sections: Section[];
  stack: string[];
  research?: { title: string; venue: string; status: string };
  media: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-telecom-bot",
    index: "01",
    title: "AI-Powered Telecom Bot",
    tagline: "Conversational bundle purchasing and cash-out for Tanzanian users.",
    summary:
      "A conversational, WhatsApp-oriented platform designed to simplify telecom bundle purchasing and cash-out operations for Tanzanian users.",
    categories: ["ai", "software", "fintech"],
    status: "in-development",
    statusNote:
      "Prototype stage. The current build runs against the AzamPay sandbox and simulates fulfilment; no live payments are processed.",
    problem:
      "Buying data bundles or moving mobile money usually means navigating long USSD menus or several separate apps. Many users would rather just say what they want — in Swahili, English or Sheng — and confirm.",
    approach:
      "A backend that turns a natural-language request into a structured, validated intent, quotes the price, triggers a payment request through a payment gateway, and tracks every transaction through to a confirmed or failed state.",
    architecture: {
      caption: "Request lifecycle",
      steps: [
        "User",
        "WhatsApp",
        "Backend API",
        "Business Logic",
        "Payment Gateway / Telecom API",
        "Transaction Response",
      ],
    },
    highlights: [
      "Intent parsing for Swahili, English and Sheng requests",
      "Payment request + webhook confirmation flow",
      "Explicit transaction state tracking",
      "Fallback behaviour when external services are unavailable",
    ],
    sections: [
      {
        heading: "Payment reliability",
        body: [
          "Money-moving systems are judged on their failure handling. Each purchase is modelled as a transaction with explicit states, and the gateway's asynchronous callback — not the initial request — is treated as the source of truth for whether a payment succeeded.",
        ],
        bullets: [
          "Webhook-driven confirmation instead of optimistic success",
          "Idempotent handling of repeated or delayed callbacks",
          "Clear separation between payment status and fulfilment status",
          "Server-side validation of amounts, phone numbers and products",
        ],
      },
      {
        heading: "API integration",
        body: [
          "The backend integrates the AzamPay payment gateway (sandbox) and is structured so mobile-money rails and telecom APIs sit behind their own adapters. That keeps business logic independent of any single provider.",
        ],
      },
      {
        heading: "User experience",
        body: [
          "The conversation always ends in an explicit confirmation step showing the product, amount, fee and total before any payment request is sent. WhatsApp is the target channel; the current prototype exposes the same flow through a web chat interface and REST API.",
        ],
      },
    ],
    stack: ["Node.js", "Express.js", "Fastify", "WhatsApp integration", "AzamPay", "Mobile money rails", "Telecom APIs", "Backend automation"],
    media: ["Conversation flow", "Confirmation screen", "Transaction timeline"],
    repoUrl: null,
    demoUrl: null,
    featured: true,
  },
  {
    slug: "industrial-anomaly-detection",
    index: "02",
    title: "Industrial Anomaly Detection",
    tagline: "Computer vision that flags defects in industrial images.",
    summary:
      "A machine learning web application that detects anomalies in industrial images using computer vision, built around the MVTec AD benchmark.",
    categories: ["ai"],
    status: "research",
    statusNote: "Research project with an interactive Streamlit demo. Related demo paper submitted — not yet accepted or published.",
    problem:
      "Visual inspection on production lines is repetitive and error-prone, and defects are rare — so there are very few labelled examples of what “bad” looks like. Supervised classifiers struggle when the failure class is barely represented.",
    approach:
      "Learn what normal looks like, then flag what deviates. Models are trained on defect-free images and score new images by how far they fall from the learned notion of normal, producing both an anomaly score and a localisation of the suspicious region.",
    architecture: {
      caption: "Anomaly detection workflow",
      steps: ["Input image", "Preprocessing", "Feature extraction", "Normality model", "Anomaly score + heatmap", "Streamlit UI"],
    },
    highlights: [
      "Unsupervised setting: trained on normal samples only",
      "Image-level scoring plus region localisation",
      "Interactive Streamlit demo for inspection",
      "Connected to efficient-AI research on lightweight models",
    ],
    sections: [
      {
        heading: "Dataset",
        body: [
          "The project uses the MVTec AD dataset, a widely used benchmark for unsupervised industrial anomaly detection. It contains object and texture categories, with defect-free images for training and a test set that mixes normal images with a range of real defect types.",
        ],
      },
      {
        heading: "Model experimentation",
        body: [
          "Experiments compare approaches for representing “normal” and measure how detection quality trades off against model size and inference cost — the same question explored in the efficient-AI work on pruning, quantization and coreset selection.",
        ],
        bullets: [
          "Feature-based normality modelling",
          "Scikit-learn baselines for scoring and thresholding",
          "Efficiency considerations for deployment on modest hardware",
        ],
      },
      {
        heading: "Research relevance",
        body: [
          "Reliable, lightweight anomaly detection matters for manufacturers who cannot run large models on-site. The project sits at the intersection of computer vision, model efficiency and practical deployment.",
        ],
      },
    ],
    stack: ["Python", "Streamlit", "Scikit-learn", "MVTec AD", "Computer vision", "Machine learning"],
    research: {
      title: "industrialanomaly",
      venue: "7th Muslims in ML (MusIML) Workshop at NeurIPS 2026",
      status: "Submitted",
    },
    media: ["Demo interface", "Anomaly heatmaps", "Per-category results"],
    repoUrl: null,
    demoUrl: null,
    featured: true,
  },
  {
    slug: "obfuscated-vpn-architectures",
    index: "03",
    title: "Obfuscated VPN Architectures",
    tagline: "Resilient, censorship-resistant communication by design.",
    summary:
      "Research and experimentation with multi-layer VPN architectures, protocol camouflage and dynamic transport fallback for censorship-resistant communications.",
    categories: ["security"],
    status: "research",
    statusNote: "Research & experimentation. Configurations and operational details are intentionally not published.",
    problem:
      "In restrictive network environments, standard VPN protocols are easily fingerprinted and blocked. People who depend on private, reliable communication need connections that stay up when individual transports are disrupted.",
    approach:
      "Treat connectivity as a layered system: an encrypted tunnel, a transport that blends in with ordinary traffic, and a controller that detects degraded paths and falls back to an alternative transport automatically.",
    architecture: {
      caption: "Conceptual layering",
      steps: ["Client", "Encrypted tunnel", "Camouflaged transport", "Fallback controller", "Exit infrastructure"],
    },
    highlights: [
      "Layered architecture separating encryption from transport",
      "Protocol camouflage concepts",
      "Dynamic transport fallback",
      "Threat-model-driven design",
    ],
    sections: [
      {
        heading: "Research objectives",
        bullets: [
          "Understand how traffic classification and protocol fingerprinting work",
          "Evaluate how layering affects resilience, latency and throughput",
          "Design fallback logic that recovers without user intervention",
        ],
      },
      {
        heading: "Security considerations",
        body: [
          "Obfuscation is not encryption, and resilience is not anonymity. The work keeps those properties separate, documents the threat model each layer addresses, and avoids relying on obscurity for confidentiality.",
          "This page intentionally contains no configurations, endpoints or operational instructions.",
        ],
      },
    ],
    stack: ["Network architecture", "VPN protocols", "Transport layers", "Linux", "Network analysis"],
    media: ["Architecture diagram", "Fallback state machine"],
    repoUrl: null,
    demoUrl: null,
    featured: true,
  },
  {
    slug: "algorithmic-trading-environments",
    index: "04",
    title: "Algorithmic Trading Environments",
    tagline: "Evaluating open-source execution and backtesting stacks.",
    summary:
      "Evaluation and configuration of open-source algorithmic trading and backtesting environments, focused on execution architecture and testing discipline.",
    categories: ["software", "fintech"],
    status: "experimentation",
    statusNote: "Engineering evaluation only. No live trading performance or profitability is claimed.",
    problem:
      "Trading frameworks differ widely in how they model orders, handle market data and separate backtesting from live execution. Choosing one without understanding those internals leads to strategies that look good in tests and behave differently in practice.",
    approach:
      "Set up and compare established open-source frameworks side by side, focusing on the engineering: data ingestion, order management, event loops and how faithfully backtests represent execution.",
    architecture: {
      caption: "Evaluation pipeline",
      steps: ["Market data", "Strategy logic", "Order management", "Execution / Backtest engine", "Evaluation"],
    },
    highlights: [
      "Side-by-side framework evaluation",
      "Order management and execution modelling",
      "WebSocket market-data concepts",
      "Backtesting methodology and pitfalls",
    ],
    sections: [
      {
        heading: "Frameworks evaluated",
        bullets: [
          "Backtrader — Python event-driven backtesting",
          "Freqtrade — strategy bot framework with dry-run mode",
          "QuantConnect LEAN — multi-asset algorithmic trading engine",
        ],
      },
      {
        heading: "Engineering focus",
        body: [
          "The interest is architecture rather than returns: how each engine structures its event loop, models fills and slippage, integrates streaming data, and keeps strategy code testable.",
        ],
      },
    ],
    stack: ["Python", "Backtrader", "Freqtrade", "QuantConnect LEAN", "WebSockets", "Order management", "Backtesting"],
    media: ["Backtest report", "Architecture comparison"],
    repoUrl: null,
    demoUrl: null,
    featured: false,
  },
  {
    slug: "ai-business-automation",
    index: "05",
    title: "AI Business Automation",
    tagline: "Assistants, RAG and workflows for everyday business operations.",
    summary:
      "A case-study slot for AI business assistants, retrieval-augmented generation, intelligent document processing, lead management and workflow automation.",
    categories: ["ai", "software"],
    status: "experimentation",
    statusNote: "In development / experimentation. Details will be published as working implementations are completed.",
    problem:
      "Small businesses spend a large share of their time answering repeated questions, processing documents and following up on leads — work that is structured enough to automate but varied enough to need language understanding.",
    approach:
      "Combine retrieval over a business's own documents with an LLM, then connect the output to real workflows — CRMs, email and messaging — through an orchestration layer, with local models where data privacy matters.",
    architecture: {
      caption: "Reference architecture",
      steps: ["Documents & data", "Ingestion + embeddings", "Vector store", "LLM (local / cloud)", "Workflow automation"],
    },
    highlights: [
      "Retrieval-augmented generation over private documents",
      "Local models via Ollama for privacy-sensitive data",
      "Workflow automation with n8n",
      "API-first backend with FastAPI",
    ],
    sections: [
      {
        heading: "Planned capabilities",
        bullets: [
          "Business assistants grounded in company knowledge",
          "Intelligent document processing and extraction",
          "Lead capture, qualification and follow-up",
          "Event-driven workflow automation",
        ],
      },
    ],
    stack: ["Python", "FastAPI", "Ollama", "PostgreSQL", "Vector databases", "n8n", "LLM APIs"],
    media: ["Assistant interface", "Workflow diagram"],
    repoUrl: null,
    demoUrl: null,
    featured: false,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
