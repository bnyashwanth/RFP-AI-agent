const Product = require("../models/product");
const RFP = require("../models/RFP");
const { Parser } = require('json2csv');

// Dummy product data for the demo
const sampleProducts = [
  { "name": "Power Cable 11kV", "specs": { "voltage": "11kV", "material": "Copper" } },
  { "name": "Signal Cable 4 Core", "specs": { "cores": "4", "insulation": "PVC" } },
  { "name": "Fiber Optic Cable", "specs": { "type": "Single-Mode", "length": "500m" } },
  { "name": "Flexible Wire 2.5mm", "specs": { "diameter": "2.5mm", "material": "Copper" } }
];

exports.matchSKUs = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id);

    // --- ADD THIS CHECK ---
    if (!rfp) {
      return res.status(404).json({ message: "RFP not found" });
    }
    // ----------------------

    const products = sampleProducts; 

    const results = rfp.products.map((rfpProd) => {
      const matches = products
        .map((p) => {
          let specMatch = 0;
          let total = Object.keys(rfpProd.specs).length;
          if (total === 0) return { product: p, match: 0 };

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

// exporting the download SKU's
exports.downloadSkuCsv = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id);
    if (!rfp) return res.status(404).json({ message: "RFP not found" });

    // logic for matching the item in the provided list 
    const products = sampleProducts; // Assuming sampleProducts is defined in this file
    const results = rfp.products.flatMap(rfpProd => 
      products.map(p => {
        let specMatch = 0;
        let total = Object.keys(rfpProd.specs).length;
        if (total > 0) {
          Object.keys(rfpProd.specs).forEach(key => {
            if (p.specs[key] === rfpProd.specs[key]) specMatch++;
          });
        }
        return {
          'RFP Product': rfpProd.name,
          'OEM Product': p.name,
          'Spec Match (%)': Math.round((specMatch / total) * 100) || 0,
        };
      })
    );
    
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(results);

    res.header('Content-Type', 'text/csv');
    res.attachment(`RFP-${rfp.title}-SKU-Match.csv`);
    res.send(csv);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};