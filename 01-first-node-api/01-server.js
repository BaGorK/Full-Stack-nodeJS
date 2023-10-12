const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 1335;

// const server = http.createServer((req, res) => {
//   res.end('Hello from the server!');
// });

const server = http.createServer((req, res) => {
  //   res.setHeader('Content-Type', 'application/json');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(req.url); // full pathname with the queries like  /products?id=4;
  console.log(url.parse(req.url, true)); 

  res.end(
    JSON.stringify({
      name: 'Edmealem',
      email: 'bagor@gmail.com',
    })
  );
});

server.listen(PORT, () => {
  console.log('server is listening...');
});

// process - is a global object with information about the currently running process
// process.env - is an object that contains all environment variables.
