const fs = require("fs");

const randomInt = (limit) => Math.ceil(Math.random() * limit);

const generateData = function (name) {
  const ranRaces = randomInt(100);
  return {
    "name": name,
    "racesRan": ranRaces,
    "racesWon": Math.min(ranRaces, randomInt(randomInt(60)))
  }
};

const data = [[{
  "gameName": "Dream12",
  "description": "Horse Race betting",
  "info": "play at your own risk",
  "welcomeMsg": "Type the betting Horse name on terminal",
  "lostMsg": "Oops! better luck next time",
  "winMsg": "Congratulations! You Won...",
  "winStatus": false,
  "played": false
}]];

const list = ['Chetak', 'Lilly', 'Ranger'];
data.push(list.map(generateData))
fs.writeFileSync('./horseData.json', JSON.stringify(data), 'utf8');
