class QuizTimer {
  constructor(secondsFromNow) {
    this.target = QuizTimer.getTargetTime(secondsFromNow);
    console.log(`created QuizTimer with target = ${this.target}`);
  }

  hasTargetTimePassed = (time = Date.now()) => {
    return time > this.target;
  };

  timeToTarget = (time = Date.now()) => {
    return this.target - time;
  };

  static getTargetTime = secondsFromNow => {
    // if (secondsFromNow && typeof secondsFromNow === 'number' && secondsFromNow > 0)
    return Date.now() + secondsFromNow * 1000;
  };
}

module.exports = QuizTimer;
