import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const book = 'The Wind in the Willows (introductory fragment).txt';

const readStream = fs.createReadStream(path.join(__dirname, '/files', book), {
  highWaterMark: 1024,
});
const writeStream = fs.createWriteStream(
  path.join(__dirname, '/files', 'book_copy.txt')
);

readStream.on('data', (chunk) => {
  writeStream.write('Introductory fragment, copying is prohibited');
  writeStream.write(chunk);
});
