const db = require('../db');

const Products = require('../models/products');
const product = require('../../products.json');
////

(async function () {
  for (let i = 0; i < products.length; i++) {
    console.log(await Products.create(product[i]));
  }
  db.disconnect();
});

/*

When working locally it’s very useful to have data in our database. Before we switched to MongoDB,
we were using a JSON file that had products to test with. However, databases start empty, and ours
will only have products and orders that we create using the API.
To make things easier on ourselves, we’ll create a simple script that uses our products.js module
to create documents in our database to work with:

All we’re doing here is using the Products.create() method directly by iterating over all the
products in the JSON file. The only trick is that we want to close the database connection when
we’re finished so that Node.js will exit; Node.js won’t terminate while there is a connection open.

*/
