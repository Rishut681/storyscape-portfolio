import { useEffect, useRef, useState } from "react";
import { credits, pad2, services, tools, type BriefType } from "@/content/portfolio";

export function Services({ onAsk }: { onAsk: (type: BriefType) => void }) {
  const [active, setActive] = useState(0);
  const card = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    card.current?.animate(
      [
        { opacity: 0.25, transform: "translateY(10px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    const to =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? services.length - 1
          : step !== undefined
            ? (active + step + services.length) % services.length
            : -1;
    if (to < 0) return;
    e.preventDefault();
    setActive(to);
    tabs.current[to]?.focus();
  };

  const svc = services[active];

  return (
    <section id="services" aria-labelledby="services-h" className="px-gutter pt-[18vh] pb-[16vh]">
      <div className="mb-[8vh] flex flex-wrap items-end justify-between gap-6">
        <h2
          id="services-h"
          className="m-0 text-[clamp(56px,10vw,180px)] leading-[.84] font-extrabold tracking-[-0.05em]"
        >
          What I
          <br />
          <span className="serif-i">build</span>
        </h2>
        <span className="label max-w-[34ch] text-right text-muted-2">
          (04) — Services · fixed scope, fixed price
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-[5vw]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Services"
          className="border-t border-line"
          onKeyDown={onKey}
        >
          {services.map((s, i) => {
            const on = active === i;
            return (
              <button
                key={s.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`svc-tab-${i}`}
                aria-selected={on}
                aria-controls="svc-panel"
                tabIndex={on ? 0 : -1}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`grid w-full cursor-pointer grid-cols-[44px_minmax(0,1fr)_24px] items-center gap-4 border-0 border-b border-line bg-transparent py-6 text-left transition-colors duration-300 ${on ? "text-ink" : "text-dim"}`}
              >
                <span className="font-mono text-[12px]">{pad2(i + 1)}</span>
                <span
                  className={`text-[clamp(24px,2.8vw,46px)] leading-none font-semibold tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${on ? "translate-x-[14px]" : ""}`}
                >
                  {s.name}
                </span>
                <span
                  aria-hidden="true"
                  className={`size-2.5 justify-self-end rounded-full bg-accent transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] ${on ? "scale-100" : "scale-0"}`}
                />
              </button>
            );
          })}
        </div>
        <div className="sticky top-[110px]">
          <div
            ref={card}
            id="svc-panel"
            role="tabpanel"
            aria-labelledby={`svc-tab-${active}`}
            className="box-border flex min-h-[min(62vh,560px)] flex-col gap-7 rounded-xl border border-[rgba(238,233,224,0.14)] bg-surface p-[clamp(24px,3vw,44px)]"
          >
            <div className="label flex justify-between text-muted-2">
              <span>
                {pad2(active + 1)} / {pad2(services.length)}
              </span>
              <span>{svc.kind}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="m-0 text-[clamp(34px,3.6vw,60px)] leading-[.95] font-extrabold tracking-[-0.04em]">
                {svc.name}
              </h3>
              <p className="m-0 max-w-[44ch] text-[18px] leading-[1.5] text-pretty text-ink-2">
                {svc.long}
              </p>
            </div>
            <ul className="m-0 flex list-none flex-col border-t border-[rgba(238,233,224,0.14)] p-0">
              {svc.items.map((t, i) => (
                <li
                  key={t}
                  className="flex items-baseline gap-3.5 border-b border-[rgba(238,233,224,0.08)] py-3 text-[16px] text-ink"
                >
                  <span className="font-mono text-[11px] text-accent">{pad2(i + 1)}</span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-5">
              <div className="flex gap-8">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] tracking-[.1em] text-muted-2 uppercase">
                    Timeline
                  </span>
                  <span className="text-[18px]">{svc.time}</span>
                </div>
              </div>
              <button
                type="button"
                data-cursor="Brief"
                onClick={() => onAsk(svc.type)}
                className="min-h-11 cursor-pointer rounded-full border-0 bg-ink px-5 py-3.5 font-mono text-[12px] tracking-[.08em] text-bg uppercase transition-colors hover:bg-accent"
              >
                Ask about this →
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[8vh] flex flex-wrap items-center gap-2.5">
        <h3 className="label m-0 mr-2 font-normal text-muted-2">Tools</h3>
        <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
          {tools.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[rgba(238,233,224,0.22)] px-3.5 py-2 font-mono text-[12px] text-ink-2"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section
      aria-labelledby="exp-h"
      className="border-t border-[rgba(238,233,224,0.12)] px-gutter py-[18vh] text-center"
    >
      <h2
        id="exp-h"
        className="m-0 mb-[10vh] font-mono text-[12px] font-normal tracking-[.12em] text-muted-2 uppercase"
      >
        (05) — Experience
      </h2>
      <div className="flex flex-col items-center gap-[9vh]">
        {credits.map((c) => (
          <div key={c.org} className="flex flex-col items-center gap-3">
            <span className="font-mono text-[12px] tracking-[.14em] text-muted uppercase">
              {c.role}
            </span>
            <h3 className="m-0 text-[clamp(36px,5vw,84px)] leading-[.95] font-semibold tracking-[-0.035em]">
              {c.org}
            </h3>
            <p className="m-0 max-w-[42ch] font-serif text-[22px] text-balance text-muted italic">
              {c.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
