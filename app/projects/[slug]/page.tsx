import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CASE_STUDIES } from "@/lib/data/portfolio-data";
import { CaseStudyContent } from "@/components/sections/case-study-content";
import { constructMetadata } from "@/lib/metadata";

interface ProjectCaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) {
    return constructMetadata({ title: "Project Not Found" });
  }

  return constructMetadata({
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.subtitle,
    canonicalUrl: `https://sohail.dev/projects/${slug}`,
  });
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyContent caseStudy={caseStudy} />;
}
