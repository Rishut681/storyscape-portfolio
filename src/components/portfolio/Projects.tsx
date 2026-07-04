import { useEffect, useRef, useState } from "react";
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
  image: string;
  live?: string;
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    id: "taskrelay",
    name: "TaskRelay",
    tag: "Task management platform",
    headline: "Relay your work, effortlessly.",
    desc: "A collaborative task management platform that helps teams organise, track and hand off work with clarity and speed.",
    role: "Full-Stack Engineer",
    duration: "8 weeks",
    focus: "Collaboration, UX, Realtime",
    year: "2025",
    swatch: "#1e293b",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    bullets: [
      "Designed a fluid, keyboard-first task board",
      "Built realtime updates for team collaboration",
      "Implemented role-based access and workflow states",
      "Shipped a clean dashboard with progress insights",
    ],
    image: "https://res.cloudinary.com/nlvtbdsn/image/upload/v1783151329/TaskRelay_lfe6au.png",
    repo: "https://github.com/Rishut681/task_relay",
  },
  {
    id: "chatpati",
    name: "Chatpati.shop",
    tag: "E-commerce experience",
    headline: "A tastier way to shop.",
    desc: "A vibrant e-commerce storefront for a snack & lifestyle brand, blending playful visuals with a smooth buying experience.",
    role: "Frontend Engineer",
    duration: "6 weeks",
    focus: "Storefront, UI, Performance",
    year: "2025",
    swatch: "#7c2d12",
    stack: ["React", "Vite", "Tailwind CSS", "Node.js"],
    bullets: [
      "Crafted an expressive, brand-forward product UI",
      "Built cart, checkout and order flows end-to-end",
      "Optimised images and routes for fast page loads",
      "Designed a responsive layout across all devices",
    ],
    image: "https://res.cloudinary.com/nlvtbdsn/image/upload/v1783151331/Chatpati_o5ozhp.png",
    repo: "https://github.com/neha962/chatpati-style-hub",
  },
  {
    id: "puratanyatra",
    name: "Puratan Yatra",
    tag: "Heritage travel platform",
    headline: "Walk through history.",
    desc: "A digital companion for cultural heritage travel, guiding visitors through ancient sites, stories and curated itineraries.",
    role: "Full-Stack Engineer",
    duration: "8 weeks",
    focus: "Discovery, UX, Content",
    year: "2025",
    swatch: "#5d3a1a",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    bullets: [
      "Designed an immersive site and story explorer",
      "Built curated itineraries with interactive maps",
      "Created rich content pages for heritage spots",
      "Shipped a responsive, image-forward experience",
    ],
    image: "https://res.cloudinary.com/nlvtbdsn/image/upload/v1783151776/Screenshot_2026-07-04_132520_a0b9xd.png",
    repo: "https://github.com/Rishut681/Puratan_Yatra",
  },
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
    image: "https://res.cloudinary.com/nlvtbdsn/image/upload/v1783151285/wandrly_fmnkmv.png",
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
            <div
              className="relative overflow-hidden rounded-lg border border-ink/15 bg-paper shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
              style={{ backgroundColor: featured.swatch }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-ink/10 bg-paper-2 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
                <span className="ml-3 truncate rounded bg-paper px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {featured.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.app
                </span>
              </div>
              <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-paper p-2">
                <img
                  src={featured.image}
                  alt={`${featured.name} — ${featured.tag}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
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
              {featured.live && (
                <a href={featured.live} target="_blank" rel="noreferrer" className="ink-underline ink-underline-hover pb-0.5 text-sm uppercase tracking-[0.18em] text-ink-deep">
                  Visit live site ↗
                </a>
              )}
              {featured.repo && (
                <a href={featured.repo} target="_blank" rel="noreferrer" className="ink-underline ink-underline-hover pb-0.5 text-sm uppercase tracking-[0.18em] text-ink-deep">
                  View on GitHub →
                </a>
              )}
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
                  <div className="overflow-hidden rounded-md border border-ink/15 bg-paper shadow-[0_18px_40px_-24px_rgba(0,0,0,0.3)] transition-all group-hover:-translate-y-1 group-hover:shadow-[0_28px_50px_-24px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center gap-1.5 border-b border-ink/10 bg-paper-2 px-2 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-ink/25" />
                      <span className="h-2 w-2 rounded-full bg-ink/25" />
                      <span className="h-2 w-2 rounded-full bg-ink/25" />
                    </div>
                    <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-paper p-1.5">
                      <img
                        src={p.image}
                        alt={`${p.name} — ${p.tag}`}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
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