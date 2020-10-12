const express = require('express');
const { processFile } = require('./database/db_addMultiQuestions.js');
const connectToDatabase = require('./database/db_connection.js');

// import env variables
// Create .env file if you haven't!
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_CONNECTIONSTRING = process.env.MONGODB_CONNECTIONSTRING;

const app = express();

connectToDatabase(MONGODB_CONNECTIONSTRING);

// define routes
app.use('/example', require('./routes/example.js'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// call this to run populate database pipeline
// processFile();
