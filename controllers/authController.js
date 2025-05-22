// controllers/authController.js
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// @desc    Register a new user
// @route   POST /api/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = new User({ email, password, name });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ message: "Email already registered." });
    }
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      keys.jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};
