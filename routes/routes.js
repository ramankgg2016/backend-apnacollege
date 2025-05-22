// routes/api.js
const express = require("express");
const router = express.Router();

// Import controllers
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const topicController = require("../controllers/topicController");
const progressController = require("../controllers/progressController");

// Import middleware
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware"); // General validation middleware

// Import validation schemas
const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");
const {
  updateSubTopicStatusValidation,
} = require("../validation/topicValidation");

// --- Authentication Routes ---
// POST /api/register
router.post(
  "/register",
  registerValidation,
  validate,
  authController.registerUser
);

// POST /api/login
router.post("/login", loginValidation, validate, authController.loginUser);

// --- Protected Routes (require authMiddleware) ---
// GET /api/user/me
router.get("/user/me", authMiddleware, userController.getLoggedInUser);

// GET /api/topics
router.get("/topics", authMiddleware, topicController.getAllTopics);

// PUT /api/topics/:topicId/subtopics/:subTopicId/status
router.put(
  "/topics/:topicId/subtopics/:subTopicId/status",
  authMiddleware,
  updateSubTopicStatusValidation,
  validate,
  topicController.updateSubTopicStatus
);

// GET /api/progress
router.get("/progress", authMiddleware, progressController.getOverallProgress);

module.exports = router;
