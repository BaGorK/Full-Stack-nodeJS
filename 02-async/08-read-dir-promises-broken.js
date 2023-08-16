const fs = require('fs').promises;

fs.readdir('./')
  .catch((err) => console.error(err))
  .then((files) => {
    files.forEach((file) => {
      fs.readFile(file)
        .catch((err) => console.error(err))
        .then((data) => {
          console.log(`\nfilename : ${file}, data-lenght: ${data.length}\n`);
        });
    });
  });
