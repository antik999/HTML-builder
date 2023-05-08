const path = require('path');
const txtPath = path.join(__dirname, 'text.txt');

const fs = require('fs');
const readableStream = fs.createReadStream(txtPath, 'utf-8');
readableStream.on('data', chunk => console.log(chunk));