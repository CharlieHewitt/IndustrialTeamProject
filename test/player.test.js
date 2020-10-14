const { assert } = require('chai');
const player = require('../src/player/player.js');
const lobby = require('../src/storage/lobby.js');

// chai assertion library docs : https://www.chaijs.com/api/assert/

describe('player', () => {
  describe('generatePlayerName', () => {
    let result = player.generatePlayerName();
    it ('should return a variable', () => {
      assert.isNotNull(result);
    });
    it ('should return a string', () => {
      assert.isString(result);
    });
    it ('should return at least two words', () => {
      assert.include(result, ' ');
    });
    //TODO: check for duplicates test
  });
});
