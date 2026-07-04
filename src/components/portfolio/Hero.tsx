import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroCollage from "@/assets/hero-collage.jpg";

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
    <section id="home" ref={ref} className="relative overflow-hidden wash-ochre">
      <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-10 md:pb-24 md:pt-16">
        {/* Above-fold masthead line */}
        <div className="rule-b mb-8 flex flex-wrap items-baseline justify-between gap-3 pb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span data-hero-anim>Feature · The Practice</span>
          <span data-hero-anim>By Rishu Raj · Freelance</span>
          <span data-hero-anim>Est. read · 4 min</span>
        </div>

        {/* Editorial hero: 12-col magazine grid */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="relative col-span-12 md:col-span-8">
            <p data-hero-anim className="mb-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              № 001 — Practice Notes
            </p>
            <h1
              data-hero-anim
              className="font-serif text-[15vw] font-normal leading-[0.92] tracking-tight text-ink-deep md:text-[9.5vw] lg:text-[8.5rem]"
            >
              Cinematic
              <br />
              <em className="italic" style={{ color: "var(--ochre)" }}>interfaces,</em>
              <br />
              built by hand.
            </h1>
            <span
              data-hero-anim
              className="stamp absolute -top-2 right-2 hidden rounded-full px-3 py-1 font-serif text-[10px] uppercase tracking-[0.25em] md:inline-block"
            >
              Issue 06 · 2026
            </span>
          </div>

          <aside data-hero-anim className="col-span-12 flex flex-col justify-end gap-6 md:col-span-4">
            <div className="relative overflow-hidden border border-ink/10 bg-paper-2">
              <img
                src={heroCollage}
                alt="Editorial collage — ink and ochre"
                width={1024}
                height={1280}
                className="h-56 w-full object-cover md:h-72"
              />
              <span className="absolute bottom-2 right-3 font-serif text-[10px] uppercase tracking-[0.25em] text-paper mix-blend-difference">
                Plate I
              </span>
            </div>
            <div className="rule-t rule-b py-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                A note from the studio
              </p>
              <p className="mt-3 font-serif text-xl leading-snug italic text-ink-deep">
                "I don't ship templates. I ship products that feel like they belong to someone."
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
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
            Rishu Raj is a product engineer working at the seam of design and
            code — building <em>quiet, exacting</em> web products for founders who
            care how a thing feels, and refuse to look like everyone else.
          </p>
        </div>

        {/* Marks / footprint strip */}
        <div className="mt-16 grid grid-cols-2 gap-6 rule-t pt-6 md:grid-cols-4">
          {[
            { k: "Full-stack", v: "React · Node · Postgres" },
            { k: "Gurgaon", v: "IN · UTC +5:30" },
            { k: "Open", v: "for new commissions" },
            { k: "Async", v: "clear, written, on time" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-serif text-3xl leading-none text-ink-deep md:text-4xl">{s.k}</p>
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