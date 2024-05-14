// in functionality than, for example, MongoDB or relational databases, but works very quickly in
// certain types of usage scenarios.

// When using server-side sessions, like jwt tokens, the token often does not contain any
// information about the user (e.g. username), instead, the token is only a random string,
// the corresponding user of which is retrieved from the database where the sessions are stored
// on the server. It is also common that when using a server-side session, information about the
// user's identity is transmitted via cookies instead of the Authorization header.

// Applications that use usernames, passwords and token authentication should always be used over an
// encrypted HTTPS connection. We can use an HTTPS server in our applications instead of Node's HTTP
// server (it requires more configuration)

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, pw } = req.body;

  console.log("req.body: ", req.body)

  // Use username to find the user from body with await call
  const user = await User.findOne({ username });
  //console.log("user: ", user)
  //console.log('user: ', user)
  // Check password with bcrypt.compare, but first check if await call returns with a null object
  const pwCorrect =
    user === null ? false : await bcrypt.compare(pw, user.pwHash);
  /*     console.log('bcrypt.compare: ', bcrypt.compare(pw, user.pwHash))
    console.log('pw: ', pw)
    console.log('user.pwHash: ', user.pwHash)
    console.log('pwCorrect', pwCorrect) */

  // 401 Unauthorized check and response
  if (!(user && pwCorrect))
    return res.status(401).json({ error: "invalid username or password" });

  // For valid users setup params to obtain token from jwt.sign
  const userForToken = { username: user.username, id: user._id };
  const token = jwt.sign(userForToken, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: 60 * 60,
  });
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
