// Single source of truth for portfolio copy. Lifted verbatim from
// design_handoff_portfolio/reference/Portfolio.dc.html → renderVals().

export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://itsrishu.me").replace(/\/$/, "");
export const EMAIL = "rishu07.dev@gmail.com";
export const GITHUB = "https://github.com/Rishut681";
export const NAME = "Rishu Raj";
export const SITE_TITLE = "Rishu Raj — Full-stack developer & business analyst";
export const SITE_DESC =
  "Websites, SaaS, AI chatbots and n8n automation for businesses. I work out what will actually help, then build it.";

type Shot = { src: string; w: number; h: number };

export type Project = {
  slug: string;
  img: Shot;
  mimg: Shot;
  focus: string;
  title: string;
  kicker: string;
  desc: string;
  res: string;
  resLine: string;
  role: string;
  stack: string;
  url: string | null;
  tone: string;
};

export const projects: Project[] = [
  {
    slug: "rankmonk",
    img: { src: "/work/rankmonk", w: 1917, h: 912 },
    mimg: { src: "/work/rankmonk-m", w: 273, h: 601 },
    focus: "50% 40%",
    title: "RankMonk",
    kicker: "Local SEO SaaS",
    desc: "A platform that tracks Google Maps rank street by street, audits Business Profiles, drafts review replies and checks if ChatGPT and Gemini recommend a business. I designed and built the marketing site, blog and lead capture.",
    res: "24 pages",
    resLine: "generated from one content file — navigation, sitemap and llms.txt never drift.",
    role: "Solo — product, design, build",
    stack: "Next.js 16 · React 19 · TypeScript · Supabase · Vercel",
    url: "https://rankmonk.io/",
    tone: "#120D0A",
  },
  {
    slug: "audit",
    img: { src: "/work/audit", w: 1917, h: 917 },
    mimg: { src: "/work/audit-m", w: 271, h: 601 },
    focus: "50% 62%",
    title: "RankMonk Audit",
    kicker: "Audit reports",
    desc: "Search a brand, confirm its listings across cities, and get a report on its Google Business Profiles and website SEO. RankMonk’s team uses it to show clients exactly what to fix.",
    res: "3 clicks",
    resLine: "from a brand name to a client-ready PDF and an editable PowerPoint.",
    role: "Solo — product, design, build",
    stack: "Next.js · TypeScript · Places data · PDF & PPTX export",
    url: "https://audit.rankmonk.io/",
    tone: "#0E0C0B",
  },
  {
    slug: "ca-firm",
    img: { src: "/work/ca-firm", w: 1917, h: 910 },
    mimg: { src: "/work/ca-firm-m", w: 271, h: 598 },
    focus: "30% 35%",
    title: "Practice Desk",
    kicker: "CA firm automation",
    desc: "n8n handles a CA firm’s WhatsApp and email replies, document collection and filing reminders. One dashboard shows clients, deadlines, leads and invoices, and each firm sees only its own data.",
    res: "~15 hrs",
    resLine: "a week of replies, reminders and document chasing taken off the staff.",
    role: "Analysis, workflow, build",
    stack: "Next.js · TypeScript · n8n · Google Sheets · Groq",
    url: "https://ca-firm-automation.vercel.app/",
    tone: "#0B0F0E",
  },
  {
    slug: "hrms",
    img: { src: "/work/hrms", w: 1906, h: 902 },
    mimg: { src: "/work/hrms-m", w: 283, h: 597 },
    focus: "30% 30%",
    title: "Tripzygo People",
    kicker: "HRMS",
    desc: "An in-house HR system for Tripzygo: punch in and out, breaks, leave balances, approvals, team status and monthly reports — the parts of greytHR the team actually used.",
    res: "1 app",
    resLine: "replacing attendance sheets, leave emails and month-end reconciliation.",
    role: "Requirements to rollout",
    stack: "Next.js · TypeScript · PostgreSQL · Role-based access",
    url: null,
    tone: "#0B0D11",
  },
  {
    slug: "chatpati",
    img: { src: "/work/chatpati", w: 1905, h: 916 },
    mimg: { src: "/work/chatpati-m", w: 282, h: 606 },
    focus: "70% 45%",
    title: "Chatpati",
    kicker: "E-commerce",
    desc: "A small online store for a friend’s women’s clothing label — tops, kurtis, co-ords and dresses, with a bag, wishlist, online payments and WhatsApp support.",
    res: "< 2s",
    resLine: "to load on a phone, where almost every order comes from.",
    role: "Design & development",
    stack: "React · Vite · Tailwind · Vercel",
    url: "https://chatpati-style-hub.vercel.app/",
    tone: "#110B09",
  },
];

export const hostOf = (url: string | null) =>
  url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "internal · private";

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const method = [
  {
    word: "Learn",
    time: "Days 1–3",
    desc: "I talk to the people who’ll use it and look at how work gets done today — including the spreadsheets.",
    out: "a one-page brief",
  },
  {
    word: "Assess",
    time: "Week 1",
    desc: "What to build, what to automate and what to leave alone. Then a fixed scope and price.",
    out: "scope, flows, a quote",
  },
  {
    word: "Develop",
    time: "Weeks 2–5",
    desc: "Websites, apps, chatbots and n8n flows, with a preview link every week.",
    out: "working software early",
  },
  {
    word: "Test",
    time: "After launch",
    desc: "Checked against the goal we agreed on. Then fixes, reports and support.",
    out: "proof it worked",
  },
];

export type BriefType = keyof typeof estimates;

export const services: {
  name: string;
  kind: string;
  type: BriefType;
  time: string;
  long: string;
  items: string[];
}[] = [
  {
    name: "Websites & landing pages",
    kind: "Marketing",
    type: "Website",
    time: "2–3 weeks",
    long: "A fast, well-structured site that explains what you do and makes it easy to get in touch.",
    items: [
      "Copy structure and page design",
      "Responsive build, CMS if needed",
      "Analytics, forms and SEO setup",
      "Launch and a handover walkthrough",
    ],
  },
  {
    name: "SaaS & web apps",
    kind: "Product",
    type: "SaaS / web app",
    time: "6–10 weeks",
    long: "From first idea to a product people log into. Built in weekly milestones so you can test early.",
    items: [
      "Scope and user flows",
      "Auth, roles and billing",
      "Dashboards and admin tools",
      "Deployment and monitoring",
    ],
  },
  {
    name: "AI chatbots",
    kind: "AI",
    type: "AI chatbot",
    time: "2–4 weeks",
    long: "Assistants on WhatsApp or your website that answer questions from your own content and pass leads to your team.",
    items: [
      "Trained on your docs and FAQs",
      "WhatsApp or web widget",
      "Lead capture and handoff",
      "Conversation logs and reports",
    ],
  },
  {
    name: "n8n automation",
    kind: "Operations",
    type: "Automation",
    time: "1–3 weeks",
    long: "Workflows that take over repetitive work: reports, follow-ups, reminders and document collection.",
    items: [
      "Process mapping with your team",
      "n8n workflows, self-hosted or cloud",
      "Sheets, email, WhatsApp, CRM links",
      "Error alerts and documentation",
    ],
  },
  {
    name: "Dashboards & internal tools",
    kind: "Operations",
    type: "Dashboard / CRM",
    time: "4–6 weeks",
    long: "CRMs, HRMS and admin panels shaped around how your team already works, not the other way round.",
    items: [
      "Requirements from the people using it",
      "Role-based access",
      "Reports and exports",
      "Training for the team",
    ],
  },
  {
    name: "UI/UX design",
    kind: "Design",
    type: "Redesign",
    time: "1–3 weeks",
    long: "Screens designed and agreed before any code is written, so the build has no guesswork.",
    items: [
      "User flows and wireframes",
      "High-fidelity screens in Figma",
      "Clickable prototype",
      "Developer-ready handoff",
    ],
  },
  {
    name: "Ongoing support",
    kind: "Retainer",
    type: "Something else",
    time: "Monthly",
    long: "Someone who already knows your system, on call for updates, fixes and small new features.",
    items: [
      "Updates and security patches",
      "Uptime and error monitoring",
      "Small changes each month",
      "Priority response",
    ],
  },
];

export const credits = [
  {
    role: "Business analyst & developer",
    org: "Tripzygo",
    note: "Websites, a travel CRM, an HRMS, n8n automations and client projects.",
  },
  {
    role: "Developer",
    org: "RankMonk",
    note: "Built the website, blog and the audit tool on my own.",
  },
  {
    role: "Freelance",
    org: "Independent clients",
    note: "CA firms, e-commerce brands and agencies.",
  },
];

export const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "n8n",
  "OpenAI / Groq",
  "WhatsApp API",
  "Google Sheets",
  "SQL",
  "Vercel",
  "Figma",
];

// Placeholder ranges — confirm before launch.
export const estimates = {
  Website: "₹15k–40k and 2–3 weeks for most business sites.",
  "SaaS / web app": "₹60k–2L+ and 6–10 weeks, shipped in weekly milestones.",
  "AI chatbot": "₹25k–60k and 2–4 weeks, including WhatsApp setup.",
  Automation: "₹20k–50k and 1–3 weeks per workflow.",
  "Dashboard / CRM": "₹40k–1L and 4–6 weeks.",
  Redesign: "₹15k–50k and 2–4 weeks, depending on page count.",
  "Something else": "We’ll work it out on a 30-minute call.",
};

export const briefTypes = Object.keys(estimates) as BriefType[];
export const budgets = ["Under ₹25k", "₹25k – 75k", "₹75k – 2L", "₹2L+"];
export const timelines = ["ASAP", "This month", "In 2–3 months", "Flexible"];
