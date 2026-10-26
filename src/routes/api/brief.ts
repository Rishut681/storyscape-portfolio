/// <reference types="node" />
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { briefTypes, budgets, timelines } from "@/content/portfolio";

const opt = (list: readonly string[]) =>
  z
    .enum(list as [string, ...string[]])
    .nullable()
    .optional();

const Brief = z.object({
  type: opt(briefTypes),
  budget: opt(budgets),
  timeline: opt(timelines),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).default(""),
  email: z.string().trim().email().max(200),
  msg: z.string().trim().max(5000).default(""),
  website: z.string().default(""), // honeypot
});

// ponytail: in-memory limiter is per server instance (resets on cold start); move to KV/Turnstile if spam gets through.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000;
const MAX = 5;
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export const Route = createFileRoute("/api/brief")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
          "anon";
        if (limited(ip)) return json({ ok: false, error: "Too many requests" }, 429);

        const parsed = Brief.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return json({ ok: false, error: "Invalid brief" }, 400);
        const { website, ...brief } = parsed.data;
        if (website) return json({ ok: true }); // bot: pretend it worked

        const url = process.env.BRIEF_WEBHOOK_URL;
        if (!url) {
          console.error("BRIEF_WEBHOOK_URL is not set");
          return json({ ok: false, error: "Not configured" }, 503);
        }
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              ...brief,
              secret: process.env.BRIEF_WEBHOOK_SECRET || "",
              submittedAt: new Date().toISOString(),
              userAgent: request.headers.get("user-agent") || "",
            }),
          });
          const out = (await res.json().catch(() => ({}))) as { ok?: boolean };
          if (!res.ok || out.ok === false) throw new Error(`Webhook ${res.status}`);
          return json({ ok: true });
        } catch (err) {
          console.error(err);
          return json({ ok: false, error: "Delivery failed" }, 502);
        }
      },
    },
  },
});
