const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  productName: String,
  unitPrice: Number
});

module.exports = mongoose.model("Pricing", pricingSchema);
