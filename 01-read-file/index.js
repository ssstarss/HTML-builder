const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './text.txt');
const stream = new fs.ReadStream(filePath, 'utf8');

stream.on('data', (string) => {
  console.log(string);
});

stream.on('error', function () {
  console.log(`Ошибка чтения: ${error}`);
});
