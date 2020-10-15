const express = require('express');
const router = express.Router();

// @route   GET /api/lobby/getCategories
// @desc    recieve lobby id and send categories back for lobby
router.get('/getCategories', (req, res) => {
    //get list of categories from server for lobbyID requesting
    //take lobby id from request, find req lobbyid in lobbymanager, take categories, send categories.

    console.log("Request for Lobby Categories. Sending Response...");
    var sender = [];
    
    //get request lobbies to check
    var lobbies = req.app.locals.allLobbies;
    //get request lobby ID
    var lobbyid =  req.body.lobbyID;

    //find matching lobby to lobby id
    var lobby = lobbies.getLobby(lobbyid);

    //get categories list from lobby object
    categories = lobby.categories;

    //send json
    res.json(categories);


});

module.exports = router;
