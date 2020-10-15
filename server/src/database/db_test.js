const example = require("../models/example");
const Example = require("../models/example");

function dbTest() {
  var exampleInstance = new Example({ field1: "string1", field2: "string2" });
  exampleInstance.save();
  const five = 6;
}

module.exports = dbTest;
