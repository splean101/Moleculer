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

process.stdin.on('data', (data) => {
  process.stdout.write(data + '\n');
});

const ask = (question) => {
  return new Promise((resolve, reject) => {
    process.stdout.write(question);
    process.stdin.once('data', (data) => {
      if (data !== 'y' || data !== 'n') {
        process.stdout.write('Invalid response format');
        process.exit();
      }
      resolve(data.toString().trim());
    });
  });
};
(async () => {
  const scss = await ask('Do you want to use SCSS?');
  const eslint = await ask('Do you want to use ESlint?');
  process.stdout.write(`Your answers: ${scss} ${eslint}!`);
  process.exit();
})();

