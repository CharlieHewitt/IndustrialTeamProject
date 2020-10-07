const mongoose = require("mongoose");

const personalData = new mongoose.Schema({
  username: String,
  id: String,
  score: Number
});

// can be imported in other files as 'Example' from this file.
module.exports = mongoose.model("player", personalData);