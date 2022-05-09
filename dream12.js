const fs = require('fs');
const { generateHtml } = require('./generateHtml.js');
const horsesData = JSON.parse(fs.readFileSync('./horseData.json', 'utf8'));

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
    cpHorse = JSON.parse(JSON.stringify(horse));
    cpHorse.chance = relativeProbability[index];
    return cpHorse;
  });
};

const whoWon = function (horsesData) {
  return horsesData.reduce((horse1, horse2) => {
    return horse1.chance > horse2.chance ? horse1 : horse2
  });
};

const main = function (horsesData, battedHorse) {
  const data = [];
  const updatedData = chanceToWin(horsesData[1]);
  const winner = whoWon(updatedData);
  const messages = horsesData[0];
  messages[0].played = true;

  if (winner.name === battedHorse) {
    messages[0].winStatus = true;
  }

  data.push(messages);
  data.push(updatedData)
  // console.log(data);
  return generateHtml(data, 'Dream12');
};

// console.log(chanceToWin(horsesData[1]));
fs.writeFileSync('index.html', main(horsesData, process.argv[2]), 'utf8');
// console.log(main(horsesData, "Chetak"));
