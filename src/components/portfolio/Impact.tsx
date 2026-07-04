import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  { quote: "Rishu turned a fuzzy pitch deck into a product people actually loved logging into. The attention to detail is unusual.", name: "Arjun Mahajan", role: "Founder, Wandrly", pub: "The Founder Letter, № 12" },
  { quote: "He's a rare mix of design sense and engineering depth. Our go-to for anything that has to feel right on day one.", name: "Megha Sharma", role: "CTO, Nexa Commerce", pub: "Correspondence, 2025" },
  { quote: "Communication, speed, and craft — all at once. Working with him felt like hiring a small studio, not a freelancer.", name: "Karan Patel", role: "Founder, DevCompanion", pub: "Interview, 2024" },
];

export function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-impact-card]", { y: 20, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={ref} className="rule-t bg-paper-2/60 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="rule-b mb-10 flex items-baseline justify-between pb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Section V</span>
          <span>The Praise</span>
          <span>Selected letters</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <h2 className="col-span-12 font-serif text-5xl leading-[0.95] text-ink-deep md:col-span-8 md:text-7xl">
            What people <em className="italic">write in</em>.
          </h2>
          <p className="col-span-12 self-end text-sm leading-relaxed text-ink md:col-span-4">
            A shelf of notes from founders who've shared a build with the studio. Names used with permission.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} data-impact-card className="rule-t pt-5">
              <span className="font-serif text-3xl italic text-muted-foreground">№ {String(i + 1).padStart(2, "0")}</span>
              <blockquote className="mt-4 font-serif text-2xl leading-snug text-ink-deep md:text-3xl">
                <span className="text-4xl leading-none text-muted-foreground">"</span>
                {t.quote}
                <span className="text-4xl leading-none text-muted-foreground">"</span>
              </blockquote>
              <figcaption className="mt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <p className="text-ink-deep">— {t.name}</p>
                <p className="mt-1">{t.role} · <span className="italic normal-case tracking-normal font-serif text-sm">{t.pub}</span></p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}