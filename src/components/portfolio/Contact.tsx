import { useState } from "react";
import { toast } from "sonner";
import {
  briefTypes,
  budgets,
  EMAIL,
  estimates,
  pad2,
  timelines,
  type BriefType,
} from "@/content/portfolio";

function Chips<T extends string>({
  legend,
  list,
  value,
  onPick,
}: {
  legend: string;
  list: readonly T[];
  value: T | null;
  onPick: (v: T | null) => void;
}) {
  return (
    <fieldset className="m-0 flex flex-col gap-3.5 border-0 p-0">
      <legend className="label mb-3.5 p-0 text-muted">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {list.map((l) => {
          const on = value === l;
          return (
            <button
              key={l}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(on ? null : l)}
              className={`cursor-pointer rounded-full border px-[18px] py-3 text-[15px] transition-[background,color] duration-200 ${on ? "border-accent bg-accent text-bg" : "border-[rgba(238,233,224,0.28)] bg-transparent text-ink"}`}
            >
              {l}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const field =
  "w-full border-0 border-b border-[rgba(238,233,224,0.3)] bg-transparent py-3.5 text-[18px] text-ink outline-none transition-colors focus-visible:border-accent";

function Cell({
  k,
  children,
  className = "",
}: {
  k: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-1.5 border-[rgba(238,233,224,0.3)] px-6 py-[18px] ${className}`}
    >
      <span className="font-mono text-[11px] tracking-[.14em] text-muted-2 uppercase">{k}</span>
      {children}
    </div>
  );
}

const slateVal = "font-serif text-[26px] leading-[1.05] italic";
const today = () => {
  const d = new Date();
  return pad2(d.getDate()) + "." + pad2(d.getMonth() + 1) + "." + String(d.getFullYear()).slice(2);
};

export function Contact({
  type,
  setType,
}: {
  type: BriefType | null;
  setType: (t: BriefType | null) => void;
}) {
  const [budget, setBudget] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [arm, setArm] = useState(-10);
  const [take, setTake] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const website = (new FormData(e.currentTarget).get("website") as string) || "";
    setArm(0);
    setStatus("sending");
    const [ok] = await Promise.all([
      fetch("/api/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type, budget, timeline, name, company, email, msg, website }),
      })
        .then((r) => r.ok)
        .catch(() => false),
      new Promise((r) => setTimeout(r, 420)),
    ]);
    setArm(-10);
    if (ok) {
      setTake((t) => t + 1);
      setStatus("sent");
      setMsg("");
      toast.success("Brief received", { description: "Thanks — I’ll reply within a day." });
    } else {
      setStatus("idle");
      toast.error("That didn’t send", {
        description: `Please email ${EMAIL} instead — sorry about that.`,
        action: { label: "Email", onClick: () => (location.href = `mailto:${EMAIL}`) },
      });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-h"
      className="border-t border-[rgba(238,233,224,0.12)] px-gutter pt-[16vh] pb-[12vh]"
    >
      <div className="mb-[8vh] flex flex-wrap items-end justify-between gap-6">
        <h2
          id="contact-h"
          className="m-0 text-[clamp(56px,9vw,168px)] leading-[.85] font-extrabold tracking-[-0.05em]"
        >
          Tell me what
          <br />
          you're <span className="serif-i text-accent">building.</span>
        </h2>
        <div className="flex flex-col gap-2.5 text-right text-[16px] text-muted">
          <span className="flex items-center justify-end gap-2.5 text-ink">
            <span className="size-2 rounded-full bg-live" />2 slots open for November
          </span>
          <span>
            It's{" "}
            <span data-clock className="text-ink tabular-nums">
              --:--
            </span>{" "}
            in India · replies within a day
          </span>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[6vw]"
      >
        <div className="flex flex-col gap-10">
          <Chips legend="01 — What do you need?" list={briefTypes} value={type} onPick={setType} />
          <Chips legend="02 — Budget" list={budgets} value={budget} onPick={setBudget} />
          <Chips legend="03 — When?" list={timelines} value={timeline} onPick={setTimeline} />
          <fieldset className="m-0 flex flex-col gap-3.5 border-0 p-0">
            <legend className="label mb-3.5 p-0 text-muted">04 — About you</legend>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
              <label>
                <span className="sr-only">Name</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className={field}
                />
              </label>
              <label>
                <span className="sr-only">Company</span>
                <input
                  name="company"
                  autoComplete="organization"
                  maxLength={160}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company"
                  className={field}
                />
              </label>
            </div>
            <label>
              <span className="sr-only">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={field}
              />
            </label>
            <label>
              <span className="sr-only">Project details</span>
              <textarea
                name="msg"
                rows={3}
                maxLength={5000}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="What does the business do, and what should change after this project?"
                className={`${field} resize-y`}
              />
            </label>
            {/* Honeypot: hidden from people, filled by bots. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />
          </fieldset>
        </div>

        <div className="sticky top-[110px] mt-12 flex w-full max-w-[560px] flex-col gap-5 justify-self-center">
          <div className="relative pt-[58px]" aria-label="Brief summary" role="group">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 box-border h-12 origin-[0_100%] rounded-t-md border-2 border-ink bg-[repeating-linear-gradient(-55deg,#EEE9E0_0_26px,#0C0B0A_26px_52px)] transition-transform duration-[160ms] ease-[cubic-bezier(.6,0,1,.6)]"
              style={{ transform: `rotate(${arm}deg)` }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[50px] box-border h-2.5 border-2 border-t-0 border-ink bg-[repeating-linear-gradient(55deg,#EEE9E0_0_26px,#0C0B0A_26px_52px)]"
            />
            <div className="grid grid-cols-2 rounded-b-[10px] border-2 border-t-0 border-ink bg-surface">
              <Cell k="Production" className="col-span-2 border-b py-[22px]">
                <span className="font-serif text-[clamp(28px,3vw,44px)] leading-none italic">
                  {(company || name || "Your company") + " × Rishu"}
                </span>
              </Cell>
              <Cell k="Project" className="border-r border-b">
                <span className={slateVal}>{type || "—"}</span>
              </Cell>
              <Cell k="Budget" className="border-b">
                <span className={slateVal}>{budget || "—"}</span>
              </Cell>
              <Cell k="Start" className="border-r border-b">
                <span className={slateVal}>{timeline || "—"}</span>
              </Cell>
              <Cell k="Date · Take" className="border-b">
                <span className={slateVal} suppressHydrationWarning>
                  {today()} · {pad2(take)}
                </span>
              </Cell>
              <Cell k="Usually" className="col-span-2 py-5">
                <span className="text-[17px] leading-[1.4] text-ink-2">
                  {type ? estimates[type] : "Pick a project type to see a typical range."}
                </span>
              </Cell>
            </div>
          </div>
          <button
            type="submit"
            data-cursor="Send"
            disabled={status === "sending"}
            className="flex cursor-pointer items-center justify-between rounded-full border-0 bg-accent px-8 py-[22px] text-[19px] font-semibold text-bg transition-colors hover:bg-ink disabled:cursor-wait"
          >
            <span>
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Sent — talk soon"
                  : "Send the brief"}
            </span>
            <span aria-hidden="true">→</span>
          </button>
          <span className="text-center text-[14px] text-muted-2">
            Or email{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="link border-b border-[rgba(238,233,224,0.3)] text-ink"
            >
              {EMAIL}
            </a>
          </span>
        </div>
      </form>
    </section>
  );
}
