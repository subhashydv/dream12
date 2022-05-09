const fs = require('fs');
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

// const whomToBet = function (horsesData) {
//   const probability = probabilityToWin(horsesData);
//   const relativeProbability = percentOfWinning(probability);

//   return horsesData.map((horse, index) => {
//     return {
//       name: horse.name,
//       chancesOfWinning: +relativeProbability[index]
//     };
//   });
// };
const chanceToWin = function (horsesData) {
  const probability = probabilityToWin(horsesData);
  const relativeProbability = percentOfWinning(probability);

  return horsesData.map((horse, index) => {
    cpHorse = JSON.parse(JSON.stringify(horse));
    cpHorse.chance = relativeProbability[index];
    return cpHorse
  });
};

console.log(chanceToWin(horsesData));
