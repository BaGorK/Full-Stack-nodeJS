// Serving the Product Listing
// At this stage, our expectations are pretty clear. We should be able to visit http://localhost:1337/products and see our product listing

const fs = require('fs');
const path = require('path');
const express = require('express');

const port = process.env.PORT || 1337;

// CREATING AN EXPRESS SERVER
const app = express();

// LISTENING FUNCTIONS

const listProducts = async (req, res) => {
  const productsFile = path.join(__dirname, '../products.json');
  try {
    const data = await fs.readFile(productsFile);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// ROUTES
app.get('/products', listProducts);

//Listening
app.listen(port, () => console.log(`Server Listening on port: ${port}`));
