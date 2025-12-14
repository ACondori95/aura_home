require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("./config/env");
const {notFound, errorHandler} = require("./middleware/errorHandler");

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Request logging (development only)
if (config.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Aura Home API is running",
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));

// 404 handler (must be after all routes)
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log(`📦 Environment: ${config.NODE_ENV}`);
  console.log(`🔗 API URL: http://localhost:${config.PORT}/api`);
});
