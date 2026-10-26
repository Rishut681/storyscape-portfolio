import { useEffect, type RefObject } from "react";

// Port of the reference's Component logic (Portfolio.dc.html): one rAF loop that
// smooths scrollY and scrubs every section from a cached layout. Maths is copied 1:1.

const cl = (v: number) => Math.max(0, Math.min(1, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const tc = (s: number, ff?: boolean) => {
  const p = (n: number) => String(Math.floor(n)).padStart(2, "0");
  return (
    (ff ? p(s / 3600) + ":" : "") + p((s / 60) % 60) + ":" + p(s % 60) + ":" + p((s * 24) % 24)
  );
};
const PATH = [
  [0.62, 0.78],
  [0.42, 0.42],
  [0.66, 0.3],
];
const ACCENT = "#E8FF3A";
export const INTRO_KEY = "rr-intro-seen";

type H = HTMLElement;

export function usePortfolioMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = <T extends Element = H>(s: string, el: ParentNode = root) =>
      el.querySelector(s) as T | null;
    const qa = <T extends Element = H>(s: string, el: ParentNode = root) =>
      Array.from(el.querySelectorAll(s)) as T[];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layout = new Map<Element, { top: number; h: number }>();
    let target = scrollY;
    let sy = scrollY;
    let dirty = true;
    let maskScale: number | null = null;
    let heroVisible: boolean | null = null;
    let videoFailed = false;
    let cursorStep: (() => void) | null = null;
    const cleanups: (() => void)[] = [];

    const video = q<HTMLVideoElement>("[data-video]");
    const maskc = q<HTMLCanvasElement>("[data-maskc]");

    const measure = () => {
      const y = scrollY;
      qa("[data-hero],[data-manifesto],[data-chapter],[data-method]").forEach((el) => {
        const r = el.getBoundingClientRect();
        layout.set(el, { top: r.top + y, h: r.height });
      });
      if (maskc) {
        const d = Math.min(devicePixelRatio || 1, 2);
        maskc.width = Math.max(1, maskc.clientWidth * d);
        maskc.height = Math.max(1, maskc.clientHeight * d);
        maskScale = null;
      }
    };

    const drawMask = (s: number) => {
      if (!maskc || maskScale === s) return;
      maskScale = s;
      const ctx = maskc.getContext("2d");
      if (!ctx) return;
      const w = maskc.width,
        h = maskc.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#0C0B0A";
      ctx.fillRect(0, 0, w, h);
      const fs = w * 0.3;
      ctx.font = "800 " + fs + 'px "Bricolage Grotesque", system-ui, sans-serif';
      if ("letterSpacing" in ctx)
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          -0.045 * fs + "px";
      ctx.textBaseline = "alphabetic";
      const wAll = ctx.measureText("RISHU").width,
        wR = ctx.measureText("RIS").width,
        mH = ctx.measureText("H");
      const asc = mH.actualBoundingBoxAscent || fs * 0.7;
      const x0 = (w - wAll) / 2,
        cy = h / 2,
        ox = x0 + wR + mH.width / 2;
      ctx.translate(ox, cy);
      ctx.scale(s, s);
      ctx.translate(-ox, -cy);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000";
      ctx.fillText("RISHU", x0, cy + asc / 2);
      ctx.globalCompositeOperation = "source-over";
      // SSR paints the canvas element dark so the video never flashes before the first draw.
      maskc.style.background = "transparent";
    };

    const prog = (el: Element, y: number, vh: number) => {
      const l = layout.get(el);
      return cl((y - (l?.top || 0)) / Math.max(1, (l?.h || vh) - vh));
    };

    const tick = () => {
      const vh = innerHeight;
      // Reduced motion: render every section at its final state.
      const y = sy;

      const hero = q("[data-hero]");
      if (hero) {
        const p = reduced ? 1 : prog(hero, y, vh);
        const capStart = 0.72;
        if (maskc) {
          const t = ease(cl((p - 0.04) / 0.6));
          const op = 1 - cl((p - 0.5) / 0.14);
          maskc.style.opacity = String(op);
          if (op > 0) drawMask(+(1 + Math.pow(t, 2.4) * 60).toFixed(3));
        }
        const wrap = q("[data-reelwrap]");
        if (wrap) wrap.style.transform = "scale(" + (1 + cl((p - 0.7) / 0.3) * 0.06) + ")";
        q("[data-herometa]")!.style.opacity = String(1 - cl(p / 0.1));
        const c = cl((p - capStart) / 0.2);
        q("[data-scrim]")!.style.opacity = String(out(cl(c * 2)));
        const kk = out(cl(c * 3)),
          ck = q("[data-capk]")!;
        ck.style.opacity = String(kk);
        ck.style.transform = "translateY(" + (1 - kk) * 16 + "px)";
        qa("[data-hw]").forEach((el, i) => {
          const r = out(cl(c * 2.4 - 0.15 - i * 0.12));
          el.style.transform = "translateY(" + (1 - r) * 110 + "%)";
        });
        const bb = out(cl(c * 2.2 - 0.9)),
          cb = q("[data-capb]")!;
        cb.style.opacity = String(bb);
        cb.style.transform = "translateY(" + (1 - bb) * 20 + "px)";
        cb.style.pointerEvents = bb > 0.5 ? "auto" : "none";
        cb.style.visibility = bb > 0.01 ? "visible" : "hidden"; // keep hidden CTAs out of the tab order
        const l = layout.get(hero);
        const vis = y < (l?.top || 0) + (l?.h || vh);
        if (vis !== heroVisible) {
          heroVisible = vis;
          if (video && !reduced && !videoFailed) {
            if (vis) video.play().catch(() => {});
            else video.pause();
          }
        }
      }

      const man = q("[data-manifesto]");
      if (man) {
        const p = reduced ? 1 : prog(man, y, vh),
          ws = qa("[data-w]"),
          n = ws.length;
        ws.forEach((w, i) => {
          w.style.opacity = String(0.14 + 0.86 * cl(p * 1.25 * n - i));
        });
      }

      qa("[data-chapter]").forEach((sec) => {
        const l = layout.get(sec);
        const top = l?.top || 0,
          h = l?.h || vh;
        if (!reduced && (y + vh < top - 50 || y > top + h + 50)) return;
        const p = reduced ? 0.5 : prog(sec, y, vh);
        const enter = reduced ? 2 : cl((y - (top - vh)) / vh);
        const e = out(cl(enter * 1.15 - 0.1));
        const stage = q("[data-stage]", sec)!;
        stage.style.opacity = String(e);
        stage.style.transform = "translateY(" + (1 - e) * 90 + "px) scale(" + (0.9 + 0.1 * e) + ")";
        const z = ease(cl((p - 0.04) / 0.9));
        q("[data-shot]", sec)!.style.transform = "scale(" + (1.02 + z * 0.22).toFixed(4) + ")";
        q("[data-mshot]", sec)!.style.transform =
          "scale(" + (1.0 + z * 0.08).toFixed(4) + ") translateY(" + -z * 3 + "%)";
        q("[data-sheen]", sec)!.style.transform =
          "translateX(" + (-120 + cl((p - 0.1) / 0.35) * 460) + "%)";
        const k = cl((p - 0.12) / 0.7) * (PATH.length - 1),
          ki = Math.min(PATH.length - 2, Math.floor(k)),
          kf = ease(k - ki);
        const cx = PATH[ki][0] + (PATH[ki + 1][0] - PATH[ki][0]) * kf,
          cy = PATH[ki][1] + (PATH[ki + 1][1] - PATH[ki][1]) * kf;
        const cur = q("[data-pcur]", sec)!,
          box = cur.parentNode as H;
        cur.style.transform =
          "translate(" + cx * box.clientWidth + "px," + cy * box.clientHeight + "px)";
        const rp = cl(((k % 1) - 0.85) / 0.15) * (k < PATH.length - 1.01 ? 1 : 0),
          rip = q("[data-ripple]", sec)!;
        rip.style.opacity = String(rp > 0 ? 1 - rp : 0);
        rip.style.transform = "scale(" + (0.4 + rp * 1.4) + ")";
        q("[data-phone]", sec)!.style.transform = "translateY(" + (0.5 - p) * 110 + "px)";
        q("[data-bignum]", sec)!.style.transform = "translateY(" + (0.5 - p) * 24 + "vh)";
        const tt = out(cl((enter - 0.35) / 0.5));
        q("[data-title]", sec)!.style.transform = "translateY(" + (1 - tt) * 105 + "%)";
        qa("[data-rv]", sec).forEach((el, i) => {
          const r = out(cl((enter - 0.45 - i * 0.06) / 0.4));
          el.style.opacity = String(r);
          el.style.transform = "translateY(" + (1 - r) * 24 + "px)";
        });
        q("[data-cbar]", sec)!.style.transform = "scaleX(" + p + ")";
        q("[data-ctc]", sec)!.textContent = tc(p * 14);
      });

      const meth = q("[data-method]"),
        track = q("[data-track]");
      if (meth && track) {
        const p = reduced ? 0 : ease(prog(meth, y, vh));
        track.style.transform =
          "translateX(" + -p * Math.max(0, track.scrollWidth - innerWidth) + "px)";
      }

      const doc = document.documentElement,
        f = cl(y / Math.max(1, doc.scrollHeight - vh));
      const t1 = document.querySelector<H>("[data-tc]");
      if (t1) t1.textContent = tc(f * 252, true);
      const pb = document.querySelector<H>("[data-progress]");
      if (pb) pb.style.transform = "scaleX(" + f + ")";
    };

    // --- scroll + layout ---
    const onScroll = () => {
      target = scrollY;
      if (reduced) {
        sy = target;
        dirty = true;
      }
    };
    const onResize = () => {
      measure();
      sizeReel();
      dirty = true;
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    cleanups.push(() => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
    });
    const ro = new ResizeObserver(() => {
      measure();
      dirty = true;
    });
    ro.observe(root);
    cleanups.push(() => ro.disconnect());
    measure();
    document.fonts?.load('800 100px "Bricolage Grotesque"').catch(() => {});
    document.fonts?.ready.then(() => {
      measure();
      dirty = true;
    });

    // --- main loop ---
    let last = performance.now();
    let loopRaf = 0;
    const loop = (now: number) => {
      loopRaf = requestAnimationFrame(loop);
      const dt = Math.min(64, now - last);
      last = now;
      const d = target - sy;
      if (Math.abs(d) > 0.3) {
        sy += d * (1 - Math.exp(-dt / 110));
        dirty = true;
      } else if (d !== 0) {
        sy = target;
        dirty = true;
      }
      cursorStep?.();
      if (dirty) {
        dirty = false;
        tick();
      }
    };
    loopRaf = requestAnimationFrame(loop);
    cleanups.push(() => cancelAnimationFrame(loopRaf));

    // --- fallback reel (only when the video fails) ---
    const reel = q<HTMLCanvasElement>("[data-reel]");
    function sizeReel() {
      if (!reel) return;
      const d = Math.min(devicePixelRatio || 1, 1.5);
      reel.width = Math.max(1, reel.clientWidth * d * 0.5);
      reel.height = Math.max(1, reel.clientHeight * d * 0.5);
    }
    let reelRaf = 0;
    const startReel = () => {
      if (!reel || reelRaf) return;
      sizeReel();
      const ctx = reel.getContext("2d")!;
      const t0 = performance.now();
      const draw = (now: number) => {
        reelRaf = requestAnimationFrame(draw);
        if (heroVisible === false) return;
        const t = (now - t0) / 1000,
          w = reel.width,
          h = reel.height;
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#140E0A";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        (
          [
            [ACCENT, 0.5 + 0.35 * Math.sin(t * 0.31), 0.5 + 0.3 * Math.cos(t * 0.23), 0.55],
            ["#B8261E", 0.3 + 0.25 * Math.cos(t * 0.19), 0.7 + 0.2 * Math.sin(t * 0.27), 0.5],
            ["#F2B25C", 0.72 + 0.2 * Math.sin(t * 0.17 + 1), 0.3 + 0.25 * Math.sin(t * 0.21), 0.42],
            ["#2E4A6B", 0.15 + 0.2 * Math.sin(t * 0.13 + 2), 0.2 + 0.2 * Math.cos(t * 0.29), 0.5],
          ] as const
        ).forEach(([col, x, y, rad]) => {
          const g = ctx.createRadialGradient(x * w, y * h, 0, x * w, y * h, rad * Math.max(w, h));
          g.addColorStop(0, col);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.globalAlpha = 0.75;
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        });
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      };
      reelRaf = requestAnimationFrame(draw);
      cleanups.push(() => cancelAnimationFrame(reelRaf));
    };

    // --- hero video ---
    if (video) {
      const fail = () => {
        videoFailed = true;
        video.style.display = "none";
        startReel();
      };
      // With <source> children the media element never fires "error"; the last source does.
      const lastSource = qa<HTMLSourceElement>("source", video).pop();
      (lastSource || video).addEventListener("error", fail);
      if (video.error) fail();
      if (!reduced) {
        video.muted = true;
        video.play().catch(() => {});
      }
    }

    // --- film grain ---
    const grain = document.querySelector<H>("[data-grain]");
    if (grain) {
      const c = document.createElement("canvas");
      c.width = c.height = 160;
      const x = c.getContext("2d")!,
        im = x.createImageData(160, 160);
      for (let i = 0; i < im.data.length; i += 4) {
        const v = Math.random() * 255;
        im.data[i] = im.data[i + 1] = im.data[i + 2] = v;
        im.data[i + 3] = 255;
      }
      x.putImageData(im, 0, 0);
      grain.style.backgroundImage = "url(" + c.toDataURL() + ")";
      if (!reduced) {
        const gi = setInterval(() => {
          grain.style.backgroundPosition =
            ((Math.random() * 160) | 0) + "px " + ((Math.random() * 160) | 0) + "px";
        }, 90);
        cleanups.push(() => clearInterval(gi));
      }
    }

    // --- IST clock ---
    const upd = () => {
      const s = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
      });
      qa("[data-clock]").forEach((el) => (el.textContent = s + " IST"));
    };
    upd();
    const ci = setInterval(upd, 15000);
    cleanups.push(() => clearInterval(ci));

    // --- cursor ---
    const dot = document.querySelector<H>("[data-cursor-dot]"),
      lab = document.querySelector<H>("[data-cursor-label]");
    if (dot && lab && matchMedia("(pointer: fine)").matches && !reduced) {
      dot.style.display = "flex";
      let tx = -100,
        ty = -100,
        cx = -100,
        cy = -100,
        cur = "";
      const onMove = (e: MouseEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        const el = (e.target as Element).closest?.("[data-cursor]");
        const l = el ? el.getAttribute("data-cursor") || "" : "";
        if (l !== cur) {
          cur = l;
          lab.textContent = l;
          const s = l ? 84 : 10;
          dot.style.width = dot.style.height = s + "px";
          dot.style.margin = -s / 2 + "px 0 0 " + -s / 2 + "px";
        }
      };
      addEventListener("mousemove", onMove);
      cleanups.push(() => removeEventListener("mousemove", onMove));
      cursorStep = () => {
        cx += (tx - cx) * 0.22;
        cy += (ty - cy) * 0.22;
        dot.style.transform = "translate(" + cx + "px," + cy + "px)";
      };
    }

    // --- intro (film leader 3-2-1) ---
    const ov = q("[data-intro]");
    if (ov && !reduced && !document.documentElement.hasAttribute("data-nointro")) {
      const n = q("[data-intro-n]")!,
        sw = q("[data-sweep]")!;
      const start = performance.now(),
        dur = 1800;
      let introRaf = 0;
      let hideT = 0;
      const step = (now: number) => {
        const t = now - start;
        if (t >= dur) {
          ov.style.opacity = "0";
          ov.style.pointerEvents = "none";
          hideT = window.setTimeout(() => (ov.style.display = "none"), 650);
          try {
            sessionStorage.setItem(INTRO_KEY, "1");
          } catch {
            /* storage disabled */
          }
          return;
        }
        n.textContent = String(3 - Math.floor(t / 600));
        sw.style.background =
          "conic-gradient(rgba(238,233,224,0.16) " +
          ((t % 600) / 600) * 360 +
          "deg, transparent 0)";
        introRaf = requestAnimationFrame(step);
      };
      introRaf = requestAnimationFrame(step);
      cleanups.push(() => {
        cancelAnimationFrame(introRaf);
        clearTimeout(hideT);
      });
    }

    return () => cleanups.forEach((f) => f());
  }, [rootRef]);
}
