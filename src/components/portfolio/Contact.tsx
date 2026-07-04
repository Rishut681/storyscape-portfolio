import { useState } from "react";

const WHATSAPP_NUMBER = "918882905323"; // country code + number
const CONTACT_EMAIL = "rishut681@gmail.com";

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
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    brief: "",
  });

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildMessage = () =>
    `New commission enquiry ✨%0A%0A` +
    `• Name: ${encodeURIComponent(form.name)}%0A` +
    `• Email: ${encodeURIComponent(form.email)}%0A` +
    `• Project type: ${encodeURIComponent(form.projectType)}%0A` +
    `• Budget: ${encodeURIComponent(form.budget)}%0A%0A` +
    `Brief:%0A${encodeURIComponent(form.brief)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = buildMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setForm({ name: "", email: "", projectType: "", budget: "", brief: "" });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

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
                <dd className="mt-1 font-serif text-xl text-ink-deep">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="ink-underline ink-underline-hover pb-0.5">{CONTACT_EMAIL}</a>
                </dd>
              </div>
              <div className="rule-t pt-3">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Phone</dt>
                <dd className="mt-1 font-serif text-xl text-ink-deep">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="ink-underline ink-underline-hover pb-0.5">+91 88829 05323</a>
                </dd>
              </div>
              <div className="rule-t pt-3">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Studio</dt>
                <dd className="mt-1 font-serif text-xl text-ink-deep">Gurgaon · UTC +5:30</dd>
              </div>
              <div className="rule-t pt-3">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Elsewhere</dt>
                <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1 font-serif text-lg text-ink-deep">
                  <a href="https://github.com/Rishut681/" target="_blank" rel="noreferrer" className="ink-underline ink-underline-hover pb-0.5 italic">GitHub</a>
                  <a href="https://www.linkedin.com/in/rishu-raj-322637253/" target="_blank" rel="noreferrer" className="ink-underline ink-underline-hover pb-0.5 italic">LinkedIn</a>
                </dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={handleSubmit}
            className="col-span-12 md:col-span-6 md:col-start-7"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
              <Field label="Your name"><input required value={form.name} onChange={update("name")} className={fieldCls} placeholder="Rohan Mehta" /></Field>
              <Field label="Email"><input required type="email" value={form.email} onChange={update("email")} className={fieldCls} placeholder="rohan@acme.com" /></Field>
              <Field label="Project type"><input value={form.projectType} onChange={update("projectType")} className={fieldCls} placeholder="SaaS platform, marketing site, AI product…" /></Field>
              <Field label="Budget"><input value={form.budget} onChange={update("budget")} className={fieldCls} placeholder="₹ / $ — your comfortable range" /></Field>
            </div>
            <div className="mt-6">
              <Field label="A short brief">
                <textarea required rows={5} value={form.brief} onChange={update("brief")} className={`${fieldCls} resize-none`} placeholder="We're building a SaaS platform for workflow automation. Modern UI, auth, dashboards, billing. Would love to talk." />
              </Field>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Sends directly to WhatsApp.
              </p>
              <button type="submit" className="border border-ink-deep bg-ink-deep px-6 py-3 text-xs uppercase tracking-[0.22em] text-paper transition-colors hover:bg-transparent hover:text-ink-deep">
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

      {sent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/40 px-6 animate-in fade-in">
          <div className="max-w-sm rounded-none border border-ink-deep bg-paper p-8 text-center shadow-[0_30px_80px_oklch(0.1_0_0/0.25)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Sent ✓</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-ink-deep">Off to WhatsApp.</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              Your brief just opened in a new tab — hit send there and I'll write back within a day.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 border border-ink-deep bg-ink-deep px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-paper transition-colors hover:bg-transparent hover:text-ink-deep"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}