const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const salesRoutes = require("./routes/salesRoutes");
const technicalRoutes = require("./routes/technicalRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const masterRoutes = require("./routes/masterRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/sales", salesRoutes);
app.use("/api/technical", technicalRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/master", masterRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`)))
  .catch((err) => console.error(err));
