const config = require("./utils/config") // config for env varibles
const express = require("express")
require("express-async-errors")
const App = express() // create express object stored in App
const cors = require("cors")
const blogsRouter = require("./controllers/blogs") // bring in router module
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware") // bring in middleware module
const { info, error } = require("./utils/logger") // bring in info and error logging module
const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

// Connect to MongoDB
info("Connecting to: ", config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => {info("connected to MongoDB!")})
    .catch(err => {error("error connected to MongoDB: ", err.message)})

App.use(cors())
App.use(express.json())
App.use(middleware.requestLogger)
App.use(middleware.tokenExtractor)

App.use("/api/users", usersRouter) // usersRouter attached to /api/blogs address
App.use("/api/blogs", middleware.userExtractor, blogsRouter)
App.use("/api/login", loginRouter)

App.use(middleware.unknownEndpoint)
App.use(middleware.errorHandler)

module.exports = App
