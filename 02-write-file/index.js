const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const path = require('path');
const outputFile = path.join(__dirname, 'log.txt');

const writeStream = fs.createWriteStream(outputFile, {
  flags: 'a'
});

console.log('Введите текст для записи в файл:');
const byePhrase = 'Запись в файл завершена. Хорошего дня! :)';

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log(byePhrase);
    writeStream.end();
    process.exit();
  } else {
    writeStream.write(input + '\n');
  }
});

rl.on('SIGINT', () => {
  console.log(byePhrase);
  writeStream.end();
  process.exit();
});
