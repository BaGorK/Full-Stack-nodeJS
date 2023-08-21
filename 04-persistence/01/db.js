const mongoose = require('mongoose');
mongoose.connect(process.env.MONODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

module.exports = mongoose;

/*

In our products.js file, we are no longer going to use the fs module. Instead of using the filesystem 
as our data source, we're going to use  MongoDB. Therefore, instead of using fs, we're going to create 
a new module to use instead, db.js
 
To install mongoose use 'npm i mongoose' command.

*/
