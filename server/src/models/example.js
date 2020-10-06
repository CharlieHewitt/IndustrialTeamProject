const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  field1: String,
  field2: String,
});

// can be imported in other files as 'Example' from this file.
module.exports = mongoose.model("Example", exampleSchema);
