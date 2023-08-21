const cuid = require('cuid');
const { isURL } = require('validator');

const db = require('./db');
// const fs = require('fs');
// const path = require('path');

const urlSchema = (opts = {}) => {
  const { required } = opts;

  return {
    type: String,
    required: !!required,
    validate: {
      validator: isURL,
      message: (props) => `${props.value} is not a valid URL `,
    },
  };
};

const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String, required: true },
  imgThumb: urlSchema({required: true}),
  img: urlSchema({required: true }),
  link: urlSchema(),
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userLink: urlSchema(),
  tags: { type: [String], index: true },
});

const create = async (fields) => {
  const products = await new Product(fields).save();
  return products;
};

const edit = async (_id, upadatedBody) => {
  const product = await get({ _id });

  Object.keys(upadatedBody).forEach((key) => {
    product[key] = upadatedBody[key];
  });

  await product.save();
  return product;
};

const remove = async (_id) => await Product.deleteOne({ _id });

// const productsFile = path.join(__dirname, '../products.json');

const list = async (opts = {}) => {
  const { offset = 0, limit = 25, tag } = opts;

  const query = tag ? { tags: tag } : {};
  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);
  return products;
  // We also use sort({ _id: 1 }) to make sure that we keep a stable sort order for paging.
};

const get = async (_id) => {
  const product = await Product.findById(_id);
  return product;
};

module.exports = {
  list,
  get,
  create,
  edit,
  remove,
};

/*

const list = async (opts = {}) => {
  const { offset = 0, limit = 25, tag } = opts;
  const data = await fs.readFile(productsFile);
  return JSON.parse(data).slice(offset, offset + limit);
};

We’ll first change Products.list() so that it no longer uses the filesystem. Instead, we’ll use our
new mongoose model to perform a query. We’ll use skip() and limit() for paging functionality, and
find() to look for a specific tag (if provided)

////////////////////////////////////////////////////////////////

const get = async (id) => {
  const products = await fs.readFile(productsFile);
  const product = JSON.parse(products).filter((prod) => prod.id === id);
  if (!product) return null;
  return product;
};

Next, we’ll update our Products.get() method. Similarly, we’ll use our mongoose model instead
of the filesystem, and most notably, we no longer need to inefficiently iterate through all of the
products to find a single one. MongoDB will be able to quickly find any product by its _id:
*/
