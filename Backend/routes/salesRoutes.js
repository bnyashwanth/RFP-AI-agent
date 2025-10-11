const express = require("express");
const { getUpcomingRFPs } = require("../controllers/salesagent.js");
// i am facing issues with the sales agent page so i added console logs for debugging
const router = express.Router();

router.get("/", getUpcomingRFPs);

module.exports = router;
