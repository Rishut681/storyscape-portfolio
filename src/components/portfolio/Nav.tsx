const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#skills", label: "Craft" },
  { href: "#projects", label: "Work" },
  { href: "#impact", label: "Praise" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const issue = "Vol. VII · Issue 04 · July 2026";
  return (
    <header className="sticky top-0 z-40 rule-b bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-ink">
        <span className="hidden md:inline">{issue}</span>
        <a href="#home" className="font-serif text-xl italic tracking-tight text-ink-deep md:text-2xl">
          Rishu <span className="not-italic">·</span> dev
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="ink-underline ink-underline-hover pb-0.5 text-muted-foreground transition-colors hover:text-ink-deep"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-none border border-ink-deep px-3 py-1.5 text-[10px] text-ink-deep transition-colors hover:bg-ink-deep hover:text-paper"
          >
            Commission →
          </a>
        </nav>
      </div>
    </header>
  );
}