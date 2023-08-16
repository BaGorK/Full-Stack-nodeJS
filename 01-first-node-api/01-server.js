// CREATE THE ABSOLUTE MINIMUM NODEJS SERVER
const http = require('http');

const PORT = process.env.PORT || 1335;

// const server = http.createServer((req, res) => {
//   res.end('Hello from the server!');
// });

const server = http.createServer((req, res) => {
  //   res.setHeader('Content-Type', 'application/json');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(req.url);
  res.end(
    JSON.stringify({
      name: 'edmealem',
      email: 'edmealem@gmail.com',
    })
  );
});

server.listen(PORT, () => {
  console.log('server is listening...');
});

// process - is a global object with information about the currently running process
// process.env - is an object that contains all environment variables.
