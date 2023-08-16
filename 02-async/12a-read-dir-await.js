const fs = require('fs').promises;

const printLengths = async (dir) => {
  const fileList = await fs.readdir(dir);
  const result = await Promise.all(
    fileList.map((file) =>
      fs.readFile(file).then((data) => [file, data.length])
    )
  );
  console.log(result);
};

printLengths('./');
