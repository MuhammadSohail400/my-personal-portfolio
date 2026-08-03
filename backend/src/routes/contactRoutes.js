const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const { contactValidationRules, validate } = require('../middlewares/validate');

// POST /api/contact
router.post('/', contactValidationRules(), validate, submitContactForm);

module.exports = router;
