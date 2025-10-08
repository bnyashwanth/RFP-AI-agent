const mongoose = require("mongoose");

const rfpSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  products: [{ name: String, specs: Object }],
  tests: [{ name: String, requirements: String }],
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("RFP", rfpSchema);
