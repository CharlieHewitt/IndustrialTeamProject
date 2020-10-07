const express = require("express");
const connectToDatabase = require("./database/db_connection.js");

// import env variables
// Create .env file if you haven't!
require("dotenv").config();

const PORT = 4000;
const MONGODB_CONNECTIONSTRING = process.env.MONGODB_CONNECTIONSTRING;

const app = express();

connectToDatabase(MONGODB_CONNECTIONSTRING);

// define routes
app.use("/example", require("./routes/example.js"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
