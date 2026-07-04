import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-10 md:pb-24 md:pt-16">
        {/* Above-fold masthead line */}
        <div className="rule-b mb-8 flex flex-wrap items-baseline justify-between gap-3 pb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span data-hero-anim>Feature · The Practice</span>
          <span data-hero-anim>By Rishu Raj · Freelance</span>
          <span data-hero-anim>Est. read · 4 min</span>
        </div>

        {/* Editorial hero: 12-col magazine grid */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-8">
            <p data-hero-anim className="mb-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              № 001 — Practice Notes
            </p>
            <h1
              data-hero-anim
              className="font-serif text-[15vw] font-normal leading-[0.92] tracking-tight text-ink-deep md:text-[9.5vw] lg:text-[8.5rem]"
            >
              Cinematic
              <br />
              <em className="italic text-ink">interfaces,</em>
              <br />
              built by hand.
            </h1>
          </div>

          <aside data-hero-anim className="col-span-12 flex flex-col justify-end md:col-span-4">
            <div className="rule-t rule-b py-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                A note from the studio
              </p>
              <p className="mt-3 font-serif text-xl leading-snug italic text-ink-deep">
                "I don't ship templates. I ship products that feel like they belong to someone."
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-ink-deep bg-ink-deep px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-transparent hover:text-ink-deep"
              >
                Start a project
              </a>
              <a
                href="#projects"
                className="ink-underline ink-underline-hover pb-0.5 text-xs uppercase tracking-[0.18em] text-ink-deep"
              >
                Browse the case files ↗
              </a>
            </div>
          </aside>
        </div>

        {/* Deck / standfirst */}
        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">The Deck</p>
          </div>
          <p className="col-span-12 font-serif text-2xl leading-snug text-ink-deep md:col-span-8 md:text-3xl">
            Rishu Raj is a freelance product engineer working at the seam of design and
            code. For six years he has built <em>quiet, exacting</em> web products for
            founders who care how a thing feels — and refuse to look like everyone else.
          </p>
        </div>

        {/* Stats strip in editorial infographic style */}
        <div className="mt-16 grid grid-cols-2 gap-6 rule-t pt-6 md:grid-cols-4">
          {[
            { k: "20+", v: "products shipped" },
            { k: "6 yrs", v: "in the craft" },
            { k: "5.0", v: "average rating" },
            { k: "3 wks", v: "typical lead time" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-serif text-4xl leading-none text-ink-deep md:text-5xl">{s.k}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}