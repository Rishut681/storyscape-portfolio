// Blog posts. Body is a small Markdown subset rendered by components/blog/Markdown.tsx:
// ## / ### headings, paragraphs, - and 1. lists, > quotes, | tables |, **bold**, *italic*, `code`, [links](/path).

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  tldr: string[];
  body: string;
};

const posts: Post[] = [
  {
    slug: "one-page-project-brief",
    title: "Before you hire a developer, write this one-page brief",
    description:
      "A one-page project brief template for business owners: the six questions that decide scope, cost and timeline before a single line of code is written.",
    date: "2026-10-23",
    tags: ["Process", "Hiring a developer"],
    tldr: [
      "Most project overruns start with a brief that describes features instead of the problem.",
      "Six questions fit on one page: the problem, who feels it, how it’s handled today, what “done” looks like, constraints, and budget.",
      "A good brief lets a developer give you a fixed scope and price instead of a guess.",
    ],
    body: `
Almost every project that runs late or over budget has the same origin story: the brief was a list of features. “We need a dashboard, a login, WhatsApp integration and reports.” It sounds specific, but it says nothing about the problem — so the developer guesses, quotes for the guess, and builds the guess.

I start every project with a one-page brief. It takes about an hour to write, and it is the single cheapest way to protect your budget. Here is the template, with the reasoning behind each question.

## 1. What problem are we solving?

Write it as a sentence about the business, not the software. “Our sales team loses track of follow-ups after the first call” is a problem. “We need a CRM” is a solution someone has already chosen.

If you can, attach a number: hours lost per week, leads that go cold, invoices that go out late. A number turns “nice to have” into a decision you can measure later.

## 2. Who feels it, and how often?

List the people who will use the thing — by role, not by name — and how often they hit the problem. A tool used by three people once a month is a very different project from one used by forty people every hour.

This is also where you find the real requirements. The person who chases documents every morning knows exactly which step is painful; the person signing the cheque often doesn’t.

## 3. How is it handled today?

Describe the current workflow, including the messy parts: the shared spreadsheet, the WhatsApp group, the copy-paste between two systems. **Screenshots are gold here.**

The current process tells a developer what data already exists, what must keep working on day one, and — very often — that half the problem can be solved with automation instead of new software.

## 4. What does “done” look like?

Pick one or two outcomes you can check after launch:

- “Every client gets a filing reminder seven days before the deadline, without anyone sending it manually.”
- “A new lead from the website is in the sheet and has a WhatsApp reply within five minutes.”
- “Month-end attendance reconciliation takes an hour instead of two days.”

These become the acceptance test. If the outcome happens, the project worked — regardless of how many features it has.

## 5. Constraints

The things that are not negotiable:

- **Deadline** — and why. A trade show date is real; “ASAP” usually isn’t.
- **Systems it must connect to** — Tally, Google Sheets, a payment gateway, an existing website.
- **Who maintains it** after launch, and how technical they are.
- **Data rules** — client documents, payment data, or anything regulated.

## 6. Budget range

Give a range, even a wide one. It is not a negotiation tactic; it tells the developer which version of the solution to propose. The same problem can often be solved with a ₹20k automation or a ₹2L custom app, and only the budget tells me which one you actually want.

## What happens next

With these six answers, a developer can come back with something useful: a fixed scope, a set of user flows, a timeline in weekly milestones, and a price. Without them, every quote you receive is a guess dressed up as a number — and you can’t compare guesses.

> The brief isn’t paperwork. It’s the first, cheapest version of the product.

If you want to try it, the [brief form on my home page](/#contact) asks the short version of these questions — it takes two minutes, and I reply within a day. For a sense of how I run projects after the brief, see [how I work](/#method).
`,
  },
  {
    slug: "n8n-vs-zapier-vs-make",
    title: "n8n vs Zapier vs Make: how I choose for a small business",
    description:
      "A practical comparison of n8n, Zapier and Make for small-business automation — cost at volume, data control, AI steps, and when each one is the right call.",
    date: "2026-10-18",
    tags: ["Automation", "n8n"],
    tldr: [
      "Zapier is fastest to start and best when the team will maintain workflows themselves.",
      "Make is a strong middle ground for visual, branching workflows at moderate volume.",
      "n8n wins when volume is high, data must stay on your own server, or workflows need real logic and AI steps.",
    ],
    body: `
Clients often ask which automation tool they should use, usually after someone on their team has already built three Zaps and hit a pricing wall. There is no single right answer, but there is a reliable way to decide. These are the questions I ask, in order.

## The short version

| | Zapier | Make | n8n |
|---|---|---|---|
| Best for | Simple, linear workflows the team edits themselves | Visual, branching workflows | High-volume, logic-heavy or private workflows |
| Learning curve | Lowest | Medium | Medium–high |
| Pricing model | Per task | Per operation (credits) | Per workflow execution (cloud), or self-host |
| Self-hosting | No | No | Yes |
| Custom code | Limited | Limited | JavaScript/Python nodes, full HTTP control |

Pricing models change, so check each vendor’s current page — but the *shape* of the pricing is what matters.

## Question 1: Who will maintain it?

If the person maintaining the workflows is an operations manager who wants to tweak a step on a Friday afternoon, **Zapier** is hard to beat. The interface is the most forgiving, the app directory is the largest, and almost every SaaS tool has an official integration.

If I will maintain it, or the client has someone technical in-house, the other two open up.

## Question 2: How many runs per month?

This is where most small businesses get surprised. Zapier bills per *task* — roughly each action step that runs. A workflow with six steps that fires 2,000 times a month is 12,000 tasks. Make bills per operation (now counted in credits) in a similar way.

**n8n counts a whole workflow run as one execution** on its cloud plans, and costs nothing per run when self-hosted on a small server. For a CA firm sending reminders, syncing documents and replying on WhatsApp all day, that difference is often the entire business case.

## Question 3: Where does the data have to live?

Client documents, PAN and GST numbers, salary data, medical records — some data you simply don’t want passing through a third-party automation cloud. Self-hosted n8n runs on your own server (or a server in your own cloud account), so the data stays where you control it.

Neither Zapier nor Make can be self-hosted.

## Question 4: How much logic is involved?

Real business workflows are rarely “when X, do Y.” They are “when a document arrives, figure out which client it belongs to, check whether it’s the one we asked for, update the tracker, and if it’s the last missing document, notify the partner.”

- **Make** handles branching visually and well.
- **n8n** handles it visually *and* lets you drop into a code node when visual logic gets awkward, call any API directly, and build sub-workflows you can reuse.
- **Zapier** can do branching with Paths, but complex logic gets expensive and hard to read.

## Question 5: Are there AI steps?

All three can call an LLM now. The difference is control. In n8n I can run an AI agent node with tools, keep conversation memory, choose the model provider (OpenAI, Groq, a local model), and log every prompt and response for review. For WhatsApp assistants and document classification, that control matters. I wrote more about this in [WhatsApp AI chatbots that answer from your own documents](/blog/whatsapp-ai-chatbot-guide).

## My default

- **Under ~10 simple workflows, team-maintained:** Zapier.
- **Visual workflows with moderate volume:** Make.
- **High volume, private data, real logic or AI:** self-hosted n8n — with documentation and error alerts so you’re never dependent on one person to know what’s running.

The tool matters less than the mapping work before it. Most automation projects I take on start by drawing the current process with the people who do it, and finding that two of the five steps don’t need to exist at all. You can see one of those projects in [the CA firm case study](/blog/ca-firm-automation-case-study), or [tell me about your workflow](/#contact).
`,
  },
  {
    slug: "ca-firm-automation-case-study",
    title: "Case study: taking the chasing out of a CA firm with n8n and WhatsApp",
    description:
      "How n8n, WhatsApp and a small dashboard took replies, document collection and filing reminders off a CA firm’s staff — roughly 15 hours a week.",
    date: "2026-10-13",
    tags: ["Case study", "Automation", "n8n"],
    tldr: [
      "The firm’s staff spent most of their time chasing: replies, documents and deadline reminders.",
      "n8n now handles WhatsApp and email replies, document collection and reminders; one dashboard shows clients, deadlines, leads and invoices.",
      "Result: roughly 15 staff hours a week back, with each firm seeing only its own data.",
    ],
    body: `
Chartered accountancy firms run on deadlines, and most of the work around a deadline isn’t accounting. It’s chasing — asking clients for documents, reminding them about due dates, answering the same five questions on WhatsApp, and updating a spreadsheet so the partner knows where things stand.

This is how I took most of that chasing off a firm’s staff with [Practice Desk](/#work), built on n8n, WhatsApp and a small Next.js dashboard.

## The problem

Before writing anything, I spent time with the people doing the work. The pattern was the same every filing season:

- Client questions arrived on WhatsApp and email, mostly repeats: “What documents do you need?”, “What’s my due date?”, “Did you receive my file?”
- Document collection was a manual loop: ask, wait, check, ask again.
- Reminders were sent by hand from a spreadsheet, so they were late when the office was busiest — exactly when they mattered most.
- The partner had no single view of which clients were blocked and why.

None of this needed a big new system. It needed the repetitive parts to run on their own, and one place to see the rest.

## What I built

### Replies on WhatsApp and email

An n8n workflow receives incoming messages, classifies them with a small LLM call (Groq, for speed), and answers the routine ones from the firm’s own information: document checklists, due dates per client, office hours. Anything that isn’t routine — fees, advice, complaints — goes straight to a person with the context attached.

### Document collection

Each client has a checklist per filing. When a document arrives on WhatsApp or email, the workflow matches it to the client, files it, ticks the checklist, and if something is still missing, asks for exactly that item. Staff stop doing the “did we get it yet?” loop.

### Filing reminders

Reminders go out on a schedule before each deadline, and stop automatically once the documents are in. Nobody has to remember to send them, and nobody gets reminded about something they’ve already sent.

### One dashboard

A Next.js dashboard shows clients, upcoming deadlines, leads and invoices in one place. Google Sheets stays as the data layer the staff already understand, so there was no migration and no retraining on a new database. Each firm sees only its own data.

## The result

Roughly **15 hours a week** of replies, reminders and document chasing came off the staff. Just as important, reminders now go out on time during the busiest weeks — the period when the manual process used to break down.

## What made it work

- **Starting from the workflow, not the tool.** Mapping the process with the staff showed that the expensive part was chasing, not filing.
- **Keeping humans on the judgment calls.** The automation answers routine questions and hands off everything else with context. Clients still talk to their accountant about anything that matters.
- **Using what the team already trusted.** Google Sheets as the data layer meant adoption on day one.
- **Error alerts from the start.** If a workflow fails, someone knows within minutes instead of discovering it at the deadline.

## Could this work for your firm?

If your team spends more time asking for things than doing the work, the same pattern applies — accountants, clinics, agencies, property managers. Read [how I choose between n8n, Zapier and Make](/blog/n8n-vs-zapier-vs-make), or [send me a brief](/#contact) describing your current process.
`,
  },
  {
    slug: "ai-search-visibility-guide",
    title: "Will ChatGPT recommend your business? A practical guide to AI search visibility",
    description:
      "How AI assistants like ChatGPT, Gemini and Perplexity decide which businesses to recommend, and the concrete website and listing changes that improve your chances.",
    date: "2026-10-08",
    tags: ["SEO", "AI search", "GEO"],
    tldr: [
      "AI assistants recommend businesses they can find, understand and verify across several sources.",
      "Clear, specific pages, consistent business details everywhere, structured data and genuine reviews matter most.",
      "Check it like a customer would: ask the assistants directly, and track the answers over time.",
    ],
    body: `
More customers now ask an AI assistant before they ask Google: “Who’s a good CA in Gurgaon for a small business?” or “Best tool to track Google Maps rankings?” The answer they get is a short list, not ten blue links — and if you’re not on it, you don’t exist for that customer.

This is often called **generative engine optimisation (GEO)** or AI search visibility. I work on it for [RankMonk](https://rankmonk.io/), which checks whether ChatGPT and Gemini recommend a business. Here is what actually moves the needle.

## How assistants decide

Assistants with web access do roughly three things: search the web for candidates, read the pages they find, and cross-check what those pages say against other sources. Businesses get recommended when they are:

1. **Findable** — they show up in the searches the assistant runs.
2. **Understandable** — their pages say plainly what they do, for whom and where.
3. **Corroborated** — other sources (listings, reviews, directories, articles) say the same thing.

Nothing here is a trick. It’s the same work as good SEO, with more weight on clarity and consistency.

## 1. Say exactly what you do, in plain sentences

Assistants quote and summarise text. Pages that open with a vague slogan give them nothing to quote. Pages that open with “We are a chartered accountancy firm in Gurgaon handling GST, income tax and audits for small businesses and startups” give them a ready-made answer.

- Put a one-paragraph summary of who you are at the top of your home page and each service page.
- Use one page per service, with the service name in the heading.
- Answer the questions customers actually ask, in the words they use.

## 2. Make your business details identical everywhere

Name, address, phone number, website, categories and opening hours should match across your website, Google Business Profile, Justdial, LinkedIn, industry directories and anywhere else you’re listed. Inconsistent details make it harder for an assistant to be confident that all those mentions are the same business.

## 3. Add structured data

Schema.org markup (JSON-LD) labels your page content for machines: \`Organization\` or \`LocalBusiness\` with your address and contact details, \`Service\` for what you offer, \`FAQPage\` only where you have a real FAQ, and \`Article\` for blog posts. It doesn’t guarantee anything, but it removes ambiguity.

## 4. Earn reviews and mentions that say something

A review that says “Great service!” helps less than one that says “They sorted our GST notices and set up monthly filing reminders.” Specific reviews and mentions on other sites give assistants the evidence they need to recommend you for specific queries. Ask happy clients to mention what you actually did for them.

## 5. Keep your site fast and crawlable

Assistants’ crawlers are less patient than browsers. Make sure:

- Your important text is in the HTML, not only rendered by JavaScript after load.
- \`robots.txt\` doesn’t block the AI crawlers you want to be found by (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
- You have an up-to-date \`sitemap.xml\`.
- Optionally, an \`llms.txt\` file that summarises your site for language models — cheap to add, and increasingly read.

## 6. Measure it like a customer would

Every month, ask ChatGPT, Gemini and Perplexity the five questions your customers would ask, from the city your customers are in. Record whether you appear, where, and what’s said about you. Tools like RankMonk automate this, but a spreadsheet works to start.

## What not to do

- Don’t stuff pages with keywords or city names. Assistants summarise; spam reads as spam.
- Don’t add FAQ or review schema for content that isn’t on the page.
- Don’t publish dozens of thin AI-written pages. One clear, specific page beats twenty generic ones.

AI visibility is mostly the reward for being clear, consistent and genuinely recommended. If you want help auditing your site and listings, [send me a brief](/#contact) — it’s the same work I did for [RankMonk’s audit tool](/#work).
`,
  },
  {
    slug: "whatsapp-ai-chatbot-guide",
    title: "WhatsApp AI chatbots that answer from your own documents (and know when to hand off)",
    description:
      "How to build a WhatsApp AI assistant for a business that answers from your own content, captures leads and hands off to a person — without making things up.",
    date: "2026-10-03",
    tags: ["AI", "WhatsApp", "Chatbots"],
    tldr: [
      "A useful business chatbot answers only from your own content, and says so when it doesn’t know.",
      "The hand-off to a human is a feature, not a failure — design it first.",
      "Start with your 20 most common questions, log every conversation, and improve weekly.",
    ],
    body: `
For most businesses in India, WhatsApp *is* the customer service channel. That makes it the obvious place for an AI assistant — and also the most embarrassing place for one to get things wrong. A chatbot that invents a price or a policy in your company’s name is worse than no chatbot at all.

Here is how I build WhatsApp assistants that are actually useful.

## Start with what customers ask

Before any AI, export a month of WhatsApp chats (or ask the team) and list the questions that come up most. In almost every business, around 20 questions make up the bulk of messages: prices, timings, location, availability, documents needed, order status.

That list becomes the scope. Anything outside it is handed to a person.

## Answer only from your own content

The assistant shouldn’t answer from the model’s general knowledge. It should answer from **your** content: FAQs, price lists, policies, product catalogues, service descriptions. This pattern is called retrieval-augmented generation (RAG):

1. Your documents are split into small passages and indexed.
2. When a question arrives, the most relevant passages are retrieved.
3. The model is instructed to answer **only** from those passages, and to say it doesn’t know otherwise.

This is what stops the bot from making things up. It also means updating the bot is as simple as updating the document.

## Design the hand-off first

The most important feature of a business chatbot is knowing when to stop. I design hand-off rules before anything else:

- The customer asks for a person.
- The question is outside the known scope, or retrieval finds nothing relevant.
- The topic is sensitive: complaints, refunds, medical or legal advice, negotiation.
- The customer is a qualified lead ready to buy.

On hand-off, the assistant tells the customer someone will reply, and sends the team the conversation with a one-line summary — on WhatsApp, email or a dashboard.

## Capture leads properly

Every conversation is a potential lead. The assistant can ask one or two qualifying questions naturally (“Is this for your business or personal use?”) and write the answers to a Google Sheet or CRM. No more scrolling back through chats to find who asked about pricing last week.

## The stack I typically use

- **WhatsApp Business Platform** (Cloud API) through Meta or a provider — required for automated replies on a business number.
- **n8n** to orchestrate: receive messages, retrieve content, call the model, apply hand-off rules, log everything.
- **An LLM** chosen for the job — fast, inexpensive models for routine replies; stronger models only where needed.
- **Google Sheets or a database** for leads and conversation logs.

## Log everything, improve weekly

Every conversation is logged with the question, the retrieved passages and the answer. Once a week, read the logs: which questions got handed off, which answers were weak, what new questions appeared. Then update the content. A chatbot that’s reviewed weekly for the first two months gets dramatically better; one that’s launched and forgotten slowly gets worse.

## Respect the platform rules

WhatsApp has rules about business-initiated messages (templates), opt-in, and message windows. Build around them from the start — a ban on your business number is far more expensive than doing it properly.

## Is it worth it?

If your team answers the same questions on WhatsApp all day, almost certainly. The goal isn’t replacing people; it’s giving them back the hours spent on repeat questions so they can handle the conversations that need a human.

See how this fits into a bigger workflow in [the CA firm case study](/blog/ca-firm-automation-case-study), or [tell me what your customers ask most](/#contact).
`,
  },
  {
    slug: "website-vs-web-app-vs-saas",
    title: "Website, web app or SaaS? How to tell which one your business needs",
    description:
      "The difference between a website, a web app and a SaaS product, explained for business owners — with the questions that tell you which one to build first.",
    date: "2026-09-29",
    tags: ["Strategy", "Websites", "SaaS"],
    tldr: [
      "A website explains and converts; a web app does work for logged-in users; SaaS is a web app you sell to many customers.",
      "Each step up adds accounts, data and maintenance — and multiplies cost and timeline.",
      "Build the smallest thing that proves the idea. Often that’s a website plus an automation, not an app.",
    ],
    body: `
“We need an app” is one of the most expensive sentences in small-business software. Sometimes it’s true. Often what the business needs is a good website and one automation — at a fraction of the cost and time. Here’s how to tell the difference.

## The three, in one line each

- **Website:** pages that explain what you do and get people to contact or buy. Visitors don’t log in.
- **Web app:** software people log into to get work done — a dashboard, a CRM, an HR system, a booking tool.
- **SaaS:** a web app sold as a subscription to *many* customers, each with their own private data.

Each step adds accounts, permissions, a database, more screens and ongoing maintenance — which is why timelines go from weeks to months.

## When a website is enough

You need a website when the job is to **explain and convert**: tell people what you do, show proof, and make it easy to get in touch or buy. That covers most service businesses, clinics, consultants, agencies and local shops.

A good business website today includes:

- Clear pages for each service, written in your customers’ words.
- Fast load times on a phone — that’s where most of your visitors are.
- A contact form that sends leads somewhere useful (a sheet, a CRM, WhatsApp), not just an inbox.
- Analytics, basic SEO and structured data so you can be found — including by AI assistants ([more on that here](/blog/ai-search-visibility-guide)).

Typical timeline: **2–3 weeks**.

## When you need a web app

You need a web app when people have to **log in and do work**: track attendance, manage leads, approve leave, view reports. Signs you’re there:

- Your team runs a core process from spreadsheets that keep breaking or conflicting.
- Different people need to see different data (roles and permissions).
- You need history, audit trails or reports that spreadsheets can’t give you reliably.

A good example is [Tripzygo People](/#work), an in-house HR system that replaced attendance sheets, leave emails and month-end reconciliation. Typical timeline: **4–10 weeks**, depending on scope.

## When it’s SaaS

It’s SaaS when you plan to **sell** the web app to other businesses. On top of a web app, you need multi-tenant data separation, self-serve signup, billing, onboarding, support tooling and a marketing site. [RankMonk](https://rankmonk.io/) is a SaaS: many businesses, one product, each seeing only its own data.

Build SaaS when you’ve validated that customers will pay — ideally because you’ve already solved the problem manually or for one client first.

## The question that decides it

Ask: **“What is the smallest thing that would prove this works?”**

- If you want more enquiries, the smallest thing is a better website.
- If a team process is broken, it might be an automation on top of your existing tools — no app at all.
- If the automation proves the value, *then* a web app makes sense.
- If other businesses keep asking for your web app, *then* it might be SaaS.

Skipping steps is how businesses end up paying for software nobody uses.

## Not sure which one you need?

That’s what the first week of every project is for: I look at how your business works today and recommend the smallest thing that fixes it — then quote a fixed scope. See [what I build](/#services), or [send a brief](/#contact) and I’ll tell you honestly which of the three it is.
`,
  },
];

export const allPosts = posts.sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => allPosts.find((p) => p.slug === slug);

export const readMins = (p: Post) => Math.max(1, Math.round(p.body.split(/\s+/).length / 230));

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
