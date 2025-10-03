const Product = require("../models/product");
const RFP = require("../models/RFP");
const sampleProducts = require("../data/products.json");

exports.matchSKUs = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);

    const products = await Product.find();

    const results = rfp.products.map((rfpProd) => {
      const matches = products
        .map((p) => {
          let specMatch = 0;
          let total = Object.keys(rfpProd.specs).length;
          Object.keys(rfpProd.specs).forEach((key) => {
            if (p.specs[key] === rfpProd.specs[key]) specMatch++;
          });
          return { product: p, match: Math.round((specMatch / total) * 100) };
        })
        .sort((a, b) => b.match - a.match);

      return {
        rfpProduct: rfpProd,
        recommendations: matches.slice(0, 3),
      };
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
