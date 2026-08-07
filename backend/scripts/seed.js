/**
 * One-time migration script.
 * Copies the data that used to live in `lib/data/portfolio-data.ts`
 * (frontend static file) into MongoDB, so the admin panel has something
 * to edit from day one instead of starting blank.
 *
 * Run once from the backend folder:
 *   node scripts/seed.js
 *
 * Safe to re-run — it upserts by slug/categoryId and replaces the
 * single SiteContent document, so running it twice won't duplicate data.
 */
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const SiteContent = require('../src/models/SiteContent');
const SkillCategory = require('../src/models/SkillCategory');
const Project = require('../src/models/Project');

const PERSONAL_INFO = {
  name: 'Muhammad Sohail',
  title: 'Backend Developer | Full-Stack Developer | BSCS Student',
  badge: 'BACKEND ENGINEER',
  shortBio:
    'Building scalable backend systems and modern web applications using Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, and Next.js.',
  fullBio:
    "I'm Muhammad Sohail, a Computer Science student passionate about backend development and software engineering. I enjoy designing scalable APIs, building full-stack applications, working with databases, and continuously learning modern technologies. Currently, I'm focused on Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, Prisma, Docker, Redis, and modern software architecture while building production-ready projects.",
  careerGoal:
    'My goal is to become a world-class Backend Software Engineer by building scalable systems, contributing to impactful products, and continuously improving my software engineering skills.',
  education: {
    degree: 'BS in Computer Science',
    focus: 'Software Engineering & Systems Architecture',
  },
  location: 'Karachi, Pakistan',
  status: 'Open to Internships, Freelance Projects, and Remote Opportunities',
  githubUrl: 'https://github.com/MuhammadSohail400',
  linkedinUrl: 'https://linkedin.com/in/muhammad-sohail',
  twitterUrl: 'https://twitter.com',
  email: 'msohailg211@gmail.com',
  avatarUrl: '/avatar.jpeg',
  heroDiagramUrl: '/hero-diagram.png',
};

const SKILL_CATEGORIES = [
  {
    categoryId: 'backend',
    title: 'Backend Engineering',
    description: 'Building resilient RESTful APIs, business logic, and authentication flows.',
    icon: 'database',
    accentColor: 'primary',
    skills: ['NODE.JS', 'EXPRESS.JS', 'REST APIS', 'TYPESCRIPT', 'JWT AUTH'],
    order: 0,
  },
  {
    categoryId: 'databases',
    title: 'Databases & ORM',
    description: 'Designing structured schemas, data integrity models, and database queries.',
    icon: 'storage',
    accentColor: 'secondary',
    skills: ['POSTGRESQL', 'MONGODB', 'PRISMA ORM', 'MONGOOSE'],
    order: 1,
  },
  {
    categoryId: 'languages',
    title: 'Programming Languages',
    description: 'Core programming languages for algorithmic logic and software development.',
    icon: 'terminal',
    accentColor: 'tertiary',
    skills: ['C++', 'JAVASCRIPT', 'TYPESCRIPT'],
    order: 2,
  },
  {
    categoryId: 'frontend',
    title: 'Frontend Development',
    description: 'Developing modern, responsive web interfaces with full-stack integration.',
    icon: 'layers',
    accentColor: 'primary',
    skills: ['NEXT.JS', 'REACT.JS', 'TAILWIND CSS', 'HTML5', 'CSS3'],
    order: 3,
  },
  {
    categoryId: 'tools',
    title: 'Developer Tools',
    description: 'Version control, API testing, containerization, and development environment.',
    icon: 'construction',
    accentColor: 'secondary',
    skills: ['GIT', 'GITHUB', 'DOCKER', 'POSTMAN', 'VS CODE'],
    order: 4,
  },
  {
    categoryId: 'learning',
    title: 'Currently Learning',
    description: 'Active focus on advanced backend concepts and emerging tech.',
    icon: 'cloud',
    accentColor: 'tertiary',
    skills: ['REDIS', 'AI AGENTS', 'SYSTEM DESIGN', 'CLEAN ARCHITECTURE'],
    order: 5,
  },
];

// Projects, each with its case study folded in (or omitted if there isn't one)
const PROJECTS = [
  {
    slug: 'shopsmart-ai',
    title: 'ShopSmart AI',
    shortDescription:
      'Enterprise backend architecture featuring JWT role-based authentication, product & inventory management, and structured REST APIs.',
    image: '/shopmart.png',
    imageAlt: 'ShopSmart AI Backend Architecture',
    tags: ['NODE.JS', 'TYPESCRIPT', 'POSTGRESQL', 'PRISMA', 'REDIS'],
    githubUrl: 'https://github.com/MuhammadSohail400',
    liveDemoUrl: '#',
    category: 'backend',
    order: 0,
    caseStudy: {
      title: 'ShopSmart AI Backend Architecture',
      subtitle:
        'A scalable, production-ready backend designed for e-commerce with JWT authentication, role-based authorization, and PostgreSQL data persistence.',
      categoryTag: 'Backend Architecture',
      tags: ['NODE.JS', 'EXPRESS', 'TYPESCRIPT', 'POSTGRESQL', 'PRISMA'],
      problem: {
        description:
          'E-commerce backends often suffer from unstructured API routes, coupled business logic, and insecure authentication handling. The objective was to build a clean layer-separated API capable of handling complex relational schemas for products, orders, users, and inventory.',
        quote: '"Clean software architecture is about separating concerns so the system can evolve without breaking."',
      },
      solution: {
        description:
          'Designed a modular Node.js + Express backend utilizing TypeScript for strict compile-time safety. Leveraged Prisma ORM with PostgreSQL for data integrity, implemented JWT middleware for secure endpoint protection, and structured clean controller-service-repository layers.',
        highlights: [
          'Strict TypeScript type-safety across controllers, services, and models',
          'Role-Based Access Control (RBAC) protecting admin and user routes',
          'Relational schema design with Prisma ORM ensuring transactional integrity',
        ],
      },
      architectureDiagramAlt: 'ShopSmart Backend Layered Architecture Diagram',
      architectureDiagramUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBNHm3FrgDUofHWHvJ0Ne_QkcC848dHPoH9sIoukMdTbgmH7S-T64AeywhA3GzueCuD1W1Mac52RvfVvg0m0z6Z7_Didah_d8oKP36Y9ImWhvSJiSRPPTEJDZwWScCVVvwcyWhJcZ-PoZoeFXWtgsEJ57uIeQplMmb41gvpZcvdTh8BR7tvjruEjQG2aCBe6_nl979G34EOydoIaZCqLISdxPeNQxt2au56_8e_DxUjlWhy-b4oYZ5Ddw',
      keyFeatures: [
        { icon: 'security', title: 'JWT Authentication', description: 'Secure user registration, token generation, and password hashing using bcrypt.' },
        { icon: 'hub', title: 'Layered Controller Pattern', description: 'Decoupled route handlers from business services for clean maintenance.' },
        { icon: 'bolt', title: 'Prisma Database ORM', description: 'Automated schema migrations and type-safe relational database queries.' },
        { icon: 'rotate_left', title: 'Global Error Middleware', description: 'Consistent JSON error responses with standard HTTP status code handling.' },
      ],
      liveMetrics: [
        { label: 'API RESPONSIVENESS', value: '< 25ms', color: 'text-primary-fixed-dim' },
        { label: 'AUTH INTEGRITY', value: '100% JWT', color: 'text-secondary-fixed-dim' },
        { label: 'TYPE COVERAGE', value: '100%', color: 'text-tertiary-fixed-dim' },
      ],
      codeSnippet: {
        filename: 'authMiddleware.ts',
        code: `import { Request, Response, NextFunction } from 'express';\nimport jwt from 'jsonwebtoken';\n\nexport const authenticateToken = (req: Request, res: Response, next: NextFunction) => {\n  const authHeader = req.headers['authorization'];\n  const token = authHeader && authHeader.split(' ')[1];\n\n  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });\n\n  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {\n    if (err) return res.status(403).json({ success: false, message: 'Invalid Token' });\n    req.user = user;\n    next();\n  });\n};`,
      },
      lessonsLearned: [
        'Implementing strict TypeScript interfaces for request bodies and response DTOs eliminated runtime property errors early in development.',
        'Prisma schema modeling helped clarify database relations (1-to-many, many-to-many) before writing any API endpoint code.',
      ],
      githubUrl: 'https://github.com/MuhammadSohail400',
      fullDocUrl: 'https://github.com/MuhammadSohail400',
    },
  },
  {
    slug: 'restaurant-pos',
    title: 'Restaurant POS System',
    shortDescription:
      'Full-stack Point of Sale application supporting table reservations, kitchen order management, billing, and category inventory.',
    image: '/restaurant-pos.png',
    imageAlt: 'Restaurant POS Dashboard',
    tags: ['REACT', 'NODE.JS', 'EXPRESS', 'MONGODB', 'PRISMA'],
    githubUrl: 'https://github.com/MuhammadSohail400',
    liveDemoUrl: '#',
    category: 'fullstack',
    order: 1,
    caseStudy: {
      title: 'Restaurant POS Management System',
      subtitle:
        'A comprehensive point-of-sale solution managing real-time table orders, kitchen workflows, billing, and category inventory.',
      categoryTag: 'Full-Stack Application',
      tags: ['REACT', 'NODE.JS', 'EXPRESS', 'MONGODB', 'PRISMA'],
      problem: {
        description:
          'Restaurant staff need immediate, real-time coordination between floor servers, kitchen cooks, and checkout billing to avoid delayed orders and billing mismatches during rush hours.',
        quote: '"Fast, error-free order management is the backbone of efficient restaurant operations."',
      },
      solution: {
        description:
          'Built a full-stack POS application with React for the floor interface and Node.js + Express for order processing and inventory management. Designed a relational schema for products, categories, tables, and live order status tracking.',
        highlights: [
          'Real-time order tracking across floor tables and kitchen views',
          'Category & inventory management with automated stock updates',
          'Streamlined billing calculation with split and receipt handling',
        ],
      },
      architectureDiagramAlt: 'Restaurant POS System Architecture',
      architectureDiagramUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBh2e8rIltcm1Kd8vuDtcodU6Ut6eKXD0yWJ7aQgt-4Km1fNprZJmaqymv7xx-00Q6nDtWedzGvbMgkNqyhzck90LdqstekBRkO6ma6Q-saBOKbTsn7YKsmgIqIz-hqqya42dnW_PIWt67RIvMItvtWcuFxaLATKiTmEI5AVvQf6eO5kuCGWBP4S_xn62L5vKMQC9htgSURngSXJ9WsnOFN3E8UGUErwpXKVuQIYcd32yz9uNCXT_XTeg',
      keyFeatures: [
        { icon: 'hub', title: 'Order Flow Management', description: 'Move orders seamlessly from placed → kitchen preparation → served → paid.' },
        { icon: 'bolt', title: 'Category & Inventory Tracking', description: 'Organized menu management with low-stock alerts.' },
        { icon: 'security', title: 'Secure API Endpoints', description: 'Express route authentication preventing unauthorized modifications.' },
        { icon: 'rotate_left', title: 'Table Status Grid', description: 'Visual floor map indicating active, reserved, and available tables.' },
      ],
      liveMetrics: [
        { label: 'ORDER LATENCY', value: '< 50ms', color: 'text-primary-fixed-dim' },
        { label: 'TABLE SYNC', value: 'Real-time', color: 'text-secondary-fixed-dim' },
        { label: 'UPTIME', value: '99.9%', color: 'text-tertiary-fixed-dim' },
      ],
      codeSnippet: {
        filename: 'orderController.js',
        code: `export const createOrder = async (req, res, next) => {\n  try {\n    const { tableId, items, totalAmount } = req.body;\n    const order = await prisma.order.create({\n      data: {\n        tableId,\n        totalAmount,\n        status: 'PENDING',\n        items: { create: items.map(item => ({ productId: item.id, quantity: item.qty })) }\n      }\n    });\n    res.status(201).json({ success: true, order });\n  } catch (err) {\n    next(err);\n  }\n};`,
      },
      lessonsLearned: [
        'State management in React required careful structuring to avoid redundant renders during high-frequency cart updates.',
        'Structuring database indexes on order status improved kitchen view query speed under high load.',
      ],
      githubUrl: 'https://github.com/MuhammadSohail400',
      fullDocUrl: 'https://github.com/MuhammadSohail400',
    },
  },
  {
    slug: 'portfolio-website',
    title: 'Full-Stack Portfolio',
    shortDescription:
      'Modern portfolio built with Next.js 15, Tailwind v4, custom theme switcher, Node.js Express backend, and email integration.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCR01G6cdNs6krxfbd-5DwOqTJUFlnK5F0fG1ov5DABKi3ZuaDRPbeMBlhVSGMCCyczHyY3T0LhXnYWjqXrZdo9Snq6w5URhKCcTc4HXRGvpKdTxxwDJ7CPgh5Q4o9G_J-PQULq-aptsbtIsysjS8Ay7TsK2rXdAou-SXqVHIiQQDk8cciJYEUbetmRr7UX4MeMjIBoJ-MOLKemjA6go2vCyCwsxqWra32gwQmTakmRF3l_bAefgZwbw',
    imageAlt: 'Portfolio Website Interface',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'EXPRESS', 'MONGODB'],
    githubUrl: 'https://github.com/MuhammadSohail400',
    liveDemoUrl: 'http://localhost:3001',
    category: 'fullstack',
    order: 2,
    caseStudy: {
      title: 'Full-Stack Engineer Portfolio',
      subtitle:
        'A modern, high-performance portfolio featuring Next.js 15 App Router, Tailwind CSS v4, dynamic accent color themes, and Express contact API.',
      categoryTag: 'Full-Stack & UX Architecture',
      tags: ['NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'EXPRESS', 'MONGODB'],
      problem: {
        description:
          'Standard portfolio templates lack custom themes, backend integration, dynamic data routing, and accessibility standards required for software engineering portfolios.',
        quote: '"A developer\'s portfolio should reflect their software standards in design, performance, and code clean-ness."',
      },
      solution: {
        description:
          'Developed a modern Web App using Next.js 15 with TypeScript, Tailwind v4 CSS variable design tokens, a 7-color theme switcher with zero FOUC, and an Express.js backend for contact form storage & email dispatch.',
        highlights: [
          'Lightweight page load with zero hydration warnings',
          'Custom 7-theme palette switcher with localStorage persistence',
          'Express backend integration with Nodemailer & MongoDB Atlas',
        ],
      },
      architectureDiagramAlt: 'Portfolio Website System Architecture',
      architectureDiagramUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBCR01G6cdNs6krxfbd-5DwOqTJUFlnK5F0fG1ov5DABKi3ZuaDRPbeMBlhVSGMCCyczHyY3T0LhXnYWjqXrZdo9Snq6w5URhKCcTc4HXRGvpKdTxxwDJ7CPgh5Q4o9G_J-PQULq-aptsbtIsysjS8Ay7TsK2rXdAou-SXqVHIiQQDk8cciJYEUbetmRr7UX4MeMjIBoJ-MOLKemjA6go2vCyCwsxqWra32gwQmTakmRF3l_bAefgZwbw',
      keyFeatures: [
        { icon: 'bolt', title: 'Next.js 15 App Router', description: 'Static generation with client-side interactivity and Framer Motion micro-animations.' },
        { icon: 'security', title: 'Express & Nodemailer', description: 'Secure contact endpoint with email dispatch and database persistence.' },
        { icon: 'hub', title: 'Theme System', description: 'CSS variable token overrides per theme without JS runtime overhead.' },
        { icon: 'rotate_left', title: 'SEO & Open Graph', description: 'Structured Schema.org metadata, canonical tags, and social cards.' },
      ],
      liveMetrics: [
        { label: 'PERFORMANCE', value: '100%', color: 'text-primary-fixed-dim' },
        { label: 'PAGE WEIGHT', value: '~103 kB', color: 'text-secondary-fixed-dim' },
        { label: 'THEMES', value: '7 Colors', color: 'text-tertiary-fixed-dim' },
      ],
      codeSnippet: {
        filename: 'theme-provider.tsx',
        code: `export function ThemeProvider({ children }: { children: React.ReactNode }) {\n  const [theme, setThemeState] = useState<Theme>("blue");\n\n  const setTheme = useCallback((t: Theme) => {\n    document.documentElement.classList.add("theme-switching");\n    setTimeout(() => document.documentElement.classList.remove("theme-switching"), 280);\n    setThemeState(t);\n    localStorage.setItem("portfolio-theme", t);\n    if (t === "blue") document.documentElement.removeAttribute("data-theme");\n    else document.documentElement.setAttribute("data-theme", t);\n  }, []);\n\n  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;\n}`,
      },
      lessonsLearned: [
        'Preventing Flash of Unstyled Content (FOUC) requires executing a synchronous inline script in <head> before React hydration.',
        'Tailwind v4 CSS variables enable instant theme updates across all components cleanly.',
      ],
      githubUrl: 'https://github.com/MuhammadSohail400',
      fullDocUrl: 'https://github.com/MuhammadSohail400',
    },
  },
  {
    slug: 'prisma-learning',
    title: 'Prisma & SQL Architecture Project',
    shortDescription:
      'Hands-on backend learning repository demonstrating database modeling, complex relations, migrations, and CRUD API operations.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNHm3FrgDUofHWHvJ0Ne_QkcC848dHPoH9sIoukMdTbgmH7S-T64AeywhA3GzueCuD1W1Mac52RvfVvg0m0z6Z7_Didah_d8oKP36Y9ImWhvSJiSRPPTEJDZwWScCVVvwcyWhJcZ-PoZoeFXWtgsEJ57uIeQplMmb41gvpZcvdTh8BR7tvjruEjQG2aCBe6_nl979G34EOydoIaZCqLISdxPeNQxt2au56_8e_DxUjlWhy-b4oYZ5Ddw',
    imageAlt: 'Prisma Schema and Database Workbench',
    tags: ['NODE.JS', 'TYPESCRIPT', 'POSTGRESQL', 'PRISMA'],
    githubUrl: 'https://github.com/MuhammadSohail400',
    liveDemoUrl: '#',
    category: 'backend',
    order: 3,
    caseStudy: {
      title: 'Prisma & SQL Architecture Project',
      subtitle:
        'A hands-on backend learning repository demonstrating database modeling, complex relations, migrations, and CRUD API development.',
      categoryTag: 'Database Engineering',
      tags: ['NODE.JS', 'TYPESCRIPT', 'POSTGRESQL', 'PRISMA'],
      problem: {
        description:
          'Mastering ORM schema migrations, 1-to-N & N-to-M data modeling, and query performance optimization requires dedicated sandbox experimentation before production deployment.',
        quote: '"Understanding database migrations and relation mapping prevents costly data corruption in production."',
      },
      solution: {
        description:
          'Constructed a comprehensive Prisma sandbox repository with TypeScript and PostgreSQL, showcasing database schema migrations, relational seeders, transaction handling, and type-safe query builders.',
        highlights: [
          'Hands-on demonstration of Prisma Schema modeling and migrations',
          'ACID-compliant transaction operations with raw query fallbacks',
          'Clean REST API endpoints demonstrating full CRUD operations',
        ],
      },
      architectureDiagramAlt: 'Prisma Schema Database ERD',
      architectureDiagramUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBNHm3FrgDUofHWHvJ0Ne_QkcC848dHPoH9sIoukMdTbgmH7S-T64AeywhA3GzueCuD1W1Mac52RvfVvg0m0z6Z7_Didah_d8oKP36Y9ImWhvSJiSRPPTEJDZwWScCVVvwcyWhJcZ-PoZoeFXWtgsEJ57uIeQplMmb41gvpZcvdTh8BR7tvjruEjQG2aCBe6_nl979G34EOydoIaZCqLISdxPeNQxt2au56_8e_DxUjlWhy-b4oYZ5Ddw',
      keyFeatures: [
        { icon: 'bolt', title: 'Relational Modeling', description: '1-to-1, 1-to-many, and many-to-many relation modeling with cascade delete policies.' },
        { icon: 'security', title: 'Type-Safe Client', description: 'Auto-generated Prisma Client types eliminating invalid column query bugs.' },
        { icon: 'hub', title: 'Migration Scripts', description: 'Versioned SQL migration history tracking schema evolution.' },
        { icon: 'rotate_left', title: 'Seed Scripts', description: 'Automated mock data population for development environments.' },
      ],
      liveMetrics: [
        { label: 'QUERY SAFETY', value: '100%', color: 'text-primary-fixed-dim' },
        { label: 'MIGRATIONS', value: 'Tracked', color: 'text-secondary-fixed-dim' },
        { label: 'DATABASE', value: 'PostgreSQL', color: 'text-tertiary-fixed-dim' },
      ],
      codeSnippet: {
        filename: 'schema.prisma',
        code: `model User {\n  id        String   @id @default(uuid())\n  email     String   @unique\n  name      String\n  role      Role     @default(USER)\n  posts     Post[]\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id        String   @id @default(uuid())\n  title     String\n  author    User     @relation(fields: [authorId], references: [id])\n  authorId  String\n}`,
      },
      lessonsLearned: [
        'Prisma relations require explicit onDelete policies to maintain data integrity when parent records are deleted.',
        'Using `$transaction` ensures multiple database writes complete atomically or rollback together on failure.',
      ],
      githubUrl: 'https://github.com/MuhammadSohail400',
      fullDocUrl: 'https://github.com/MuhammadSohail400',
    },
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db';
  await mongoose.connect(uri);
  console.log('[Seed] Connected to MongoDB');

  await SiteContent.findOneAndUpdate({}, PERSONAL_INFO, { upsert: true, new: true });
  console.log('[Seed] Site content upserted');

  for (const category of SKILL_CATEGORIES) {
    await SkillCategory.findOneAndUpdate({ categoryId: category.categoryId }, category, {
      upsert: true,
      new: true,
    });
  }
  console.log(`[Seed] ${SKILL_CATEGORIES.length} skill categories upserted`);

  for (const project of PROJECTS) {
    await Project.findOneAndUpdate({ slug: project.slug }, project, { upsert: true, new: true });
  }
  console.log(`[Seed] ${PROJECTS.length} projects upserted`);

  console.log('[Seed] Done. You can now open /admin on the frontend.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('[Seed] Failed:', err);
  process.exit(1);
});
