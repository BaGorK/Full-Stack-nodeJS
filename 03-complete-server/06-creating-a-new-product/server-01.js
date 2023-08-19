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

// ERROR HANDLERS
app.use(middleware.handleError);
app.use(middleware.notFound);

//LISTENING
app.listen(port, () => console.log(`Server listening on port: ${port}`));

/*
HTTP POST, PUT, and DELETE

*** express doesn’t parse request bodies for us automatically. so
we have to parse it by using a middleware called body-parser.

When a client sends a GET request, the only information transferred is the URL path, host, and
request headers. Furthermore, GET requests are not supposed to have any permanent effect on the
server. To provide richer functionality to the client we need to support other methods like POST.
In addition to the information that a GET request sends, a POST can contain a request body. The
request body can be any type of data such as a JSON document, form fields, or a movie file. An
HTTP POST is the primary way for a client to create documents on a server
*/
