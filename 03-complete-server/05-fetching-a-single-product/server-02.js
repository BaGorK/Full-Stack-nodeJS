const app = require('express')();
const api = require('./api-01');
const middleware = require('./middleware');

const port = process.env.PORT || 1337;

// MIDDLEWARE
app.use(middleware.cors);

// ROUTES
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);

// ERROR HANDLERS
app.use(middleware.handleError);
app.use(middleware.notFound);

//LISTENING
app.listen(port, () => console.log(`Server listening on port: ${port}`));
