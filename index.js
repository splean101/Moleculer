import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const book = 'The Wind in the Willows (introductory fragment).txt';

const readStream = fs.createReadStream(path.join(__dirname, '/files', book));
console.log(readStream.readableHighWaterMark);
readStream.on('data', (chunk) => {
  console.log('---------');
  console.log(chunk);
});
