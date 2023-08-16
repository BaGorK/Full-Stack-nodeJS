// This will be the data model for our products. We keep the data model separate from the API module because the data model doesn’t need to know about HTTP request, response objects.
const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../products.json');

const list = async () => {
  const data = await fs.readFile(productsFile);
  return JSON.parse(data);
};

module.exports = {
  list,
};
