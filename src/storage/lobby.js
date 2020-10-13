const User = require('../storage/newUser');

//will create a lobby instance when the host starts a game?
class Lobby {
    constructor(firstPlayer){      //newUser object      
        //may add more things to this in the future
        this.lobbyID = this.createLobbyID();
        this.players = {};
        this.addPlayer(firstPlayer);
    }

    constructor(category){
        this.categories = category;
    }

    createLobbyID() {
        var ID = Math.random().toString(36).substring(7);
        return ID;
    }

    addPlayer(newUserObject) { 

        var player = newUserObject;
        
        if (!newUserObject instanceof User) {
            console.log("error: not user object");
        } else {
            this.players[player.id] = player;
        }

    }
}
module.exports = Lobby;
