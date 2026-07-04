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
    <section id="story" ref={ref} className="rule-t py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="rule-b mb-10 flex items-baseline justify-between pb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Section II</span>
          <span>The Story</span>
          <span>pp. 14 — 22</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <h2 className="col-span-12 font-serif text-5xl leading-[0.95] text-ink-deep md:col-span-7 md:text-7xl">
            A quiet <em className="italic">practice</em>, kept honest by shipping.
          </h2>
          <p className="col-span-12 self-end text-sm leading-relaxed text-ink md:col-span-4 md:col-start-9">
            <span className="mr-1 float-left font-serif text-6xl leading-[0.85] text-ink-deep">R</span>
            ishu writes software the way a printmaker pulls a proof — one careful pass at a time, with an
            eye on the register marks. This is a short account of how the studio came to be.
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
          {CHAPTERS.map((c, i) => (
            <li key={c.year} data-story-item className="rule-t pt-4">
              <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>Ch. {String(i + 1).padStart(2, "0")}</span>
                <span>{c.year}</span>
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