const { assert } = require('chai');
const Lobby = require('../src/storage/lobby');
const LobbyManager = require('../src/storage/lobbyManager');
const User = require('../src/storage/newUser');

describe('lobbyManager class', () => {
  describe('joinLobby method', () => {
    it('should add player to lobby', () => {
      var lobbyManager = new LobbyManager();
      var host = new User("host", "111", 0);
      var lobby = new Lobby(host);
      var lobId = lobby.lobbyID;
      lobbyManager.addLobby(lobby);
      var player = new User("player1", "112", 0);
      lobbyManager.joinLobby(lobId, player);

      assert.containsAllKeys(lobby.players, player.id);
    });
  });
});
