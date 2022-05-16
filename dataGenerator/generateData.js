const fs = require('fs');

const randomInt = (limit) => Math.ceil(Math.random() * limit);

const horseInfo = function (name) {
  const ranRaces = randomInt(100);
  return {
    'name': name,
    'racesRan': ranRaces,
    'racesWon': randomInt(ranRaces - 1)
  };
};

const messages = {
  'gameName': 'Dream12',
  'description': 'Horse Race betting',
  'aboutGame': 'Dream12 Super Smash',
  'warn': '*play at your own risk',
  'lostMsg': 'Oops! better luck next time',
  'winMsg': 'Congratulations! You Won...',
};

const gameStatus = {
  'playerWon': false,
  'played': false
};

const page = {
  'html': false
};

const horsesInfo = (list) => list.map(horseInfo);

const createObject = function (horseData) {
  return { messages, gameStatus, page, horseData };
};

const list = ['Chetak', 'Lilly', 'Ranger', 'Alex', 'Tucker', 'Gypsy', 'Charlie', 'Lucy', 'Jasper', 'Bruno'];
const horsesData = horsesInfo(list);
const data = createObject(horsesData);

fs.writeFileSync('../data/horseData.json', JSON.stringify(data), 'utf8');
