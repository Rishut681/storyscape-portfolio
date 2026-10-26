import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { allPosts, fmtDate, readMins } from "@/content/posts";
import { NAME, SITE_URL } from "@/content/portfolio";
import { pageMeta } from "@/lib/seo";

const title = "Notes — Rishu Raj";
const description =
  "Practical notes on websites, n8n automation, AI chatbots, AI search visibility and scoping software — written for business owners, not developers.";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    ...pageMeta({ title, description, path: "/blog" }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          url: `${SITE_URL}/blog`,
          name: "Notes",
          description,
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: NAME },
          blogPost: allPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }),
      },
    ],
  }),
});

function BlogIndex() {
  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-ink">
      <SiteHeader />
      <main className="px-gutter pt-[22vh] pb-[10vh]">
        <div className="mb-[10vh] flex flex-wrap items-end justify-between gap-6">
          <h1 className="m-0 text-[clamp(64px,13vw,240px)] leading-[.82] font-extrabold tracking-[-0.05em]">
            Notes
            <br />
            <span className="serif-i text-accent">from the desk.</span>
          </h1>
          <p className="m-0 max-w-[36ch] text-[18px] leading-[1.5] text-pretty text-ink-2">
            {description}
          </p>
        </div>
        <ol className="m-0 list-none border-t border-line p-0">
          {allPosts.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                data-cursor="Read"
                className="group grid gap-x-[4vw] gap-y-3 py-[clamp(24px,4vh,40px)] wide:grid-cols-[180px_minmax(0,1fr)_120px]"
              >
                <span className="label pt-2 text-muted-2">
                  <time dateTime={p.date}>{fmtDate(p.date)}</time>
                </span>
                <span className="flex flex-col gap-3">
                  <h2 className="m-0 text-[clamp(26px,3.2vw,48px)] leading-[1] font-semibold tracking-[-0.03em] text-balance transition-colors group-hover:text-accent">
                    {p.title}
                  </h2>
                  <span className="max-w-[62ch] text-[16px] leading-[1.5] text-pretty text-muted">
                    {p.description}
                  </span>
                </span>
                <span className="label pt-2 text-muted-2 wide:text-right">
                  {readMins(p)} min read →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}
