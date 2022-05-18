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
    horse.chance = relativeProbability[index];
    return horse;
  });
};

exports.chanceToWin = chanceToWin;
exports.probabilityToWin = probabilityToWin;
exports.percentOfWinning = percentOfWinning;
