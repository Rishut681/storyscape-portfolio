import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/content/portfolio";
import { allPosts } from "@/content/posts";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          { loc: "/", lastmod: allPosts[0].date },
          { loc: "/blog", lastmod: allPosts[0].date },
          ...allPosts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.date })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
