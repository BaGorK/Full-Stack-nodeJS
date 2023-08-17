// const express = require('express');
// const app = express();

const app = require('express')();
const api = require('./api');

const port = process.env.PORT || 1337;

app.get('/products', api.listProducts);

app.listen(port, () => console.log(`listening on port: ${port}`));
