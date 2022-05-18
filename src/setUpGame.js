const fs = require('fs');
const { createObject } = require('./generateData');
const { generateHtml } = require('./generateHtml.js');

const list = ['Chetak', 'Lilly', 'Ranger', 'Alex', 'Tucker', 'Gypsy', 'Charlie', 'Lucy', 'Jasper', 'Bruno'];

const content = createObject(list);
const html = generateHtml(content, 'Dream12');

fs.writeFileSync('./data/horseData.json', JSON.stringify(content), 'utf8');
fs.writeFileSync('./html/index.html', html, 'utf8');
