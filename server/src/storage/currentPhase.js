class CurrentPhase {
  constructor() {
    this.phase = '';
    this.setQuizForming();
  }

  getPhase = () => {
    console.log(this.phase);
    return this.phase;
  };

  // none -> forming
  setQuizForming = () => {
    if (this.phase === '') {
      this.phase = 'forming';
    } else {
      console.log('Error setting phase');
    }
  };

  // forming -> settings
  setSettings = () => {
    if (this.phase === 'forming' || 'settings') {
      this.phase = 'settings';
    } else {
      console.log('Error setting phase');
    }
  };

  // settings -> started
  quizStarted = () => {
    if (this.phase === 'settings') {
      this.phase = 'started';
    } else {
      console.log('Error setting phase');
    }
  };

  // started -> question || leaderboard -> question
  questionPhase = () => {
    if (this.phase === 'started' || this.phase === 'leaderboard') {
      this.phase = 'question';
    } else {
      console.log('Error setting phase');
    }
  };

  // question -> leaderboard
  leaderboardPhase = () => {
    if (this.phase === 'question') {
      this.phase = 'leaderboard';
    } else {
      console.log('Error setting phase');
    }
  };

  // leaderboard -> end
  gameEnded = () => {
    if (this.phase === 'leaderboard') {
      this.phase = 'end';
    } else {
      console.log('Error setting phase');
    }
  };
}

module.exports = CurrentPhase;
