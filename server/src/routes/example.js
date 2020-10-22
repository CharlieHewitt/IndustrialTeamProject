const express = require('express');
const router = express.Router();
const Lobby = require('../storage/lobby.js');
const User = require('../storage/user');
const {
  getRandomBooleanQuestions,
  getRandomMultiChoiceQuestions,
} = require('../database/db_queries');

// @route   GET / (/ is relative to the route given to this file in app.js)
// @desc    Example Route
router.get('/', async (req, res) => {
  // const newLobby = new Lobby(new User('username', 'id', 2));
  // newLobby.settings.updateCategories(['animals', 'geography']);

  // newLobby.getQuestions().then((output) => {
  //   console.log(newLobby.questions);
  // });

  // console.log(await getRandomBooleanQuestions('animals', 10));
  // console.log(await getRandomMultiChoiceQuestions('brain-teasers', 10));

  // console.log(test());

  res.status('200').send('Testing');
});

module.exports = router;

// (request, response) => {}
