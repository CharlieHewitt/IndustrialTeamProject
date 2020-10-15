const express = require('express');
const router = express.Router();

const LobbyManager = require('../storage/lobbyManager');
const Lobby = require('../storage/lobby');
const User = require('../storage/newUser');

// @route   GET /api/lobby/getLobbyPlayers
// @desc    return everyone in the lobby
router.get('/getLobbyPlayers', (req, res) => {
    var lobbies = req.app.locals.allLobbies;
    var wantedID = req.body.id;
  
    var wantedLobby = lobbies.getLobby(wantedID);

    res.json(wantedLobby.players);
});

module.exports = router;
