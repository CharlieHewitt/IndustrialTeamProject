const MultiChoiceQuestionModel = require('../models/multiChoiceQuestionSchema');
const BooleanQuestionModel = require('../models/booleanQuestionSchema');

/**
 * Returns a list of json documents that correspond to all
 * multi-choice questions that belong to the requested category.
 *
 * @param {string} requestedCategory - category name
 */
function getAllMultiChoiceQuestions(requestedCategory) {
  MultiChoiceQuestionModel.find({ category: requestedCategory }, function (
    err,
    document
  ) {
    if (err) return handleError(err);
    if (document.length === 0) {
      console.log(
        `document length is 0 - ${requestedCategory} may not exist; please check category is spelt correctly.`
      );
    } else {
      console.log(document);
    }
  });
}

/**
 * Gets an array of json documents that correspond to a random
 * selection of multi-choice questions from the requested category.
 *
 * @param {string} requestedCategory - category name
 * @param {number} numOfQuestions - number of questions requested
 * @returns array of multi-choice question objects
 */
async function getRandomMultiChoiceQuestions(
  requestedCategory,
  numOfQuestions
) {
  let count = 0;
  const randomMultiChoiceQuestions = [];

  for (count; count < numOfQuestions; count++) {
    const random = Math.floor(Math.random() * 42);
    await getMCQuestion(requestedCategory, random)
      .then((dbResponse) => {
        if (randomMultiChoiceQuestions.includes(dbResponse)) {
          count--;
        } else {
          randomMultiChoiceQuestions.push(dbResponse);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return randomMultiChoiceQuestions;
}

async function getMCQuestion(requestedCategory, random) {
  return MultiChoiceQuestionModel.findOne({ category: requestedCategory })
    .skip(random)
    .exec();
}

module.exports = {
  getAllMultiChoiceQuestions: getAllMultiChoiceQuestions,
  getRandomMultiChoiceQuestions: getRandomMultiChoiceQuestions,
};
