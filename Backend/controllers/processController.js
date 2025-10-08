const xlsx = require('xlsx');// for reading excel files

const fs = require('fs'); // for file system operationm

exports.processFiles = (req, res) => {
  try {
    if (!req.files || !req.files.rfp || !req.files.inventory) {
      return res.status(400).send({ message: 'Both RFP and Inventory files are required.' });
    }

    const rfpFilePath = req.files.rfp[0].path;
    const inventoryFilePath = req.files.inventory[0].path;

    // 1. Read Excel files into JSON arrays
    const rfpWorkbook = xlsx.readFile(rfpFilePath);
    const rfpData = xlsx.utils.sheet_to_json(rfpWorkbook.Sheets[rfpWorkbook.SheetNames[0]]);

    const invWorkbook = xlsx.readFile(inventoryFilePath);
    const inventoryData = xlsx.utils.sheet_to_json(invWorkbook.Sheets[invWorkbook.SheetNames[0]]);

    const results = [];

    // 2. Loop through RFP products and compare with inventory
    for (const rfpProduct of rfpData) {
      const invProduct = inventoryData.find(p => p.Product_Name === rfpProduct.Product_Name);

      if (invProduct) {
        // 3. Perform all checks and calculations
        const stockStatus = rfpProduct.Quantity <= invProduct.Stock_Qty ? 'Available' : 'Not Available';

        const rfpSpecs = new Set(String(rfpProduct.Requested_Specs || '').toLowerCase().split(/\s+/));
        const invSpecs = new Set(String(invProduct.Specs || '').toLowerCase().split(/\s+/));
        
        let matches = 0;
        for (const spec of rfpSpecs) {
          if (invSpecs.has(spec)) {
            matches++;
          }
        }
        const specMatchPercentage = rfpSpecs.size > 0 ? (matches / rfpSpecs.size) * 100 : 0;

        results.push({
          'RFP_ID': rfpProduct.RFP_ID,
          'SKU_ID': invProduct.SKU_ID,
          'Product_Name': rfpProduct.Product_Name,
          'Stock_Status': stockStatus,
          'Unit_Price': invProduct.Unit_Price,
          'Specs_Match_%': specMatchPercentage.toFixed(2),
          'Test_Cost': invProduct.Test_Cost,
          'Total_Price': invProduct.Unit_Price + invProduct.Test_Cost
        });
      }
    }
    
    // 4. Clean up temporary files and send results back
    fs.unlinkSync(rfpFilePath);
    fs.unlinkSync(inventoryFilePath);

    res.status(200).json({ results });

  } catch (error) {
    console.error("Processing error:", error);
    res.status(500).send({ message: 'Error processing files.' });
  }
};