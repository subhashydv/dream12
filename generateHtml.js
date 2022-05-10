const fs = require("fs");
const content = JSON.parse(fs.readFileSync('./horseData.json', 'utf8'));

const generateTag = function (tag, description, tagClass) {
  const classTag = tagClass ? ' class="' + tagClass + '"' : '';
  return '<' + tag + classTag + '>' + description + '</' + tag + '>';
};

const generateLink = (href = 'style.css', rel = 'stylesheet') => {
  return '<link rel="' + rel + '" href=' + href + '>';
};

const generateHead = function (title, href, rel) {
  const headContent = generateTag('title', title) + generateLink(rel, href);
  return generateTag('head', headContent);
};

const getMsg = function (messages, gameStatus) {
  if (gameStatus.played === false) {
    return messages.welcomeMsg;
  }
  return gameStatus.playerWon ? messages.winMsg : messages.lostMsg;
};

const generateRow = function (content) {
  const headers = Object.keys(content);
  const row = headers.map((header) => generateTag('td', content[header]));
  return generateTag('tr', row.join(''));
};

const tableHeader = function (content) {
  const headers = Object.keys(content);
  return headers.map((header) => generateTag('th', header)).join('');
};

const generateTable = function (content) {
  const header = tableHeader(content[0]);
  const rows = content.map((rowContent) => generateRow(rowContent));
  const table = generateTag('tr', header) + rows.join('');
  return generateTag('table', table);
};

const header = function (content) {
  const h1 = generateTag('h1', content.messages.gameName);
  const h2 = generateTag('h2', content.messages.description);
  return generateTag('header', h1 + h2);
};

const footer = function (content) {
  return generateTag('footer', getMsg(content.messages, content.gameStatus), 'msg');
};

const article = function (content) {
  const header = generateTag('header', content.messages.aboutGame);
  const table = generateTable(content.horseData);
  const warning = generateTag('div', content.messages.warn, 'warning');
  return generateTag('article', header + table + warning);
}

const wrapWithMain = function (content) {
  const mainContent = header(content) + article(content) + footer(content);
  return generateTag('main', mainContent);
};

const wrapWithBody = function (content) {
  return generateTag('body', wrapWithMain(content));
}

const generateHtml = function (content, title) {
  return generateTag('html', generateHead(title) + wrapWithBody(content));
};

output = generateHtml(content, 'Dream12');
// console.log(output);
fs.writeFileSync('index.html', output, 'utf8');

exports.generateHtml = generateHtml;
