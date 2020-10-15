const express = require('express');
const { getRandomMultiChoiceQuestions } = require('../database/db_queries');
const router = express.Router();

// @route   GET / (/ is relative to the route given to this file in app.js)
// @desc    Example Route
router.get('/', async (req, res) => {
    const responseObject = {};
    let index = 0;
    console.log(responseObject);
    await getRandomMultiChoiceQuestions('animals',100).then(arr => {
        arr.forEach( element => {
            responseObject[index] = element;
            index++;

            // for each question logic
        })

        console.log(responseObject);

        // response logic
        res.send(responseObject);
    })

});

module.exports = router;

// (request, response) => {}
