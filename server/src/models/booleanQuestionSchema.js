const mongoose = require('mongoose');

const booleanQuestionSchema = new mongoose.Schema({
  question: String,
  category: String,
  answers: {
    a: String,
    b: String,
  },
  correctAnswer: String,
});

// can be imported in other files as 'BooleanQuestion' from this file.
module.exports = mongoose.model('BooleanQuestion', booleanQuestionSchema);
