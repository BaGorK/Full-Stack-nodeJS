const express = require('express');
// const app = require('express')();
const api = require('./api');

const app = express();
const port = process.env.PORT || 1337;

app.get('/products', api.listProducts);

app.listen(port, () => console.log(`listening on port: ${port}`));

/*
///////////////////Data flow of our modules//////////////////////

server.js---->  api.js---->  products.js

Another way to think of how we organize our modules is that the server module is on the outside.
This module is responsible for creating the web server object, setting up middleware, and connecting routes to route handler functions. In other words, our server module connects
external URL endpoints to internal route handler functions.


Our next module is the API. This module is a collection of route handlers. Each route handler
is responsible for accepting a request object and returning a response. A route handler does this
primarily by using model methods. Our goal is to keep these route handler functions high-level and
readable.


Lastly, we have our model module. Our model module is on the inside, and should be agnostic
about how it’s being used. Our route handler functions can only be used in a web server because
they expect response objects and are aware of things like content-type headers. In contrast, our
model methods are only concerned with getting and storing data.


This is important for testing (which we’ll cover more in depth later), because it simplifies what we
need to pass to each tested method. For example, if our app had authentication, and we did not
separate out the model, each time we tested the model we would have to pass everything necessary
for authentication to pass. This would mean that we were implicitly testing authentication and not
isolating our test cases
*/
