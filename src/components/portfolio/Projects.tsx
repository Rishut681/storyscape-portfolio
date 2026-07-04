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
  stack: string[];
  year: string;
  swatch: string;
  bullets: string[];
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
    year: "2025",
    swatch: "#0c2340",
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
    year: "2024",
    swatch: "#0a0f1a",
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
    year: "2024",
    swatch: "#1e0b3b",
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
    year: "2023",
    swatch: "#0f172a",
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
  const featured = PROJECTS[active];
  const rest = PROJECTS.filter((_, i) => i !== active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-project-feature]", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, [active]);

  return (
    <section id="projects" ref={ref} className="rule-t py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="rule-b mb-10 flex items-baseline justify-between pb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Section IV</span>
          <span>The Case Files</span>
          <span>{PROJECTS.length} works</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <h2 className="col-span-12 font-serif text-5xl leading-[0.95] text-ink-deep md:col-span-8 md:text-7xl">
            Work, <em className="italic">as documented</em>.
          </h2>
          <p className="col-span-12 self-end text-sm leading-relaxed text-ink md:col-span-4">
            A short shelf of recent projects. Click a case to swap the feature.
          </p>
        </div>

        {/* Featured piece — magazine 12-col */}
        <div key={featured.id} data-project-feature className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <div className="aspect-[4/3] w-full overflow-hidden bg-ink-deep">
              {featured.preview}
            </div>
            <div className="mt-3 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>Fig. {String(active + 1).padStart(2, "0")}</span>
              <span>{featured.tag} — {featured.year}</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Featured case · {featured.year}
            </p>
            <h3 className="mt-2 font-serif text-5xl leading-[0.95] text-ink-deep md:text-6xl">
              {featured.name}
            </h3>
            <p className="mt-2 font-serif text-2xl italic text-ink">{featured.headline}</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink">{featured.desc}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 rule-t pt-4 text-xs">
              <div><dt className="uppercase tracking-[0.18em] text-muted-foreground">Role</dt><dd className="mt-1 font-serif text-lg text-ink-deep">{featured.role}</dd></div>
              <div><dt className="uppercase tracking-[0.18em] text-muted-foreground">Time</dt><dd className="mt-1 font-serif text-lg text-ink-deep">{featured.duration}</dd></div>
              <div><dt className="uppercase tracking-[0.18em] text-muted-foreground">Focus</dt><dd className="mt-1 font-serif text-lg text-ink-deep">{featured.focus}</dd></div>
            </dl>

            <ul className="mt-6 space-y-2 text-sm text-ink">
              {featured.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-px w-4 shrink-0 bg-ink-deep" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {featured.stack.map((s) => (
                <span key={s} className="before:mr-3 before:content-['·']">{s}</span>
              ))}
            </div>

            <div className="mt-8 flex gap-6">
              <a href="#" className="ink-underline ink-underline-hover pb-0.5 text-sm uppercase tracking-[0.18em] text-ink-deep">
                Visit live site ↗
              </a>
              <a href="#" className="ink-underline ink-underline-hover pb-0.5 text-sm uppercase tracking-[0.18em] text-ink-deep">
                Read the case →
              </a>
            </div>
          </div>
        </div>

        {/* Supporting grid */}
        <div className="mt-20 rule-t pt-6">
          <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Also on the shelf
          </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
            {rest.map((p) => {
              const idx = PROJECTS.findIndex((x) => x.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(idx)}
                  className="group text-left"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-paper-2 transition-transform group-hover:-translate-y-1">
                    <div className="h-full w-full" style={{ background: `linear-gradient(135deg, ${p.swatch}, #0d0d0d)` }} />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    <span>№ {String(idx + 1).padStart(2, "0")}</span>
                    <span>{p.year}</span>
                  </div>
                  <h4 className="mt-2 font-serif text-2xl text-ink-deep group-hover:italic md:text-3xl">
                    {p.name}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}