import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "HOME", n: "01" },
  { id: "story", label: "STORY", n: "02" },
  { id: "skills", label: "SKILLS", n: "03" },
  { id: "projects", label: "PROJECTS", n: "04" },
  { id: "impact", label: "IMPACT", n: "05" },
  { id: "contact", label: "CONTACT", n: "06" },
];

export function SectionRail() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <aside className="pointer-events-none fixed left-4 top-0 z-30 hidden h-screen w-14 flex-col items-center justify-center gap-8 lg:flex">
      <div className="pointer-events-auto flex flex-col items-center gap-8">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group relative flex flex-col items-center gap-1"
            >
              <span className="font-mono text-[10px] text-muted-foreground">{s.n}</span>
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className={`h-2.5 w-2.5 rounded-full border transition-all ${isActive ? "border-brand-cyan bg-brand-cyan glow-cyan" : "border-muted-foreground/40 bg-transparent"}`} />
                {isActive && <span className="absolute inline-flex h-3 w-3 rounded-full border border-brand-cyan/60 animate-pulse-ring" />}
              </span>
              <span className={`font-mono text-[10px] tracking-widest transition-colors ${isActive ? "text-foreground" : "text-muted-foreground/60"}`}>
                {s.label}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}