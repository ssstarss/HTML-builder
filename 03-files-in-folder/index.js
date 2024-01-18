const fsPromises = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fsPromises.readdir(folderPath, { withFileTypes: true }).then( filesList => {
    filesList.forEach(file => {
      
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const filename = path.parse(filePath).name;
        const fileext = path.parse(filePath).ext.slice(1);

        fsPromises.stat(filePath).then(result => {
          fileSize = (result.size / 1000).toFixed(3);
          console.log(`${filename} - ${fileext} - ${fileSize}kb`);
        });
      }
    });
});
