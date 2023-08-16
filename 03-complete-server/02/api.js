/*
Our API module is responsible for converting HTTP requests into HTTP responses. The module achieves this by leveraging other modules. Another way of thinking about this is that this module is the connection point between the outside world and our internal methods. If you’re familiar with Ruby on Rails style MVC, this would be similar to a Controller 
*/

const Products = require('./products');

const listProducts = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    res.json(await Products.list());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listProducts,
};
