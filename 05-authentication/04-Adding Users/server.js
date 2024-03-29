const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const api = require('./api');
const auth = require('./auth');
const middleware = require('./middleware');

const port = process.env.PORT;

app.use(middleware.cors);
app.use(bodyParser.json());
app.use(cookieParser());
auth.setMiddleware(app);

app.post('/login', auth.authenticate, auth.login);

app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', auth.ensureAdmin, api.createProduct);
app.put('/products/:id', auth.ensureAdmin, api.editProduct);
app.delete('/products/:id', auth.ensureAdmin, api.deleteProduct);

app.get('/orders', auth.ensureAdmin, api.listOrders);
app.post('/orders', auth.ensureAdmin, api.createOrder);

app.post('/users', api.createUser);

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
