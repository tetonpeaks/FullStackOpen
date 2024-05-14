// Applications that use usernames, passwords and token authentication should always be used over an
// encrypted HTTPS connection. We can use an HTTPS server in our applications instead of Node"s HTTP
// server (it requires more configuration)

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (req, res) => {
    const { username, pw } = req.body

    const user = await User.findOne({ username }) // Use username to find the user from body with await call

    // Check password with bcrypt.compare, but first check if await call returns with a null object
    const pwCorrect = user === null ? false : bcrypt.compare(pw, user.pwHash)

    // 401 Unauthorized check and response
    if (!(user && pwCorrect)) return res.status(401).json({ error: "invalid username or password" })

    // For valid users setup params to obtain token from jwt.sign
    const userForToken = { username: user.username, id: user._id, }
    const token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY, { expiresIn: 60*60 })
    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter