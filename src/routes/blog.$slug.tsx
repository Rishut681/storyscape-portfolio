import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { Markdown } from "@/components/blog/Markdown";
import { allPosts, fmtDate, getPost, readMins } from "@/content/posts";
import { NAME, SITE_URL } from "@/content/portfolio";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: p }) => {
    if (!p) return {};
    const url = `${SITE_URL}/blog/${p.slug}`;
    const base = pageMeta({
      title: `${p.title} — Rishu Raj`,
      description: p.description,
      path: `/blog/${p.slug}`,
      type: "article",
    });
    return {
      ...base,
      meta: [
        ...base.meta,
        { property: "article:published_time", content: p.date },
        { property: "article:author", content: NAME },
        ...p.tags.map((t) => ({ property: "article:tag", content: t })),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${url}#post`,
                mainEntityOfPage: url,
                url,
                headline: p.title,
                description: p.description,
                abstract: p.tldr.join(" "),
                datePublished: p.date,
                dateModified: p.date,
                inLanguage: "en",
                keywords: p.tags.join(", "),
                image: `${SITE_URL}/og.jpg`,
                wordCount: p.body.split(/\s+/).length,
                author: {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  name: NAME,
                  url: `${SITE_URL}/`,
                },
                publisher: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: NAME },
                isPartOf: { "@id": `${SITE_URL}/blog#blog` },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                  { "@type": "ListItem", position: 2, name: "Notes", item: `${SITE_URL}/blog` },
                  { "@type": "ListItem", position: 3, name: p.title, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const p = Route.useLoaderData();
  const more = allPosts.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-ink">
      <SiteHeader />
      <main className="px-gutter pt-[20vh] pb-[8vh]">
        <article className="mx-auto max-w-[68ch]">
          <nav aria-label="Breadcrumb" className="label mb-8 flex gap-2 text-muted-2">
            <Link to="/blog" className="link">
              Notes
            </Link>
            <span aria-hidden="true">/</span>
            <span>{p.tags[0]}</span>
          </nav>
          <h1 className="m-0 text-[clamp(40px,6vw,88px)] leading-[.95] font-extrabold tracking-[-0.045em] text-balance">
            {p.title}
          </h1>
          <p className="label mt-8 flex flex-wrap gap-x-4 gap-y-1 text-muted">
            <time dateTime={p.date}>{fmtDate(p.date)}</time>
            <span>·</span>
            <span>{readMins(p)} min read</span>
            <span>·</span>
            <span>By {NAME}</span>
          </p>
          <aside
            aria-label="In short"
            className="mt-10 rounded-xl border border-[rgba(238,233,224,0.14)] bg-surface p-[clamp(20px,3vw,32px)]"
          >
            <h2 className="label m-0 mb-4 font-normal text-accent">In short</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[17px] leading-[1.5] text-ink">
              {p.tldr.map((t) => (
                <li key={t} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </aside>
          <div className="prose-notes mt-12">
            <Markdown source={p.body} />
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-xl border border-[rgba(238,233,224,0.14)] bg-surface p-[clamp(24px,3vw,40px)]">
            <p className="m-0 max-w-[24ch] text-[clamp(24px,2.6vw,36px)] leading-[1.05] font-semibold tracking-[-0.03em]">
              Have a problem like this? <span className="serif-i text-accent">Let’s fix it.</span>
            </p>
            <a
              href="/#contact"
              data-cursor="Brief"
              className="rounded-full bg-accent px-6 py-4 font-mono text-[12px] tracking-[.08em] text-bg uppercase transition-colors hover:bg-ink"
            >
              Start a project →
            </a>
          </div>
        </article>
        <section aria-labelledby="more-h" className="mx-auto mt-[14vh] max-w-[1200px]">
          <h2 id="more-h" className="label m-0 mb-6 font-normal text-muted-2">
            More notes
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4 p-0">
            {more.map((x) => (
              <li key={x.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: x.slug }}
                  className="group flex h-full flex-col gap-4 rounded-xl border border-[rgba(238,233,224,0.14)] p-6 transition-colors hover:border-accent"
                >
                  <time dateTime={x.date} className="label text-muted-2">
                    {fmtDate(x.date)}
                  </time>
                  <span className="text-[22px] leading-[1.1] font-semibold tracking-[-0.02em] text-balance transition-colors group-hover:text-accent">
                    {x.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
