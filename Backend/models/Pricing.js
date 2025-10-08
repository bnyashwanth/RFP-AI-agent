const mongoose = require("mongoose"); // mongoose for schema definition.

const pricingSchema = new mongoose.Schema({
  productName: String,
  unitPrice: Number
});

module.exports = mongoose.model("Pricing", pricingSchema);
