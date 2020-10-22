const express = require('express');
const router = express.Router();
const Lobby = require('../storage/lobby.js');
const User = require('../storage/user');

// @route   GET / (/ is relative to the route given to this file in app.js)
// @desc    Example Route
router.get('/', async (req, res) => {
  const newLobby = new Lobby(new User('username', 'id', 2));
  newLobby.settings.updateCategories(['animals', 'geography']);

  newLobby.getQuestions().then((output) => {
    console.log(newLobby.questions);
  });

  res.status('200').send('Testing');
});

module.exports = router;

// (request, response) => {}
