const fs = require('fs');
const content = JSON.parse(fs.readFileSync('../data/horseData.json', 'utf8'));

const generateTag = function (tag, description, tagClass) {
  const classTag = tagClass ? ' class="' + tagClass + '"' : '';
  return '<' + tag + classTag + '>' + description + '</' + tag + '>';
};

const style = (href = 'style.css', rel = 'stylesheet') => {
  return '<link rel="' + rel + '" href=' + href + '>';
};

const link = function (content, href) {
  return '<a href="' + href + '">' + content + '</a>';
};

const generateHead = function (title, href, rel) {
  const headContent = generateTag('title', title) + style(rel, href);
  return generateTag('head', headContent);
};

const getMsg = function (content) {
  const messages = content.messages;
  return content.gameStatus.playerWon ? messages.winMsg : messages.lostMsg;
};

const footer = function (content) {
  return generateTag('footer', getMsg(content), 'msg');
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

const navigation = function (content) {
  const table = content.page.html ? '' : 'green';
  const result = content.page.html ? 'green' : '';
  const list1 = generateTag('li', link('Table', 'index.html'), table);
  const list2 = generateTag('li', link('Result', 'result.html'), result);

  return generateTag('nav', generateTag('ul', list1 + list2));
};

const header = function (content) {
  const h1 = generateTag('h1', content.messages.gameName);
  const h2 = generateTag('h2', content.messages.description);
  return generateTag('header', h1 + h2);
};

const article = function (content) {
  const header = generateTag('header', content.messages.aboutGame);
  const nav = navigation(content);
  const table = generateTable(content.horseData);
  const warning = generateTag('div', content.messages.warn, 'warning');
  return generateTag('article', header + nav + table + warning);
};

const wrapWithMain = function (content) {
  let mainContent = header(content) + article(content);
  mainContent += content.page.html ? footer(content) : '';
  return generateTag('main', mainContent);
};

const wrapWithBody = function (content) {
  return generateTag('body', wrapWithMain(content));
};

const generateHtml = function (content, title) {
  return generateTag('html', generateHead(title) + wrapWithBody(content));
};

const output = generateHtml(content, 'Dream12');
fs.writeFileSync('../index.html', output, 'utf8');

exports.generateHtml = generateHtml;
