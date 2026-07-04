import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  { quote: "Rishu transformed our idea into a beautiful, fast and scalable product. The attention to detail is unmatched.", name: "Arjun Mahajan", role: "Founder, Wandrly", initials: "AM" },
  { quote: "He's a rare mix of design sense and engineering depth. Our go-to engineer for complex builds.", name: "Megha Sharma", role: "CTO, Nexa Commerce", initials: "MS" },
  { quote: "Communication, speed, and quality — everything was top notch.", name: "Karan Patel", role: "Founder, DevCompanion", initials: "KP" },
];

const STATS = [
  { label: "Projects delivered", value: "20+" },
  { label: "Repeated clients", value: "70%" },
  { label: "Client satisfaction", value: "5.0/5" },
  { label: "On-time delivery", value: "100%" },
];

export function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-impact-card]", { y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
      gsap.from("[data-stat]", { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, scrollTrigger: { trigger: "[data-stats-row]", start: "top 85%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={ref} className="relative border-t border-border/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-xl">
          <p className="mb-4 font-mono text-xs tracking-widest text-brand-cyan">IMPACT</p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
            What <span className="text-brand-cyan">founders</span> say about working together.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.name} data-impact-card className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur">
              <p className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <footer className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-magenta font-mono text-xs text-primary-foreground">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <div data-stats-row className="mt-10 grid grid-cols-2 gap-4 rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} data-stat className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-cyan/10 text-brand-cyan">◆</span>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-display text-xl font-medium">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}