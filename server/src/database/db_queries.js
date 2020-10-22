const MultiChoiceQuestionModel = require('../models/multiChoiceQuestionSchema');
const BooleanQuestionModel = require('../models/booleanQuestionSchema');

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
    const randomLimit = await getMultiCategoryCount(requestedCategory);
    const random = Math.floor(Math.random() * randomLimit);
    const question = await getMCQuestion(requestedCategory, random);
    if (randomMultiChoiceQuestions.includes(question) || question == null) {
      count--;
    } else {
      randomMultiChoiceQuestions.push(question);
    }
  }

  return randomMultiChoiceQuestions;
}

/**
 * Gets an array of json documents that correspond to a random
 * selection of boolean questions from the requested category.
 *
 * @param {string} requestedCategory - category name
 * @param {number} numOfQuestions - number of questions requested
 * @returns array of boolean question objects
 */
async function getRandomBooleanQuestions(requestedCategory, numOfQuestions) {
  let count = 0;
  const randomBooleanQuestions = [];

  for (count; count < numOfQuestions; count++) {
    const randomLimit = await getBooleanCategoryCount(requestedCategory);
    const random = Math.floor(Math.random() * randomLimit);
    const question = await getBooleanQuestion(requestedCategory, random);
    if (randomBooleanQuestions.includes(question) || question === null) {
      count--;
    } else {
      randomBooleanQuestions.push(question);
    }
  }

  return randomBooleanQuestions;
}

/**
 * Queries mongoDB for a boolean question.
 *
 * @param {string} requestedCategory - category of requested question
 * @param {number} random - random indice of question from category
 * @return BooleanQuestionModel object - a boolean question json
 */
async function getBooleanQuestion(requestedCategory, random) {
  return BooleanQuestionModel.findOne({ category: requestedCategory })
    .skip(random)
    .exec();
}

/**
 * Queries mongoDB for a multi-choice question.
 *
 * @param {string} requestedCategory - category of requested question
 * @param {number} random - random indice of question from category
 * @return MultiChoiceQuestionModel object - a multi-choice question json
 */
async function getMCQuestion(requestedCategory, random) {
  return MultiChoiceQuestionModel.findOne({ category: requestedCategory })
    .skip(random)
    .exec();
}

/**
 * Gets all unique categories for questions from mongoDB.
 *
 * @returns array of strings containing all the unique question categories
 */
async function getListOfUniqueCategories() {
  return MultiChoiceQuestionModel.collection.distinct('category');
}

/**
 * Gets total count of boolean questions in db with same category.
 *
 * @param {string} category - category of question
 */
async function getBooleanCategoryCount(category) {
  return BooleanQuestionModel.countDocuments({ category: category }, function (
    err,
    count
  ) {
    return count;
  });
}

/**
 * Gets total count of multi-choice questions in db with same category.
 *
 * @param {string} category - category of question
 */
async function getMultiCategoryCount(category) {
  return MultiChoiceQuestionModel.countDocuments(
    { category: category },
    function (err, count) {
      return count;
    }
  );
}

module.exports = {
  getRandomBooleanQuestions: getRandomBooleanQuestions,
  getRandomMultiChoiceQuestions: getRandomMultiChoiceQuestions,
  getListOfUniqueCategories: getListOfUniqueCategories,
};
