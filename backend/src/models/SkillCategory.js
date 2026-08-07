const mongoose = require('mongoose');

const SkillCategorySchema = new mongoose.Schema(
  {
    // slug-like id used by the frontend, e.g. "backend", "databases"
    categoryId: { type: String, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    icon: { type: String, trim: true }, // lucide/material icon name
    accentColor: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary'],
      default: 'primary',
    },
    skills: [{ type: String, trim: true }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillCategory', SkillCategorySchema);
