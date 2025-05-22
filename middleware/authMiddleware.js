// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const keys = require("../config/keys"); // Import JWT secret

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token"); // Common header name

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
