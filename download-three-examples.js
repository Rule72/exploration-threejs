const fs = require('fs');
const https = require('https');
const path = require('path');

const examplesJson = require('./three-examples.json');
const outputDir = path.join(__dirname, 'src', 'three-examples');

console.log('Starting download of Three.js examples...');
console.log(`Output directory: ${outputDir}`);

if (!fs.existsSync(outputDir)) {
  console.log(`Creating output directory: ${outputDir}`);
  fs.mkdirSync(outputDir, { recursive: true });
}

examplesJson.examples.forEach(example => {
  const fileName = path.basename(example.url);
  const filePath = path.join(outputDir, fileName);

  console.log(`Downloading: ${example.name} from ${example.url}`);

  https.get(example.url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download ${fileName}: HTTP ${response.statusCode}`);
      return;
    }

    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded: ${fileName}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${fileName}: ${err.message}`);
  });
});
