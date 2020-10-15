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
      lobbyManager.joinLobby(lobId, "player1", "122", 0);
      console.log(lobbyManager);
      console.log(lobby.players);
    });
  });
});
