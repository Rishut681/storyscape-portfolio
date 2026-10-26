import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/content/portfolio";

// AI crawlers are allowed on purpose: being cited by assistants is the point of a portfolio.
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
          {
            headers: { "content-type": "text/plain; charset=utf-8" },
          },
        ),
    },
  },
});
