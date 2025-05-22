// validations/topicValidation.js
const { body, param } = require("express-validator");

const updateSubTopicStatusValidation = [
  param("topicId").isMongoId().withMessage("Invalid topic ID"),
  param("subTopicId").isMongoId().withMessage("Invalid subtopic ID"),
  body("status")
    .isIn(["Done", "Pending"])
    .withMessage('Status must be "Done" or "Pending"'),
];

// If you have a route to create a new topic, you'd add validation for that too:
// const createTopicValidation = [
//   body('title').notEmpty().withMessage('Topic title is required'),
//   // ... more rules for subtopics if they are sent with new topic creation
// ];

module.exports = {
  updateSubTopicStatusValidation,
  // createTopicValidation,
};
