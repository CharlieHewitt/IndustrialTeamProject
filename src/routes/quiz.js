const express = require('express');
const router = express.Router();

// @route   POST /host/endLobby/
// @desc    removes lobby from lobby manager, ending the lobby
router.post('/host/endLobby/', async (req, res) => {
  const lobbies = req.app.locals.allLobbies;
  const lobbyId = req.body.lobbyId;
  const playerId = req.body.playerId;
  
  //check if lobby isn't in lobby manager
  if (!(lobbies.checkLobbyValid(lobbyId))){
      res.json({error: "error no lobby found", success: false})
      return;
  }

  var wantedLobby = lobbies.getLobby(lobbyId);
  const currPhase = wantedLobby.currentPhase.getPhase();

  //check if host
  if (playerId != lobby.hostId){
    console.log('NOT HOST');
    res.json({
      error: 'Error: playerID does not match hostID, so not host making request', success: false,
    });
    return;
  }

  //remove lobby if in end phase
  if (currPhase === 'end') {
      const index = lobbies.lobbies.indexOf(wantedLobby);
      if (index > -1) {
          lobbies.lobbies.splice(index, 1);
      }
      res.json({error: "N/A", success: true})
  } else {
      res.json({error: "not in end phase", success: false})

  }
});

// @route   POST /host/settings/
// @desc    Get settings details and send them back successful
router.post('/host/settings/', async (req, res) => {
  let success = false;
  const lobbies = req.app.locals.allLobbies;

  //request variables
  const { lobbyId, playerId, settings } = req.body;

  // allow request if lobby is valid
  if (lobbies.checkLobbyValid(lobbyId)) {
    success = true;
  } else {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  //lobby to update
  const lobby = lobbies.getLobby(lobbyId)
  var hostId = lobby.hostID;

  //check if host
  if (playerId != hostId){
    console.log('NOT HOST');
    res.json({
      error: 'Error: playerID does not match hostID, so not host making request',
    });
    return;
  }

  // allow request if currently in forming/ settings phase
  if (success) {
    const currPhase = lobby.currentPhase.getPhase();

    if (!(currPhase === 'forming' || currPhase === 'settings')) {
      res.json({
        error: `Error: wrong state: currently in ${currPhase} (should be forming or settings).`,
      });
      return;
    }
  }

  if (success) {
    success = lobby.settings.updateAnswerTime(settings.answerTime);
  }

  if (success) {
    success = lobby.settings.updateNumQuestions(settings.numQuestions);
  }

  if (success) {
    success = lobby.settings.updateCategories(settings.categories);
  }

  if (!success) {
    res.json({ error: 'Bad Request' });
    return;
  }

  const response = {
    success: success,
    lobbyId: lobbyId,
    settings: lobby.settings.getObject(),
  };

  console.log('settings updated');

  // move to settings phase
  lobby.currentPhase.setSettings();
  //send response
  res.json(response);
});

// @route   POST /host/start/
// @desc    A host can start the quiz on the server for all the connected players by sending a request here.
router.post('/host/start/', async (req, res) => {
  let success = false;
  var lobbies = req.app.locals.allLobbies;
  let ready = {};

  //request variables
  var lobbyId = req.body.lobbyId;
  var playerId = req.body.playerId;

  if (!lobbies.checkLobbyValid(lobbyId)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  //find matching lobby to lobby id
  var lobby = lobbies.getLobby(lobbyId);
  var hostId = lobby.hostID;

  //check if host
  if (playerId != hostId){
    console.log('NOT HOST');
    res.json({
      error: 'Error: playerID does not match hostID, so not host making request',
    });
    return;
  }

  // check if lobby exists
  if (!lobby) {
    res.json({
      error: `Error: no lobby found for given lobbyId.`,
    });
    return;
  }

  // check if in settings phase
  const currPhase = lobby.currentPhase.getPhase();
  if (!(currPhase === 'settings')) {
    res.json({
      error: `Error: wrong state: currently in ${currPhase} (should be settings).`,
    });
    return;
  }

  //assuming player[0] is always the host of the lobby.
  //check if playerid is firstid in given lobbyid, if correct then is host so start.
  if (playerId == lobby.players[playerId].id) {
    console.log('Player is Host of Lobby. Starting...');
    success = true;
    ready = {
      success: success,
      lobbyId: lobbyId,
    };
  }

  //if doesnt match then not host of lobby. respond with false for success with lobbyid
  else {
    console.log('Player is not Host of Lobby. Fail...');
    ready = {
      success: success,
      lobbyId: lobbyId,
    };
  }

  await lobby.getQuestions();

  console.log('starting game for lobby: ', lobby.lobbyID);

  // move quiz to started state.
  lobby.currentPhase.quizStarted();
  lobby.startGame();

  //send response object
  res.json(ready);
});

// @route   POST /start/
// @desc    A client can ask the server if the quiz has started by sending a request here.

router.post('/start/', async (req, res) => {
  const lobbies = req.app.locals.allLobbies;
  const { lobbyId, playerId } = req.body;

  // TODO: check if playerId & lobby are valid
  // TODO: check if in  forming, settings, started, question phase

  const responseObject = {};

  if (!lobbies.checkLobbyValid(lobbyId)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  //find matching lobby to lobby id
  const lobby = lobbies.getLobby(lobbyId);

  //check if the game has started. NO - respond false YES - respond with true & lobby settings
  responseObject.started = lobby.isGameStarted();

  if (responseObject.started) {
    responseObject.settings = lobby.settings.getObject();
  }

  res.json(responseObject);
});

// @route   POST /nextQuestion/
// @desc    A client can request information on the next question by sending a request here
router.post('/nextQuestion/', async (req, res) => {
  /*
  Request:
  {
    lobbyId: string,
    playerId: string
    questionNumber: number
  }
  */

  // TODO: check if in question phase

  var lobbies = req.app.locals.allLobbies;
  //request variables
  var lobbyId = req.body.lobbyId;

  if (!lobbies.checkLobbyValid(lobbyId)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  //find matching lobby to lobby id
  var lobby = lobbies.getLobby(lobbyId);

  const nextQ = lobby.getCurrentQuestion();

  res.json(nextQ);
});

// @route   POST /answer/
// @desc    A client can send its answer to the server by sending a request here. The server will check if it is correct and send an appropriate response.
router.post('/answer/', async (req, res) => {
  /*
  Request:
  {
    lobbyId: string,
    playerId: string,
    questionNumber: number,
    answer: string,
    time: number // time question was answered
  }
  */

  // TODO: check if in question phase
  // TODO: check questionNumber! & Time request came in (Date.now() -> compare to timer)

  let lobbies = req.app.locals.allLobbies;
  //request variables
  let { playerId, lobbyId } = req.body;

  if (!lobbies.checkLobbyValid(lobbyId)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  //find matching lobby to lobby id
  let lobby = lobbies.getLobby(lobbyId);

  let player = lobby.getPlayer(playerId);
  if (player && player.hasAnswered !== true) {
    player.hasAnswered = true;
  }
  lobby.checkPlayerAnswer(playerid, req.body.answer);

  const answer = lobby.getCurrentAnswer();

  res.json(answer);
});

// @route   POST /leaderboard/
// @desc    A client can request the leaderboard for a quiz by sending a request here.
router.post('/leaderboard/', async (req, res) => {
  var lobbies = req.app.locals.allLobbies;
  var wantedID = req.body.id;

  if (!lobbies.checkLobbyValid(wantedID)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  var wantedLobby = lobbies.getLobby(wantedID);
  var inOrder = [];
  var id = [];

  wantedLobby.updatePlayerScore();

  // TODO: check if in leaderboard or end phase
  // TODO: move leaderboard logic to Lobby.moveToLeaderboard -> updating scores etc

  //change obj to array so i can sort
  for (key in wantedLobby.players) {
    inOrder.push([
      key.toString(),
      wantedLobby.players[key].username,
      wantedLobby.players[key].score,
    ]);
  }

  //sort array DEC
  inOrder.sort(function (a, b) {
    return b[2] - a[2];
  });

  for (i in inOrder) {
    var test2 = inOrder[i];
    test2.toString();
    var fields = test2.toString().split(',');
    id.push(fields[0]);
  }

  const responseObject = {};
  responseObject['playersRanked'] = id;
  responseObject['users'] = wantedLobby.players;

  res.json(responseObject);
});

// @route   POST /skip
// @desc    A client can use the get hint to skip the question and automatically get the right answer
router.post('/skip/', async (req, res) => {
  var lobbies = req.app.locals.allLobbies;

  //request values
  var lobbyId = req.body.lobbyId;
  var playerId = req.body.playerId;
  var lobby = lobbies.getLobby(lobbyId);

  // check if in question phase
  const currPhase = lobby.currentPhase.getPhase();
  if (!(currPhase === 'question')) {
    res.json({
      error: `Error: wrong state: currently in ${currPhase} (should be question).`,
    });
    return;
  }

  if (!lobbies.checkLobbyValid(lobbyId)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  //lobby and player values needed
  var lobby = lobbies.getLobby(lobbyId);
  var players = lobby.players;
  var correctA = lobby.getCurrentAnswer();
  var player = players[playerId];
  var skipUsed = true;

  //check if skip has been used.
  if (player.skipUsed == false) {
    skipUsed = false;
    player.skipUsed = true; //hint will now be used so set player used to true
    lobby.playersAnsweredCorrectly.push(players[playerId]);
  }

  //if skip has been used then dont send correct answer and instead send back dummy data
  if (skipUsed == true) {
    correctA = 'Skip has been used';
  }

  //response json structure
  const skip = {
    skipUsed: skipUsed,
    correctAnswer: correctA,
  };

  res.json(skip);
});

// @route   POST /fiftyFifty/
// @desc    A client can request to use the 50/50 lifeline, return 2 answers with one being correct
router.post('/fiftyFifty/', async (req, res) => {
  var userId = req.body.playerId;
  var lobbyId = req.body.lobbyId;
  let lobbies = req.app.locals.allLobbies;
  var available = false;

  var lobby = lobbies.getLobby(lobbyId);

  // check if in question phase
  const currPhase = lobby.currentPhase.getPhase();
  if (!(currPhase === 'question')) {
    res.json({
      error: `Error: wrong state: currently in ${currPhase} (should be question).`,
    });
    return;
  }

  if (!req.app.locals.allLobbies.checkLobbyValid(lobbyId)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  var wantedLobby = lobbies.getLobby(lobbyId);
  var player = wantedLobby.players[userId];

  var answer = '';
  var randomAnswer = '';

  //check if they've not used the 50/50 lifeline
  if (player.fiftyFifty == false) {
    //check if its a true or false Q, if not continue
    var allAnswers = Object.keys(
      wantedLobby.currentQuestion.questionInfo.answers
    );
    if (allAnswers.length != 2) {
      //available = false

      //remove the right answer so i can get another random one
      const index = allAnswers.indexOf(wantedLobby.currentAnswer);
      if (index > -1) {
        allAnswers.splice(index, 1);
      }

      //set available and thats its been used for the player
      available = true;
      player.fiftyFifty = true;

      //pick a random answer and answer
      randomAnswer = Math.floor(Math.random() * allAnswers.length);
      answer = wantedLobby.answer;
    }
  }

  var hint = {
    available: available, //if false shouldn't use it
    answer1: answer,
    answer2: randomAnswer,
  };

  res.json(hint);
});

module.exports = router;
