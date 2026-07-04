import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROCESS = [
  {
    no: "01",
    title: "Brief",
    span: "Week 0",
    body: "A short call, a shared doc, and a written scope. We agree on the shape of the thing before a single pixel moves.",
  },
  {
    no: "02",
    title: "Blueprint",
    span: "Week 1",
    body: "Wireframes, references, and a working design language. You see the frame of the house before we pour concrete.",
  },
  {
    no: "03",
    title: "Build",
    span: "Weeks 2 – 5",
    body: "Daily updates, a staging URL from day one, and short async loops. Small, reviewable pull requests — never a mystery box.",
  },
  {
    no: "04",
    title: "Ship",
    span: "Week 6",
    body: "Production launch, a one-page handover, and two weeks of aftercare included. No goodbye, just a soft close.",
  },
];

const PRINCIPLES = [
  "One project at a time — no parallel context-switching.",
  "Fixed weekly rhythm, not hourly billing.",
  "You own the repo, the design files, the domain — all of it.",
  "Boring stack over trendy stack, unless there's a real reason.",
];

const FAQ = [
  {
    q: "How do we start?",
    a: "Send a note through the form below with a rough scope. I reply within a day and, if it's a fit, we book a 30-minute intro call.",
  },
  {
    q: "What does a project cost?",
    a: "Most engagements land between a small landing site and a full product build. I quote fixed weekly rates once the brief is clear — no surprises.",
  },
  {
    q: "Do you work with existing codebases?",
    a: "Yes. Refactors, revivals and gentle rescues are welcome — provided the goal is honest craft, not just more features.",
  },
];

export function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-impact-card]", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={ref} className="relative rule-t bg-paper-2/60 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 wash-ochre opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="rule-b mb-10 flex items-baseline justify-between pb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Section V</span>
          <span>The Method</span>
          <span>How we work</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <h2 className="col-span-12 font-serif text-5xl leading-[0.95] text-ink-deep md:col-span-8 md:text-7xl">
            A calm, <em className="italic" style={{ color: "var(--ochre)" }}>six-week</em> way of working.
          </h2>
          <p className="col-span-12 self-end text-sm leading-relaxed text-ink md:col-span-4">
            No pitch decks, no war rooms. A short brief, weekly rhythm, and a
            finished product you actually recognise as yours.
          </p>
        </div>

        {/* Process rail */}
        <ol className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
          <span className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-ink/15 md:block" aria-hidden />
          {PROCESS.map((p) => (
            <li
              key={p.no}
              data-impact-card
              className="relative border border-ink/10 bg-paper p-6 transition-colors hover:border-ink-deep"
            >
              <span
                className="absolute -top-3 left-6 rounded-full border border-ink-deep bg-paper px-2 py-0.5 font-serif text-xs text-ink-deep"
                style={{ boxShadow: "0 0 0 3px var(--paper)" }}
              >
                {p.no}
              </span>
              <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--ochre)" }}>
                {p.span}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-ink-deep">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink">{p.body}</p>
            </li>
          ))}
        </ol>

        {/* Principles + FAQ */}
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12 rule-t pt-10">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              House rules
            </p>
            <h3 className="mt-3 font-serif text-4xl leading-tight text-ink-deep md:text-5xl">
              Four <em className="italic">principles</em> the studio runs on.
            </h3>
            <ul className="mt-8 space-y-4">
              {PRINCIPLES.map((line, i) => (
                <li key={line} data-impact-card className="flex gap-4 rule-t pt-4">
                  <span
                    className="font-serif text-xl italic"
                    style={{ color: "var(--ochre)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl leading-snug text-ink-deep md:text-2xl">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Frequently asked
            </p>
            <h3 className="mt-3 font-serif text-4xl leading-tight text-ink-deep md:text-5xl">
              A few things people <em className="italic">write in</em> about.
            </h3>
            <dl className="mt-8 space-y-6">
              {FAQ.map((item, i) => (
                <div key={item.q} data-impact-card className="rule-t pt-5">
                  <dt className="flex items-baseline justify-between gap-4">
                    <span className="font-serif text-2xl italic text-ink-deep">
                      {item.q}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      Q. {String(i + 1).padStart(2, "0")}
                    </span>
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-ink">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}