import { useState } from "react";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const fieldCls =
  "w-full rounded-none border-0 border-b border-ink-deep bg-transparent px-0 py-2 font-serif text-lg text-ink-deep placeholder:text-muted-foreground/60 focus:outline-none focus:border-b-2";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="rule-t py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="rule-b mb-10 flex items-baseline justify-between pb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Section VI</span>
          <span>The Colophon</span>
          <span>Correspondence</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 md:col-span-5">
            <h2 className="font-serif text-6xl leading-[0.9] text-ink-deep md:text-8xl">
              Write in.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink">
              The studio opens a new commission each season. Send a note about the shape of
              the thing you'd like to build. Every letter gets a reply, usually within a day.
            </p>
            <dl className="mt-10 space-y-4 text-sm">
              <div className="rule-t pt-3">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Post</dt>
                <dd className="mt-1 font-serif text-xl text-ink-deep">hello@rishu.dev</dd>
              </div>
              <div className="rule-t pt-3">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Studio</dt>
                <dd className="mt-1 font-serif text-xl text-ink-deep">Bengaluru · UTC +5:30</dd>
              </div>
              <div className="rule-t pt-3">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Elsewhere</dt>
                <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1 font-serif text-lg text-ink-deep">
                  <a href="#" className="ink-underline ink-underline-hover pb-0.5 italic">GitHub</a>
                  <a href="#" className="ink-underline ink-underline-hover pb-0.5 italic">LinkedIn</a>
                  <a href="#" className="ink-underline ink-underline-hover pb-0.5 italic">Twitter</a>
                  <a href="#" className="ink-underline ink-underline-hover pb-0.5 italic">Dribbble</a>
                </dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
            className="col-span-12 md:col-span-6 md:col-start-7"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
              <Field label="Your name"><input required className={fieldCls} placeholder="Rohan Mehta" /></Field>
              <Field label="Email"><input required type="email" className={fieldCls} placeholder="rohan@acme.com" /></Field>
              <Field label="Project type">
                <select className={fieldCls}>
                  <option>SaaS platform</option>
                  <option>Marketing site</option>
                  <option>E-commerce</option>
                  <option>AI product</option>
                </select>
              </Field>
              <Field label="Budget">
                <select className={fieldCls}>
                  <option>$10k — $25k</option>
                  <option>$25k — $50k</option>
                  <option>$50k+</option>
                </select>
              </Field>
            </div>
            <div className="mt-6">
              <Field label="A short brief">
                <textarea rows={5} className={`${fieldCls} resize-none`} placeholder="We're building a SaaS platform for workflow automation. Modern UI, auth, dashboards, billing. Would love to talk." />
              </Field>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {sent ? "Received — I'll write back within a day ✓" : "One reader. One reply."}
              </p>
              <button className="border border-ink-deep bg-ink-deep px-6 py-3 text-xs uppercase tracking-[0.22em] text-paper transition-colors hover:bg-transparent hover:text-ink-deep">
                Send letter →
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="mt-24 rule-t">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-baseline justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <p>© 2026 Rishu Raj</p>
          <p className="font-serif text-sm italic normal-case tracking-normal text-ink">
            Set in Instrument Serif & Work Sans. Printed on paper.
          </p>
          <p>End of issue · <span className="text-ink-deep">↑ Back to top</span></p>
        </div>
      </footer>
    </section>
  );
}