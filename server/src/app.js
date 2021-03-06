const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./database/db_connection.js');
const LobbyManager = require('./storage/lobbyManager');

// import env variables
// Create .env file if you haven't!
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTIONSTRING = process.env.MONGODB_CONNECTIONSTRING;

const app = express();

app.use(cors());
app.use(express.json());
app.locals.allLobbies = new LobbyManager();

connectToDatabase(MONGODB_CONNECTIONSTRING);

// define routes
app.use('/example', require('./routes/example.js'));
app.use('/api/lobby', require('./routes/lobby.js'));
app.use('/api/lobby/categories', require('./routes/category.js'));
app.use('/api/databasetest', require('./routes/exampleAsyncRequest.js'));
app.use('/api/quiz', require('./routes/quiz.js'));
app.use('/api/categories', require('./routes/categories_list.js'));
app.use('/time', require('./routes/timeTesting.js'));
app.use('/api/polling/', require('./routes/polling.js'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
