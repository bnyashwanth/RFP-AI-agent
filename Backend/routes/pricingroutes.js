const express = require("express");
const { calculatePricing } = require("../controllers/pricingagent");
const router = express.Router();

// This will handle GET requests to /api/pricing/:id
router.get("/:id", calculatePricing);

module.exports = router;