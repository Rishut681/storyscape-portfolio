import { Link } from "@tanstack/react-router";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EMAIL, GITHUB } from "@/content/portfolio";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[120] flex items-center justify-between gap-4 px-gutter py-5 font-mono text-[12px] tracking-[.08em] uppercase mix-blend-difference">
      <a
        href="/#top"
        className="link flex min-h-11 items-center font-display text-lg font-extrabold normal-case tracking-[-0.02em]"
      >
        Rishu Raj
      </a>
      <div className="hidden items-center gap-2.5 wide:flex" aria-hidden="true">
        <span className="size-2 rounded-full bg-accent" />
        <span>REC</span>
        <span data-tc className="tabular-nums">
          00:00:00:00
        </span>
      </div>
      <nav aria-label="Primary" className="flex items-center gap-6">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className="link hidden wide:inline">
            {l.label}
          </a>
        ))}
        <Sheet>
          <SheetTrigger className="link flex min-h-11 cursor-pointer items-center uppercase wide:hidden">
            Menu
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs border-line bg-bg">
            <SheetTitle className="label text-muted-2">Menu</SheetTitle>
            <div className="mt-10 flex flex-col">
              {navLinks.map((l) => (
                <SheetClose asChild key={l.href}>
                  <a
                    href={l.href}
                    className="link border-b border-line py-4 text-4xl font-extrabold tracking-[-0.04em]"
                  >
                    {l.label}
                  </a>
                </SheetClose>
              ))}
            </div>
            <SheetClose asChild>
              <a
                href="/#contact"
                className="mt-10 flex min-h-12 items-center justify-between rounded-full bg-accent px-6 font-mono text-[12px] tracking-[.08em] text-bg uppercase"
              >
                Start a project <span aria-hidden="true">→</span>
              </a>
            </SheetClose>
            <a
              href={`mailto:${EMAIL}`}
              className="link mt-6 block text-center text-[14px] text-muted"
            >
              {EMAIL}
            </a>
          </SheetContent>
        </Sheet>
        <a
          href="/#contact"
          className="flex min-h-11 items-center rounded-full bg-ink px-4 text-bg wide:min-h-0 wide:py-2.5"
        >
          Start a project
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="overflow-hidden px-gutter pt-[10vh] pb-[4vh]">
      <div className="label mb-[6vh] flex flex-wrap justify-between gap-6">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6">
          <a className="link py-3" href={GITHUB} target="_blank" rel="noopener">
            GitHub
          </a>
          <Link className="link py-3" to="/blog">
            Blog
          </Link>
          <a className="link py-3" href="https://rankmonk.io" target="_blank" rel="noopener">
            RankMonk
          </a>
          <a className="link py-3" href={`mailto:${EMAIL}`}>
            Email
          </a>
        </nav>
        <span className="py-3 text-muted-2">© 2026 Rishu Raj</span>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none text-[23vw] leading-[.75] font-extrabold tracking-[-0.06em] whitespace-nowrap"
      >
        RISHU<span className="text-accent">.</span>
      </div>
    </footer>
  );
}
