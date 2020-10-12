const MultiChoiceQuestion = require('../models/multiChoiceQuestionSchema');
const BooleanQuestion = require('../models/booleanQuestionSchema');
const fs = require('fs');
const path = require('path');

function createMultiChoiceQuestion(
  questionInput,
  categoryInput,
  answerObjectInput,
  correctAnswerInput
) {
  var multiChoiceQuestion = new MultiChoiceQuestion({
    question: questionInput,
    category: categoryInput,
    answers: answerObjectInput,
    correctAnswer: correctAnswerInput,
  });
  console.log(multiChoiceQuestion);
  multiChoiceQuestion.save();
}

function createBooleanChoiceQuestion(
  questionInput,
  categoryInput,
  answerObjectInput,
  correctAnswerInput
) {
  var booleanQuestion = new BooleanQuestion({
    question: questionInput,
    category: categoryInput,
    answers: answerObjectInput,
    correctAnswer: correctAnswerInput,
  });
  console.log(booleanQuestion);
  booleanQuestion.save();
}

/** Read in txt file and return it
 *
 * @returns data - string array of txt file content.
 */
function readFile(fileName) {
  const data = fs
    .readFileSync(fileName, {
      encoding: 'utf8',
      flag: 'r',
    })
    .split('\n');
  return data;
}

/**
 * Processes array of questions into individual string
 * arrays each containing a question's information.
 */
function processFileData() {
  const directoryPath = 'D:/IndustrialProject/OpenTriviaQA/categories';

  fs.readdir(directoryPath, function (err, files) {
    // handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      const fullPath = path.join(directoryPath, file);
      var data = readFile(fullPath);

      var dataArray = [];
      var tempStringArray = [];

      data.forEach((element) => {
        // if element isn't a blank line
        if (element.trim()) {
          tempStringArray.push(element);
        } else {
          if (tempStringArray.length !== 0) dataArray.push(tempStringArray);
          tempStringArray = [];
        }
      });

      dataArray.forEach((element) => {
        const CATEGORY = file.replace('.txt', '');
        parseQuestionToSchema(element, CATEGORY);
      });
    });
  });
}

function parseQuestionToSchema(stringArray, CATEGORY) {
  // Undefined question answer, don't add it
  if (typeof stringArray[1] === 'undefined')
    console.log('undefined question answer');
  // If question is too long and of incorrect form, don't add it
  else if (
    (stringArray[0].includes('#Q') && stringArray[1].includes('^')) === false
  ) {
    console.log('incorrect question form');
    // console.log('Q: ', stringArray[0]);
    // console.log('A: ', stringArray[1]);
  }
  // Check if question is either boolean or multi-choice form
  else {
    if (stringArray.length === 6) {
      var question = stringArray[0]
        .substring(3, stringArray[0].length)
        .replace('\r', '');
      var category = CATEGORY;
      var correctAnswer = stringArray[1]
        .substring(2, stringArray[1].length)
        .replace('\r', '');
      var answers = {
        a: stringArray[2].substring(2, stringArray[2].length).replace('\r', ''),
        b: stringArray[3].substring(2, stringArray[3].length).replace('\r', ''),
        c: stringArray[4].substring(2, stringArray[4].length).replace('\r', ''),
        d: stringArray[5].substring(2, stringArray[5].length).replace('\r', ''),
      };
      correctAnswer = convertCorrectAnswerToLetter(answers, correctAnswer);
      createMultiChoiceQuestion(question, category, answers, correctAnswer);
    }
    // If boolean Question
    else if (stringArray.length === 4) {
      var question = stringArray[0]
        .substring(3, stringArray[0].length)
        .replace('\r', '');
      var category = CATEGORY;
      var correctAnswer = stringArray[1]
        .substring(2, stringArray[1].length)
        .replace('\r', '');
      var answers = {
        a: stringArray[2].substring(2, stringArray[2].length).replace('\r', ''),
        b: stringArray[3].substring(2, stringArray[3].length).replace('\r', ''),
      };
      correctAnswer = convertCorrectAnswerToLetter(answers, correctAnswer);
      createBooleanChoiceQuestion(question, category, answers, correctAnswer);
    } else {
      console.log('question is not of length 4 or 6 - incorrect question form');
    }
  }
}

function convertCorrectAnswerToLetter(answers, correctAnswer) {
  for (var i in answers) {
    if (answers[i] === correctAnswer) correctAnswer = i;
  }
  return correctAnswer;
}

// module.exports = saveTestQuestion;
module.exports = {
  processFile: processFileData,
};
