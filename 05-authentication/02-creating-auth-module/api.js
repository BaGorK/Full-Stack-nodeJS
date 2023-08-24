const Products = require('./models/products');
const Orders = require('./models/orders');

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
  const product = await Products.create(req.body);
  res.json(product);
};

const editProduct = async (req, res, next) => {
  const product = await Products.edit(req.params.id, req.body);

  res.json(product);
};

const deleteProduct = async (req, res, next) => {
  await Products.remove(req.params.id);

  res.json({ success: true });
};

// ORDERS

const createOrder = async (req, res, next) => {
  const order = await Orders.create(req.body);
  res.json(order);
};

const listOrders = async (req, res, next) => {
  const { offset = 0, limit = 25, productId, status } = req.query;

  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  });

  res.json(orders);
};

module.exports = {
  getProduct,
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,

  createOrder,
  listOrders,
};
