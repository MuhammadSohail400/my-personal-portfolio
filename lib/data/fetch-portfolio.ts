import type { Project, SkillCategory, CaseStudy } from "@/types/portfolio";
import {
  PERSONAL_INFO as STATIC_PERSONAL_INFO,
  SKILL_CATEGORIES as STATIC_SKILL_CATEGORIES,
  FEATURED_PROJECTS as STATIC_PROJECTS,
  CASE_STUDIES as STATIC_CASE_STUDIES,
} from "@/lib/data/portfolio-data";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export type PersonalInfo = typeof STATIC_PERSONAL_INFO;

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

// Every fetch here is best-effort: if the backend or MongoDB is down, the
// homepage falls back to the last-known static data instead of breaking.
async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json: ApiEnvelope<T> = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

interface RawSkillCategory {
  categoryId: string;
  title: string;
  description: string;
  icon: string;
  accentColor: "primary" | "secondary" | "tertiary";
  skills: string[];
}

interface RawProject {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  tags: string[];
  githubUrl: string;
  liveDemoUrl: string;
  category: Project["category"];
  metrics?: Project["metrics"];
  caseStudy?: Omit<CaseStudy, "slug">;
}

function mapProject(raw: RawProject): Project {
  return {
    id: raw.slug,
    slug: raw.slug,
    title: raw.title,
    shortDescription: raw.shortDescription,
    image: raw.image,
    imageAlt: raw.imageAlt,
    tags: raw.tags,
    githubUrl: raw.githubUrl,
    liveDemoUrl: raw.liveDemoUrl,
    caseStudySlug: raw.caseStudy ? raw.slug : undefined,
    category: raw.category,
    metrics: raw.metrics,
  };
}

function mapCaseStudy(raw: RawProject): CaseStudy | null {
  if (!raw.caseStudy) return null;
  return { ...raw.caseStudy, slug: raw.slug } as CaseStudy;
}

export async function getPersonalInfo(): Promise<PersonalInfo> {
  const data = await safeFetch<Partial<PersonalInfo>>("/api/content");
  if (!data || !data.name) return STATIC_PERSONAL_INFO;
  return { ...STATIC_PERSONAL_INFO, ...data };
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  const data = await safeFetch<RawSkillCategory[]>("/api/skills");
  if (!data || data.length === 0) return STATIC_SKILL_CATEGORIES;
  return data.map((c) => ({
    id: c.categoryId,
    title: c.title,
    description: c.description,
    icon: c.icon,
    accentColor: c.accentColor,
    skills: c.skills,
  }));
}

export async function getProjects(): Promise<Project[]> {
  const data = await safeFetch<RawProject[]>("/api/projects");
  if (!data || data.length === 0) return STATIC_PROJECTS;
  return data.map(mapProject);
}

// Used by /projects/[slug] — fetches all projects and picks the case study,
// since case studies live embedded on the project document.
export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const data = await safeFetch<RawProject>(`/api/projects/${slug}`);
  if (data) {
    const mapped = mapCaseStudy(data);
    if (mapped) return mapped;
  }
  // fall back to the static case studies if the DB has nothing for this slug
  return STATIC_CASE_STUDIES[slug] || null;
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const data = await safeFetch<RawProject[]>("/api/projects");
  if (!data || data.length === 0) return Object.keys(STATIC_CASE_STUDIES);
  const slugs = data.filter((p) => p.caseStudy).map((p) => p.slug);
  return slugs.length > 0 ? slugs : Object.keys(STATIC_CASE_STUDIES);
}
