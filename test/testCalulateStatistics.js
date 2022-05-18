const assert = require('assert');
const { probabilityToWin, percentOfWinning, chanceToWin } = require('../src/calculateStatistics');

describe('probabilityToWin', () => {
  it('Should return list of probability for single horse', () => {
    const data = [{
      name: 'Chetak',
      racesRan: 20,
      racesWon: 10
    }];
    assert.deepStrictEqual(probabilityToWin(data), [0.5]);
  });

  it('Should return list of probability for multiple horse', () => {
    const data = [{
      name: 'Chetak',
      racesRan: 20,
      racesWon: 10
    },
    {
      name: 'Lilly',
      racesRan: 20,
      racesWon: 15
    }];
    assert.deepStrictEqual(probabilityToWin(data), [0.5, 0.75]);
  });
});

describe('percentOfWinning', () => {
  it('Should return 100% of winning chance (single horse)', () => {
    assert.deepStrictEqual(percentOfWinning([0.5]), [100]);
  });
  it('Should return relative winning chance (multiple horse)', () => {
    assert.deepStrictEqual(percentOfWinning([0.5, 0.25]), [66.67, 33.33]);
  });
});

describe('chanceToWin', () => {
  it('Should return object with winning chance', () => {
    const data = [{
      name: 'Lilly',
      racesRan: 20,
      racesWon: 10
    }];

    const expected = [{
      name: 'Lilly',
      racesRan: 20,
      racesWon: 10,
      chance: 100
    }];
    assert.deepStrictEqual(chanceToWin(data), expected);
  });

  it('Should return list of object with winning chance', () => {
    const data = [{
      name: 'Lilly',
      racesRan: 20,
      racesWon: 10
    },
    {
      name: 'Ranger',
      racesRan: 30,
      racesWon: 10
    }];

    const expected = [{
      name: 'Lilly',
      racesRan: 20,
      racesWon: 10,
      chance: 60
    },
    {
      name: 'Ranger',
      racesRan: 30,
      racesWon: 10,
      chance: 40
    }];
    assert.deepStrictEqual(chanceToWin(data), expected);
  });
});
