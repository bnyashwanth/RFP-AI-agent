const express = require('express');
const { generatePdfReport } = require('../controllers/reportController');
const router = express.Router();

router.post('/pdf', generatePdfReport);

module.exports = router;