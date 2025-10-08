const PDFDocument = require('pdfkit');  // pdfkit for PDF generation
const RFP = require("../models/RFP"); 

// For simplicity, we'll copy the dummy data here. In a real app, this would come from the database.
const sampleProducts = [
  { "name": "Power Cable 11kV", "specs": { "voltage": "11kV", "material": "Copper" } },
  { "name": "Flexible Wire 2.5mm", "specs": { "diameter": "2.5mm", "material": "Copper" } },
  { "name": "Signal Cable 4 Core", "specs": { "cores": "4", "insulation": "PVC" } }
];
const samplePricing = [
    { "productName": "Power Cable 11kV", "unitPrice": 5000 },
    { "productName": "Flexible Wire 2.5mm", "unitPrice": 500 },
    { "productName": "Signal Cable 4 Core", "unitPrice": 1500 }
];

// This function draws a table in the PDF
function drawTable(doc, table, startY) {
  let y = startY;
  const rowHeight = 25;
  const colWidths = [200, 150, 150]; // Adjusting tyhe widths for 3 colums

  // Draw header
  doc.font('Helvetica-Bold');
  table.headers.forEach((header, i) => {
    doc.text(header, 50 + i * 150, y, { width: colWidths[i], align: 'left' });
  });
  y += rowHeight;
  doc.moveTo(50, y - 10).lineTo(550, y - 10).stroke();

  // Draw rows
  doc.font('Helvetica');
  table.rows.forEach(row => {
    row.forEach((text, i) => {
      doc.text(text, 50 + i * 150, y, { width: colWidths[i], align: 'left' });
    });
    y += rowHeight;
  });
  return y;
}


exports.downloadFinalResponsePdf = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id);  
    if (!rfp) return res.status(404).json({ message: "RFP not found" });

    // --- Re-run analysis to get data for the PDF ---
    let totalCost = 0;
    const technicalAnalysisRows = [];
    const pricingAnalysisRows = [];

    rfp.products.forEach(rfpProd => {
      // Pricing logic
      const priceInfo = samplePricing.find(p => p.productName === rfpProd.name);
      const unitPrice = priceInfo ? priceInfo.unitPrice : 1000;
      totalCost += unitPrice;
      pricingAnalysisRows.push([rfpProd.name, `$${unitPrice.toLocaleString()}`]);

      // Technical matching logic
      const bestMatch = sampleProducts
        .map(p => {
            let specMatch = 0;
            const totalSpecs = Object.keys(rfpProd.specs).length;
            if (totalSpecs > 0) {
              Object.keys(rfpProd.specs).forEach(key => {
                if (p.specs[key] === rfpProd.specs[key]) specMatch++;
              });
              specMatch = (specMatch / totalSpecs) * 100;
            }
            return { name: p.name, match: specMatch };
        })
        .sort((a, b) => b.match - a.match)[0]; // Get the best match
      
      technicalAnalysisRows.push([rfpProd.name, bestMatch.name, `${bestMatch.match.toFixed(0)}%`]);
    });
    // --- End of analysis ---

    const doc = new PDFDocument({ margin: 50 });
    const filename = `RFP-${rfp.title}-Response.pdf`;
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    // --- Build the detailed PDF ---
    doc.fontSize(20).text('RFP Final Response', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(14).font('Helvetica-Bold').text(`RFP Title: ${rfp.title}`);
    doc.fontSize(12).font('Helvetica').text(`Due Date: ${new Date(rfp.dueDate).toLocaleDateString()}`);
    doc.moveDown(2);

    // Technical Analysis Table
    doc.fontSize(14).font('Helvetica-Bold').text('Technical Analysis Summary');
    doc.moveDown();
    const techTable = {
      headers: ['RFP Product', 'Recommended OEM SKU', 'Spec Match'],
      rows: technicalAnalysisRows
    };
    let lastY = drawTable(doc, techTable, doc.y);
    doc.moveDown(3);

    // Pricing Table
    doc.y = lastY + 30; // Move below the first table
    doc.fontSize(14).font('Helvetica-Bold').text('Pricing Summary');
    doc.moveDown();
    const priceTable = {
      headers: ['Item', 'Unit Price'],
      rows: pricingAnalysisRows
    };
    lastY = drawTable(doc, priceTable, doc.y);
    
    // Grand Total
    doc.y = lastY + 10;
    doc.font('Helvetica-Bold').text('Grand Total:', 50, doc.y, { continued: true, align: 'right', width: 300 });
    doc.text(`$${totalCost.toLocaleString()}`, { align: 'left' });

    doc.end();

  } catch (err) {
    console.error("PDF Generation Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// You still need the getFinalResponseData function here for the UI
exports.getFinalResponseData = async (req, res) => { /* ... as before ... */ };