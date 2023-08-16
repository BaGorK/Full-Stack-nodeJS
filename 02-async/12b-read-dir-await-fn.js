const fs = require('fs').promises;
const { error } = require('console');
const path = require('path');

const targetDirectory = process.argv[2] || './';

const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);
    return [filePath, data.length];
  } catch (error) {
    if (error.code === 'EISDIR') return [filePath, 0];
    throw error;
  }
};

const getFileLengths = async (dir) => {
  const fileList = await fs.readdir(dir);

  const readFiles = fileList.map(async (file) => {
    const filePath = path.join(dir, file);
    return await readFile(filePath);
  });

  return await Promise.all(readFiles);
};

const printLengths = async (dir) => {
  try {
    const results = await getFileLengths(dir);
    console.log('///////////');
      console.log(results);
      
      results.forEach(([file, length]) => console.log(`${file} : ${length}`))

      console.log('DONE!!!');
  } catch (err) {
    console.error(err);
  }
};

printLengths(targetDirectory);
