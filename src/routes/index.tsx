import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Story } from "@/components/portfolio/Story";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Impact } from "@/components/portfolio/Impact";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rishu Raj — Product engineer · Design & code" },
      { name: "description", content: "Portfolio of Rishu Raj — a product engineer building quiet, exacting web products with React, Node and Postgres. Based in Gurgaon, open for commissions." },
      { property: "og:title", content: "Rishu Raj — Product engineer · Design & code" },
      { property: "og:description", content: "Freelance product engineer building quiet, exacting web products. Based in Gurgaon, open for commissions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rishu Raj — Product engineer" },
      { name: "twitter:description", content: "Portfolio · design & code · Gurgaon." },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen bg-paper text-ink-deep paper-grain">
      <Nav />
      <Hero />
      <Story />
      <Skills />
      <Projects />
      <Impact />
      <Contact />
    </main>
  );
}
