const RFP = require("../models/RFP");
const sampleRFPs = require("../data/sampleRFPs.json");
// changeds the salesagent.js file to add console logs for debugging

exports.getUpcomingRFPs = async (req, res) => {
  try {
    
    console.log("Running the Database"); 

    await RFP.deleteMany({});
    const rfps = await RFP.insertMany(sampleRFPs);
    res.json(rfps);

  } catch (err) {
    
    console.error("Database running failed", err); 
    res.status(500).json({ error: err.message });
  }
};