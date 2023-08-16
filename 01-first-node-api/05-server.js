const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const PORT = process.env.PORT || 1335;

http
  .createServer((req, res) => {
    if (req.url === '/') return responseText(req, res);
    if (req.url === '/json') return responseJSON(req, res);
    if (req.url.match(/^\/echo/)) return respondEcho(req, res);
    if (req.url.match(/^\/static/)) return respondStatic(req, res);

    respondNotFound(req, res);
  })
  .listen(PORT, () => {
    console.log('server is listening...');
  });

// listener functions

const responseText = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('some text');
};

const responseJSON = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      name: 'edmealem',
      email: 'edmealem@gmail.com',
    })
  );
};

const respondEcho = (req, res) => {
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

const respondStatic = (req, res) => {
  const filename = `${__dirname}/public${req.url.split('/static')[1]}`;
  fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res);
  // we use the `fs.createReadStream()` method to create a Straem object representing our choosen file.
  //we then use that stream object's `pipe()` method to connect it to the response.
  // we also use the stream object's ``on()` method to listen for an error.
};

const respondNotFound = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>page not found</h1>');
};
