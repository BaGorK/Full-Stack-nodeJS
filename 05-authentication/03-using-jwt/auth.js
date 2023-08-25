/*

To review, our app uses the session to keep track of who a particular user is. Once a user proves
their identity by providing a username and password, we send back a generated session ID that is
associated with their username. In the future, they’ll send back the session ID and we can look up
the username in storage.
We can avoid using sessions entirely by using JSON Web Tokens (JWT). Instead of sending the user
a session ID that is associated with username, we can send the user a token that contains their
username. When we receive that token back from the user, no lookups are required. The token tells
the server what their username is. This may sound dangerous; why can’t anybody just send us a
token with the admin username? This isn’t possible because with JWT, tokens are signed with a
secret; only servers with the secret are able to create valid tokens.
Another benefit of using JWTs is that we don’t need the client to use cookies. Our server can
return the token in the response body. Afterwards the client only needs to provide that token in
an authorization header for authentication. Cookies are convenient for browsers, but they can be
complicated for non-browser clients.
Since we’ve moved all auth-related logic to auth.js, almost all of the changes will be limited to that
module. Most of what we need to do is to replace express-session and related functionality with
jsonwebtoken. To get started we change our requires and initial setup:
*/
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const autoCatch = require('./lib/auto-catch');

const jwtSecret = process.env.JWT_SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' };

passport.use(adminStrategy());
const authenticate = passport.authenticate('local', { session: false });

module.exports = {
  authenticate,
  login: autoCatch(login),
  ensureAdmin: autoCatch(ensureAdmin),
};

async function login(req, res, next) {
  const token = await sign({ username: req.user.username });
  res.cookie('jwt', token, { httpOnly: true });
  res.json({ success: true, token });
}

async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts);
  return token;
}

async function ensureAdmin(req, res, next) {
  const jwtString = req.headers.authorization || req.cookie.jwt;
  const payload = await verify(jwtString);
  if (payload.username === 'admin') return next();

  const err = new Error('Unauthorized');
  err.statusCode = 401;
  next(err);
}

/*
We give clients the option of providing the token via cookies or authorization header, so we check
for it in both places. Afterwards we use jwt to verify it and get the contents of the token payload.
Like before, if the user is the admin, we let them continue. If not, we give them an error.

Similar to sign(), verify() is just a convenience wrapper. When clients send a token via authoriza-
tion header, the standard is to have the token prefixed with 'Bearer ', so we filter that out if it’s
present. Also, we want to make sure that if there’s an error, we set the statusCode property to 401
so that our handleError() middleware will send the client the proper error message:
*/

async function verify(jwtString = '') {
  jwtString = jwtString.replace(/^Bearer /i, '');

  try {
    const payload = await jwt.verify(jwtString, jwtSecret);
    return payload;
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }
}

function adminStrategy() {
  return new Strategy((username, password, cb) => {
    const isAdmin = username === 'admin' && password === adminPassword;
    if (isAdmin) return cb(null, { username: 'admin' });

    cb(null, false);
  });
}
