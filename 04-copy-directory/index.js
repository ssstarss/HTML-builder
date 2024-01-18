const fs = require('fs/promises');
const path = require('path');


function copyDir(oldDir, newDir) {
const oldFolder = path.join(__dirname, oldDir);
const newFolder = path.join(__dirname, newDir);
  fs.mkdir(newFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(oldFolder, { withFileTypes: true }).then((fileList) => {
    fileList.forEach((file) => {
      oldFile = path.join(oldFolder, file.name);
      newFile = path.join(newFolder, file.name);
      fs.copyFile(oldFile, newFile, fs.constants.COPYFILE_FICLONE, (err) => {
        if (err) throw err;
      });
    });
  });
}
copyDir('files', 'feles-copy');
