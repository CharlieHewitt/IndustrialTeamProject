const MultiChoiceQuestionModel = require('../models/multiChoiceQuestionSchema');
const BooleanQuestionModel = require('../models/booleanQuestionSchema');

/**
 * Returns a list of json documents that belong to the requested category.
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
        'document length is 0 - category may not exist; please check category is spelt correctly.'
      );
    } else {
      console.log(document);
    }
  });
}

function getRandomMultiChoiceQuestions(requestedCategory, numOfQuestions) {}

module.exports = getAllMultiChoiceQuestions;
