import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Discipline = {
  no: string;
  title: string;
  meta: string;
  body: string;
  tools: string[];
};

const DISCIPLINES: Discipline[] = [
  {
    no: "01",
    title: "Product Design",
    meta: "Discovery · Systems · Interaction",
    body: "Small-team product design: turning a founder's fuzzy pitch into a spare, opinionated interface. Component libraries designed to age well.",
    tools: ["Figma", "Design tokens", "Motion", "Accessibility"],
  },
  {
    no: "02",
    title: "Frontend Engineering",
    meta: "React · TypeScript · Performance",
    body: "SSR, streaming and edge-first React. Modern architectures without the churn. Ninety-plus Lighthouse as a baseline, not a milestone.",
    tools: ["React", "Next.js", "TanStack", "Tailwind"],
  },
  {
    no: "03",
    title: "Full-Stack Delivery",
    meta: "Node · Postgres · Infra",
    body: "APIs, database schemas, background jobs, deploys. End-to-end ownership so nothing gets stuck in a handoff between two people who don't exist.",
    tools: ["Node", "Postgres", "Prisma", "tRPC", "Docker"],
  },
  {
    no: "04",
    title: "AI Integration",
    meta: "LLMs · RAG · Agents",
    body: "Bringing language models into products in ways that feel honest — carefully scoped, measured, and unafraid to say 'I don't know'.",
    tools: ["OpenAI", "Embeddings", "Vector DBs", "Evals"],
  },
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-skill-card]", {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={ref} className="relative rule-t overflow-hidden bg-paper py-20 text-ink-deep md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--ochre), transparent)" }}
        aria-hidden
      />
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-10 flex items-baseline justify-between border-b border-ink/10 pb-3 text-[11px] uppercase tracking-[0.22em] text-ink/55">
          <span>Section III</span>
          <span>The Craft</span>
          <span>Four disciplines</span>
        </div>

        <div className="relative grid grid-cols-12 gap-x-6 gap-y-10">
          <h2 className="col-span-12 font-serif text-5xl leading-[0.95] text-ink-deep md:col-span-7 md:text-7xl">
            Four disciplines,<br />
            <em className="italic" style={{ color: "var(--ochre)" }}>one hand</em> on the pen.
          </h2>
          <p className="col-span-12 self-end border-l border-ink/10 pl-5 text-sm leading-relaxed text-ink/70 md:col-span-4 md:col-start-9">
            The studio is a T-shape — deep in a handful of tools, wide enough that a project rarely
            needs three more people to move.
          </p>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {DISCIPLINES.map((d) => (
            <article
              key={d.no}
              data-skill-card
              className="group relative overflow-hidden border border-ink/10 bg-card/85 p-6 shadow-[0_24px_80px_oklch(0.1_0_0/0.08)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[color:var(--ochre)] hover:bg-card md:p-8"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
                style={{ background: "linear-gradient(90deg, var(--ochre), transparent)" }}
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -right-4 -top-10 font-serif text-[9rem] leading-none opacity-15 transition-opacity group-hover:opacity-35"
                style={{ color: "var(--ochre)" }}
                aria-hidden
              >
                {d.no}
              </span>
              <div className="relative flex items-baseline justify-between">
                <span className="font-serif text-xl italic text-ink/45">№ {d.no}</span>
                <span className="text-right text-[11px] uppercase tracking-[0.22em] text-ink/50">
                  {d.meta}
                </span>
              </div>
              <h3 className="relative mt-4 font-serif text-4xl leading-tight text-ink-deep md:text-5xl">
                {d.title}
              </h3>
              <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-ink/70">{d.body}</p>
              <ul className="relative mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/10 pt-4 text-[11px] uppercase tracking-[0.2em] text-ink/55">
                {d.tools.map((t) => (
                  <li key={t} className="before:mr-3 before:content-['·']">{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}