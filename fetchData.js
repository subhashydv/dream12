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

list = ['Chetak', 'Lilly', 'Ranger'];
data = JSON.stringify(list.map(generateData));
fs.writeFileSync('./horseData.json', data, 'utf8');
