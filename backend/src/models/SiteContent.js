const mongoose = require('mongoose');

// Singleton document — there is always exactly one SiteContent record.
// Holds everything that used to live in PERSONAL_INFO inside portfolio-data.ts
const SiteContentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    badge: { type: String, trim: true },
    shortBio: { type: String, trim: true },
    fullBio: { type: String, trim: true },
    careerGoal: { type: String, trim: true },
    education: {
      degree: { type: String, trim: true },
      focus: { type: String, trim: true },
    },
    location: { type: String, trim: true },
    status: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    linkedinUrl: { type: String, trim: true },
    twitterUrl: { type: String, trim: true },
    email: { type: String, trim: true },
    avatarUrl: { type: String, trim: true },
    heroDiagramUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteContent', SiteContentSchema);
