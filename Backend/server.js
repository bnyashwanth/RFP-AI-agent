const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const salesRoutes = require("./routes/salesRoutes");
const technicalRoutes = require("./routes/technicalroutes");
const pricingRoutes = require("./routes/pricingroutes");
const masterRoutes = require("./routes/masterroutes");
const uploadRoutes = require('./routes/uploadRoutes'); // <-- ADD THIS
const processRoutes = require('./routes/processRoutes')
const reportRoutes = require('./routes/reportRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/sales", salesRoutes);
app.use("/api/technical", technicalRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/master", masterRoutes);
app.use('/api/upload', uploadRoutes); // <-- ADD THIS
app.use('/api/process-rfp', processRoutes); // <-- ADD THIS
app.use('/api/generate-report', reportRoutes); // <-- ADD THIS


const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(` Backend running on port ${PORT}`)))
  .catch((err) => console.error(err));
