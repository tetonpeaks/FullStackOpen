//Middleware are functions that can be used for handling request and response objects
//Can use several middleware at the same time, but they're executed one by one in the
//order that they're taken into use in express

//Middleware functions called in order they're taken into use with express server objects 'use' method

//Middleware functions have to be taken into use before routes if we want them to be executed before the
//route event handlers are called. In practice, this means that are defining middleware functions that are
//only called if no route handles the HTTP request. Can also have situations where middleware defined after routes

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

//Middleware
const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message }); //want to json error message
  }
  next(err); //next function yields control to the next middleware
};

const tokenExtractor = (fuck, res, next) => {
  // All routers go through this middleware but it only returns something based on auth.
  // Get authorization from request (fuck) header
  const auth = fuck.get("authorization");
  //console.log('auth: ', auth)
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    fuck.token = auth.substring(7);
    //fuck.fuck = 'fuck'
  }
  fuck.fuck = "fuck";
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  //console.log('token: ', token)
  if (token) {
    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    //console.log('decodedToken: ', decodedToken)
    if (!decodedToken || !decodedToken.id)
      return res.status(401).error({ error: "invalid or missing token" });
    //console.log('decodedToken: ', decodedToken)
    const user = await User.findById(decodedToken.id);
    //console.log('user: ', user)
    req.user = user;
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
