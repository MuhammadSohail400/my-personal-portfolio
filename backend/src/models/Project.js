const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true },
    value: { type: String, trim: true },
  },
  { _id: false }
);

const KeyFeatureSchema = new mongoose.Schema(
  {
    icon: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false }
);

const LiveMetricSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true },
    value: { type: String, trim: true },
    color: { type: String, trim: true },
  },
  { _id: false }
);

// Optional — only present if this project has a full case-study page
const CaseStudySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    categoryTag: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    problem: {
      description: { type: String, trim: true },
      quote: { type: String, trim: true },
    },
    solution: {
      description: { type: String, trim: true },
      highlights: [{ type: String, trim: true }],
    },
    architectureDiagramAlt: { type: String, trim: true },
    architectureDiagramUrl: { type: String, trim: true },
    keyFeatures: [KeyFeatureSchema],
    liveMetrics: [LiveMetricSchema],
    codeSnippet: {
      filename: { type: String, trim: true },
      code: { type: String },
    },
    lessonsLearned: [{ type: String, trim: true }],
    githubUrl: { type: String, trim: true },
    fullDocUrl: { type: String, trim: true },
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, trim: true },
    image: { type: String, trim: true },
    imageAlt: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    githubUrl: { type: String, trim: true },
    liveDemoUrl: { type: String, trim: true },
    category: {
      type: String,
      enum: ['backend', 'fullstack', 'distributed', 'fintech', 'analytics', 'microservices'],
      default: 'fullstack',
    },
    metrics: [MetricSchema],
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    // Present only when this project has its own /projects/[slug] case-study page
    caseStudy: { type: CaseStudySchema, default: undefined },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
