// controllers/progressController.js
const Topic = require("../model/Topic");

// @desc    Get aggregated progress data (Easy, Medium, Hard percentages)
// @route   GET /api/progress
// @access  Private
exports.getOverallProgress = async (req, res) => {
  try {
    // Fetch all topics. If progress is per user, filter by userId
    const allTopics = await Topic.find({});

    let easyCount = 0;
    let easyDoneCount = 0;
    let mediumCount = 0;
    let mediumDoneCount = 0;
    let hardCount = 0;
    let hardDoneCount = 0;

    allTopics.forEach((topic) => {
      topic.subTopics.forEach((subTopic) => {
        if (subTopic.level === "EASY") {
          easyCount++;
          if (subTopic.status === "Done") easyDoneCount++;
        } else if (subTopic.level === "MEDIUM") {
          mediumCount++;
          if (subTopic.status === "Done") mediumDoneCount++;
        } else if (subTopic.level === "HARD") {
          hardCount++;
          if (subTopic.status === "Done") hardDoneCount++;
        }
      });
    });

    const easyPercentage =
      easyCount > 0 ? Math.round((easyDoneCount / easyCount) * 100) : 0;
    const mediumPercentage =
      mediumCount > 0 ? Math.round((mediumDoneCount / mediumCount) * 100) : 0;
    const hardPercentage =
      hardCount > 0 ? Math.round((hardDoneCount / hardCount) * 100) : 0;

    res.json({
      easy: easyPercentage,
      medium: mediumPercentage,
      hard: hardPercentage,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Server error fetching progress data." });
  }
};
