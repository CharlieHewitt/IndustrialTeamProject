const { assert } = require('chai');
const User = require('../src/storage/user.js');

describe('user class', () => {
  var user = new User("player1", '123', 0);
  describe('updateScore method', () => {
    it('should update players score', () => {
      var initScore = user.score;
      user.updateScore(10);
      var score = user.score;
      assert.equal(initScore+10, score);
    });
  });
});
