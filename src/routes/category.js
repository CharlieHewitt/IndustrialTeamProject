const express = require('express');
const router = express.Router();

const LobbyManager = require('../storage/lobbyManager')


// @route   GET /lobby
// @desc    recieve lobby id and send categories back for lobby
router.get('/lobby', (req, res) => {
    //get list of categories from server for lobbyID requesting
    //take lobby id fron request, find req lobbyid in lobbymanager, take categories, send categories.

    console.log("Request for Lobby Categories. Sending Response...")
    var sender = []
    
    //get request lobby ID
    const lobbyid =  req.body.lobbyID

    //loop through to find current lobbyID from all lobbies in lobbyManager
    for(i = 0; i < LobbyManager.lobbies.length; i++){
      if (lobbyid == LobbyManager.lobbies[i].lobbyID){   //existing lobby, now find lobby class
        console.log("LobbyID Match")
        sender = LobbyManager.lobbies[i].categories
      }
    };


    //send response - list of Categories in JSON
    console.log("The categories are: " + sender)
    console.log("The categories have been sent!")

    res.json(sender);
});

module.exports = router;