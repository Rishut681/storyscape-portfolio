import { INTRO_KEY } from "@/hooks/use-portfolio-motion";

// Elements the motion hook drives: intro leader, film grain, cursor dot, progress bar.
export function Overlays() {
  return (
    <>
      <script
        // Skip the intro on repeat visits before first paint (no flash).
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.setAttribute("data-nointro","")}catch(e){}`,
        }}
      />
      <div
        data-intro
        aria-hidden="true"
        className="fixed inset-0 z-[200] flex items-center justify-center bg-bg transition-opacity duration-[600ms] ease-[ease]"
      >
        <div className="relative flex aspect-square w-[min(56vw,420px)] items-center justify-center">
          <div data-sweep className="absolute inset-0 rounded-full" />
          <div className="absolute inset-0 rounded-full border border-[rgba(238,233,224,0.35)]" />
          <div className="absolute inset-[12%] rounded-full border border-[rgba(238,233,224,0.2)]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-[rgba(238,233,224,0.25)]" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-[rgba(238,233,224,0.25)]" />
          {/* Canvas, not text: a countdown digit would otherwise be (re)reported as the LCP element. */}
          <canvas data-intro-n className="absolute inset-0 size-full" />
        </div>
        <div className="absolute inset-x-0 bottom-8 text-center font-mono text-[12px] tracking-[.2em] text-muted-2">
          RISHU RAJ — PORTFOLIO, 2026
        </div>
      </div>
      <div data-grain className="grain" aria-hidden="true" />
      <div
        data-cursor-dot
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[180] -mt-[5px] -ml-[5px] hidden size-2.5 items-center justify-center rounded-full bg-accent font-mono text-[11px] tracking-[.08em] text-bg uppercase transition-[width,height,margin] duration-[250ms] ease-[ease]"
      >
        <span data-cursor-label />
      </div>
      <div
        data-progress
        aria-hidden="true"
        className="fixed bottom-0 left-0 z-[120] h-0.5 w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </>
  );
}

const N = "font-display font-semibold text-ink tracking-[-0.04em]";
const I = "font-serif italic font-normal text-accent tracking-[-0.02em]";
const headWords: [string, string][] = [
  ["Analyst’s", N],
  ["head.", N],
  ["Developer’s", I],
  ["hands.", I],
];

export function Hero() {
  return (
    <section id="top" data-hero aria-label="Intro" className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div data-reelwrap aria-hidden="true" className="absolute inset-0 will-change-transform">
          <canvas data-reel className="absolute inset-0 block size-full" />
          <video
            data-video
            muted
            loop
            playsInline
            preload="none"
            poster="/video/hero-poster.jpg"
            tabIndex={-1}
            className="absolute inset-0 size-full object-cover [filter:saturate(0.7)_contrast(1.08)_brightness(0.9)]"
          >
            <source src="/video/hero.webm" type="video/webm" />
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,10,0.05),rgba(12,11,10,0.3))]" />
        </div>

        <canvas data-maskc aria-hidden="true" className="absolute inset-0 block size-full bg-bg" />

        <div data-herometa className="pointer-events-none absolute inset-0">
          <div className="label absolute inset-x-[4vw] top-[16vh] flex justify-between gap-6 text-muted">
            <span>Full-stack developer × Business analyst</span>
            <span>Based in India · Working worldwide</span>
          </div>
          <div className="label absolute inset-x-[4vw] bottom-[5vh] flex items-end justify-between gap-6">
            <span className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-live" />
              Taking projects for Nov 2026
            </span>
            <span className="text-muted">Scroll ↓</span>
          </div>
        </div>
        <div
          data-scrim
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(12,11,10,0.92)_0%,rgba(12,11,10,0.55)_45%,rgba(12,11,10,0.1)_100%)]"
          style={{ opacity: 0 }}
        />
        <div
          data-cap
          className="pointer-events-none absolute inset-x-[4vw] bottom-[8vh] flex flex-col gap-7"
          style={{ visibility: "hidden" }}
        >
          <span
            data-capk
            className="flex items-center gap-3 font-mono text-[12px] tracking-[.12em] text-ink-2 uppercase"
            style={{ opacity: 0 }}
          >
            <span className="h-px w-7 bg-accent" />
            Rishu Raj — developer &amp; business analyst
          </span>
          <h1 className="m-0 flex max-w-[13ch] flex-wrap gap-x-[.22em] text-[clamp(48px,min(8.4vw,15vh),156px)] leading-[.92] font-semibold tracking-[-0.04em]">
            {headWords.map(([t, cls]) => (
              <span key={t} className="-mb-[.12em] inline-block overflow-hidden pb-[.12em]">
                <span
                  data-hw
                  className={`inline-block ${cls}`}
                  style={{ transform: "translateY(110%)" }}
                >
                  {t}
                </span>
              </span>
            ))}
          </h1>
          <div
            data-capb
            className="flex flex-wrap items-end justify-between gap-6"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <p className="m-0 max-w-[44ch] text-[clamp(16px,2.2vh,20px)] leading-[1.45] text-pretty text-ink-2">
              Websites, SaaS and n8n automations for businesses. I work out what will actually help,
              then build it.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full border border-[rgba(238,233,224,0.45)] px-6 py-4 font-mono text-[12px] tracking-[.08em] uppercase transition-colors hover:bg-ink hover:text-bg"
              >
                See the work
              </a>
              <a
                href="#contact"
                className="rounded-full bg-accent px-6 py-4 font-mono text-[12px] tracking-[.08em] text-bg uppercase transition-colors hover:bg-ink"
              >
                Start a project →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const words =
    "I work as an analyst and a developer. I find what's slowing a business down, then build the thing that".split(
      " ",
    );
  return (
    <section data-manifesto aria-labelledby="about-label" className="relative h-[200vh]">
      <div className="sticky top-0 box-border flex h-screen flex-col justify-center px-gutter">
        <h2
          id="about-label"
          className="mb-8 font-mono text-[12px] font-normal tracking-[.12em] text-muted-2 uppercase"
        >
          (01) — About
        </h2>
        <p className="m-0 flex max-w-[21ch] flex-wrap gap-x-[.24em] text-[clamp(34px,5.2vw,92px)] leading-[1.02] font-semibold tracking-[-0.03em]">
          {words.map((w, i) => (
            <span key={i} data-w style={{ opacity: 0.14 }}>
              {w}
            </span>
          ))}
          {["fixes", "it."].map((w) => (
            <span
              key={w}
              data-w
              className="font-serif font-normal text-accent italic"
              style={{ opacity: 0.14 }}
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
