const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

function connectToDatabase(MONGODB_CONNECTIONSTRING) {
  mongoose
    .connect(MONGODB_CONNECTIONSTRING, { useNewUrlParser: true })
    .catch((error) => console.log("failed to connect to database"));
}

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

module.exports = connectToDatabase;
