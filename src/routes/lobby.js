const express = require('express');
const router = express.Router();

const LobbyManager = require('../storage/lobbyManager');
const Lobby = require('../storage/lobby');
const User = require('../storage/user');

// @route   POST /api/lobby/join
// @desc    A player can 'join' a lobby by using this link
router.post('/join', async (req, res) => {
  const username = req.body.playerName;

  id = createID();
  score = 0;

  userStats = new User(username, id, score);
  lobbyId = req.body.lobbyId;
  lobbyManager = req.app.locals.allLobbies;

  // TODO: check game phase -> only allow joining in forming, settings

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
router.post('/create', async (req, res) => {
  var lobbies = req.app.locals.allLobbies;
  var hostUsername = req.body.hostName;
  var id = createID();

  var user = new User(hostUsername, id, 0);
  var lobby = new Lobby(user);

  var lobbyid = lobby.lobbyID;

  req.app.locals.allLobbies.addLobby(lobby);

  const responseObject = {};
  responseObject['lobbyId'] = lobbyid;
  responseObject['hostId'] = id;
  responseObject['hostName'] = user.username;
  res.json(responseObject);
});

// @route   POST /api/lobby/getLobbyPlayers
// @desc    return everyone in the lobby
router.post('/getLobbyPlayers', async (req, res) => {
  var lobbies = req.app.locals.allLobbies;
  const { lobbyId } = req.body;

  let resObject = {};
  let arr = [];

  var wantedLobby = lobbies.getLobby(lobbyId);

  // TODO: check game phase -> only allow gettingLobbyPlayers in forming, settings

  for (const playerId in wantedLobby.players) {
    const { username, id } = wantedLobby.players[playerId];
    const playerObject = { playerName: username, playerId: id };
    arr.push(playerObject);
    console.log(playerObject, '  pushing');
  }

  resObject.players = arr;
  console.log(resObject);
  res.json(resObject);
});

//create a random ID for new user
function createID() {
  var seq = Math.floor(1000 + Math.random() * 9000);
  return seq;
}

module.exports = router;
