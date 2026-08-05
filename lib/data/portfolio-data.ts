import { Project, SkillCategory, ExperienceItem, GitHubStat, Repository, CaseStudy } from '@/types/portfolio';

export const PERSONAL_INFO = {
  name: "Muhammad Sohail",
  title: "Backend Developer | Full-Stack Developer | BSCS Student",
  badge: "BACKEND ENGINEER",
  shortBio: "Building scalable backend systems and modern web applications using Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, and Next.js.",
  fullBio: "I'm Muhammad Sohail, a Computer Science student passionate about backend development and software engineering. I enjoy designing scalable APIs, building full-stack applications, working with databases, and continuously learning modern technologies. Currently, I'm focused on Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, Prisma, Docker, Redis, and modern software architecture while building production-ready projects.",
  careerGoal: "My goal is to become a world-class Backend Software Engineer by building scalable systems, contributing to impactful products, and continuously improving my software engineering skills.",
  education: {
    degree: "BS in Computer Science",
    focus: "Software Engineering & Systems Architecture",
  },
  location: "Karachi, Pakistan",
  status: "Open to Internships, Freelance Projects, and Remote Opportunities",
  githubUrl: "https://github.com/MuhammadSohail400",
  linkedinUrl: "https://linkedin.com/in/muhammad-sohail",
  twitterUrl: "https://twitter.com",
  email: "msohailg211@gmail.com",
  avatarUrl: "/avatar.jpeg",
  heroDiagramUrl: "/hero-diagram.png",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Engineering",
    description: "Building resilient RESTful APIs, business logic, and authentication flows.",
    icon: "database",
    accentColor: "primary",
    skills: ["NODE.JS", "EXPRESS.JS", "REST APIS", "TYPESCRIPT", "JWT AUTH"],
  },
  {
    id: "databases",
    title: "Databases & ORM",
    description: "Designing structured schemas, data integrity models, and database queries.",
    icon: "storage",
    accentColor: "secondary",
    skills: ["POSTGRESQL", "MONGODB", "PRISMA ORM", "MONGOOSE"],
  },
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core programming languages for algorithmic logic and software development.",
    icon: "terminal",
    accentColor: "tertiary",
    skills: ["C++", "JAVASCRIPT", "TYPESCRIPT"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Developing modern, responsive web interfaces with full-stack integration.",
    icon: "layers",
    accentColor: "primary",
    skills: ["NEXT.JS", "REACT.JS", "TAILWIND CSS", "HTML5", "CSS3"],
  },
  {
    id: "tools",
    title: "Developer Tools",
    description: "Version control, API testing, containerization, and development environment.",
    icon: "construction",
    accentColor: "secondary",
    skills: ["GIT", "GITHUB", "DOCKER", "POSTMAN", "VS CODE"],
  },
  {
    id: "learning",
    title: "Currently Learning",
    description: "Active focus on advanced backend concepts and emerging tech.",
    icon: "cloud",
    accentColor: "tertiary",
    skills: ["REDIS", "AI AGENTS", "SYSTEM DESIGN", "CLEAN ARCHITECTURE"],
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "shopsmart-ai",
    slug: "shopsmart-ai",
    title: "ShopSmart AI",
    shortDescription: "Enterprise backend architecture featuring JWT role-based authentication, product & inventory management, and structured REST APIs.",
    image: "/shopmart.png",
    imageAlt: "ShopSmart AI Backend Architecture",
    tags: ["NODE.JS", "TYPESCRIPT", "POSTGRESQL", "PRISMA", "REDIS"],
    githubUrl: "https://github.com/MuhammadSohail400",
    liveDemoUrl: "#",
    caseStudySlug: "shopsmart-ai",
    category: "backend",
  },
  {
    id: "restaurant-pos",
    slug: "restaurant-pos",
    title: "Restaurant POS System",
    shortDescription: "Full-stack Point of Sale application supporting table reservations, kitchen order management, billing, and category inventory.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh2e8rIltcm1Kd8vuDtcodU6Ut6eKXD0yWJ7aQgt-4Km1fNprZJmaqymv7xx-00Q6nDtWedzGvbMgkNqyhzck90LdqstekBRkO6ma6Q-saBOKbTsn7YKsmgIqIz-hqqya42dnW_PIWt67RIvMItvtWcuFxaLATKiTmEI5AVvQf6eO5kuCGWBP4S_xn62L5vKMQC9htgSURngSXJ9WsnOFN3E8UGUErwpXKVuQIYcd32yz9uNCXT_XTeg",
    imageAlt: "Restaurant POS Dashboard",
    tags: ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "PRISMA"],
    githubUrl: "https://github.com/MuhammadSohail400",
    liveDemoUrl: "#",
    caseStudySlug: "restaurant-pos",
    category: "fullstack",
  },
  {
    id: "portfolio-website",
    slug: "portfolio-website",
    title: "Full-Stack Portfolio",
    shortDescription: "Modern portfolio built with Next.js 15, Tailwind v4, custom theme switcher, Node.js Express backend, and Nodemailer email integration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCR01G6cdNs6krxfbd-5DwOqTJUFlnK5F0fG1ov5DABKi3ZuaDRPbeMBlhVSGMCCyczHyY3T0LhXnYWjqXrZdo9Snq6w5URhKCcTc4HXRGvpKdTxxwDJ7CPgh5Q4o9G_J-PQULq-aptsbtIsysjS8Ay7TsK2rXdAou-SXqVHIiQQDk8cciJYEUbetmRr7UX4MeMjIBoJ-MOLKemjA6go2vCyCwsxqWra32gwQmTakmRF3l_bAefgZwbw",
    imageAlt: "Portfolio Website Interface",
    tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "EXPRESS", "MONGODB"],
    githubUrl: "https://github.com/MuhammadSohail400",
    liveDemoUrl: "http://localhost:3001",
    caseStudySlug: "portfolio-website",
    category: "fullstack",
  },
  {
    id: "prisma-learning",
    slug: "prisma-learning",
    title: "Prisma & SQL Architecture Project",
    shortDescription: "Hands-on backend learning repository demonstrating database modeling, complex relations, migrations, and CRUD API operations.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNHm3FrgDUofHWHvJ0Ne_QkcC848dHPoH9sIoukMdTbgmH7S-T64AeywhA3GzueCuD1W1Mac52RvfVvg0m0z6Z7_Didah_d8oKP36Y9ImWhvSJiSRPPTEJDZwWScCVVvwcyWhJcZ-PoZoeFXWtgsEJ57uIeQplMmb41gvpZcvdTh8BR7tvjruEjQG2aCBe6_nl979G34EOydoIaZCqLISdxPeNQxt2au56_8e_DxUjlWhy-b4oYZ5Ddw",
    imageAlt: "Prisma Schema and Database Workbench",
    tags: ["NODE.JS", "TYPESCRIPT", "POSTGRESQL", "PRISMA"],
    githubUrl: "https://github.com/MuhammadSohail400",
    liveDemoUrl: "#",
    caseStudySlug: "prisma-learning",
    category: "backend",
  },
];

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full-Stack & Backend Project Developer",
    company: "Personal & Academic Projects",
    period: "2024 — PRESENT",
    description: "Architecting end-to-end applications including ShopSmart AI backend with Prisma & PostgreSQL, a Restaurant POS system with React & Express, and a custom Next.js portfolio website.",
    technologies: ["Node.js", "Express", "TypeScript", "PostgreSQL", "MongoDB", "Next.js"],
    isCurrent: true,
  },
  {
    id: "exp-2",
    role: "Backend & Systems Learning Journey",
    company: "Self-Directed & BSCS Coursework",
    period: "2023 — 2024",
    description: "Deep-diving into backend fundamentals, RESTful API design, database normalization, relational modeling with Prisma, and basic containerization with Docker.",
    technologies: ["C++", "JavaScript", "TypeScript", "Git", "Postman", "Docker"],
  },
  {
    id: "exp-3",
    role: "Freelance & University Projects",
    company: "Freelance & Academic",
    period: "2023 — PRESENT",
    description: "Collaborating on client web tasks and university computer science assignments, delivering clean, maintainable code adhering to software engineering principles.",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "React.js", "Node.js"],
  },
];

export const GITHUB_STATS: GitHubStat = {
  totalCommits: 350,
  starsEarned: 24,
  repositoriesBuilt: 15,
};

export const TOP_REPOSITORIES: Repository[] = [
  {
    id: "repo-1",
    name: "shopsmart-backend",
    description: "Scalable E-commerce API architecture built with Node.js, Express, TypeScript, and PostgreSQL via Prisma ORM.",
    language: "TypeScript",
    stars: 12,
    forks: 3,
    url: "https://github.com/MuhammadSohail400",
  },
  {
    id: "repo-2",
    name: "restaurant-pos-system",
    description: "Full-Stack Point of Sale application featuring order tracking, kitchen workflow, and billing.",
    language: "JavaScript",
    stars: 8,
    forks: 2,
    url: "https://github.com/MuhammadSohail400",
  },
  {
    id: "repo-3",
    name: "portfolio-website",
    description: "Production-ready portfolio web application built with Next.js 15, Tailwind CSS, Express, and Nodemailer.",
    language: "TypeScript",
    stars: 6,
    forks: 1,
    url: "https://github.com/MuhammadSohail400",
  },
];

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "shopsmart-ai": {
    slug: "shopsmart-ai",
    title: "ShopSmart AI Backend Architecture",
    subtitle: "A scalable, production-ready backend designed for e-commerce with JWT authentication, role-based authorization, and PostgreSQL data persistence.",
    categoryTag: "Backend Architecture",
    tags: ["NODE.JS", "EXPRESS", "TYPESCRIPT", "POSTGRESQL", "PRISMA"],
    problem: {
      description: "E-commerce backends often suffer from unstructured API routes, coupled business logic, and insecure authentication handling. The objective was to build a clean layer-separated API capable of handling complex relational schemas for products, orders, users, and inventory.",
      quote: '"Clean software architecture is about separating concerns so the system can evolve without breaking."',
    },
    solution: {
      description: "Designed a modular Node.js + Express backend utilizing TypeScript for strict compile-time safety. Leveraged Prisma ORM with PostgreSQL for data integrity, implemented JWT middleware for secure endpoint protection, and structured clean controller-service-repository layers.",
      highlights: [
        "Strict TypeScript type-safety across controllers, services, and models",
        "Role-Based Access Control (RBAC) protecting admin and user routes",
        "Relational schema design with Prisma ORM ensuring transactional integrity",
      ],
    },
    architectureDiagramAlt: "ShopSmart Backend Layered Architecture Diagram",
    architectureDiagramUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNHm3FrgDUofHWHvJ0Ne_QkcC848dHPoH9sIoukMdTbgmH7S-T64AeywhA3GzueCuD1W1Mac52RvfVvg0m0z6Z7_Didah_d8oKP36Y9ImWhvSJiSRPPTEJDZwWScCVVvwcyWhJcZ-PoZoeFXWtgsEJ57uIeQplMmb41gvpZcvdTh8BR7tvjruEjQG2aCBe6_nl979G34EOydoIaZCqLISdxPeNQxt2au56_8e_DxUjlWhy-b4oYZ5Ddw",
    keyFeatures: [
      {
        icon: "security",
        title: "JWT Authentication",
        description: "Secure user registration, token generation, and password hashing using bcrypt.",
      },
      {
        icon: "hub",
        title: "Layered Controller Pattern",
        description: "Decoupled route handlers from business services for clean maintenance.",
      },
      {
        icon: "bolt",
        title: "Prisma Database ORM",
        description: "Automated schema migrations and type-safe relational database queries.",
      },
      {
        icon: "rotate_left",
        title: "Global Error Middleware",
        description: "Consistent JSON error responses with standard HTTP status code handling.",
      },
    ],
    liveMetrics: [
      { label: "API RESPONSIVENESS", value: "< 25ms", color: "text-primary-fixed-dim" },
      { label: "AUTH INTEGRITY", value: "100% JWT", color: "text-secondary-fixed-dim" },
      { label: "TYPE COVERAGE", value: "100%", color: "text-tertiary-fixed-dim" },
    ],
    codeSnippet: {
      filename: "authMiddleware.ts",
      code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid Token' });
    req.user = user;
    next();
  });
};`,
    },
    lessonsLearned: [
      "Implementing strict TypeScript interfaces for request bodies and response DTOs eliminated runtime property errors early in development.",
      "Prisma schema modeling helped clarify database relations (1-to-many, many-to-many) before writing any API endpoint code.",
    ],
    githubUrl: "https://github.com/MuhammadSohail400",
    fullDocUrl: "https://github.com/MuhammadSohail400",
  },

  "restaurant-pos": {
    slug: "restaurant-pos",
    title: "Restaurant POS Management System",
    subtitle: "A comprehensive point-of-sale solution managing real-time table orders, kitchen workflows, billing, and category inventory.",
    categoryTag: "Full-Stack Application",
    tags: ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "PRISMA"],
    problem: {
      description: "Restaurant staff need immediate, real-time coordination between floor servers, kitchen cooks, and checkout billing to avoid delayed orders and billing mismatches during rush hours.",
      quote: '"Fast, error-free order management is the backbone of efficient restaurant operations."',
    },
    solution: {
      description: "Built a full-stack POS application with React for the floor interface and Node.js + Express for order processing and inventory management. Designed a relational schema for products, categories, tables, and live order status tracking.",
      highlights: [
        "Real-time order tracking across floor tables and kitchen views",
        "Category & inventory management with automated stock updates",
        "Streamlined billing calculation with split and receipt handling",
      ],
    },
    architectureDiagramAlt: "Restaurant POS System Architecture",
    architectureDiagramUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh2e8rIltcm1Kd8vuDtcodU6Ut6eKXD0yWJ7aQgt-4Km1fNprZJmaqymv7xx-00Q6nDtWedzGvbMgkNqyhzck90LdqstekBRkO6ma6Q-saBOKbTsn7YKsmgIqIz-hqqya42dnW_PIWt67RIvMItvtWcuFxaLATKiTmEI5AVvQf6eO5kuCGWBP4S_xn62L5vKMQC9htgSURngSXJ9WsnOFN3E8UGUErwpXKVuQIYcd32yz9uNCXT_XTeg",
    keyFeatures: [
      {
        icon: "hub",
        title: "Order Flow Management",
        description: "Move orders seamlessly from placed → kitchen preparation → served → paid.",
      },
      {
        icon: "bolt",
        title: "Category & Inventory Tracking",
        description: "Organized menu management with low-stock alerts.",
      },
      {
        icon: "security",
        title: "Secure API Endpoints",
        description: "Express route authentication preventing unauthorized modifications.",
      },
      {
        icon: "rotate_left",
        title: "Table Status Grid",
        description: "Visual floor map indicating active, reserved, and available tables.",
      },
    ],
    liveMetrics: [
      { label: "ORDER LATENCY", value: "< 50ms", color: "text-primary-fixed-dim" },
      { label: "TABLE SYNC", value: "Real-time", color: "text-secondary-fixed-dim" },
      { label: "UPTIME", value: "99.9%", color: "text-tertiary-fixed-dim" },
    ],
    codeSnippet: {
      filename: "orderController.js",
      code: `export const createOrder = async (req, res, next) => {
  try {
    const { tableId, items, totalAmount } = req.body;
    const order = await prisma.order.create({
      data: {
        tableId,
        totalAmount,
        status: 'PENDING',
        items: { create: items.map(item => ({ productId: item.id, quantity: item.qty })) }
      }
    });
    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};`,
    },
    lessonsLearned: [
      "State management in React required careful structuring to avoid redundant renders during high-frequency cart updates.",
      "Structuring database indexes on order status improved kitchen view query speed under high load.",
    ],
    githubUrl: "https://github.com/MuhammadSohail400",
    fullDocUrl: "https://github.com/MuhammadSohail400",
  },

  "portfolio-website": {
    slug: "portfolio-website",
    title: "Full-Stack Engineer Portfolio",
    subtitle: "A modern, high-performance portfolio featuring Next.js 15 App Router, Tailwind CSS v4, dynamic accent color themes, and Express contact API.",
    categoryTag: "Full-Stack & UX Architecture",
    tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "EXPRESS", "MONGODB"],
    problem: {
      description: "Standard portfolio templates lack custom themes, backend integration, dynamic data routing, and accessibility standards required for software engineering portfolios.",
      quote: '"A developer\'s portfolio should reflect their software standards in design, performance, and code clean-ness."',
    },
    solution: {
      description: "Developed a modern Web App using Next.js 15 with TypeScript, Tailwind v4 CSS variable design tokens, a 7-color theme switcher with zero FOUC, and an Express.js backend for contact form storage & email dispatch.",
      highlights: [
        "Lightweight page load with zero hydration warnings",
        "Custom 7-theme palette switcher with localStorage persistence",
        "Express backend integration with Nodemailer & MongoDB Atlas",
      ],
    },
    architectureDiagramAlt: "Portfolio Website System Architecture",
    architectureDiagramUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCR01G6cdNs6krxfbd-5DwOqTJUFlnK5F0fG1ov5DABKi3ZuaDRPbeMBlhVSGMCCyczHyY3T0LhXnYWjqXrZdo9Snq6w5URhKCcTc4HXRGvpKdTxxwDJ7CPgh5Q4o9G_J-PQULq-aptsbtIsysjS8Ay7TsK2rXdAou-SXqVHIiQQDk8cciJYEUbetmRr7UX4MeMjIBoJ-MOLKemjA6go2vCyCwsxqWra32gwQmTakmRF3l_bAefgZwbw",
    keyFeatures: [
      {
        icon: "bolt",
        title: "Next.js 15 App Router",
        description: "Static generation with client-side interactivity and Framer Motion micro-animations.",
      },
      {
        icon: "security",
        title: "Express & Nodemailer",
        description: "Secure contact endpoint with email dispatch and database persistence.",
      },
      {
        icon: "hub",
        title: "Theme System",
        description: "CSS variable token overrides per theme without JS runtime overhead.",
      },
      {
        icon: "rotate_left",
        title: "SEO & Open Graph",
        description: "Structured Schema.org metadata, canonical tags, and social cards.",
      },
    ],
    liveMetrics: [
      { label: "PERFORMANCE", value: "100%", color: "text-primary-fixed-dim" },
      { label: "PAGE WEIGHT", value: "~103 kB", color: "text-secondary-fixed-dim" },
      { label: "THEMES", value: "7 Colors", color: "text-tertiary-fixed-dim" },
    ],
    codeSnippet: {
      filename: "theme-provider.tsx",
      code: `export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("blue");

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.classList.add("theme-switching");
    setTimeout(() => document.documentElement.classList.remove("theme-switching"), 280);
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
    if (t === "blue") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}`,
    },
    lessonsLearned: [
      "Preventing Flash of Unstyled Content (FOUC) requires executing a synchronous inline script in <head> before React hydration.",
      "Tailwind v4 CSS variables enable instant theme updates across all components cleanly.",
    ],
    githubUrl: "https://github.com/MuhammadSohail400",
    fullDocUrl: "https://github.com/MuhammadSohail400",
  },

  "prisma-learning": {
    slug: "prisma-learning",
    title: "Prisma & SQL Architecture Project",
    subtitle: "A hands-on backend learning repository demonstrating database modeling, complex relations, migrations, and CRUD API development.",
    categoryTag: "Database Engineering",
    tags: ["NODE.JS", "TYPESCRIPT", "POSTGRESQL", "PRISMA"],
    problem: {
      description: "Mastering ORM schema migrations, 1-to-N & N-to-M data modeling, and query performance optimization requires dedicated sandbox experimentation before production deployment.",
      quote: '"Understanding database migrations and relation mapping prevents costly data corruption in production."',
    },
    solution: {
      description: "Constructed a comprehensive Prisma sandbox repository with TypeScript and PostgreSQL, showcasing database schema migrations, relational seeders, transaction handling, and type-safe query builders.",
      highlights: [
        "Hands-on demonstration of Prisma Schema modeling and migrations",
        "ACID-compliant transaction operations with raw query fallbacks",
        "Clean REST API endpoints demonstrating full CRUD operations",
      ],
    },
    architectureDiagramAlt: "Prisma Schema Database ERD",
    architectureDiagramUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNHm3FrgDUofHWHvJ0Ne_QkcC848dHPoH9sIoukMdTbgmH7S-T64AeywhA3GzueCuD1W1Mac52RvfVvg0m0z6Z7_Didah_d8oKP36Y9ImWhvSJiSRPPTEJDZwWScCVVvwcyWhJcZ-PoZoeFXWtgsEJ57uIeQplMmb41gvpZcvdTh8BR7tvjruEjQG2aCBe6_nl979G34EOydoIaZCqLISdxPeNQxt2au56_8e_DxUjlWhy-b4oYZ5Ddw",
    keyFeatures: [
      {
        icon: "bolt",
        title: "Relational Modeling",
        description: "1-to-1, 1-to-many, and many-to-many relation modeling with cascade delete policies.",
      },
      {
        icon: "security",
        title: "Type-Safe Client",
        description: "Auto-generated Prisma Client types eliminating invalid column query bugs.",
      },
      {
        icon: "hub",
        title: "Migration Scripts",
        description: "Versioned SQL migration history tracking schema evolution.",
      },
      {
        icon: "rotate_left",
        title: "Seed Scripts",
        description: "Automated mock data population for development environments.",
      },
    ],
    liveMetrics: [
      { label: "QUERY SAFETY", value: "100%", color: "text-primary-fixed-dim" },
      { label: "MIGRATIONS", value: "Tracked", color: "text-secondary-fixed-dim" },
      { label: "DATABASE", value: "PostgreSQL", color: "text-tertiary-fixed-dim" },
    ],
    codeSnippet: {
      filename: "schema.prisma",
      code: `model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(uuid())
  title     String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}`,
    },
    lessonsLearned: [
      "Prisma relations require explicit onDelete policies to maintain data integrity when parent records are deleted.",
      "Using `$transaction` ensures multiple database writes complete atomically or rollback together on failure.",
    ],
    githubUrl: "https://github.com/MuhammadSohail400",
    fullDocUrl: "https://github.com/MuhammadSohail400",
  },
};

export const SYCNODE_CASE_STUDY = CASE_STUDIES["shopsmart-ai"];
