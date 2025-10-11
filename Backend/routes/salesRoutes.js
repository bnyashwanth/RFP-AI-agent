const express = require("express");
const { getUpcomingRFPs } = require("../controllers/salesAgent.js");
const router = express.Router();

router.get("/", getUpcomingRFPs);

module.exports = router;
