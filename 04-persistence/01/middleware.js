const cors = (req, res, next) => {
  const origin = req.headers.origin;

  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE, XMODIFY'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Max-Age', '86400');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-with, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
};

const handleError = (err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Internal Server Error' });
};
// any time that next() is called with an argument (e.g. next(err)), the next available error handler middleware function will be called.

// To fix this, we’ll add our own “catch all” middleware to handle this case:
const notFound = (req, res) => {
  res.status(404).json({ error: 'Not Found' });
};

module.exports = {
  cors,
  handleError,
  notFound,
};

// The purpose of next() is to allow our functions to pass control of the request and response objects to other handlers in a series.
