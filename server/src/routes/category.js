const express = require('express');
const router = express.Router();

// @route   GET /api/lobby/categories
// @desc    recieve lobby id and send categories back for lobby
router.get('/', async (req, res) => {
    //get list of categories from server for lobbyID requesting
    //take lobby id from request, find req lobbyid in lobbymanager, take categories, send categories.

    console.log("Request for Lobby Categories. Sending Response...");
    
    //get request lobbies to check
    var lobbies = req.app.locals.allLobbies;
    //get request lobby ID
    var lobbyId =  req.body.lobbyID;

    //find matching lobby to lobby id
    var lobby = lobbies.getLobby(lobbyId);

    //get categories list from lobby object
    categories = lobby.categories;

    //send json
    res.json(categories);


});

module.exports = router;
