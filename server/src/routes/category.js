const express = require('express');
const router = express.Router();

const LobbyManager = require('../storage/lobbyManager');


// @route   GET /lobby - whatever the waiting lobby route is
// @desc    recieve lobby id and send categories back for lobby
router.get('/lobby/categories', (req, res) => {
    //get list of categories from server for lobbyID requesting
    //take lobby id fron request, find req lobbyid in lobbymanager, take categories, send categories.

    console.log("Request for Lobby Categories. Sending Response...");
    var sender = [];
    
    //get request lobby ID
    const lobbyid =  req.body.lobbyID;

    //loop through to find current lobbyID from all lobbies in lobbyManager
    for(i = 0; i < LobbyManager.lobbies.length; i++){

      if (lobbyid == LobbyManager.lobbies[i].lobbyID){   //it is an existing lobby confirmed, now find lobby class
        console.log("LobbyID Match");
        sender = LobbyManager.lobbies[i].categories;    //fetch categories to be sent


        //send response - list of categories in json
        console.log("The categories are: " + sender);
        console.log("The categories have been sent!");
      }
      //if no match then lobbyID doesnt belong to any lobby and/or lobby doesnt exist
      else{
        console.log("LobbyID does not Match any lobby currently in session");
      }
    };

    res.json(sender);

});

module.exports = router;