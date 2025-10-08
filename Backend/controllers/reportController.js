const PDFDocument = require('pdfkit');

exports.generatePdfReport = (req, res) => {
  const { data } = req.body; // Get the processed data from the frontend
  const doc = new PDFDocument({ layout: 'landscape' });
  const filename = `Final_RFP_Response.pdf`;

  res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-type', 'application/pdf');
  doc.pipe(res);

  // Simple Table Generation
  doc.fontSize(18).text('Final RFP Response Report', { align: 'center' });
  doc.moveDown();

  const tableTop = 100;
  const headers = Object.keys(data[0] || {});
  const colWidths = headers.map(() => 70); // Adjust column widths as needed

  // Draw Header
  doc.fontSize(10).font('Helvetica-Bold');
  headers.forEach((header, i) => {
    doc.text(header.replace(/_/g, ' '), 50 + i * 80, tableTop, { width: 70, align: 'center' });
  });

  // Draw Rows
  doc.fontSize(8).font('Helvetica');
  data.forEach((row, rowIndex) => {
    const y = tableTop + 20 + rowIndex * 20;
    Object.values(row).forEach((text, i) => {
      doc.text(String(text), 50 + i * 80, y, { width: 70, align: 'center' });
    });
  });

  doc.end();
};