// Serving the Product Listing
// At this stage, our expectations are pretty clear. We should be able to visit http://localhost:1337/products and see our product listing

const fs = require('fs');
const path = require('path');
const express = require('express');

const port = process.env.PORT || 1337;

// CREATING AN EXPRESS SERVER
const app = express();

// CREATING OUR ROUTE HANDLER FUNCTIIONS
const listProducts = async (req, res) => {
  const productsFile = path.join(__dirname, '../products.json');
  try {
    const data = await fs.readFile(productsFile);
    res.status(200).json(JSON.parse(data));
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

/*
//Unlike require(), fs methods like fs.readFile() will resolve relative paths using the current working directory. This means that our code will look in different places for a file depending on which directory we run the code from.

// __dirname is one of the 21 global objects available in Nodejs(https://nodejs.org/api/globals.html). 
Global objects do not need us to use require() to make them available in our code. 
__dirname is always set to the directory name of the current module. For example, if we created a file
/Users/fullstack/example.js that contained console.log(__dirname), when we run node
example.js from /Users/fullstack, we could see that __dirname is /Users/fullstack.
Similarly, if we wanted the module’s file name instead of the directory name, we could
use the __filename global instead.

//
*/
