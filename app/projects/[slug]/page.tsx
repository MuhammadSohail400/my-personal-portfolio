import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCaseStudy, getAllCaseStudySlugs } from "@/lib/data/fetch-portfolio";
import { CaseStudyContent } from "@/components/sections/case-study-content";
import { constructMetadata } from "@/lib/metadata";

interface ProjectCaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Always fetch fresh data — case studies can be edited any time via /admin.
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

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
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyContent caseStudy={caseStudy} />;
}
