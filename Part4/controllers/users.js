const bcrypt = require("bcrypt")
const usersRouter = require("express").Router() // a new router object
const User = require("../models/user") // import mongoose User model

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1 })
    res.json(users)
})

usersRouter.delete("/", async (req, res) => {
    const { username } = req.body

    await User.findOneAndDelete({ username })
    res.status(204).end() // 204 No Content
})

usersRouter.post("/", async (req, res) => {
    const { username, name, pw } = req.body

    if (username) return res.status(400).json({ error: "username must be unique" })
    else if (pw.length < 3) return res.status(400).json({ error: "password must be at least characters long" })

    // create a pwHash with await bcrypt.hash
    const saltRounds = 10
    const pwHash = await bcrypt.hash(pw, saltRounds)

    // create new user with mongoose model
    const user = new User({ username, name, pwHash})

    // save user to DB
    const savedUser = await user.save()

    // send status code back to front-end
    res.status(201).json(savedUser) // 201 Successful Creation
})

module.exports = usersRouter
