const { assert } = require('chai');
const Lobby = require('../src/storage/lobby');
const User = require('../src/storage/newUser');


// chai assertion library docs : https://www.chaijs.com/api/assert/

describe('lobby', () => {
  describe('createLobbyID', () => {
    let lobby = new Lobby(new User("user1", "1234", 0));
    let result = lobby.createLobbyID();
    it ('should return a non-empty variable', () => {
      assert.isNotNull(result);
    });
    it ('should return a string', () => {
      assert.isString(result);
    });
  });

  describe('addPlayer', () => {
    const firstPlayer = new User("user1", "1234", 0);
    const secondPlayer = new User("user2", "4321", 0);
    const lobby = new Lobby(firstPlayer);
    
    lobby.addPlayer(secondPlayer);
    it ('should have added a player to lobby', () => {
        assert.equal(lobby.players[firstPlayer.id], firstPlayer);
    });
    it ('should have added correct player to lobby', () => {
        assert.equal(lobby.players[secondPlayer.id], secondPlayer);
    });
  });
});