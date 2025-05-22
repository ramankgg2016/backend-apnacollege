// controllers/topicController.js
const Topic = require("../model/Topic");

// @desc    Get all topics with their subtopics
// @route   GET /api/topics
// @access  Private
exports.getAllTopics = async (req, res) => {
  try {
    // If topics were user-specific, you'd filter by req.user.userId here
    const topics = await Topic.find({});
    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ message: "Server error fetching topics." });
  }
};

// @desc    Update status of a subtopic
// @route   PUT /api/topics/:topicId/subtopics/:subTopicId/status
// @access  Private
exports.updateSubTopicStatus = async (req, res) => {
  const { topicId, subTopicId } = req.params;
  const { status } = req.body;

  try {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found." });
    }

    const subTopic = topic.subTopics.id(subTopicId);
    if (!subTopic) {
      return res.status(404).json({ message: "SubTopic not found." });
    }

    subTopic.status = status;
    await topic.save(); // Save the parent topic to persist changes to subtopic

    // Optional: Update parent topic status based on subtopics completion
    const allSubtopicsDone = topic.subTopics.every(
      (st) => st.status === "Done"
    );
    if (allSubtopicsDone && topic.status !== "Done") {
      topic.status = "Done";
      await topic.save(); // Save again if parent topic status changed
    } else if (!allSubtopicsDone && topic.status === "Done") {
      topic.status = "Pending";
      await topic.save(); // Save again if parent topic status changed
    }

    res.json({ message: "SubTopic status updated successfully.", subTopic });
  } catch (error) {
    console.error("Error updating subtopic status:", error);
    res.status(500).json({ message: "Server error updating subtopic status." });
  }
};
