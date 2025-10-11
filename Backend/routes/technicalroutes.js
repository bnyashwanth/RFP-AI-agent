const express = require("express");

const { matchSKUs, downloadSkuCsv } = require("../controllers/technicalagent");
// i am facing issues with the technical agent page so i added error handling for debugging
const router = express.Router();

// This will handle GET requests to /api/technical/:id
router.get("/:id", matchSKUs);

// This will handle GET requests to /api/technical/:id/download
router.get("/:id/download", downloadSkuCsv);

module.exports = router;