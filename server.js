// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const ATLASDB_URL = process.env.ATLASDB_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Ensure Atlas URL is defined
if (!ATLASDB_URL) {
  console.error("ERROR: ATLASDB_URL is not defined in .env");
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
  .connect(ATLASDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Atlas connection failed:", err.message);
    process.exit(1);
  });
