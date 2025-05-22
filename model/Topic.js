// model/Topic.js
const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leetcodeLink: { type: String, default: "#" },
  youtubeLink: { type: String, default: "#" },
  articleLink: { type: String, default: "#" },
  level: { type: String, enum: ["EASY", "MEDIUM", "HARD"], default: "EASY" },
  status: { type: String, enum: ["Pending", "Done"], default: "Pending" },
});

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    // Overall status of the main topic (e.g., 'Pending' if any subtopic is pending)
    type: String,
    enum: ["Pending", "Done"],
    default: "Pending",
  },
  subTopics: [subTopicSchema], // Array of sub-topic documents
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Topic", topicSchema);
