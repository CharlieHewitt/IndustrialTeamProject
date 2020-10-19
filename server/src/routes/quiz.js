const express = require('express');
const router = express.Router();

// @route   POST /host/settings/
// @desc    Get settings details and send them back successful
router.post('/host/settings/', async (req, res) => {
  const success = false;
  var lobbies = req.app.locals.allLobbies;

  //request variables
  var lobbyId = req.body.lobbyId;
  var playerId = req.body.playerId;
  
  if (lobbies.checkLobbiesValid(lobbyId)){
    success = true;
  }

  //lobby to update
  var lobby = lobbies.getLobby(lobbyId);

  //requested lobby settings
  var settings = {
    categories     : req.body.settings.categories,
    timePerQuestion: req.body.settings.timePerQuestions,
    numQuestion    : req.body.settings.numQuestion
  }
  
  //update saved lobby settings with request values 
  lobby.settings = settings;

  //response data
  const person = {lobbyId : lobbyId,
                  success: success,
                  settings: settings
  }

  //do start code to start lobby for everyone
  lobby.startGame();

  //send response
  res.json(person) 
});

// @route   POST /host/start/
// @desc    A host can start the quiz on the server for all the connected players by sending a request here.
router.post('/host/start/', async (req, res) => {
  const success = false;
  var lobbies = req.app.locals.allLobbies;

  //request variables
  var lobbyId = req.body.lobbyId;
  var playerId = req.body.playerId;

  //find matching lobby to lobby id
  var lobby = lobbies.getLobby(lobbyId);

  //assuming player[0] is always the host of the lobby.
  //check if playerid is firstid in given lobbyid, if correct then is host so start.
  if (playerId == lobby.players[0].id){
    console.log("Player is Host of Lobby. Starting...")
    success = true;
    const ready = {
      success: success,
      lobbyId: lobbyId
    }
  }

  //if doesnt match then not host of lobby. respond with false for success with lobbyid
  else{
    console.log("Player is not Host of Lobby. Fail...")
    const ready = {
      success: success,
      lobbyId: lobbyId
    }
  }

  //send response object
  res.json(ready)

});

// @route   POST /start/
// @desc    A client can ask the server if the quiz has started by sending a request here.
router.post('/start/', (req, res) => {
  const success = true;

  /*
  Request:
  {
    lobbyId: string,
    playerId: string
  }
  */

 const gameSettings = {
    started: success,
    settings: {
      timePerQuestion: 10,
      numQuestions: 10
    } //add this } to charlies file
  }

  res.json(gameSettings) 
});

// @route   POST /nextQuestion/ 
// @desc    A client can request information on the next question by sending a request here
router.post('/nextQuestion/', (req, res) => {
  const success = true;

  /*
  Request:
  {
    lobbyId: string,
    playerId: string
    questionNumber: number
  }
  */

 const nextQ = {
  questionInfo: {           //charlies file missing :
    question: "who's the best team member",
    category: 'general knowledge',
    answers: {
     a: "John",
     b: "John",
     c: "John",
     d: "John",
    }
  },
  success: success,
  questionNumber: 1,       //charlies file missing ,
  //?error: string,
  time: 10              // time question countdown started on server
  // time allowed per question?
}

  res.json(nextQ) 
});

// @route   POST /answer/
// @desc    A client can send its answer to the server by sending a request here. The server will check if it is correct and send an appropriate response.
router.post('/answer/', (req, res) => {
  const success = true;

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

 const answer = {
  success: success,
  //?error: string,
  correctAnswer: "a",
  questionNumber: 1
}

  res.json(answer) 
});

// @route   POST /leaderboard/
// @desc    A client can request the leaderboard for a quiz by sending a request here.
router.post('/leaderboard/', (req, res) => {

  var lobbies = req.app.locals.allLobbies;
  var wantedID = req.body.id;
  var wantedLobby = lobbies.getLobby(wantedID);
  var inOrder = [];
  var id = [];

  //change obj to array so i can sort
  for (key in wantedLobby.players){
      inOrder.push([key.toString(), wantedLobby.players[key].username, wantedLobby.players[key].score])
  }

  //sort array DEC
  inOrder.sort(function(a, b) {
      return b[2] - a[2];
  });

  for (i in inOrder) {
      var test2 = inOrder[i];
      test2.toString();
      var fields = test2.toString().split(',');
      id.push(fields[0]);
  }

  const responseObject = {};
  responseObject["playersRanked"] = id;
  responseObject["users"] = wantedLobby.players;

  res.json(responseObject);
});

module.exports = router;