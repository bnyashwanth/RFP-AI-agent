const Pricing = require("../models/pricing");
const RFP = require("../models/RFP");
const samplePricing = require("../data/pricing.json");

exports.calculatePricing = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id);
    await Pricing.deleteMany({});
    await Pricing.insertMany(samplePricing);

    const pricingTable = await Pricing.find();
    let total = 0;
    let breakdown = [];

    rfp.products.forEach((prod) => {
      let price = pricingTable.find((p) => p.productName === prod.name)?.unitPrice || 1000;
      breakdown.push({ product: prod.name, unitPrice: price });
      total += price;
    });

    res.json({ total, breakdown });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
