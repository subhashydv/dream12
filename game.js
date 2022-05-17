const fs = require('fs');
const content = JSON.parse(fs.readFileSync('./data/horseData.json', 'utf8'));
const { generateHtml } = require('./dataGenerator/generateHtml.js');
const { chanceToWin } = require('./dataGenerator/calculateStatistics.js');
const copyObject = (object) => JSON.parse(JSON.stringify(object));

const writeDataInHtml = function (fileName, data) {
  fs.writeFileSync(fileName, generateHtml(data, 'Dream12'), 'utf8');
};

const whoWon = function (horsesData) {
  return horsesData.reduce((horse1, horse2) => {
    return horse1.chance > horse2.chance ? horse1 : horse2;
  });
};

const main = function (content, battedHorse) {
  const updatedData = copyObject(content);
  updatedData.horseData = chanceToWin(content.horseData);

  const winner = whoWon(updatedData.horseData);
  updatedData.gameStatus.played = true;
  updatedData.gameStatus.playerWon = winner.name === battedHorse;

  writeDataInHtml('./html/index.html', updatedData);
  winner.status = 'Winner';
  updatedData.page.html = true;
  updatedData.horseData = [winner];
  writeDataInHtml('./html/result.html', updatedData);
};

main(content, process.argv[2]);
