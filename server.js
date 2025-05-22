// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const keys = require("./config/keys"); // Import configuration keys
const apiRoutes = require("./routes/routes"); // Import your API routes

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use your API routes
app.use("/api", apiRoutes); // All API routes will be prefixed with /api

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Dashboard Backend API is running!");
});

// Global error handler (optional but recommended for production)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
