const RFP = require("../models/RFP");

//  creating a sample pricing table for real pricing data, this would typically come from a database
const samplePricing = [
    { "productName": "Power Cable 11kV", "unitPrice": 5000 },
    { "productName": "Signal Cable 4 Core", "unitPrice": 1500 },
    { "productName": "Fiber Optic Cable", "unitPrice": 3000 },
    { "productName": "Flexible Wire 2.5mm", "unitPrice": 500 }
];

exports.calculatePricing = async (req, res) => {
  try{
    const rfp = await RFP.findById(req.params.id);

   
    if(!rfp) {
      return res.status(404).json({ message: "RFP not found" });
    }
    

    const pricingTable = samplePricing;
    let total = 0;
    let breakdown = [];

    rfp.products.forEach((prod) => 
      {
      let price = pricingTable.find((p) => p.productName === prod.name)?.unitPrice || 1000;
      breakdown.push({ product: prod.name, unitPrice: price });


      total += price;
    });

    res.json({ total, breakdown });
  }
  
  catch (err){
    res.status(500).json({ error: err.message });
  }
};