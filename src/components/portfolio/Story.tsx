import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { year: "2019", title: "Curiosity", text: "First lines of CSS at a Delhi coffee shop. A quiet obsession begins with how software feels." },
  { year: "2021", title: "Craft", text: "Ships end-to-end products with two small startups. Learns the shape of a good decision." },
  { year: "2023", title: "Practice", text: "Falls hard for design systems, edge performance, and the joy of a codebase that reads like prose." },
  { year: "2026", title: "Studio", text: "Independent studio of one. Works with a small number of founders, once a season." },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-story-item]", {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={ref} className="relative rule-t py-20 md:py-28 wash-ochre">
      <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="rule-b mb-10 flex items-baseline justify-between pb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Section II</span>
          <span>The Story</span>
          <span>pp. 14 — 22</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <h2 className="col-span-12 font-serif text-5xl leading-[0.95] text-ink-deep md:col-span-7 md:text-7xl">
            A quiet <em className="italic" style={{ color: "var(--ochre)" }}>practice</em>, kept honest by shipping.
          </h2>
          <p className="col-span-12 self-end text-sm leading-relaxed text-ink md:col-span-4 md:col-start-9">
            <span className="mr-1 float-left font-serif text-6xl leading-[0.85] text-ink-deep">R</span>
            ishu writes software the way a printmaker pulls a proof — one careful pass at a time, with an
            eye on the register marks. This is a short account of how the studio came to be.
          </p>
        </div>

        <ol className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-4">
          <span className="pointer-events-none absolute left-0 right-0 top-4 hidden h-px bg-ink/15 md:block" aria-hidden />
          {CHAPTERS.map((c, i) => (
            <li key={c.year} data-story-item className="relative pt-10">
              <span
                className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-ink-deep bg-paper font-serif text-sm text-ink-deep"
                style={{ boxShadow: "0 0 0 4px var(--paper)" }}
              >
                {i + 1}
              </span>
              <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>Ch. {String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "var(--ochre)" }}>{c.year}</span>
              </div>
              <p className="mt-3 font-serif text-3xl italic text-ink-deep">{c.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}