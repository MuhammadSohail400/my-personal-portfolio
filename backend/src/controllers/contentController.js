const SiteContent = require('../models/SiteContent');

// @desc    Get the site content (creates a blank one if none exists yet)
// @route   GET /api/content
// @access  Public
const getContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create({ name: '', title: '' });
    }
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

// @desc    Update the site content (upserts the single document)
// @route   PUT /api/content
// @access  Public (no auth yet — see README security note)
const updateContent = async (req, res, next) => {
  try {
    const updates = req.body;
    const content = await SiteContent.findOneAndUpdate({}, updates, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContent, updateContent };
