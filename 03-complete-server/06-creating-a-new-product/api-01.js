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
  const { offset = 0, limit = 25, tag } = req.query;
  try {
    res.json(
      await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res, next) => {
  console.log(`request body: ${req.body}`);
  res.json(req.body);
};

const editProduct = async (req, res, next) => {
  res.json(req.body);
};

const deleteProduct = async (req, res, next) => {
  res.json(req.body);
};

module.exports = {
  getProduct,
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
};
