const http = require('http');
const querystring = require('querystring');

const PORT = process.env.PORT || 1335;

const responseJSON = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      name: 'edmealem',
      email: 'edmealem@gmail.com',
    })
  );
};

const responseText = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('some text');
};

const respondEcho = (req, res) => {
  //  /echo?input=fullstack
  // console.log(req.url); //  /echo?input=fullstack
  // console.log(querystring.parse(req.url.split('?').slice(1).join(''))); //  { input: 'fullstack' }
  const { input } = querystring.parse(req.url.split('?').slice(1).join(''));
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      normal: input,
      shouty: input.toUpperCase(),
      characterCount: input.length,
      backwards: input.split('').reverse().join(''),
    })
  );
};

const respondNotFound = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>page not found</h1>');
};

http
  .createServer((req, res) => {
    if (req.url === '/') return responseText(req, res);
    if (req.url === '/json') return responseJSON(req, res);
    if (req.url.match(/^\/echo/)) return respondEcho(req, res);
    respondNotFound(req, res);
  })
  .listen(PORT, () => {
    console.log('server is listening...');
  });
