const mongoose = require('mongoose');

const multiChoiceQuestionSchema = new mongoose.Schema({
  question: String,
  category: String,
  answers: {
    a: String,
    b: String,
    c: String,
    d: String,
  },
  correctAnswer: String,
});

// can be imported in other files as 'MultiChoiceQuestion' from this file.
module.exports = mongoose.model(
  'MultiChoiceQuestion',
  multiChoiceQuestionSchema
);
