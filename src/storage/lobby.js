const User = require('../storage/user');
const Player = require('../player/player');
const LobbySettings = require('./LobbySettings');
const {
  getRandomBooleanQuestions,
  getRandomMultiChoiceQuestions,
} = require('../database/db_queries');
// will create a lobby instance when the host starts a game?
class Lobby {
  /**
   * Constructor - new user object
   *
   * @param {*} firstPlayer
   * @param {*} categories
   */
  constructor(firstPlayer, categories) {
    // may add more things to this in the future
    this.lobbyID = this.createLobbyID();
    this.players = {};
    this.addPlayer(firstPlayer);
    this.categories = categories;
    this.currentQuestion = {};
    this.currentAnswer = {};
    this.gameStarted = false;
    this.playersAnsweredCorrectly = [];

    this.questions = [];

    this.settings = new LobbySettings();
    this.settings.updateCategories(categories);
  }

  startGame() {
    this.gameStarted = true;

    this.questions.forEach((questionsPerCategory) => {
      // counter will track and represent question number
      let counter = 1;
      questionsPerCategory.forEach((question, counter) => {
        this.currentQuestion = this.parseQuestion(question, counter);
        this.answer = this.parseAnswer(question);
        // wait this.settings.answerTime

        counter++;
      });
    });

    // end game
  }

  /** Call lobbyManager logic to delete this instance of lobby
   * from lobbyManager's list of lobbies.
   */
  // endGame() {}

  /**
   * Retrieves all quiz questions based on this.settings
   * LobbySettings and puts them into this.questions.
   */
  async getQuestions() {
    let questionTypeSwitch = false;

    for (const category of this.settings.categories) {
      questionTypeSwitch = !questionTypeSwitch;
      if (questionTypeSwitch) {
        const questions = await getRandomMultiChoiceQuestions(
          category,
          this.settings.numQuestions
        );
        this.questions.push(questions);
      } else {
        const questions = await getRandomBooleanQuestions(
          category,
          this.settings.numQuestions
        );
        this.questions.push(questions);
      }
    }
  }

  /**
   * Converts a quiz question object into a json object that
   * only contains question information without answer information.
   *
   * @param {json} question - question object from each category
   * @param {number} counter - question number
   * @return json object that contains only question information
   */
  parseQuestion(question, counter) {
    let refinedQuestion = question.toObject();
    delete refinedQuestion['correctAnswer'];
    delete refinedQuestion['_id'];
    delete refinedQuestion['__v'];

    refinedQuestion['questionNumber'] = counter;
    refinedQuestion['success'] = true;
    refinedQuestion['time'] = 10;

    return refinedQuestion;
  }

  /**
   * Converts a quiz question object into a json object
   * that only contains answer information.
   *
   * @param {json} question - question object from each category
   * @param {number} counter - question number
   * @return json object that contains only answer information
   */
  parseAnswer(question, counter) {
    let refinedAnswer = question.toObject();
    delete refinedAnswer['answers'];
    delete refinedAnswer['_id'];
    delete refinedAnswer['__v'];
    delete refinedAnswer['question'];
    delete refinedAnswer['category'];

    refinedAnswer['questionNumber'] = counter;
    refinedAnswer['success'] = true;

    return refinedAnswer;
  }

  // updatePlayerScore(playerID) {}

  isGameStarted() {
    return this.gameStarted;
  }

  getCurrentQuestion() {
    return this.currentQuestion;
  }

  getCurrentAnswer() {
    return this.currentAnswer;
  }

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

  checkPlayerAnswer(playerid, playerAnswer) {
    if (this.checkPlayerIsInLobby(playerid)) {
      if (playerAnswer == this.answer) {
        this.playersAnsweredCorrectly.push(this.players[playerid]);
        return true;
      } else {return false;}
    } else {
      console.error("This player is not in the lobby");
    }
  }

  checkPlayerIsInLobby(playerid) {
    if(this.players[playerid]){
      return true;
    }
    return false;
  }

  updatePlayerScores() {
    var highestScore = (this.playersAnsweredCorrectly.length * 5);
    for (var i = 0; i < this.playersAnsweredCorrectly.length; i++) {
      this.playersAnsweredCorrectly[i].updateScore(highestScore-(i*5));
    }
  }
}

module.exports = Lobby;
