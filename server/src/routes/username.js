const express = require('express');
const router = express.Router();

const User = require('../storage/newUser');
const LobbyManager = require('../storage/lobbyManager');
const Lobby = require('../storage/lobby');

// @route   POST /api/username/send
// @desc    Recieve username and give it an ID and Score
router.post('/send', (req, res) => {
  const username = req.body.username;

  id = createID();
  score = 0;

  userStats = new User(username, id, score);
  lobbyId = req.body.lobbyID;
  lobbyManager = req.app.locals.allLobbies;
  lobbyManager.joinLobby(lobbyId, userStats);
  res.json(userStats) //this should be changed to confirmation that they're in a lobby?
});

//create a random ID for new user
function createID(){
    var seq = Math.floor(1000 + Math.random() * 9000)
    return seq;
    }

module.exports = router;
