const express = require('express');
const multer = require('multer');
const { uploadRfps } = require('../controllers/uploadController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('rfpFile'), uploadRfps);

module.exports = router;