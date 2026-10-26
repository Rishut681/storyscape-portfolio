import { GITHUB, hostOf, method, pad2, projects, type Project } from "@/content/portfolio";

function Shot({
  img,
  alt,
  ...rest
}: { img: Project["img"]; alt: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${img.src}.avif`} />
      <source type="image/webp" srcSet={`${img.src}.webp`} />
      <img
        src={`${img.src}.png`}
        width={img.w}
        height={img.h}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-[50%_0] will-change-transform"
        {...rest}
      />
    </picture>
  );
}

const pill =
  "rounded-full border border-[rgba(238,233,224,0.4)] font-mono tracking-[.08em] uppercase transition-colors hover:bg-ink hover:text-bg";

function Chapter({ p, i }: { p: Project; i: number }) {
  const n = pad2(i + 1);
  const host = hostOf(p.url);
  return (
    <section
      data-chapter
      aria-labelledby={`p-${p.slug}`}
      className="relative h-[260vh]"
      style={{ background: p.tone }}
    >
      <div
        className={`sticky top-0 box-border flex h-screen flex-wrap content-center items-center gap-[4vw] overflow-hidden px-gutter pt-20 pb-[4vh] wide:flex-nowrap ${i % 2 ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          data-bignum
          aria-hidden="true"
          className="pointer-events-none absolute -right-[2vw] -bottom-[8vw] text-[46vw] leading-[.8] font-extrabold tracking-[-0.06em] text-transparent will-change-transform [-webkit-text-stroke:1px_rgba(238,233,224,0.09)]"
        >
          {n}
        </div>

        <div className="relative z-[2] flex max-h-[calc(100vh-110px)] max-w-[540px] flex-[1_1_300px] flex-col gap-[clamp(10px,2.2vh,24px)]">
          <div
            data-rv
            className="label flex justify-between gap-4 text-muted"
            style={{ opacity: 0 }}
          >
            <span>
              {n} — {p.kicker}
            </span>
            <span data-ctc aria-hidden="true" className="tabular-nums">
              00:00:00
            </span>
          </div>
          <div className="overflow-hidden pb-[.08em]">
            <h3
              id={`p-${p.slug}`}
              data-title
              className="m-0 text-[clamp(40px,min(6.4vw,11vh),120px)] leading-[.88] font-extrabold tracking-[-0.05em]"
              style={{ transform: "translateY(105%)" }}
            >
              {p.title}
            </h3>
          </div>
          <p
            data-rv
            className="m-0 line-clamp-4 text-[clamp(14px,2.1vh,18px)] leading-[1.45] text-pretty text-ink-2"
            style={{ opacity: 0 }}
          >
            {p.desc}
          </p>
          <div data-rv className="flex flex-wrap items-baseline gap-4" style={{ opacity: 0 }}>
            <span className="text-[clamp(28px,min(4vw,6.5vh),60px)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap text-accent">
              {p.res}
            </span>
            <span className="flex-[1_1_180px] text-[15px] leading-[1.4] text-pretty text-muted">
              {p.resLine}
            </span>
          </div>
          <dl
            data-rv
            className="m-0 hidden grid-cols-2 gap-5 border-t border-[rgba(238,233,224,0.18)] pt-[clamp(10px,2vh,20px)] text-[14px] leading-[1.4] wide:grid"
            style={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-1.5">
              <dt className="font-mono text-[11px] tracking-[.1em] text-muted-2 uppercase">Role</dt>
              <dd className="m-0">{p.role}</dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="font-mono text-[11px] tracking-[.1em] text-muted-2 uppercase">
                Stack
              </dt>
              <dd className="m-0">{p.stack}</dd>
            </div>
          </dl>
          {p.url && (
            <a
              data-rv
              href={p.url}
              target="_blank"
              rel="noopener"
              data-cursor="Visit"
              aria-label={`Visit ${p.title} at ${host} (opens in a new tab)`}
              className={`flex min-h-11 items-center gap-2 self-start px-[18px] py-3 text-[12px] ${pill}`}
              style={{ opacity: 0 }}
            >
              {host} ↗
            </a>
          )}
          <div className="relative mt-2 h-px bg-[rgba(238,233,224,0.12)]">
            <div
              data-cbar
              className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        <div
          data-stage
          className="relative z-[1] h-[min(34vh,62vw)] min-h-[180px] flex-[1.3_1_340px] will-change-[transform,opacity] wide:h-[min(68vh,640px,58vw)]"
          style={{ opacity: 0 }}
        >
          <div className="absolute top-0 left-0 h-[88%] w-[88%] overflow-hidden rounded-xl border border-[rgba(238,233,224,0.14)] bg-frame shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
            <div
              aria-hidden="true"
              className="flex h-[34px] items-center gap-2 border-b border-[rgba(238,233,224,0.1)] bg-chrome px-3.5"
            >
              <span className="size-2.5 rounded-full bg-[#3A3631]" />
              <span className="size-2.5 rounded-full bg-[#3A3631]" />
              <span className="size-2.5 rounded-full bg-[#3A3631]" />
              <span className="ml-3 flex h-5 max-w-[340px] flex-1 items-center overflow-hidden rounded-md bg-[#26231F] px-2.5 font-mono text-[11px] whitespace-nowrap text-muted-2">
                {host}
              </span>
            </div>
            <div className="absolute inset-x-0 top-[34px] bottom-0 overflow-hidden bg-white">
              <Shot
                data-shot
                img={p.img}
                alt={`${p.title} screenshot`}
                style={{ transformOrigin: p.focus }}
              />
              <div
                data-sheen
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-[linear-gradient(100deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0)_100%)]"
                style={{ transform: "translateX(-120%)" }}
              />
              <div
                data-pcur
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 size-[22px] will-change-transform"
              >
                <div
                  data-ripple
                  className="absolute -top-3.5 -left-3.5 size-7 rounded-full border-2 border-bg opacity-0"
                />
                <svg
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  className="block drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
                >
                  <path
                    d="M1 1 L1 17 L5.5 13 L8.5 20 L11.5 18.6 L8.6 12 L15 12 Z"
                    fill="#0C0B0A"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            data-phone
            className="absolute right-0 bottom-0 aspect-[9/19.5] w-[21%] min-w-[84px] overflow-hidden rounded-[24px] border-[5px] border-[#23201C] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.6)] will-change-transform"
          >
            <Shot data-mshot img={p.mimg} alt={`${p.title} on mobile`} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <>
      <section
        id="work"
        className="flex flex-wrap items-end justify-between gap-6 px-gutter pt-[20vh] pb-[10vh]"
      >
        <h2 className="m-0 text-[clamp(64px,13vw,240px)] leading-[.82] font-extrabold tracking-[-0.05em]">
          Selected
          <br />
          <span className="serif-i">work</span>
        </h2>
        <div className="label flex flex-col gap-1.5 text-right text-muted-2">
          <span>(02) — {pad2(projects.length)} projects</span>
          <span>2024 — 2026</span>
        </div>
      </section>

      {projects.map((p, i) => (
        <Chapter key={p.slug} p={p} i={i} />
      ))}

      <section className="flex flex-wrap items-center justify-between gap-6 border-b border-[rgba(238,233,224,0.16)] px-gutter py-[14vh]">
        <span className="max-w-[24ch] text-[clamp(28px,3.4vw,56px)] font-semibold tracking-[-0.03em] text-balance">
          More projects and code on <span className="font-serif font-normal italic">GitHub.</span>
        </span>
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener"
          data-cursor="Open"
          className={`flex items-center gap-2.5 px-[26px] py-[18px] text-[13px] ${pill}`}
        >
          github.com/Rishut681 ↗
        </a>
      </section>
    </>
  );
}

export function Method() {
  return (
    <section id="method" data-method aria-labelledby="method-h" className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-[6vh] overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-6 px-gutter">
          <h2
            id="method-h"
            className="m-0 text-[clamp(48px,8vw,148px)] leading-[.84] font-extrabold tracking-[-0.05em]"
          >
            Developer.
            <br />
            <span className="serif-i text-accent">Analyst first.</span>
          </h2>
          <span className="label text-muted-2">(03) — How I work</span>
        </div>
        <ol data-track className="m-0 flex list-none gap-[2vw] px-gutter will-change-transform">
          {method.map((m, i) => (
            <li
              key={m.word}
              className="box-border flex min-h-[46vh] flex-[0_0_min(78vw,560px)] flex-col gap-[18px] rounded-lg border border-[rgba(238,233,224,0.2)] bg-surface p-8"
            >
              <div className="label flex justify-between text-muted">
                <span>{pad2(i + 1)}</span>
                <span>{m.time}</span>
              </div>
              <h3 className="m-0 mt-auto text-[clamp(56px,6vw,104px)] leading-[.85] font-extrabold tracking-[-0.05em]">
                {m.word}
              </h3>
              <p className="m-0 max-w-[38ch] text-[18px] leading-[1.45] text-pretty text-ink-2">
                {m.desc}
              </p>
              <span className="font-mono text-[12px] tracking-[.06em] text-accent">
                You get: {m.out}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
