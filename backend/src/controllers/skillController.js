const SkillCategory = require('../models/SkillCategory');

// @desc    Get all skill categories, ordered
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res, next) => {
  try {
    const skills = await SkillCategory.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new skill category
// @route   POST /api/skills
// @access  Public (no auth yet — see README security note)
const createSkill = async (req, res, next) => {
  try {
    const skill = await SkillCategory.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a skill category
// @route   PUT /api/skills/:id
// @access  Public (no auth yet — see README security note)
const updateSkill = async (req, res, next) => {
  try {
    const skill = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill category not found' });
    }
    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a skill category
// @route   DELETE /api/skills/:id
// @access  Public (no auth yet — see README security note)
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill category not found' });
    }
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
