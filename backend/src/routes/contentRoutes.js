const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');

router.get('/', getContent);
router.put('/', updateContent);

module.exports = router;
