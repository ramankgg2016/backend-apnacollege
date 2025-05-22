// config/keys.js
module.exports = {
  mongoURI: "mongodb://localhost:27017", // Your MongoDB connection string
  jwtSecret:
    process.env.JWT_SECRET ||
    "supersecretjwtkeythatshouldbechangedinproduction",
};
