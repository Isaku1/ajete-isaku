import { About } from "@/components/sections/About";
import { Architecture } from "@/components/sections/Architecture";
import { Blog } from "@/components/sections/Blog";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Dashboard } from "@/components/sections/Dashboard";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { skillCategories } from "@/data/skills";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: siteConfig.description,
  url: siteConfig.url,
  address: { "@type": "PostalAddress", addressCountry: "XK" },
  sameAs: [profile.socials.linkedin, profile.socials.github],
  knowsAbout: skillCategories.flatMap((c) => c.skills.map((s) => s.name)),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Architecture />
      <Experience />
      <Certifications />
      <Dashboard />
      <Blog />
      <Contact />
    </>
  );
}
