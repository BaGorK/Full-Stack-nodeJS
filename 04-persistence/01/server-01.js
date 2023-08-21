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

//////////A Complete Server: Persistence///////////

Databases allow us to separate the data from our running code, so that our app does not have to run
at the same location where our data is stored.

when persisting data with a SQL database, it is common to have store relationships between rows. 
When retrieving data, the database can automatically 'JOIN'  related rows to 
conveniently return all nevessary at once. MongoDB does not handle relationships, and this means
that an app using MongoDB would need its own logic to fetch related documents.

Mongoose is an ODM (object data modeling) library that can easily provide both of these features to our app.

Conversely, MongoDB was created to closely match how we work with data in JavaScript and
Node.js. Rather than using a table and row model, MongoDB has collections of documents. Each
document in a collection is essentially a JavaScript object. This means that any data we use in our
code will be represented very similarly in the database.

*/