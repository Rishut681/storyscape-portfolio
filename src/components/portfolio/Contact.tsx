import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative border-t border-border/40 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="mb-4 font-mono text-xs tracking-widest text-brand-cyan">LET'S BUILD SOMETHING GREAT</p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
            Have a <span className="text-brand-cyan">project</span> in mind?
          </h2>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            I'm currently available for freelance projects. Let's create something remarkable together.
          </p>
          <a href="mailto:hello@rishu.dev" className="mt-6 flex items-center gap-2 text-sm text-brand-cyan hover:underline">
            ✉ hello@rishu.dev
          </a>
          <p className="mt-1 text-xs text-muted-foreground">Usually replies within 24 hours</p>
          <div className="mt-8 flex gap-3 text-muted-foreground">
            {["GH", "IN", "TW", "DR"].map((s) => (
              <a key={s} href="#" className="grid h-9 w-9 place-items-center rounded-md border border-border/60 font-mono text-xs transition-colors hover:border-brand-cyan hover:text-brand-cyan">
                {s}
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 4000);
          }}
          className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-muted-foreground">Name</span>
              <input required className="w-full rounded-md border border-border bg-secondary/60 px-3 py-2 text-sm outline-none focus:border-brand-cyan" placeholder="Rohan Mehta" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-muted-foreground">Email</span>
              <input required type="email" className="w-full rounded-md border border-border bg-secondary/60 px-3 py-2 text-sm outline-none focus:border-brand-cyan" placeholder="rohan@acme.com" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-muted-foreground">Project type</span>
              <select className="w-full rounded-md border border-border bg-secondary/60 px-3 py-2 text-sm outline-none focus:border-brand-cyan">
                <option>SaaS Platform</option>
                <option>Marketing site</option>
                <option>E-commerce</option>
                <option>AI product</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-muted-foreground">Budget</span>
              <select className="w-full rounded-md border border-border bg-secondary/60 px-3 py-2 text-sm outline-none focus:border-brand-cyan">
                <option>$10k - $25k</option>
                <option>$25k - $50k</option>
                <option>$50k+</option>
              </select>
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-1 block text-xs text-muted-foreground">Brief</span>
            <textarea rows={5} className="w-full rounded-md border border-border bg-secondary/60 px-3 py-2 text-sm outline-none focus:border-brand-cyan" placeholder="We're building a SaaS platform for workflow automation. Need a modern UI, secure auth, dashboards and billing. Let's discuss!" />
          </label>
          <div className="mt-4 flex items-center justify-between">
            {sent ? (
              <p className="rounded-md bg-brand-lime/20 px-3 py-2 text-sm text-brand-lime">
                ✓ Message sent successfully! I'll get back to you soon.
              </p>
            ) : (
              <span />
            )}
            <button className="rounded-md bg-brand-cyan px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:glow-cyan">
              Send message →
            </button>
          </div>
        </form>
      </div>

      <footer className="mx-auto mt-24 flex max-w-7xl items-center justify-between border-t border-border/40 px-6 pt-6 text-xs text-muted-foreground">
        <p>© 2026 Rishu Raj. All rights reserved.</p>
        <p>Built with React, Three.js & GSAP ♥</p>
      </footer>
    </section>
  );
}