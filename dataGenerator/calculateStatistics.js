const fs = require('fs');
const { generateHtml } = require('./generateHtml.js');
const content = JSON.parse(fs.readFileSync('../data/horseData.json', 'utf8'));

const copyObject = (object) => JSON.parse(JSON.stringify(object));

const probabilityToWin = function (horsesData) {
  return horsesData.map(({ racesWon, racesRan }) => racesWon / racesRan);
};

const sumOfList = function (probability) {
  return probability.reduce((number1, number2) => number1 + number2);
};

const percentOfWinning = function (probability) {
  const sum = sumOfList(probability);
  return probability.map((number) => +(number * 100 / sum).toPrecision(4));
};

const chanceToWin = function (horsesData) {
  const probability = probabilityToWin(horsesData);
  const relativeProbability = percentOfWinning(probability);

  return horsesData.map((horse, index) => {
    const cpHorse = copyObject(horse);
    cpHorse.chance = relativeProbability[index];
    return cpHorse;
  });
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

  return generateHtml(updatedData, 'Dream12');
};

fs.writeFileSync('../index.html', main(content, process.argv[2]), 'utf8');
