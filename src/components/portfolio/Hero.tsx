import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroScene } from "./HeroScene";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pt-16">
        <div className="relative z-10 flex flex-col justify-center">
          <p data-hero-anim className="mb-6 font-mono text-xs tracking-widest text-brand-cyan">
            &lt; INTRODUCING RISHU.ENGINE v1.0 /&gt;
          </p>
          <h1
            data-hero-anim
            className="font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-brand-cyan">&lt;</span> Cinematic
            <br />
            product interfaces
            <br />
            <span className="text-muted-foreground/80">for founders</span>
            <br />
            <span className="text-muted-foreground/80">who need to</span>
            <br />
            <span className="text-gradient-lime">stand out.</span>{" "}
            <span className="text-brand-cyan">/&gt;</span>
          </h1>
          <p data-hero-anim className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            I design and build premium web experiences and full-stack products that look
            exceptional, perform beautifully, and drive real results.
          </p>
          <div data-hero-anim className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-brand-cyan px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:glow-cyan"
            >
              Start a project
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-5 py-3 text-sm text-foreground backdrop-blur transition-colors hover:bg-card"
            >
              View case studies
            </a>
          </div>
          <p data-hero-anim className="mt-10 font-mono text-xs text-muted-foreground">
            Creative <span className="text-brand-cyan">Frontend</span> Engineer &
            <span className="text-brand-lime"> Full-Stack</span> Product Builder
          </p>
        </div>

        <div className="relative min-h-[420px] lg:min-h-[560px]">
          <div className="absolute inset-0 -z-0 rounded-full bg-brand-cyan/10 blur-3xl" />
          <HeroScene />
          <div className="pointer-events-none absolute bottom-6 right-2 flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
            <span>Drag to explore</span>
            <span>· Scroll to journey</span>
          </div>
        </div>
      </div>
    </section>
  );
}