export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  tags: string[];
  githubUrl: string;
  liveDemoUrl: string;
  caseStudySlug?: string;
  category: 'backend' | 'fullstack' | 'distributed' | 'fintech' | 'analytics' | 'microservices';
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor: 'primary' | 'secondary' | 'tertiary';
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  isCurrent?: boolean;
}

export interface GitHubStat {
  totalCommits: number;
  starsEarned: number;
  repositoriesBuilt: number;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  tags: string[];
  problem: {
    description: string;
    quote: string;
  };
  solution: {
    description: string;
    highlights: string[];
  };
  architectureDiagramAlt: string;
  architectureDiagramUrl: string;
  keyFeatures: {
    icon: string;
    title: string;
    description: string;
  }[];
  liveMetrics: {
    label: string;
    value: string;
    color: string;
  }[];
  codeSnippet: {
    filename: string;
    code: string;
  };
  lessonsLearned: string[];
  githubUrl: string;
  fullDocUrl: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject?: string;
  message: string;
}
