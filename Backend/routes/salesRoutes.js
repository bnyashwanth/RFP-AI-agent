const express = require("express");
const { getUpcomingRFPs } = require("../controllers/salesagent");
const router = express.Router();

router.get("/", getUpcomingRFPs);

module.exports = router;
