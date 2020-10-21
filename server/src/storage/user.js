class User {
  constructor(username, id, score) {
    //may add more things to this in the future
    this.username = username;
    this.id = id;
    this.score = score;
    this.hasAnswered = false;
    this.fiftyFifty = false;
  }

  updateScore(points) {
    this.score += parseInt(points);
    return this.score;
  }
}

module.exports = User;
