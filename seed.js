// seed.js
const mongoose = require("mongoose");
const Topic = require("./model/Topic"); // Adjust path if necessary
const keys = require("./config/keys"); // Import your database connection string

const topicsData = [
  {
    title: "Algorithms",
    status: "Pending",
    subTopics: [
      {
        name: "Sorting Algorithms",
        leetcodeLink: "https://leetcode.com/tag/sorting/",
        youtubeLink: "http://www.youtube.com/watch?v=MsYZSinhuFo",
        articleLink: "https://www.geeksforgeeks.org/sorting-algorithms/",
        level: "EASY",
        status: "Done",
      },
      {
        name: "Searching Algorithms",
        leetcodeLink: "https://leetcode.com/tag/binary-search/",
        youtubeLink: "http://www.youtube.com/watch?v=s4DPM8ct1pI",
        articleLink: "https://www.geeksforgeeks.org/searching-algorithms/",
        level: "EASY",
        status: "Pending",
      },
      {
        name: "Dynamic Programming",
        leetcodeLink: "https://leetcode.com/tag/dynamic-programming/",
        youtubeLink: "http://www.youtube.com/watch?v=uUjFL0C-vY0",
        articleLink: "https://www.geeksforgeeks.org/dynamic-programming/",
        level: "MEDIUM",
        status: "Pending",
      },
      {
        name: "Greedy Algorithms",
        leetcodeLink: "https://leetcode.com/tag/greedy/",
        youtubeLink: "http://www.youtube.com/watch?v=lfQvPHGtu6Q",
        articleLink: "https://www.geeksforgeeks.org/greedy-algorithms/",
        level: "MEDIUM",
        status: "Pending",
      },
      {
        name: "Divide and Conquer",
        leetcodeLink: "https://leetcode.com/tag/divide-and-conquer/",
        youtubeLink: "http://www.youtube.com/watch?v=ib4BHvr5-Ao",
        articleLink:
          "https://www.geeksforgeeks.org/divide-and-conquer-algorithm/",
        level: "MEDIUM",
        status: "Done",
      },
      {
        name: "Backtracking",
        leetcodeLink: "https://leetcode.com/tag/backtracking/",
        youtubeLink: "http://www.youtube.com/watch?v=Zq4upTEaQyM",
        articleLink: "https://www.geeksforgeeks.org/backtracking-algorithms/",
        level: "HARD",
        status: "Pending",
      },
    ],
  },
  {
    title: "Data Structures",
    status: "Pending",
    subTopics: [],
  },
  {
    title: "Databases",
    status: "Pending",
    subTopics: [],
  },
  {
    title: "Machine Learning",
    status: "Pending",
    subTopics: [],
  },
  {
    title: "Operating Systems",
    status: "Pending",
    subTopics: [],
  },
  {
    title: "Networks",
    status: "Pending",
    subTopics: [],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    await Topic.deleteMany({}); // Clear existing data
    console.log("Topics cleared");

    await Topic.insertMany(topicsData);
    console.log("Topics seeded!");

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDB();
