const fsPromises = require('fs/promises');
const path = require('path');

const destPath = path.join(__dirname, 'project-dist/bundle.css');
const srcPath = path.join(__dirname, 'styles');

fsPromises.writeFile(destPath, '', (err) => {
  if (err) throw err;
});

fsPromises.readdir(srcPath, { withFileTypes: true }).then((filesList) => {
  filesList.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(srcPath, file.name);
      const fileext = path.parse(filePath).ext.slice(1);
      if (fileext == 'css') {
        fsPromises.readFile(filePath).then((string) => {
          fsPromises.appendFile(destPath, string, (err) => {
            if (err) throw err;
          });
        });
      }
    }
  });
});
