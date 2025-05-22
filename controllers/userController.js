// controllers/userController.js
const User = require("../model/User");

// @desc    Get logged in user's profile info
// @route   GET /api/user/me
// @access  Private
exports.getLoggedInUser = async (req, res) => {
  try {
    // req.user is populated by the 'auth' middleware
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error fetching user data." });
  }
};
