# Product Requirements Document (PRD)
## Muhammad Sohail — Personal Portfolio Website

| | |
|---|---|
| **Document Owner** | Muhammad Sohail |
| **Prepared By** | Senior PM / UX / Engineering / Architecture (consolidated view) |
| **Version** | 1.0 |
| **Date** | August 2026 |
| **Status** | Draft for Build |

---

## 1. Executive Summary

Muhammad Sohail is a BSCS student and backend-leaning full-stack developer targeting roles as a **Backend Software Engineer** specializing in scalable APIs, distributed systems, PostgreSQL, Prisma, Node.js, TypeScript, and cloud infrastructure. His portfolio site is the single highest-leverage asset in his job search: it is the first artifact a recruiter, hiring manager, or founder will evaluate after a resume or LinkedIn profile.

This PRD defines a **light-themed, premium, SaaS-grade portfolio** (in the visual tier of Stripe, Linear, Vercel, Notion, Apple) built on **Next.js, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui**. The site's job is not merely to "look nice" — it must actively prove backend engineering competence through architecture diagrams, system-design write-ups, and real project case studies (e.g., his AI Smart POS + Inventory + Business OS, E-commerce/Inventory API, and Stub ticketing marketplace), while remaining fast, accessible, and effortless to navigate.

---

## 2. Project Vision

> **"A calm, credible, engineering-first portfolio that makes a hiring manager think: this person already thinks like a backend engineer — before they've even opened the resume."**

The site should feel less like a "student portfolio" and more like a **product page for an engineer** — restrained, confident, data-driven, and free of noise.

---

## 3. Goals

| Goal | Description |
|---|---|
| Build credibility | Position Sohail as a serious, hire-ready backend/full-stack engineer, not a bootcamp-style hobbyist |
| Showcase technical depth | Surface architecture thinking, not just "I used X library" |
| Present best work | 3–5 flagship projects with real case-study depth, not a grid of 15 shallow repos |
| Drive action | Every section should nudge toward "Contact" or "Download Resume" |
| Be fast & accessible | Should feel instant, work on any device, and pass WCAG AA |
| Be maintainable | Content (projects, skills, resume) should be easy to update without redesigning |

---

## 4. Scope

**In Scope (v1):**
- Single-page-feel scrolling site with anchor navigation (Hero → Contact)
- Dedicated project case-study pages (`/projects/[slug]`)
- Resume download (PDF)
- Contact form (email-based, no backend DB required for v1)
- GitHub stats integration (public API, cached)
- Light theme only, with a dark-mode-ready architecture (not built, but not blocked)
- SEO, OpenGraph, sitemap, analytics

**Out of Scope (v1):**
- Blog / CMS (future enhancement)
- Authentication / user accounts
- Admin dashboard for content editing (content lives in code/MDX/JSON for v1)
- Multi-language support
- Dark mode toggle (deferred — see §13)

---

## 5. Target Audience & User Personas

| Persona | Goal When Visiting | What Convinces Them |
|---|---|---|
| **Recruiter (non-technical)** | Quickly judge legitimacy, role fit, contact-ability | Clean design, clear headline, resume, easy contact |
| **Engineering Hiring Manager** | Assess real technical depth | Architecture diagrams, tech decisions, tradeoffs, code quality signals |
| **Startup Founder** | Can this person ship? Can I trust them with backend systems? | Case studies with problem→solution→impact framing |
| **Freelance Client** | Can they solve my specific problem, reliably? | Clear tech stack, past project relevance, contact CTA |
| **Technical Interviewer** | Verify claims, probe depth pre-interview | GitHub stats, code links, architecture write-ups |

---

## 6. User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-1 | Recruiter | See who Sohail is and his target role within 5 seconds | I can decide if he fits an open req |
| US-2 | Hiring Manager | Read a technical case study of a real project | I can assess system-design maturity |
| US-3 | Founder | See what tech stack he's proficient in at a glance | I can match him to my stack needs |
| US-4 | Any visitor | Download his resume in one click | I can pass it along or review offline |
| US-5 | Any visitor | Contact him directly from the site | I don't need to hunt for an email |
| US-6 | Technical Interviewer | View his GitHub activity/stats | I can verify consistency and real contribution |
| US-7 | Mobile visitor | Browse the entire site comfortably on a phone | I'm not blocked by desktop-only design |
| US-8 | Visually impaired visitor | Navigate via screen reader / keyboard | I can access all content regardless of ability |

---

## 7. Information Architecture

```
/
├── Hero
├── About
├── Skills & Tech Stack
├── Featured Projects (cards → deep dive)
│    └── /projects/[slug]  (full case study page)
├── Software Architecture Showcase
├── GitHub Statistics
├── Education
├── Certifications
├── Resume (download + preview)
├── Contact
└── Footer
```

**Navigation model:** single-page scroll for the marketing/story sections, with dedicated routed pages for deep project case studies (better for SEO, sharing, and back/forward browser behavior).

---

## 8. Navigation

| Aspect | Requirement |
|---|---|
| **Nav items** | Home, About, Skills, Projects, Architecture, Education, Resume, Contact |
| **Sticky navbar** | Fixed on scroll; transitions from transparent (over hero) to a subtle white/glass blurred bar with soft shadow after ~80px scroll |
| **Active section highlight** | Underline or pill-background indicator updates via `IntersectionObserver` as user scrolls |
| **Mobile nav** | Hamburger → full-screen slide-down/slide-in overlay menu, large tap targets (min 44px), auto-closes on link click |
| **Scroll behavior** | Smooth scroll with `scroll-margin-top` offset so sticky nav never covers section headings |
| **CTA in navbar** | Persistent "Resume" or "Contact Me" button, visually distinct (gradient fill), always reachable |
| **Keyboard nav** | Full tab-order support; visible focus rings; Escape closes mobile menu |

---

## 9. Section-by-Section Requirements

### 9.1 Hero

- **Purpose:** Establish identity, role, and value proposition in under 5 seconds; drive immediate action.
- **Required content:** Name, target role/title (e.g., "Backend Software Engineer"), one-line value proposition, primary CTA ("View Projects"), secondary CTA ("Download Resume"), subtle scroll-down indicator.
- **Optional content:** Rotating/typewriter text cycling through specialties (Node.js, PostgreSQL, Prisma, Distributed Systems), background gradient mesh or abstract animated grid, availability badge ("Open to Internships/Full-time").
- **UX considerations:** Generous whitespace, one clear focal point, no more than 2 CTAs, gradient (blue/purple) used sparingly as accent, not full background.
- **Mobile behavior:** Stack text and CTAs vertically, reduce heading font size proportionally, keep both CTAs visible without scrolling.
- **Accessibility:** Heading is a true `<h1>`, animated text has a static fallback / respects `prefers-reduced-motion`, sufficient color contrast on gradient text.

### 9.2 About Me

- **Purpose:** Humanize Sohail and connect his story to his career goal.
- **Required content:** Short narrative (who he is, BSCS status, career trajectory toward backend engineering), photo or stylized avatar, 3–4 key highlights (metrics or facts, e.g., "Built 3 production-style backend systems").
- **Optional content:** Timeline snippet, personal interests line (brief, professional), downloadable one-line "elevator pitch."
- **UX considerations:** Split layout (image/visual left, text right on desktop), short paragraphs (2–3 sentences max), scannable highlight chips/stats row.
- **Mobile behavior:** Stack image above text; highlight chips wrap into a 2-column grid.
- **Accessibility:** Alt text for photo describing context, not just "photo of Sohail"; text contrast AA minimum.

### 9.3 Skills

- **Purpose:** Give a fast, credible snapshot of technical range and proficiency level.
- **Required content:** Categorized skill groups — Backend (Node.js, Express, TypeScript), Databases (PostgreSQL, Prisma, MongoDB, Redis), Frontend (Next.js, React, Tailwind), Tools/DevOps (Docker, Git, CI basics, Cloud).
- **Optional content:** Proficiency indicators (subtle bars/dots — avoid gamified "90% React" clichés; prefer qualitative tiers: Core / Working / Familiar).
- **UX considerations:** Icon + label grid, grouped under clear category headers, consistent icon set (not mismatched styles).
- **Mobile behavior:** Categories collapse into a 2-column icon grid or horizontal scroll chips.
- **Accessibility:** Icons always paired with visible text labels (never icon-only).

### 9.4 Tech Stack

- **Purpose:** Show the specific, current toolchain he builds with — a deeper, more technical layer than "Skills."
- **Required content:** Grouped stack: Languages, Frameworks, ORMs/Databases, Infra/Cloud, Testing, Dev Tools.
- **Optional content:** "Currently learning" badge for tools in progress (shows growth mindset).
- **UX considerations:** Logo-grid (grayscale by default, color on hover) reads as premium/SaaS-like (à la Vercel's "works with" sections).
- **Mobile behavior:** Wrap into 3–4 per row; maintain equal spacing.
- **Accessibility:** Each logo has descriptive alt text (tool name).

### 9.5 Featured Projects

- **Purpose:** Prove real, applied engineering ability through his strongest 3–5 builds.
- **Required content per card:** Project name, one-line problem/value statement, tech badges, thumbnail/screenshot or architecture snapshot, "View Case Study" + "GitHub" links.
- **Suggested featured set (from his actual work):**
  1. **AI Smart POS + Inventory + Business OS** — multi-tenant SaaS-style POS/inventory/reporting system (Node.js, Express, PostgreSQL, Prisma, TypeScript, Clean Architecture).
  2. **Stub — P2P Ticket Resale Marketplace** — Next.js/TypeScript frontend against an Express + MongoDB backend.
  3. **E-commerce/Inventory API** — REST API foundation with auth, security, rate limiting, Redis, and RBAC.
- **Optional content:** Filter/tag by tech (Backend / Full-Stack / Frontend), "In Progress" status badge where relevant (accurate — some phases are still being built).
- **UX considerations:** Cards use soft shadow + rounded corners + subtle hover lift; avoid carousel patterns (hurt discoverability); grid of 3 across desktop, 1 across mobile.
- **Mobile behavior:** Stack vertically, maintain tap-friendly card size, lazy-load images.
- **Accessibility:** Cards are fully keyboard-navigable as single link regions; no "click here" link text.

### 9.6 Project Case Studies (`/projects/[slug]`)

- **Purpose:** Give hiring managers the depth to evaluate real engineering judgment.
- **Required content:** Problem Statement, Solution Overview, Key Features, Full Tech Stack, Architecture Overview (diagram), Challenges Faced, What He Learned, Screenshots/demo GIFs, GitHub link, Live Demo link (if available).
- **Optional content:** "Decisions & Tradeoffs" callout box (e.g., why Prisma over raw SQL, why Clean Architecture), performance notes, future roadmap for the project.
- **UX considerations:** Long-form readable layout, sticky mini table-of-contents on desktop, code-diagram visuals broken up with whitespace, pull-quotes for key learnings.
- **Mobile behavior:** TOC collapses into an accordion at top; diagrams remain zoomable/scrollable.
- **Accessibility:** Diagrams include text alternatives/descriptions; heading hierarchy (h1→h2→h3) strictly followed for screen-reader navigation.

### 9.7 Software Architecture Showcase

- **Purpose:** Directly differentiate Sohail as someone who thinks in systems, not just features — critical for backend-track hiring managers.
- **Required content:** 1–2 system design diagrams (e.g., multi-tenant POS architecture, auth/token-refresh flow), short annotated explanation of key design decisions (Clean Architecture layers, RBAC design, caching strategy).
- **Optional content:** "Trade-offs considered" section, database ER diagram snippet.
- **UX considerations:** Diagrams as clean SVG/illustration style matching site theme (not raw screenshots of whiteboards), annotated with numbered callouts.
- **Mobile behavior:** Diagrams scroll/pinch-zoom in a contained frame rather than shrinking illegibly.
- **Accessibility:** Provide a text-based structured summary alongside every diagram.

### 9.8 GitHub Statistics

- **Purpose:** Provide independently verifiable proof of activity and consistency.
- **Required content:** Contribution graph/heatmap, top languages, total repos/stars, streak or recent-activity indicator.
- **Optional content:** Pinned repo cards pulled live from GitHub API.
- **UX considerations:** Use GitHub's public REST/GraphQL API with caching (ISR or edge cache, refresh every few hours) to avoid rate-limit issues; style stats to match site theme rather than embedding GitHub's default dark widgets unmodified.
- **Mobile behavior:** Heatmap becomes horizontally scrollable; stat cards stack 2x2.
- **Accessibility:** Provide numeric summary text alongside any graphical stat (e.g., "312 contributions in the last year").

### 9.9 Education

- **Purpose:** Establish formal academic grounding (BSCS).
- **Required content:** Institution name, degree, expected/actual graduation, relevant coursework (Data Structures, Databases, OS, Networks).
- **Optional content:** GPA (only if strong and Sohail chooses to disclose), notable academic projects/honors.
- **UX considerations:** Simple timeline or card format; avoid over-designing — this section should be quick to scan.
- **Mobile behavior:** Single-column stacked card.
- **Accessibility:** Semantic list markup (`<ul>`/`<dl>`) for institution/degree/date pairs.

### 9.10 Certifications

- **Purpose:** Reinforce continuous learning and specific validated skills.
- **Required content:** Certificate name, issuing platform, date, verification link/badge.
- **Optional content:** Skill tags per certificate, certificate thumbnail.
- **UX considerations:** Grid of badge-style cards; group by relevance (Backend, Cloud, Databases).
- **Mobile behavior:** 1–2 column responsive grid.
- **Accessibility:** Verification links open with clear link text ("Verify on Coursera"), not "Click here."

### 9.11 Resume

- **Purpose:** Give a frictionless, ATS-safe path to full details.
- **Required content:** "Download Resume (PDF)" button, last-updated date, optional inline preview.
- **Optional content:** "View Resume" opens in a modal/new tab PDF viewer before downloading.
- **UX considerations:** Button should be visually consistent across navbar, hero, and this section (single source of truth file); track download clicks via analytics event.
- **Mobile behavior:** Downloads directly or opens native PDF viewer; button remains large and thumb-reachable.
- **Accessibility:** Link includes descriptive text + file type/size (e.g., "Download Resume — PDF, 240KB").

### 9.12 Contact

- **Purpose:** Convert visitor interest into direct communication — the site's primary conversion goal.
- **Required content:** Contact form (Name, Email, Message), direct email display, social links (GitHub, LinkedIn), response-time expectation ("Usually replies within 24–48 hours").
- **Optional content:** Availability status badge ("Open to internship/full-time opportunities"), calendar-booking link (Calendly-style) for interviews.
- **UX considerations:** Form uses inline validation, clear success/error states, disabled submit button with spinner while sending; avoid CAPTCHAs that hurt UX — use honeypot/rate-limiting instead.
- **Mobile behavior:** Full-width stacked inputs, large touch targets, native keyboard types (`type="email"`).
- **Accessibility:** Every input has an associated `<label>`, errors announced via `aria-live`, focus moves to first invalid field on submit failure.

### 9.13 Footer

- **Purpose:** Provide closure, secondary navigation, and trust signals.
- **Required content:** Copyright line, quick nav links, social icons, "Built with Next.js & Tailwind" credit line (optional but on-brand for engineers).
- **Optional content:** Sitemap links, "Back to top" button.
- **UX considerations:** Muted/subtle styling relative to rest of site (visually signals "end of content").
- **Mobile behavior:** Stack into centered single column.
- **Accessibility:** Footer landmark (`<footer role="contentinfo">`), all icons have text alternatives.

---

## 10. Functional Requirements

| # | Requirement | Detail |
|---|---|---|
| FR-1 | Responsive design | Fluid layouts at 320px, 375px, 768px, 1024px, 1440px, 1920px breakpoints |
| FR-2 | Light mode only (v1) | Built with theme tokens so dark mode can be added later without refactor |
| FR-3 | Resume download | Static PDF served from `/public`, versioned filename, download event tracked |
| FR-4 | Contact form | Client validation (Zod/react-hook-form) + serverless API route (Next.js Route Handler) sending email via a transactional provider (e.g., Resend) |
| FR-5 | Social links | GitHub, LinkedIn (and X/email if applicable), open in new tab, `rel="noopener noreferrer"` |
| FR-6 | GitHub integration | Fetch via GitHub REST/GraphQL API server-side, cached with ISR (revalidate every 6–12h) to avoid client-side rate limits |
| FR-7 | SEO | Per-page metadata, OpenGraph/Twitter cards, sitemap.xml, robots.txt, JSON-LD Person/ProfilePage schema |
| FR-8 | Performance | Image optimization via `next/image`, font subsetting, code-splitting per route |
| FR-9 | Accessibility | WCAG 2.1 AA compliance across all interactive components |
| FR-10 | Loading states | Skeleton loaders for GitHub stats and any async content; suspense boundaries for route segments |
| FR-11 | Error handling | Graceful fallback UI for failed GitHub API calls or form submission errors; no raw error stacks shown to users |
| FR-12 | Analytics | Lightweight, privacy-respecting analytics (e.g., Vercel Analytics/Plausible) for traffic + CTA click tracking |

---

## 11. Non-Functional Requirements

| Category | Target |
|---|---|
| **Performance** | LCP < 2.0s, TTI < 3.0s, CLS < 0.1 on 4G mobile |
| **Lighthouse** | Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100 |
| **SEO** | Indexable, structured data valid (Google Rich Results Test pass), unique meta per route |
| **Accessibility** | WCAG 2.1 Level AA minimum; keyboard-only full traversal; screen-reader tested (VoiceOver/NVDA) |
| **Browser support** | Latest 2 versions of Chrome, Firefox, Safari, Edge; graceful degradation on older Safari iOS |
| **Security** | HTTPS-only, CSP headers, input sanitization on contact form, rate-limited API route, no exposed secrets client-side |
| **Maintainability** | Content (projects, skills, certs) stored in typed JSON/MDX, not hardcoded inline in JSX |
| **Scalability** | Architecture supports adding blog/CMS or dark mode later without structural rewrite |

---

## 12. UI/UX Guidelines

| Element | Guideline |
|---|---|
| **Typography** | Modern geometric/humanist sans-serif (e.g., Inter, Geist, or Satoshi) for body; slightly heavier weight display font for headings; type scale ~1.25 ratio |
| **Color palette** | Base: white/off-white (`#FFFFFF` / `#FAFAFA`); text: near-black (`#0F0F14`); accents: blue→purple gradient (`#3B82F6` → `#8B5CF6`); neutral grays for borders/dividers |
| **Grid system** | 12-column responsive grid, max content width ~1280px, consistent gutter (24–32px) |
| **Spacing** | 8px base spacing scale (8/16/24/32/48/64/96); generous section padding (96–160px vertical on desktop) |
| **Icons** | Single consistent icon set (Lucide, matches shadcn/ui default) — never mix icon styles |
| **Buttons** | Primary: gradient fill, rounded-lg, soft shadow, subtle scale-on-hover; Secondary: outline/ghost with hover background tint |
| **Cards** | White surface, 1px hairline border or soft shadow (not both heavy), 12–16px border radius, hover: slight lift + shadow increase |
| **Forms** | Floating or top-aligned labels, clear focus rings (brand-colored), inline error text below fields |
| **Animations** | Framer Motion for entrance (fade+slight translate on scroll into view), max 200–400ms durations, respect `prefers-reduced-motion`, no looping/attention-seeking animation |
| **Hover states** | Subtle scale (1.02–1.03), shadow deepening, color shift on links — never jarring |
| **Empty states** | Friendly, on-brand messaging (e.g., GitHub API temporarily unavailable → "Stats are taking a coffee break — check back soon") with icon illustration |

---

## 13. Dark Mode Readiness

Although v1 ships **light-mode only**, the design system must be token-based (CSS variables / Tailwind theme extension) so that a dark theme can be layered in later purely via token swaps — no component-level rewrites. `next-themes` should be wired in architecturally but locked to `light` for v1.

---

## 14. Content Strategy

- **Tone:** Confident, precise, engineering-minded — no buzzword-stuffing, no false-humility ("just a student who..."). Write like a peer engineer, not a marketer.
- **Hero headline examples:**
  - "Backend Engineer building scalable systems with Node.js, PostgreSQL & Prisma."
  - "I design and build APIs and systems that scale — from database to deployment."
  - "Turning complex backend problems into clean, production-ready systems."
- **About structure:** Hook (1 sentence on identity/goal) → Journey (2–3 sentences: BSCS + practical project-building path) → Proof (highlight stats/facts) → Bridge to CTA.
- **Project storytelling format:** Problem → Approach/Architecture → Outcome/Learning — always framed around a decision he made and why, not just a feature list.
- **CTA strategy:** One dominant CTA per section max; vary CTA verbs contextually ("View Case Study," "See the Architecture," "Let's Talk") rather than repeating "Learn More" everywhere.

---

## 15. Technical Requirements & Architecture

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui

### Suggested Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Home (Hero..Contact sections)
│   ├── projects/
│   │   └── [slug]/page.tsx       # Case study route
│   ├── api/
│   │   ├── contact/route.ts      # Contact form handler
│   │   └── github/route.ts       # GitHub stats fetch (cached)
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── sections/                 # Hero, About, Skills, Projects, etc.
│   ├── shared/                   # Navbar, Footer, ThemeProvider
│   └── project/                  # Case-study specific components
├── content/
│   ├── projects.ts (or .mdx)     # Typed project data
│   ├── skills.ts
│   └── certifications.ts
├── lib/
│   ├── github.ts                 # GitHub API client + caching
│   ├── validations.ts            # Zod schemas
│   └── utils.ts
├── public/
│   ├── resume.pdf
│   └── images/
├── styles/
│   └── globals.css               # Tailwind + design tokens
└── types/
    └── index.ts
```

### Reusable Component Strategy
- Build primitives once via **shadcn/ui** (Button, Card, Badge, Input, Dialog) and theme them centrally via Tailwind config — never override styles ad hoc per instance.
- Section components (`<Hero />`, `<ProjectsGrid />`, etc.) are composed from shared primitives + a common `<SectionContainer>` wrapper enforcing consistent spacing/max-width.
- Project data is fully typed (`Project` interface) and rendered generically so adding a new project = adding one object, not new UI code.
- Motion variants (fade-up, stagger children) centralized in a `lib/motion.ts` to keep animation consistent and reduce duplication.

---

## 16. Success Metrics

| Metric | Target |
|---|---|
| Lighthouse Performance/Accessibility/SEO | ≥ 95 each |
| Contact form submissions | Track baseline, aim for measurable month-over-month growth |
| Resume download clicks | Track as primary conversion event |
| Avg. session duration | > 90 seconds (indicates real reading, not bounce) |
| Bounce rate | < 55% |
| Mobile traffic usability | No accessibility or layout errors on real-device testing (iOS Safari, Android Chrome) |

---

## 17. Risks

| Risk | Mitigation |
|---|---|
| GitHub API rate limits | Server-side fetch with ISR/edge caching (6–12h revalidation), fallback to last-known-good data |
| Over-designed animations hurting performance/accessibility | Cap animation count per viewport, respect `prefers-reduced-motion`, performance-budget review before launch |
| Content feels generic/templated | Anchor all project write-ups in real, specific technical decisions from his actual builds, not generic filler |
| Contact form spam | Honeypot field + basic rate limiting on API route (no CAPTCHA friction) |
| Scope creep (blog, dark mode, CMS) delaying launch | Strictly enforce v1 scope in §4; log extras under Future Enhancements |

---

## 18. Future Enhancements

- Dark mode toggle (architecture already supports via tokens)
- Technical blog / MDX-based writing section (system design notes, learnings)
- CMS-backed content (Sanity/Contentful) so projects can be updated without redeploys
- Testimonials/recommendations section (once available from mentors/collaborators)
- Interactive architecture diagrams (hover-to-expand system components)
- Multi-language support (if targeting international remote roles)

---

## 19. Acceptance Criteria

- [ ] All 13 sections implemented per §9 specifications (purpose, required content, mobile, accessibility)
- [ ] Site scores ≥ 95 on Lighthouse Performance, Accessibility, SEO on both mobile and desktop
- [ ] Fully responsive from 320px to 1920px with no layout breakage
- [ ] Resume downloadable in one click from at least 3 locations (navbar, hero, resume section)
- [ ] Contact form successfully sends email and shows success/error states correctly
- [ ] GitHub stats load with caching and degrade gracefully on API failure
- [ ] All interactive elements reachable and operable via keyboard alone
- [ ] Color contrast passes WCAG AA on all text/background combinations
- [ ] At least 3 project case studies live with full Problem/Solution/Architecture/Learnings structure
- [ ] No console errors; all images optimized via `next/image`
- [ ] `prefers-reduced-motion` respected across all Framer Motion animations
- [ ] Sitemap, robots.txt, and structured data (JSON-LD) present and valid

---

*End of document.*