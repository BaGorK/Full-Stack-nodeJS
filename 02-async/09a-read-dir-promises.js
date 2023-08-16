const fs = require('fs').promises;

fs.readdir('./') // Promise { <pending> }

  .then((fileList) => {
    console.log(`filelists\n`,fileList); // returns a list of files in an array

    // returns an array of [filename, length]
    const arr = fileList.map((file) =>
      fs.readFile(file).then((data) => [file, data.length])
    );

    return Promise.all(arr);
  })
  .then((result) => {
    console.log(result);

    result.forEach(([file, length]) => console.log(`${file} : ${length}`));
  })
  .catch((err) => console.error(err));

/*

// fileLists
[
  '.prettierrc',
  '06c-read-dir-callbacks-cli.js', 
  '07-read-file-promises.js',      
  '08-read-dir-promises-broken.js',
  '09a-read-dir-promises.js'       
]

//results
[
  ['.prettierrc', 27],
  ['06c-read-dir-callbacks-cli.js', 1228],
  ['07-read-file-promises.js', 248],
  ['08-read-dir-promises-broken.js', 353],
  ['09a-read-dir-promises.js', 538],
];

//`${file} : ${length}`
.prettierrc : 27
06c-read-dir-callbacks-cli.js : 1228
07-read-file-promises.js : 248
08-read-dir-promises-broken.js : 353
09a-read-dir-promises.js : 538
*/
