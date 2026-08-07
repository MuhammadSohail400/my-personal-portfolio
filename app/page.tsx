import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { GitHubStatsSection } from "@/components/sections/github-stats-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getPersonalInfo, getSkillCategories, getProjects } from "@/lib/data/fetch-portfolio";

// Always fetch fresh data — this content can change any time via /admin.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [personalInfo, skills, projects] = await Promise.all([
    getPersonalInfo(),
    getSkillCategories(),
    getProjects(),
  ]);

  return (
    <>
      <HeroSection personalInfo={personalInfo} />
      <AboutSection personalInfo={personalInfo} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <GitHubStatsSection />
      <ContactSection personalInfo={personalInfo} />
    </>
  );
}
