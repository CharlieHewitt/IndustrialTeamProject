const Lobby = require('../storage/lobby');

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

    getLobby(lobbyID) {
        return this.lobbies[lobbyID];
    }
}
module.exports = LobbyManager;
