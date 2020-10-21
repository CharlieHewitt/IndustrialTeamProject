// default values if you change these update in tests!
const DEFAULT_ANSWER_TIME = 10; // in seconds
const DEFAULT_NUM_QUESTIONS = 20;

class LobbySettings {
  constructor() {
    this.answerTime = DEFAULT_ANSWER_TIME;
    this.numQuestions = DEFAULT_NUM_QUESTIONS;
    this.categories = [];
  }

  updateAnswerTime(answerTime) {
    if (typeof answerTime != 'number') {
      console.error('Error: argument was NaN');
      return false;
    }

    if (answerTime <= 0) {
      console.error(
        'Error: time to answer a question cant be less than or equal to 0 seconds.'
      );
      return false;
    }
    this.answerTime = answerTime;

    return true;
  }

  updateNumQuestions(numQuestions) {
    if (typeof numQuestions != 'number') {
      console.error('Error: argument was NaN');
      return false;
    }

    if (numQuestions <= 0) {
      console.error(
        "Error: number of questions can't be less than or equal to 0"
      );
      return false;
    }

    this.numQuestions = numQuestions;
    return true;
  }

  updateCategories(categories) {
    if (!Array.isArray(categories)) {
      console.error('categories was not an array');
      return false;
    }
    // error handling on valid categories? shouldn't be needed if frontend is using categories from the API (display purposes only from here onwards)
    if (categories.length === 0) {
      console.error('No categories given');
      return false;
    }

    this.categories = categories;
    return true;
  }

  getObject() {
    return {
      answerTime: this.answerTime,
      numQuestions: this.numQuestions,
      categories: this.categories,
    };
  }

  // may add below function in the future

  // takes in a settings object containing the following:
  // updateSettings({numQuestions, answerTime, categories}){
  //     let success = true;
  //     success = this.updateNumQuestions(numQuestions);

  //     // Abort on error
  //     if (!success){
  //         return false;
  //     }

  //     success = this.updateAnswerTime(answerTime);

  //     // Abort on error
  //     if (!success){
  //         return false;
  //     }

  //     success = this.updateCategories(categories);

  //     return success;
  // }
}

module.exports = LobbySettings;
