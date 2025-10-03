const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Master routes working" });
});

// Export router
module.exports = router;
