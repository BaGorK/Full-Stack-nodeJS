const Products = require('./products');

const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Products.get(id);
    if (!product) return next();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listProducts = async (req, res) => {
  const { offset = 0, limit = 25, tag} = req.query;
  try {
    res.json(
      await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  getProduct,
  listProducts,
};
