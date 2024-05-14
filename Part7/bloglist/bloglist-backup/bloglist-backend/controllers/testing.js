// reset router to reset blogs and users

testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// As with unit and integration tests, with E2E tests it is the best to empty
// the database and possibly format it before the tests are run. The challenge
// with E2E tests is that they do not have access to the database.

// The solution is to create API endpoints to the backend for the test. We can
// empty the database using these endpoints. Let's create a new router for the tests

testingRouter.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = testingRouter;
