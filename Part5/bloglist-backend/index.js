const config = require('./utils/config') //config for env varibles
const express = require('express')
require('express-async-errors')
const App = express() // create express object stored in App
const cors = require('cors')
const blogsRouter = require('./controllers/blogs') // bring in router module
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware') // bring in middleware module
const { info, error } = require('./utils/logger') // bring in info and error logging modul
const mongoose = require('mongoose')

// Connect to MongoDB
info('Connecting to: ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => {info('connected to MongoDB!')})
    .catch(err => {error('error connected to MongoDB: ', err.message)})

// json-parser takes JSON data of a request and transforms into JS object,
// attaches it to body prop of request object before the route handler is called.
// without the body property req.body would be undefined
App.use(cors())

// whenver express gets a GET req it will first check if hte build directory containts a file
// corresponding to the req's address. if correct, express will return in
// GET req's to the address www.blabla.com/index.html or www.blabla.com will show the
// React frontend. GET req's to the address www.blabla.com/api/blogs will be handled by backend
App.use(express.static('build'))
App.use(express.json())

App.use(middleware.requestLogger)
App.use(middleware.tokenExtractor)
//App.use(middleware.userExtractor)

/* // blogsRouter attached to /api/blogs address
App.use('/api/blogs', blogsRouter, middleware.userExtractor) */
// blogsRouter attached to /api/blogs address (order matters)
App.use('/api/blogs', middleware.userExtractor, blogsRouter)
//App.use('/api/blogs', blogsRouter)

// usersRouter attached to /api/blogs address
App.use('/api/users', usersRouter)
App.use('/api/login', loginRouter)

// FOR E2E and add it to the backend only if the application is run on test-mode:
if (`${process.env.NODE_ENV}` === 'test') {
    const testingRouter = require('./controllers/testing')
    App.use('/api/testing', testingRouter)
}

App.use(middleware.unknownEndpoint)
App.use(middleware.errorHandler)

const PORT = process.env.PORT
App.listen(PORT, () => {console.log(`Server is running on ${PORT}`)})