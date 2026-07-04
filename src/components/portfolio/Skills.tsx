import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  experience: string;
  desc: string;
  bars: { label: string; value: number }[];
};

const SKILLS: Skill[] = [
  { id: "react", name: "React", x: 22, y: 30, color: "cyan", experience: "5+ Years", desc: "Building complex, performant SPAs and design systems used by thousands.", bars: [{ label: "Depth", value: 95 }, { label: "Performance", value: 90 }, { label: "Architecture", value: 88 }] },
  { id: "next", name: "Next.js", x: 42, y: 15, color: "cyan", experience: "4+ Years", desc: "SSR, streaming, edge — modern React apps that ship fast and feel instant.", bars: [{ label: "SSR/SSG", value: 92 }, { label: "Edge", value: 85 }, { label: "SEO", value: 90 }] },
  { id: "ts", name: "TypeScript", x: 66, y: 22, color: "cyan", experience: "5+ Years", desc: "Type-safe end-to-end, from database schemas to component props.", bars: [{ label: "Generics", value: 90 }, { label: "Type Safety", value: 95 }] },
  { id: "tw", name: "Tailwind CSS", x: 82, y: 42, color: "cyan", experience: "4+ Years", desc: "Custom design systems built on Tailwind for velocity without compromise.", bars: [{ label: "Design Systems", value: 92 }] },
  { id: "node", name: "Node.js", x: 52, y: 50, color: "lime", experience: "4+ Years", desc: "Building scalable APIs and real-time systems with clean architecture and performance in mind.", bars: [{ label: "Experience", value: 88 }, { label: "Performance", value: 90 }, { label: "Scalability", value: 85 }, { label: "Developer Experience", value: 92 }] },
  { id: "three", name: "Three.js", x: 12, y: 62, color: "magenta", experience: "3+ Years", desc: "Immersive 3D experiences and WebGL scenes optimised for the web.", bars: [{ label: "WebGL", value: 82 }] },
  { id: "pg", name: "PostgreSQL", x: 32, y: 72, color: "cyan", experience: "5+ Years", desc: "Schema design, RLS, query performance and migrations at scale.", bars: [{ label: "SQL", value: 90 }] },
  { id: "docker", name: "Docker", x: 52, y: 82, color: "cyan", experience: "4+ Years", desc: "Reproducible dev and prod environments with multi-stage builds.", bars: [{ label: "DevOps", value: 80 }] },
  { id: "ai", name: "AI Integrations", x: 72, y: 72, color: "amber", experience: "2+ Years", desc: "Embedding LLMs, RAG pipelines and agent workflows into products.", bars: [{ label: "Prompting", value: 90 }, { label: "RAG", value: 85 }] },
  { id: "prisma", name: "Prisma", x: 88, y: 60, color: "cyan", experience: "3+ Years", desc: "Type-safe ORM for productive full-stack development.", bars: [{ label: "Schema", value: 88 }] },
  { id: "vercel", name: "Vercel", x: 24, y: 50, color: "cyan", experience: "4+ Years", desc: "Edge deploys, ISR and preview environments as a core workflow.", bars: [{ label: "Deploys", value: 90 }] },
];

// Node connections: sparse graph like the reference
const EDGES: [string, string][] = [
  ["react", "next"], ["next", "ts"], ["ts", "tw"], ["react", "node"], ["next", "node"],
  ["node", "pg"], ["node", "prisma"], ["prisma", "pg"], ["react", "three"], ["node", "ai"],
  ["node", "docker"], ["react", "vercel"], ["next", "vercel"], ["ts", "node"], ["tw", "node"],
];

function colorToken(c: string) {
  return {
    cyan: "oklch(0.82 0.15 215)",
    lime: "oklch(0.9 0.19 130)",
    amber: "oklch(0.78 0.17 55)",
    magenta: "oklch(0.7 0.22 340)",
  }[c] || "oklch(0.82 0.15 215)";
}

export function Skills() {
  const [selected, setSelected] = useState<Skill>(SKILLS.find((s) => s.id === "node")!);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-skill-node]", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.05,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from("[data-skill-edge]", {
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={ref} className="relative border-t border-border/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-xl">
          <p className="mb-4 font-mono text-xs tracking-widest text-brand-cyan">SKILLS</p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
            A modern stack.
            <br />
            Used with <span className="text-brand-cyan">intention</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Skill graph */}
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl border border-border/60 bg-card/30 backdrop-blur">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {EDGES.map(([a, b]) => {
                const sa = SKILLS.find((s) => s.id === a)!;
                const sb = SKILLS.find((s) => s.id === b)!;
                const isActive = selected.id === a || selected.id === b;
                return (
                  <line
                    key={`${a}-${b}`}
                    data-skill-edge
                    x1={sa.x}
                    y1={sa.y}
                    x2={sb.x}
                    y2={sb.y}
                    stroke={isActive ? "oklch(0.82 0.15 215)" : "oklch(1 0 0 / 0.14)"}
                    strokeWidth={isActive ? 0.25 : 0.12}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
            {SKILLS.map((s) => {
              const isActive = selected.id === s.id;
              return (
                <button
                  key={s.id}
                  data-skill-node
                  onClick={() => setSelected(s)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  <span
                    className="relative flex flex-col items-center gap-2"
                    style={{ color: colorToken(s.color) }}
                  >
                    <span
                      className="relative grid h-14 w-14 place-items-center rounded-xl border transition-all group-hover:scale-110"
                      style={{
                        borderColor: isActive ? colorToken(s.color) : "oklch(0.28 0.03 250)",
                        background: isActive ? `color-mix(in oklab, ${colorToken(s.color)} 15%, transparent)` : "oklch(0.17 0.025 250)",
                        boxShadow: isActive ? `0 0 30px ${colorToken(s.color)}55` : "none",
                        clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
                      }}
                    >
                      <span className="font-mono text-xs font-semibold">{s.name.slice(0, 2)}</span>
                    </span>
                    <span className={`font-mono text-[10px] transition-opacity ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skill detail panel */}
          <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-2xl font-medium" style={{ color: colorToken(selected.color) }}>
                {selected.name}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">{selected.experience}</span>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">{selected.desc}</p>
            <div className="space-y-4">
              {selected.bars.map((b) => (
                <div key={b.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{b.label}</span>
                    <span className="font-mono text-foreground">{b.value >= 88 ? "High" : b.value >= 75 ? "Strong" : "Solid"}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${b.value}%`, background: `linear-gradient(90deg, ${colorToken(selected.color)}, oklch(0.9 0.19 130))` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}