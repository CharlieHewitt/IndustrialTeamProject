const express = require('express');
const router = express.Router();

const Lobbies = require('../storage/lobbyManager');
const Lobby = require('../storage/lobby');
const User = require('../storage/newUser');

// @route   GET /api/lobby/getCategories
// @desc    recieve lobby id and send categories back for lobby
router.get('/getCategories', (req, res) => {
    //get list of categories from server for lobbyID requesting
    //take lobby id from request, find req lobbyid in lobbymanager, take categories, send categories.

    console.log("Request for Lobby Categories. Sending Response...");
    var sender = [];
    
    //get request lobbies to check
    var lobbies = req.body.lobbies;
    //get request lobby ID
    var lobbyid =  req.body.lobbyID;

    //loop through to find current lobbyID from all lobbies in lobbyManager
    for(i = 0; i < lobbies.length; i++){

      if (lobbyid == lobbies[i].lobbyID){   //it is an existing lobby confirmed, now find lobby class
        console.log("LobbyID Match");
        sender = lobbies[i].categories;    //fetch categories to be sent


        //send response - list of categories in json
        console.log("The categories are: " + sender);
        console.log("The categories have been sent!");
      }

      //if no match then lobbyID doesnt belong to any lobby and/or lobby doesnt exist
      else{
        console.log("LobbyID does not Match any lobby currently in session");
      }
    };

    //send list of categories response in json
    res.json(sender);

});

module.exports = router;