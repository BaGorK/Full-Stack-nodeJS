const app = require('express')();
const bodyParser = require('body-parser');

const api = require('./api-01');
const middleware = require('./middleware');

const port = process.env.PORT || 1337;

// MIDDLEWARE
app.use(middleware.cors);
app.use(bodyParser.json());

// ROUTES
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder);
// ERROR HANDLERS
app.use(middleware.handleError);
app.use(middleware.notFound);

//LISTENING
app.listen(port, () => console.log(`Server listening on port: ${port}`));

