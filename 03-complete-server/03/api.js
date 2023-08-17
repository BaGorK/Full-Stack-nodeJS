/*
Reading Query Parameters
We’ve already seen in chapter 1 that express can parse query parameters for us. This means that
when a client hits a route like /products?limit=25&offset=50, we should be able to access an object
like:
        {
        limit: 25,
        offset: 50
        }
In fact, we don’t have to do anything special to access an object of query parameters. express makes
that available on the request object at req.query. Here’s how we can adapt our request handler
function in ./api to take advantage of those options:
*/

const Products = require('./products');

const listProducts = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { offset = 0, limit = 25 } = req.query;

  try {
    res.json(
      await Products.list({
        offset: Number(offset),
        limit: Number(limit),
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listProducts,
};

// It’s important to notice that we make sure to coerce the limit and offset values into numbers. Query parameter values are always strings


// It is our api.js module’s responsibility to understand the structure of express request and response objects, extract relevant data from them, and pass that data along in the correct format to methods that perform the actual work.
