const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Pricing routes working" });
});

// Export router
module.exports = router;
