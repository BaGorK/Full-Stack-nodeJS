const fs = require('fs');
const path = require('path');

const targetDirectory = process.argv[2] || './';

const mapAsync = function (arr, fn, onFinish) {
  let prevError,
    nRemaining = arr.length;
  const results = [];
  arr.forEach(function (item, i) {
    fn(item, function (err, data) {
      if (prevError) return;
      if (err) {
        prevError = err;
        return onFinish(err);
      }
      results[i] = data;
      nRemaining--;
      if (!nRemaining) onFinish(null, results);
    });
  });
};

const readFile = function (file, cb) {
  fs.readFile(file, function (err, fileData) {
    if (err) {
      if (err.code === 'EISDIR') return cb(null, [file, 0]);
      return cb(err);
    }
    cb(null, [file, fileData.length]);
  });
};

const getFileLengths = function (dir, cb) {
  fs.readdir(dir, function (err, files) {
    if (err) return cb(err);
    //readdir will return an array of file name that found in that directory
    const filePaths = files.map((file) => path.join(dir, file));
    mapAsync(filePaths, readFile, cb);
  });
};

getFileLengths(targetDirectory, function (err, results) {
  if (err) return console.error(err);
  results.forEach(([file, length]) => console.log(`${file}: ${length}`));
  console.log('done!');
});
