const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Story" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#impact", label: "Impact" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 backdrop-blur-md">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight">
          Rishu<span className="text-brand-cyan">.dev</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-md border border-brand-cyan/60 px-4 py-2 text-sm text-brand-cyan transition-all hover:bg-brand-cyan/10 hover:glow-cyan"
        >
          Let's talk →
        </a>
      </div>
    </header>
  );
}