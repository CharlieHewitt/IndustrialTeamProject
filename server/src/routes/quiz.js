const express = require('express');
const router = express.Router();

// @route   POST /host/settings/
// @desc    Get settings details and send them back successful
router.post('/host/settings/', (req, res) => {
  const success = true;

  /*
  Request:
  {
    lobbyId: string,
    playerId: string,
    settings: {
    categories: string [],
    timePerQuestion: number,
    numQuestions: number
    }
  }
  */

  const person = {lobbyId : req.body.lobbyId,
                  success: success,
                  settings: {
                    categories     : req.body.settings.categories,
                    timePerQuestion: req.body.settings.timePerQuestions,
                    numQuestion    : req.body.settings.numQuestion
                  }
  }

  res.json(person) 
});

// @route   POST /host/start/
// @desc    A host can start the quiz on the server for all the connected players by sending a request here.
router.post('/host/start/', (req, res) => {
  const success = true;

  /*
  Request:
  {
    lobbyId: string,
    playerId: string
  }
  */

 const ready = {
  success: success,
}

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