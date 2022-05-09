const fs = require("fs");
const content = JSON.parse(fs.readFileSync('./horseData.json', 'utf8'));

const generateTag = function (tag, description, tagClass) {
  const classTag = tagClass ? ' class="' + tagClass + '"' : '';
  return '<' + tag + classTag + '>' + description + '</' + tag + '>';
};

const generateRow = function (content) {
  const headers = Object.keys(content);
  const row = headers.map((header) => generateTag('td', content[header]));
  return generateTag('tr', row.join(''));
};

const generateHeader = function (content) {
  const headers = Object.keys(content);
  return headers.map((header) => generateTag('th', header)).join('');
};

const generateTable = function (content) {
  const header = generateHeader(content[0]);
  const rows = content.map((rowContent) => generateRow(rowContent));
  const table = generateTag('tr', header) + rows.join('');
  return generateTag('table', table);
};

const generateLink = (href = 'style.css', rel = 'stylesheet') => {
  return '<link rel="' + rel + '" href=' + href + '>';
};

const generateHead = function (title, href, rel) {
  const headContent = generateTag('title', title) + generateLink(rel, href);
  return generateTag('head', headContent);
};

const getMsg = function (messages) {
  if (messages.played === false) {
    return messages.welcomeMsg;
  }
  return messages.winStatus ? messages.winMsg : messages.lostMsg;
};

const generateBody = function (content) {
  const table = generateTable(content[1]);
  const msg = generateTag('div', getMsg(content[0][0]), 'winStatus');
  return generateTag('body', table + msg)
};

const generateHtml = function (content, title) {
  return generateTag('html', generateHead(title) + generateBody(content));
};

output = generateHtml(content, 'Dream12');
fs.writeFileSync('index.html', output, 'utf8');

exports.generateHtml = generateHtml;
