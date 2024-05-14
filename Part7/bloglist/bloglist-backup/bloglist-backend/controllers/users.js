// We would like the API to work in such a way that, when retrieving e.g. user information to
// the path /api/users with an HTTP GET request, the contents of notes made by users should be
// displayed in addition to the ids. With relational databases, the functionality would be
// implemented using a join query .

// As mentioned earlier, document databases do not (properly) support join queries between
// different collections. However, the Mongoose library can do the join for us. Mongoose
// implements the join by making several database queries, so in that sense it is a completely
// different way than the join queries of relational databases, which are transactional,
// i.e. when making a join query, the state of the database does not change. The connection
// made with Mongoose is such that nothing guarantees that the state of the collections to
// be connected is consistent, in other words, if a query connecting the users and notes
// collections is made, the state of the collections may change during the Mongoose connection
// operation.

const bcrypt = require("bcrypt");
const usersRouter = require("express").Router(); // a new router object
//const Blog = require('../models/blog')
const User = require("../models/user"); // import mongoose User model

// Define routes:

// GET all users
usersRouter.get("/", async (req, res) => {
  //console.log('req.user: ', req.user)
  //if (!req.token) return res.status(401).json({ error: 'invalid or missing token' })
  // Bring in the valid user with await call?
  //const user = req.user
  //console.log('user: ', user)
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  //console.log('user: ', user)
  res.json(users);
});

// DELETE a user
usersRouter.delete("/", async (req, res) => {
  const { username, name, pw } = req.body;

  await User.findOneAndDelete({ username });
  res.status(204).end(); // 204 No Content
});

// POST a new user
usersRouter.post("/", async (req, res) => {
  const { username, name, pw } = req.body;

  const existingUser = await User.findOne({ username });
  //console.log('existingUser: ', existingUser)
  if (existingUser)
    return res.status(400).json({ error: "username must be unique" });
  else if (pw.length < 3)
    return res
      .status(400)
      .json({ error: "password must be at least three characters long" });

  // create a pwHash with await bcrypt.hash
  const saltRounds = 10;
  const pwHash = await bcrypt.hash(pw, saltRounds);

  // create new user with mongoose model
  const user = new User({ username, name, pwHash });

  // save user to DB
  const savedUser = await user.save();

  // send status code back to front-end
  res.status(201).json(savedUser); // 201 Successful Creation
});

module.exports = usersRouter;
