const data = [
  { name: 'Chetak', racesRan: 27, racesWon: 22, chance: 42.32 },
  { name: 'Lilly', racesRan: 55, racesWon: 45, chance: 42.5 },
  { name: 'Ranger', racesRan: 65, racesWon: 19, chance: 15.18 }
];

const winner = function (data) {
  return data.reduce((horse1, horse2) => {
    return horse1.chance > horse2.chance ? horse1 : horse2
  });
}

console.log(winner(data));
