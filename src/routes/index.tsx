import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { SectionRail } from "@/components/portfolio/SectionRail";
import { Hero } from "@/components/portfolio/Hero";
import { Story } from "@/components/portfolio/Story";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Impact } from "@/components/portfolio/Impact";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground lg:pl-20">
      <Nav />
      <SectionRail />
      <Hero />
      <Story />
      <Skills />
      <Projects />
      <Impact />
      <Contact />
    </main>
  );
}
