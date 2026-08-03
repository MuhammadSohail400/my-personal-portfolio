const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit new contact form message
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Create and save message in MongoDB
    let savedContact = null;
    try {
      savedContact = await Contact.create({
        name,
        email,
        subject: subject || 'Portfolio Contact Form Submission',
        message,
      });
    } catch (dbErr) {
      console.warn(`[MongoDB Warning] Could not save contact to DB: ${dbErr.message}`);
    }

    // 2. Send email notification
    try {
      await sendEmail({
        name,
        email,
        subject: subject || 'Portfolio Contact Form Submission',
        message,
      });
    } catch (emailErr) {
      console.warn(`[Email Warning] Could not send email notification: ${emailErr.message}`);
    }

    // 3. Return success response
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: savedContact || { name, email, subject, message, createdAt: new Date() },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactForm,
};
