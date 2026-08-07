/**
 * Quick dummy-data seeder — for TESTING the admin panel only.
 * Fills SiteContent, a few SkillCategory docs, and a few Project docs
 * with random placeholder data so you can try add/edit/delete flows
 * without worrying about your real content.
 *
 * Run from the backend folder:
 *   node scripts/seed-random.js
 *
 * Safe to re-run — it just adds a fresh random batch each time
 * (projects/skills get random slugs so old test data won't collide).
 */
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const SiteContent = require('../src/models/SiteContent');
const SkillCategory = require('../src/models/SkillCategory');
const Project = require('../src/models/Project');

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randId = () => Math.random().toString(36).slice(2, 8);

const NAMES = ['Ali Raza', 'Sara Khan', 'Bilal Ahmed', 'Ayesha Malik', 'Zain Qureshi'];
const TITLES = [
  'Backend Developer | Node.js Enthusiast',
  'Full-Stack Engineer | React & Express',
  'Software Engineer | Cloud & APIs',
];
const CITIES = ['Karachi, Pakistan', 'Lahore, Pakistan', 'Islamabad, Pakistan'];

async function seedRandom() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db';
  await mongoose.connect(uri);
  console.log('[Seed-Random] Connected to MongoDB');

  // --- Random site content ---
  await SiteContent.findOneAndUpdate(
    {},
    {
      name: rand(NAMES),
      title: rand(TITLES),
      badge: 'TEST DATA',
      shortBio: 'This is random placeholder bio text generated for testing the admin panel.',
      fullBio: 'This is a longer random placeholder bio used to check how the About section renders test content before real content is added.',
      careerGoal: 'Placeholder career goal text for testing purposes only.',
      education: { degree: 'BS Computer Science', focus: 'Testing & QA' },
      location: rand(CITIES),
      status: 'Testing admin panel — not real availability info',
      githubUrl: 'https://github.com/test-user',
      linkedinUrl: 'https://linkedin.com/in/test-user',
      twitterUrl: 'https://twitter.com/test-user',
      email: 'test@example.com',
      avatarUrl: '/avatar.jpeg',
      heroDiagramUrl: '/hero-diagram.png',
    },
    { upsert: true, new: true }
  );
  console.log('[Seed-Random] Random site content set');

  // --- Random skill categories ---
  const skillPool = [
    ['NODE.JS', 'EXPRESS', 'MONGODB'],
    ['REACT', 'NEXT.JS', 'TAILWIND'],
    ['DOCKER', 'REDIS', 'GRAPHQL'],
    ['PYTHON', 'DJANGO', 'POSTGRESQL'],
  ];
  for (let i = 0; i < 3; i++) {
    await SkillCategory.create({
      categoryId: `test-skill-${randId()}`,
      title: `Test Skill Group ${i + 1}`,
      description: 'Randomly generated skill category for testing.',
      icon: rand(['terminal', 'database', 'layers', 'cloud']),
      accentColor: rand(['primary', 'secondary', 'tertiary']),
      skills: rand(skillPool),
      order: 100 + i,
    });
  }
  console.log('[Seed-Random] 3 random skill categories added');

  // --- Random projects ---
  const projectNames = ['Task Tracker', 'Weather App', 'Chat Bot API', 'Recipe Finder', 'URL Shortener'];
  for (let i = 0; i < 3; i++) {
    const slug = `test-project-${randId()}`;
    await Project.create({
      slug,
      title: `${rand(projectNames)} (Test)`,
      shortDescription: 'Randomly generated project description for testing the admin panel.',
      image: 'https://placehold.co/600x400',
      imageAlt: 'Placeholder test image',
      tags: rand(skillPool),
      githubUrl: 'https://github.com/test-user/test-repo',
      liveDemoUrl: '#',
      category: rand(['backend', 'fullstack', 'distributed', 'fintech']),
      featured: true,
      order: 100 + i,
    });
  }
  console.log('[Seed-Random] 3 random projects added');

  console.log('[Seed-Random] Done. Open /admin to see the test data.');
  await mongoose.disconnect();
}

seedRandom().catch((err) => {
  console.error('[Seed-Random] Failed:', err);
  process.exit(1);
});