import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { About, Hero, Overlays } from "@/components/portfolio/Hero";
import { Method, Work } from "@/components/portfolio/Work";
import { Experience, Services } from "@/components/portfolio/Services";
import { Contact } from "@/components/portfolio/Contact";
import { usePortfolioMotion } from "@/hooks/use-portfolio-motion";
import {
  EMAIL,
  GITHUB,
  NAME,
  SITE_DESC,
  SITE_TITLE,
  SITE_URL,
  services,
  type BriefType,
} from "@/content/portfolio";
import { pageMeta } from "@/lib/seo";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: NAME,
      url: `${SITE_URL}/`,
      email: `mailto:${EMAIL}`,
      image: `${SITE_URL}/og.jpg`,
      jobTitle: "Full-stack developer & business analyst",
      description: SITE_DESC,
      homeLocation: { "@type": "Country", name: "India" },
      sameAs: [GITHUB],
      knowsAbout: [
        "Business analysis",
        "Web development",
        "SaaS",
        "Next.js",
        "React",
        "TypeScript",
        "n8n",
        "Workflow automation",
        "AI chatbots",
        "WhatsApp Business API",
        "Local SEO",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: `${NAME} — development & business analysis`,
      url: `${SITE_URL}/`,
      email: EMAIL,
      image: `${SITE_URL}/og.jpg`,
      description: SITE_DESC,
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.long },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: NAME,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    ...pageMeta({ title: SITE_TITLE, description: SITE_DESC, path: "/" }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
});

function Index() {
  const root = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<BriefType | null>(null);
  usePortfolioMotion(root);

  const ask = (t: BriefType) => {
    setType(t);
    const el = document.getElementById("contact");
    if (el)
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 40, behavior: "smooth" });
  };

  return (
    <div ref={root} className="overflow-x-clip bg-bg text-ink">
      <a
        href="#work"
        className="sr-only-focusable fixed top-2 left-2 z-[300] rounded-full bg-accent px-4 py-3 text-bg"
      >
        Skip to work
      </a>
      <Overlays />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Work />
        <Method />
        <Services onAsk={ask} />
        <Experience />
        <Contact type={type} setType={setType} />
      </main>
      <SiteFooter />
      <Toaster position="bottom-center" />
    </div>
  );
}
