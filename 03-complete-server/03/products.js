const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../products.json');

const list = async (opts = {}) => {
  const { offset = 0, limit = 25 } = opts;

  const data = await fs.readFile(productsFile);
  return JSON.parse(data).slice(offset, offset + limit);
};

module.exports = {
  list,
};

// JSON.parse(data) - returns an array of objects
