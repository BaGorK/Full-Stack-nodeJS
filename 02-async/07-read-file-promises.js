const fs = require('fs').promises;

const filename = '07-read-file-promises.js';

fs.readFile(filename)
  .then((data) =>
    console.log(`\nfilename: ${filename}, data-length: ${data.length}\n`)
  )
  .catch((err) => console.error(err));
