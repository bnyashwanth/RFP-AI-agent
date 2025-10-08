const express = require('express');
const multer = require('multer');
const { processFiles } = require('../controllers/processController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// This route will handle both files at once
router.post('/', upload.fields([{ name: 'rfp', maxCount: 1 }, { name: 'inventory', maxCount: 1 }]), processFiles);

module.exports = router;