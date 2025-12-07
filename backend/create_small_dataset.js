import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../sales_data.csv');
const outputFile = path.join(__dirname, '../sales_data_100k.csv');
const maxRows = 100000;

console.log('Creating 100k record dataset...');

const rl = readline.createInterface({
    input: fs.createReadStream(inputFile),
    crlfDelay: Infinity
});

const writeStream = fs.createWriteStream(outputFile);
let count = 0;

rl.on('line', (line) => {
    if (count <= maxRows) {
        writeStream.write(line + '\n');
        count++;

        if (count % 10000 === 0) {
            console.log(`Processed ${count} rows...`);
        }
    } else {
        rl.close();
    }
});

rl.on('close', () => {
    writeStream.end();
    console.log(`✓ Created sales_data_100k.csv with ${count - 1} data records (+ header)`);
    const sizeMB = (fs.statSync(outputFile).size / 1024 / 1024).toFixed(2);
    console.log(`File size: ${sizeMB} MB`);
});
