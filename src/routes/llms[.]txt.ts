import { createFileRoute } from "@tanstack/react-router";
import {
  EMAIL,
  GITHUB,
  hostOf,
  projects,
  services,
  SITE_DESC,
  SITE_URL,
} from "@/content/portfolio";
import { allPosts } from "@/content/posts";

// llms.txt (llmstxt.org): a plain summary of the site for language models.
export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => {
        const txt = `# Rishu Raj

> Full-stack developer and business analyst based in India, working with businesses worldwide. ${SITE_DESC}

Contact: ${EMAIL} · Brief form: ${SITE_URL}/#contact · Code: ${GITHUB}

## Services

${services.map((s) => `- ${s.name} (${s.time}): ${s.long}`).join("\n")}

## Selected work

${projects.map((p) => `- ${p.title} — ${p.kicker}${p.url ? ` (${hostOf(p.url)})` : ""}: ${p.desc} Result: ${p.res} ${p.resLine}`).join("\n")}

## Notes

${allPosts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join("\n")}
`;
        return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
