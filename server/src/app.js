const express = require("express");
const connectToDatabase = require("./database/db_connection.js");
const LobbyManager = require('./storage/lobbyManager');

const Lobby = require('./storage/lobby');
const User = require('./storage/newUser');

// import env variables
// Create .env file if you haven't!
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTIONSTRING = process.env.MONGODB_CONNECTIONSTRING;

const app = express();

app.use(express.json());
app.locals.allLobbies = new LobbyManager();

connectToDatabase(MONGODB_CONNECTIONSTRING);

// define routes
app.use("/example", require("./routes/example.js"));
app.use("/api/username", require("./routes/username.js"));
app.use("/api/lobby", require("./routes/lobby.js"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
