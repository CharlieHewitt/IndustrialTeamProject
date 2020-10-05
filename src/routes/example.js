const express = require('express');
const router = express.Router();

// @route   GET / (/ is relative to the route given to this file in app.js)
// @desc    Example Route
router.get('/', (req, res) => {
  res.status('200').send('Testing');
});

module.exports = router;

// (request, response) => {}
