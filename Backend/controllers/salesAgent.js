const RFP = require("../models/RFP");
const sampleRFPs = require("../data/sampleRFPs.json");

exports.getUpcomingRFPs = async (req, res) => {
  try {
    await RFP.deleteMany({});
    const rfps = await RFP.insertMany(sampleRFPs);
    res.json(rfps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
