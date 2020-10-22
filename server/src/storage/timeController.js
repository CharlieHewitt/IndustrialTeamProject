const QuizTimer = require('./quizTimer');

class TimeController {
  constructor() {
    this.timers = {};
  }

  addTimer(name, secondsFromNow) {
    if (this.timers[name]) {
      console.log('error setting timer - duplicateName');
      return false;
    }

    this.timers[name] = new QuizTimer(secondsFromNow);
    console.log(`${name} created.`);
    return true;
  }

  getTimer(name) {
    if (!this.timers[name]) {
      //console.log('error getting timer - undefined');
      return undefined;
    }

    return this.timers[name];
  }

  removeTimer(name) {
    if (this.timers[name]) {
      delete this.timers[name];
    }
  }
}

module.exports = TimeController;
