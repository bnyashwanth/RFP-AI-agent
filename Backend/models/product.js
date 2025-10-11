const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  specs: Object
});

module.exports = mongoose.model("Product", productSchema);
