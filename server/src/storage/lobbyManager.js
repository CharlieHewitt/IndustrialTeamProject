const Lobby = require('../storage/Lobby');

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
}
module.exports = Lobby;
