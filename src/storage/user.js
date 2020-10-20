class User {
  constructor(username, id, score) {
    //may add more things to this in the future
    this.username = username;
    this.id = id;
    this.score = score;
  }

  updateScore() {
    this.score += 10;
    return this.score;
  }
}

module.exports = User;
