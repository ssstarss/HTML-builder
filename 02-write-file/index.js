fs = require ("fs");
path = require("path");

const readline = require ("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const filePath = path.join(__dirname,"text.txt");

fs.writeFile( filePath, '',
  (err) =>{ if (err) throw err; });

console.log('Введите данные:');

rl.on("line", (input) => {
  if (input == "exit") {
    closetask();
    return;
    }
  fs.appendFile(filePath, input + "\r\n", 
    (err) => { if (err) throw err;});
});

rl.on("SIGINT", () => closetask());

function closetask(){
  console.log(`\nGood Buy`);
  rl.close()
}