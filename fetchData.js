const fs = require("fs");

const randomInt = (limit) => Math.ceil(Math.random() * limit);

const horseInfo = function (name) {
  const ranRaces = randomInt(100);
  return {
    "name": name,
    "racesRan": ranRaces,
    "racesWon": Math.min(ranRaces, randomInt(randomInt(60)))
  }
};

const messages = {
  "gameName": "Dream12",
  "description": "Horse Race betting",
  "aboutGame": "Dream12 Super Smash",
  "warn": "*play at your own risk",
  "welcomeMsg": "Type the betting Horse name on terminal",
  "lostMsg": "Oops! better luck next time",
  "winMsg": "Congratulations! You Won...",
};

const gameStatus = {
  "playerWon": false,
  "played": false
};

const horsesInfo = (list) => list.map(horseInfo);

const createObject = function (horseData) {
  return { messages, gameStatus, horseData };
};

const list = ['Chetak', 'Lilly', 'Ranger'];
const horsesData = horsesInfo(list);
const data = createObject(horsesData);

fs.writeFileSync('./horseData.json', JSON.stringify(data), 'utf8');
