const messages = {
  gameName: 'Dream12',
  description: 'Horse Race betting',
  aboutGame: 'Dream12 Super Smash',
  warn: '*play at your own risk',
  lostMsg: 'Oops! better luck next time',
  winMsg: 'Congratulations! You Won...',
};

const gameStatus = {
  playerWon: false,
  played: false
};

const pageStatus = {
  htmlGenerated: false
};

const randomInt = (limit) => Math.ceil(Math.random() * limit);

const horseInfo = function (name) {
  const ranRaces = randomInt(100);
  return {
    name: name,
    racesRan: ranRaces,
    racesWon: randomInt(ranRaces - 1)
  };
};

const horsesInfo = (list) => list.map(horseInfo);

const createObject = function (list) {
  return {
    messages, gameStatus, pageStatus,
    'horseData': horsesInfo(list)
  };
};

exports.createObject = createObject;
exports.randomInt = randomInt;
exports.horseInfo = horseInfo;
