import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  name: string;
  tag: string;
  headline: string;
  desc: string;
  role: string;
  duration: string;
  focus: string;
  bullets: string[];
  stack: string[];
  preview: ReactNode;
};

const PROJECTS: Project[] = [
  {
    id: "wandrly",
    name: "Wandrly",
    tag: "Travel planning platform",
    headline: "Your journey, perfectly planned.",
    desc: "A modern travel planning platform that helps users discover, plan and book unforgettable experiences.",
    role: "Full-Stack Engineer",
    duration: "10 weeks",
    focus: "UX, Performance, SEO",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    bullets: [
      "Built a fluid itinerary builder with drag & drop",
      "Integrated maps, places API and real-time pricing",
      "Optimised performance for speed and SEO",
      "Designed a clean, immersive booking experience",
    ],
    preview: (
      <div className="relative h-full w-full overflow-hidden rounded-lg" style={{ background: "linear-gradient(160deg, #0b3b5c 0%, #0a1d33 60%, #06111f 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 10%, oklch(0.9 0.05 240 / 0.35), transparent 55%)" }} />
        <div className="relative flex h-full flex-col p-5">
          <div className="mb-4 flex items-center justify-between text-xs text-white/90">
            <span className="font-mono">wandrly</span>
            <div className="flex gap-3 text-white/70"><span>Explore</span><span>Trips</span><span>Hotels</span><span>Guides</span></div>
            <span className="rounded border border-white/30 px-2 py-0.5">Sign in</span>
          </div>
          <div className="my-auto text-center">
            <p className="font-display text-3xl font-medium text-white">Your journey,<br/>perfectly planned.</p>
            <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full bg-white/95 p-1.5 text-xs text-slate-700">
              <span className="flex-1 px-3 py-1.5 text-left">📍 Where to?</span>
              <span className="px-3 py-1.5">📅 Add dates</span>
              <span className="px-3 py-1.5">👥 2 Guests</span>
              <span className="rounded-full bg-cyan-500 px-4 py-1.5 text-white">Search</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs text-white/80"><span>Popular destinations</span><span>View all</span></div>
            <div className="grid grid-cols-4 gap-2">
              {["#2563eb", "#f59e0b", "#10b981", "#ef4444"].map((c, i) => (
                <div key={i} className="aspect-video rounded" style={{ background: `linear-gradient(135deg, ${c}, #0b1e33)` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "devcompanion",
    name: "DevCompanion",
    tag: "AI developer assistant",
    headline: "Ship faster with your AI pair.",
    desc: "An AI-powered assistant that lives inside your editor and helps you write, refactor and review code.",
    role: "Founding Engineer",
    duration: "6 months",
    focus: "AI, DX, Realtime",
    stack: ["Next.js", "Node.js", "OpenAI", "Postgres", "tRPC"],
    bullets: [
      "Designed streaming, context-aware chat UI",
      "Built a plugin architecture for editors",
      "Optimised token usage with smart context windows",
      "Shipped analytics dashboard for teams",
    ],
    preview: (
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#0a0f1a] p-5 font-mono text-xs text-emerald-300">
        <div className="mb-3 flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400"/><span className="h-3 w-3 rounded-full bg-yellow-400"/><span className="h-3 w-3 rounded-full bg-emerald-400"/></div>
        <p>› devcompanion analyze --file hero.tsx</p>
        <p className="mt-2 text-cyan-300">✓ Detected 3 refactor opportunities</p>
        <p className="mt-1 text-white/70">1. Extract animation logic into a hook</p>
        <p className="text-white/70">2. Memoize hero scene props</p>
        <p className="text-white/70">3. Split content from presentation</p>
        <p className="mt-4 text-lime-300">→ Apply all suggestions? [Y/n]</p>
      </div>
    ),
  },
  {
    id: "nexa",
    name: "Nexa Commerce",
    tag: "Headless e-commerce",
    headline: "Storefronts, unbundled.",
    desc: "A headless e-commerce platform enabling brands to launch premium storefronts in days, not months.",
    role: "Frontend Lead",
    duration: "4 months",
    focus: "Design Systems, Perf",
    stack: ["Next.js", "Shopify", "GraphQL", "Tailwind"],
    bullets: [
      "Designed a themeable storefront kit",
      "Reached 98+ Lighthouse across templates",
      "Built PDP with 3D product views",
      "Reduced TTFB by 40% vs previous stack",
    ],
    preview: (
      <div className="relative h-full w-full overflow-hidden rounded-lg" style={{ background: "linear-gradient(135deg, #1e0b3b, #0a0620)" }}>
        <div className="p-5">
          <p className="font-display text-2xl text-white">NEXA / SS26</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="aspect-square rounded-lg" style={{ background: `linear-gradient(${i*40}deg, #a855f7, #1e0b3b)` }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "helpdesk",
    name: "Helpdesk System",
    tag: "Customer support platform",
    headline: "Support that feels human.",
    desc: "A modern, keyboard-first support tool that unifies tickets, chat and knowledge base for lean teams.",
    role: "Full-Stack Engineer",
    duration: "12 weeks",
    focus: "Realtime, Workflow",
    stack: ["React", "Node.js", "WebSockets", "Postgres"],
    bullets: [
      "Realtime multi-agent inbox",
      "SLA and routing engine",
      "Command palette-first UI",
      "AI reply suggestions",
    ],
    preview: (
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-900 p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-white/70"><span className="h-2 w-2 rounded-full bg-emerald-400"/> 24 open tickets</div>
        {[1,2,3,4].map((i) => (
          <div key={i} className="mb-2 flex items-center justify-between rounded border border-white/10 bg-white/5 p-3 text-xs">
            <div className="text-white">Ticket #{1200+i}</div>
            <div className="text-white/60">2m ago</div>
          </div>
        ))}
      </div>
    ),
  },
];

export function Projects() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const project = PROJECTS[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-project-preview]", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, [active]);

  return (
    <section id="projects" ref={ref} className="relative border-t border-border/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-xl">
          <p className="mb-4 font-mono text-xs tracking-widest text-brand-cyan">FEATURED PROJECTS</p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
            Products I've built<br />and shipped.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Project list */}
          <div className="flex flex-col gap-2">
            {PROJECTS.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${isActive ? "border-brand-cyan bg-brand-cyan/10 glow-cyan" : "border-border/60 bg-card/40 hover:border-border"}`}
                >
                  <span className={`h-12 w-16 shrink-0 rounded ${isActive ? "" : "opacity-70"}`} style={{ background: `linear-gradient(135deg, oklch(0.4 0.15 ${200 + i * 40}), oklch(0.2 0.05 250))` }} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{p.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{p.tag}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Case study */}
          <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <h3 className="font-display text-3xl font-medium">{project.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{project.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded border border-border/60 bg-secondary/60 px-2 py-1 font-mono text-[10px]">{s}</span>
                  ))}
                </div>
                <div className="mt-6 flex gap-4 text-sm">
                  <a className="text-brand-cyan hover:underline" href="#">Live site ↗</a>
                  <a className="text-brand-cyan hover:underline" href="#">Case study →</a>
                </div>
                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between border-b border-border/40 pb-2"><dt className="text-muted-foreground">Role</dt><dd>{project.role}</dd></div>
                  <div className="flex justify-between border-b border-border/40 pb-2"><dt className="text-muted-foreground">Duration</dt><dd>{project.duration}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Focus</dt><dd>{project.focus}</dd></div>
                </dl>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {project.bullets.map((b) => (
                    <li key={b} className="flex gap-2"><span className="text-brand-lime">✓</span>{b}</li>
                  ))}
                </ul>
              </div>
              <div data-project-preview className="relative min-h-[420px]">
                {project.preview}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
          <button onClick={() => setActive((a) => (a - 1 + PROJECTS.length) % PROJECTS.length)} className="hover:text-foreground">← Prev project</button>
          <div className="flex gap-2">
            {PROJECTS.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all ${i === active ? "w-8 bg-brand-cyan" : "w-4 bg-border"}`} />
            ))}
          </div>
          <button onClick={() => setActive((a) => (a + 1) % PROJECTS.length)} className="hover:text-foreground">Next project →</button>
        </div>
      </div>
    </section>
  );
}