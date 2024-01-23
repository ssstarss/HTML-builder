const fsPromises = require('fs/promises');
const path = require('path');

const  destFolder = path.join(__dirname, 'project-dist');

fsPromises.mkdir(destFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

const stylesFile = path.join(__dirname, 'project-dist/style.css');
const stylesSrc = path.join(__dirname, 'styles');
const assetsDest = path.join(destFolder, 'assets');
const assetsSrc = path.join(__dirname, 'assets');
const templateFile = path.join(__dirname, 'template.html');
const htmlFile = path.join(__dirname, 'project-dist/index.html');
const componentsPath = path.join(__dirname, 'components');

fsPromises.mkdir(destFolder, { recursive: true }, (err) => {
  if (err) throw err;
});
copyDir(assetsSrc, assetsDest);
mergeStyles(stylesSrc, stylesFile);
buildHtml();


async function buildHtml(){
  let components = [];
  let filesList = await fsPromises.readdir(componentsPath, { withFileTypes: true });
  filesList.forEach(file => {
    if (file.isFile()) {
      const filePath = path.join(componentsPath, file.name);
      const filename = path.parse(filePath).name;
      components.push(filename)
    }
  });
  
  let templateText =await fsPromises.readFile(templateFile);
  templateText = templateText.toString()
  let some = templateText.split('\r\n');
  for (let component of components) {
    srcPath = path.join(__dirname , 'components' , component + '.html');
    string = await fsPromises.readFile(srcPath)
    templateText = templateText.toString().replace(`{{${component}}}`, string);
  }
  fsPromises.writeFile(htmlFile, templateText); 
}

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

function mergeStyles(srcPath, destPath) {

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
  
  }

