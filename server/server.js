require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("./config/env");

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Aura Home API is running",
    environment: config.NODE_ENV,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: config.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log(`📦 Environment: ${config.NODE_ENV}`);
});
