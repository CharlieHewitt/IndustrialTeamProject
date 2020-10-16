const express = require("express");
const connectToDatabase = require("./database/db_connection.js");
const LobbyManager = require('./storage/lobbyManager');

// import env variables
// Create .env file if you haven't!
require('dotenv').config();



const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTIONSTRING = process.env.MONGODB_CONNECTIONSTRING;

const app = express();

app.use(express.json());
app.locals.allLobbies = new LobbyManager();

connectToDatabase(MONGODB_CONNECTIONSTRING);

// define routes
app.use("/example", require("./routes/example.js"));
app.use("/api/lobby", require("./routes/username.js"));
app.use("/api/lobby/categories", require("./routes/category.js"));
app.use('/api/databasetest', require('./routes/exampleAsyncRequest.js'));
app.use("/api/lobby", require("./routes/lobby.js"));
app.use("/api/quiz", require("./routes/quiz.js"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
