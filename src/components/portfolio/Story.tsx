import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: "2019", text: "Started my journey with a curiosity for interfaces and the web." },
  { year: "2021", text: "Began building products end-to-end. Ship, learn, repeat.", active: true },
  { year: "2023", text: "Fell in love with product systems, performance and developer experience." },
  { year: "Today", text: "I help founders turn ideas into premium digital products that scale." },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-story-item]", {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={ref} className="relative border-t border-border/40 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1fr_1.2fr_1fr]">
        <div>
          <p className="mb-4 font-mono text-xs tracking-widest text-brand-cyan">MY STORY</p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
            Building at the intersection of{" "}
            <span className="text-brand-cyan">design</span>,{" "}
            <span className="text-brand-amber">code</span> and{" "}
            <span className="text-brand-magenta">impact</span>.
          </h2>
        </div>

        <ol className="relative space-y-8 border-l border-border/60 pl-8">
          {MILESTONES.map((m) => (
            <li key={m.year} data-story-item className="relative">
              <span
                className={`absolute -left-[41px] top-1 grid h-4 w-4 place-items-center rounded-full border ${m.active ? "border-brand-cyan bg-brand-cyan/30 glow-cyan" : "border-muted-foreground/40 bg-background"}`}
              >
                {m.active && <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />}
              </span>
              <p className="font-mono text-sm text-brand-cyan">{m.year}</p>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">{m.text}</p>
            </li>
          ))}
        </ol>

        <aside className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur">
          <p className="mb-4 text-sm font-medium">My approach</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>· Product thinking first</li>
            <li>· Design with purpose</li>
            <li>· Code with precision</li>
            <li>· Ship and iterate</li>
          </ul>
          <blockquote className="mt-6 border-l-2 border-brand-lime pl-4 text-sm italic text-foreground/80">
            "I don't just write code. I craft digital experiences that people remember."
          </blockquote>
        </aside>
      </div>
    </section>
  );
}