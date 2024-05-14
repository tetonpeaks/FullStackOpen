// Middleware

const User = require("../models/user")
const jwt = require("jsonwebtoken")
const logger = require("./logger")

const requestLogger = (req, res, next) => {
    logger.info("Method: ", req.method)
    logger.info("Path: ", req.path)
    logger.info("Body: ", req.body)
    logger.info("---")
    next()
}

const unknownEndpoint = (req, res) => {res.status(404).send({ error: "unknown endpoint" })}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" })
    } else if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message }) // want to json error message
    }
    next(err) // next function yields control to the next middleware
}

// All routers go through tokenExtractor but it only returns something based on auth.
const tokenExtractor = (req, res, next) => {
    const auth = req.get("authorization")
    if (auth && auth.toLowerCase().startsWith("bearer ")) req.token = auth.substring(7)

    next()
}

const userExtractor = async (req, res, next) => {
    const token = req.token
    if (token) {
        const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET_KEY)
        if (!decodedToken || !decodedToken.id) return res.status(401).error({ error: "invalid or missing token" })
        const user = await User.findById(decodedToken.id)
        req.user = user
    }

    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}