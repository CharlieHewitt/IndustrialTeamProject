const Lobby = require('../storage/Lobby');
const User = require('../storage/newUser');

class LobbyManager {
    constructor(){      //newUser object
        this.lobbies = {};
    }

    addLobby(newLobby) {

        var lobby = newLobby;

        if (!newLobby instanceof Lobby) {
            console.log("error: not lobby object");
        } else {
            this.lobbies[lobby.lobbyID] = lobby;
        }

    }
    checkLobbyValid(lobbyID) {
      if (lobbyID in this.lobbies) {
        return true;
      }
      return false;
    }

    joinLobby(lobbyID, user) {
      var valid = this.checkLobbyValid(lobbyID);
      if (valid) {
        this.lobbies[lobbyID].addPlayer(user);
      } else {console.log("invalid lobby id: lobby does not exist");} // TODO: handle error
    }
}
module.exports = LobbyManager;
