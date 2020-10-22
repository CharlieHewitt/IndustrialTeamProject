const { assert } = require('chai');
const Lobby = require('../src/storage/lobby');
const LobbyManager = require('../src/storage/lobbyManager');
const User = require('../src/storage/user');

describe('lobbyManager class', () => {
  var lobbyManager = new LobbyManager();
  var host = new User('host', '111', 0);
  var lobby = new Lobby(host);

  describe('addLobby method', () => {
    it('should add lobby to lobbyManager', () => {
      lobbyManager.addLobby(lobby);
      assert.containsAllKeys(lobbyManager.lobbies, lobby.lobbyID);
    });
  });
  describe('checkLobbyValid method', () => {
    it('should check if lobby exists', () => {
      var result = lobbyManager.checkLobbyValid(lobby.lobbyID);
      assert.equal(result, true);
    });
  });
  describe('joinLobby method', () => {
    it('should add player to lobby', () => {
      var lobId = lobby.lobbyID;
      lobbyManager.addLobby(lobby);
      var player = new User('player1', '112', 0);
      lobbyManager.joinLobby(lobId, player);
      assert.containsAllKeys(lobby.players, player.id);
    });
  });
  describe('getLobby method', () => {
    it('should return lobby when given lobby id', () => {
      result = lobbyManager.getLobby(lobby.lobbyID);
      assert.equal(result, lobby);
    });
  });
});
