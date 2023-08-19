const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../products.json');

const list = async (opts = {}) => {
  const { offset = 0, limit = 25, tag } = opts;
  const data = await fs.readFile(productsFile);
  return JSON.parse(data).slice(offset, offset + limit);
};

const get = async (id) => {
  const products = await fs.readFile(productsFile);
  const product = JSON.parse(products).filter((prod) => prod.id === id);
  if (!product) return null;
  return product;
};

module.exports = {
  list,
  get,
};
