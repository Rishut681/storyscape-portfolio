import { createFileRoute } from "@tanstack/react-router";
import { EMAIL, SITE_URL } from "@/content/portfolio";
import { allPosts } from "@/content/posts";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Rishu Raj — Notes</title>
<link>${SITE_URL}/blog</link>
<description>Practical notes on websites, automation, AI and scoping software.</description>
<language>en</language>
<managingEditor>${EMAIL} (Rishu Raj)</managingEditor>
${allPosts
  .map(
    (p) =>
      `<item><title>${esc(p.title)}</title><link>${SITE_URL}/blog/${p.slug}</link><guid>${SITE_URL}/blog/${p.slug}</guid><pubDate>${new Date(p.date + "T09:00:00+05:30").toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`,
  )
  .join("\n")}
</channel></rss>`;
        return new Response(xml, {
          headers: { "content-type": "application/rss+xml; charset=utf-8" },
        });
      },
    },
  },
});
