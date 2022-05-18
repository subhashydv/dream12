const fs = require('fs');
const content = JSON.parse(fs.readFileSync('./data/horseData.json', 'utf8'));
const { generateHtml } = require('./generateHtml.js');

const output = generateHtml(content, 'Dream12');
fs.writeFileSync('./html/index.html', output, 'utf8');
