const express = require('express');
const router = express.Router();

const User = require('../storage/newUser')

// @route   POST /api/username/send
// @desc    Recieve username and give it an ID and Score
router.post('/send', (req, res) => {
  const username = req.body.username;

  //user doesn't put anything as they're name
  if (username == null) {
      //Kamila's method call
  }

  id = createID();
  score = 0;

  userStats = new User(username, id, score)
  res.json(userStats)
});

//create a random ID for new user
function createID(){
    var seq = Math.floor(1000 + Math.random() * 9000)
    return seq;
    }

module.exports = router;

