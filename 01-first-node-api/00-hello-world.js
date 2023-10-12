// require('http')
// .createServer((req, res) => res.end('hello world'))
// .listen(3000);

// CREATE THE ABSOLUTE MINIMUM NODEJS SERVER
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('HELLO SERVER!');
});
server.listen(8000, 'localhost', () => {
  console.log('Server is Listening on PORT 8000...');
});
