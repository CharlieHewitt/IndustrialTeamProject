const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  field1: String,
  field2: String,
});

module.exports = mongoose.model('Example', exampleSchema);
