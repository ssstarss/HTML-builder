const fsPromises = require('fs/promises');
const path = require('path');


const srcFolder = path.join(__dirname,'files');
const distFolder = path.join(__dirname,'files-copy');

copyDir(srcFolder, distFolder);

function copyDir(oldDir, newDir) {
  fsPromises.mkdir(newDir, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fsPromises.readdir(oldDir, { withFileTypes: true }).then((fileList) => {
    fileList.forEach((file) => {
      if (file.isDirectory())
        copyDir(path.join(oldDir, file.name), path.join(newDir, file.name));
      else {
        oldFile = path.join(oldDir, file.name);
        newFile = path.join(newDir, file.name);
        fsPromises.copyFile(
          oldFile,
          newFile,
          fsPromises.constants.COPYFILE_FICLONE,
          (err) => {
            if (err) throw err;
          },
        );
      }
    });
  });
}

module.exports = copyDir;
