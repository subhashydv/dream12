const fs = require('fs');
const content = JSON.parse(fs.readFileSync('./data/horseData.json', 'utf8'));
const { generateHtml } = require('./dataGenerator/generateHtml.js');
const { chanceToWin } = require('./dataGenerator/calculateStatistics.js');

const writeDataInHtml = function (fileName, data) {
  fs.writeFileSync(fileName, generateHtml(data, 'Dream12'), 'utf8');
};

const whoWon = function (horsesData) {
  return horsesData.reduce((horse1, horse2) => {
    return horse1.chance > horse2.chance ? horse1 : horse2;
  });
};

const main = function (content, battedHorse) {
  content.horseData = chanceToWin(content.horseData);

  const winner = whoWon(content.horseData);
  content.gameStatus.played = true;
  content.gameStatus.playerWon = winner.name === battedHorse;

  writeDataInHtml('./html/index.html', content);
  winner.status = 'Winner';
  content.page.html = true;
  content.horseData = [winner];
  writeDataInHtml('./html/result.html', content);
};

main(content, process.argv[2]);
