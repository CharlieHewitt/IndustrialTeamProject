const User = require('../storage/newUser');
const Player = require('../player/player');
const LobbySettings = require('./LobbySettings');
//will create a lobby instance when the host starts a game?
class Lobby {
  /**
   * Constructor - new user object
   *
   * @param {*} firstPlayer
   * @param {*} categories
   */
  constructor(firstPlayer, categories) {
    //may add more things to this in the future
    this.lobbyID = this.createLobbyID();
    this.players = {};
    this.addPlayer(firstPlayer);
    this.categories = categories;
    this.currentQuestion = {};
    this.answer = {};
    this.gameStarted = false;

    this.settings = new LobbySettings();
    this.settings.updateCategories(categories);

    this.questions = getQuestions(this.settings);
  }

  startGame() {
    this.gameStarted = true;

    this.questions.forEach((questionsPerCategory) => {
      questionsPerCategory.forEach((question) => {
        this.currentQuestion = this.parseQuestion(question);
        this.answer = this.parseAnswer(question);
        // wait this.settings.answerTime
      });
    });

    // end game
  }

  /** Call lobbyManager logic to delete this instance of lobby
   * from lobbyManager's list of lobbies.
   */
  endGame() {}

  getQuestions(settings) {}

  parseQuestion(question) {}

  parseAnswer(question) {}

  isGameStarted() {
    return this.gameStarted;
  }

  getCurrentQuestion() {
    return this.currentQuestion;
  }

  getCurrentAnswer() {
    return this.currentAnswer;
  }

  updatePlayerScore(playerID) {}

  createLobbyID() {
    var ID = Math.random().toString(36).substring(7); //"testID" when testing
    return ID;
  }

  createGameLink() {
    // TODO: fix url
    var url = 'localhost:4000 ' + '/joingame' + '/' + this.lobbyID;
    return url;
  }

  addPlayer(newUserObject) {
    var player = newUserObject;
    var duplicate = false;
    var newUsername = '';

    if (!newUserObject instanceof User) {
      console.log('error: not user object');
    } else {
      // this.players[player.id] = player;
      newUsername = '';
      if (player.username == '') {
        newUsername = Player.generatePlayerName();
      }
      var duplicate = this.checkForDuplicates(player, newUsername);

      if (duplicate == false) {
        this.players[player.id] = player;
      } else {
        console.log('user entered duplicate name');
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
      if (newUsername != '') {
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
