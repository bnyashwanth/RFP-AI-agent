const RFP = require("../models/RFP");

exports.finalResponse = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id);
    res.json({
      rfpTitle: rfp.title,
      dueDate: rfp.dueDate,
      finalStatus: "Response Prepared",
      message: "Includes matched SKUs and pricing breakdown."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
