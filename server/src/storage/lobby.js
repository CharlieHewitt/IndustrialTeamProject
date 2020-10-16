const User = require('../storage/newUser');
const Player = require('../player/player');
const LobbySettings = require('./lobbySettings');

//will create a lobby instance when the host starts a game?
class Lobby {
    constructor(firstPlayer, categories){      //newUser object      
        //may add more things to this in the future
        this.lobbyID = this.createLobbyID();
        this.players = {};
        this.addPlayer(firstPlayer);
        this.settings = new LobbySettings();
        this.settings.updateCategories(categories);
        // this.settings.updateCategories(categories);
    }


    createLobbyID() {
        var ID = Math.random().toString(36).substring(7); //"testID" when testing
        return ID;
    }

    createGameLink() {
      // TODO: fix url
      var url = "localhost:4000" + "/joingame" + "/" + this.lobbyID;
      return url;
    }

    addPlayer(newUserObject) {

        var player = newUserObject;
        var duplicate = false;
        var newUsername = "";

        if (!newUserObject instanceof User) {
            console.log("error: not user object");
        } else {
            // this.players[player.id] = player;
            newUsername = "";
            if (player.username == "") {
              newUsername = Player.generatePlayerName();
            }
            var duplicate = this.checkForDuplicates(player, newUsername);

            if (duplicate == false) {
              this.players[player.id] = player;
            } else {
              console.log("user entered duplicate name");
            }
        }
    }

    checkForDuplicates(player, newUsername) {
      var duplicate = false;
      for (var key in this.players) {
        if (this.players[key].username == player.username) {
            duplicate = true;
            // TODO: : handle error - ask user to choose new username
        }
        if (newUsername != "") {
          if (this.players[key].username == newUsername) {
            newUsername = Player.generatePlayerName();
            duplicate = checkForDuplicates(player, newUsername);
          }
          if (duplicate == false) {
            player.username = newUsername;
          }
        }

      }
      return duplicate;
    }


}

module.exports = Lobby;
