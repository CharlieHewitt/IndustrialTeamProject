class User {
  constructor(username, id, score) {
    //may add more things to this in the future
    this.username = username;
    this.id = id;
    this.score = score;
    this.skipUsed = false;
    this.hasAnswered = false;
  }

  updateScore(points) {
    this.score += parseInt(points);
    return this.score;
  }
}

module.exports = User;
