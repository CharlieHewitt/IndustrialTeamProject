const User = require('../storage/user');
const Player = require('../player/player');
const CurrentPhase = require('./currentPhase');
const LobbySettings = require('./LobbySettings');
const TimeController = require('./timeController');
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
   */
  constructor(firstPlayer) {
    // may add more things to this in the future
    this.lobbyID = this.createLobbyID();
    this.players = {};
    this.addPlayer(firstPlayer);
    this.currentQuestion = {};
    this.currentAnswer = {};
    this.gameStarted = false;
    this.playersAnsweredCorrectly = [];
    this.currentQuestionNumber = 0;

    this.questions = [];

    this.settings = new LobbySettings();
    this.timers = new TimeController();
    this.currentPhase = new CurrentPhase();

    console.log(`Lobby created with id: ${this.lobbyID}`);
  }

  startGame() {
    this.gameStarted = true;

    // put questions in single array for easier access
    const questionsInSingleArray = [];

    this.questions.forEach((questionsPerCategory) => {
      questionsPerCategory.forEach((question) => {
        if (question !== null) {
          questionsInSingleArray.push(question);
        } else {
          console.log('error question = null');
        }
      });
    });

    this.questions = questionsInSingleArray;

    console.log(this.questions);

    this.moveToNextQuestion();
    // this.questions.forEach((questionsPerCategory) => {
    //   // counter will track and represent question number
    //   let counter = 1;
    //   questionsPerCategory.forEach((question) => {
    //     this.resetPlayerAnswers();
    //     if (question !== null) {
    //       this.currentQuestion = this.parseQuestion(question, counter);
    //       this.currentAnswer = this.parseAnswer(question, counter);
    //     }
    //     // wait this.settings.answerTime

    //     counter++;
    //   });
    // });

    // end game
  }

  moveToNextQuestion() {
    // get question before incrementing (starts from 0 => 'index 0 = question 1')
    const question = this.questions[this.currentQuestionNumber];
    this.currentQuestionNumber++;
    console.log(`now on question ${this.currentQuestionNumber}`);
    this.currentPhase.questionPhase();

    // get next question
    this.currentQuestion = this.parseQuestion(
      question,
      this.currentQuestionNumber
    );

    // get next answer
    this.currentAnswer = this.parseAnswer(question, this.currentQuestionNumber);

    // reset players their answers from previous question.
    this.resetPlayerAnswers();
    this.playersAnsweredCorrectly = [];

    // start timer
    if (this.questionTimerExists()) {
      this.timers.removeTimer('questionTimer');
    }

    this.startQuestionTimer();
  }

  moveToLeaderboard() {
    // update scores
    this.currentPhase.leaderboardPhase();

    // check if Quiz finished.
    if (this.currentQuestionNumber === this.questions.length) {
      // end of quiz
      console.log('quiz finished');
      this.currentPhase.gameEnded();
      // Do end of quiz logic -> leaderboard route -> special response param for end of game screen? -> eventually destroys lobby
      return;
    }

    // /leaderboard is available
    console.log(
      `doing leaderboard things that aren't yet implemented ... (leaderboard after question ${this.currentQuestionNumber})`
    );

    // start timer
    if (this.leaderboardTimerExists()) {
      this.timers.removeTimer('leaderboardTimer');
    }
    this.startLeaderboardTimer();
  }

  /**
   * Resets the hasAnswered field for each player in the lobby to false.
   */
  resetPlayerAnswers() {
    for (const playerID in this.players) {
      this.players[playerID].hasAnswered = false;
    }
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
    let ID = Math.random().toString(36).substring(7); //"testID" when testing
    return ID;
  }

  createGameLink() {
    // TODO: fix url
    let url = 'localhost:4000 ' + '/joingame' + '/' + this.lobbyID;
    return url;
  }

  addPlayer(newUserObject) {
    let player = newUserObject;
    let duplicate = false;
    let newUsername = '';

    if (!newUserObject instanceof User) {
      console.log('error: not user object');
    } else {
      // this.players[player.id] = player;
      newUsername = '';
      if (player.username == '') {
        newUsername = Player.generatePlayerName();
      }
      let duplicate = this.checkForDuplicates(player, newUsername);
      if (duplicate == false) {
        this.players[player.id] = player;
        console.log(
          `Player ${player.username} successfully added to Lobby ${this.lobbyID}`
        );
      } else {
        console.log('user entered duplicate name');
      }
    }
  }

  /**
   * Get a player from the lobby.
   *
   * @param {string} playerID - id of the player
   */
  getPlayer(playerID) {
    if (checkPlayerIsInLobby(playerID)) {
      return this.players[playerID];
    } else {
      return false;
    }
  }

  checkForDuplicates(player, newUsername) {
    var duplicate = false;
    for (let key in this.players) {
      if (this.players[key].username == player.username) {
        duplicate = true;
        // TODO: : handle error - ask user to choose new username
      }
    }
      if (newUsername != '') {
        for (let key in this.players) {
          if (this.players[key].username == newUsername) {
            newUsername = Player.generatePlayerName();
            duplicate = checkForDuplicates(player, newUsername);
          }
        }
        if (duplicate == false) {
          player.username = newUsername;
        }
      }
  
    return duplicate;
  }

  checkPlayerAnswer(playerid, playerAnswer) {
    if (this.checkPlayerIsInLobby(playerid)) {
      if (playerAnswer == this.answer) {
        this.playersAnsweredCorrectly.push(this.players[playerid]);
        return true;
      } else {
        return false;
      }
    } else {
      console.error('This player is not in the lobby');
    }
  }

  checkPlayerIsInLobby(playerid) {
    if (this.players[playerid]) {
      return true;
    }
    return false;
  }

  updatePlayerScores() {
    let highestScore = this.playersAnsweredCorrectly.length * 5;
    for (let i = 0; i < this.playersAnsweredCorrectly.length; i++) {
      this.playersAnsweredCorrectly[i].updateScore(highestScore - i * 5);
    }
    this.playersAnsweredCorrectly = [];
  }

  // Timer related code

  // Question Timer

  questionTimerExists() {
    if (this.timers.getTimer('questionTimer')) {
      return true;
    } else {
      return false;
    }
  }

  startQuestionTimer() {
    this.timers.addTimer('questionTimer', this.settings.answerTime);
  }

  hasQuestionTimerExpired() {
    if (this.timers.getTimer('questionTimer')) {
      return this.timers.getTimer('questionTimer').hasTargetTimePassed();
    }

    // handle this if needed
    console.log("error questionTimer didn't exist");
  }

  timeRemainingOnQuestionTimer() {
    if (this.timers.getTimer('questionTimer')) {
      return this.timers.getTimer('questionTimer').timeToTarget();
    }

    // handle if needed
    console.log("error questionTimer didn't exist");
  }

  // Leaderboard Timer

  leaderboardTimerExists() {
    if (this.timers.getTimer('leaderboardTimer')) {
      return true;
    } else {
      return false;
    }
  }

  startLeaderboardTimer() {
    // hardcoded for now
    const LEADERBOARD_DURATION = 10;
    this.timers.addTimer('leaderboardTimer', LEADERBOARD_DURATION);
  }

  hasLeaderboardTimerExpired() {
    if (this.timers.getTimer('leaderboardTimer')) {
      return this.timers.getTimer('leaderboardTimer').hasTargetTimePassed();
    }

    // handle this if needed
    console.log("error leaderboardTimer didn't exist");
  }

  timeRemainingOnLeaderboardTimer() {
    if (this.timers.getTimer('leaderboardTimer')) {
      return this.timers.getTimer('leaderboardTimer').timeToTarget();
    }

    // handle if needed
    console.log("error leaderboardTimer didn't exist");
  }
}

module.exports = Lobby;
