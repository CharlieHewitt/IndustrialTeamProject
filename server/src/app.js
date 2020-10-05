const express = require('express');
const app = express();

const PORT = 4000;

// define routes
app.use('/example', require('./routes/example.js'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
