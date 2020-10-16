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

// @route   GET /api/lobby/getLobbyLeaderboard
// @desc    return everyone in the lobby
router.get('/getLobbyLeaderboard', (req, res) => {
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
