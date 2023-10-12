const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = process.env.PORT || 1335;

const responseJSON = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      name: 'Edmealem',
      email: 'bagor@gmail.com',
    })
  );
};

const responseText = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('some text');
};

const respondEcho = (req, res) => {
  // we can also parse the url and get the value of the queryString directly;
  // const { pathname, query } = url.parse(req.url, true);
  // query.input = 'fullstack'; // /echo?input=fullstack  -- {input: 'fullstack'}
  // query.id = '4'; // /echo?id=4; // {id: '4'};
  //-  /echo?input=fullstack

  const { pathname, query } = url.parse(req.url, true);
  console.log(pathname, query); //  /echo  and  { input: 'fullstack' }

  console.log(req.url); //  /echo?input=fullstack
  console.log(url.parse(req.url, true)); // 👇
  /*
 Url {
  protocol: null,
  slashes: null, 
  auth: null,    
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?input=fullstack',
  query: [Object: null prototype] { input: 'fullstack' },
  pathname: '/echo',
  path: '/echo?input=fullstack',
  href: '/echo?input=fullstack'
}
*/
  console.log(querystring.parse(req.url.split('?').slice(1).join(''))); //  { input: 'fullstack' }
  const { input } = querystring.parse(req.url.split('?').slice(1).join(''));
  console.log(JSON.stringify({ name: 'Edmealem' })); // will result in {"name":"Edmealem"}

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      normal: input,
      shouty: input.toUpperCase(),
      // characterCount: input.length,
      // backwards: input.split('').reverse().join(''),
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
