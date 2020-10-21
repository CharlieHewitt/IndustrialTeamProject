const express = require('express');
const router = express.Router();

const LobbyManager = require('../storage/lobbyManager');
const Lobby = require('../storage/lobby');
const User = require('../storage/user');

// @route   POST /api/lobby/join
// @desc    A player can 'join' a lobby by using this link
router.post('/join', (req, res) => {
  const username = req.body.playerName;

  id = createID();
  score = 0;

  userStats = new User(username, id, score);
  lobbyId = req.body.lobbyId;
  lobbyManager = req.app.locals.allLobbies;
  var success = lobbyManager.joinLobby(lobbyId, userStats);

  const responseObject = {};
  responseObject['success'] = success;
  responseObject['lobbyId'] = lobbyId;
  responseObject['playerId'] = userStats.id;
  responseObject['playerName'] = userStats.username;
  res.json(responseObject);
});

// @route   POST /api/lobby/create
// @desc    create lobby and add host
router.post('/create', (req, res) => {
  var lobbies = req.app.locals.allLobbies;
  var hostUsername = req.body.hostName;
  var categories = req.body.categories;
  var id = createID();

  var user = new User(hostUsername, id, 0);
  var lobby = new Lobby(user, categories);

  var lobbyid = lobby.lobbyID;

  req.app.locals.allLobbies.addLobby(lobby);

  const responseObject = {};
  responseObject['lobbyId'] = lobbyid;
  responseObject['hostId'] = id;
  responseObject['hostName'] = user.username;
  res.json(responseObject);
});

// @route   GET /api/lobby/getLobbyPlayers
// @desc    return everyone in the lobby
router.get('/getLobbyPlayers', (req, res) => {
  var lobbies = req.app.locals.allLobbies;
  var wantedID = req.body.id;

  var wantedLobby = lobbies.getLobby(wantedID);

  res.json(wantedLobby.players);
});

//create a random ID for new user
function createID() {
  var seq = Math.floor(1000 + Math.random() * 9000);
  return seq;
}

module.exports = router;
