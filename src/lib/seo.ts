import { NAME, SITE_URL } from "@/content/portfolio";

// Per-page title, description, canonical and social tags.
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  image = "/og.jpg",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
}) {
  const url = SITE_URL + path;
  const img = SITE_URL + image;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Analyst’s head. Developer’s hands. — Rishu Raj" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
