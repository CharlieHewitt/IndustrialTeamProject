const express = require('express');
const { getListOfUniqueCategories } = require('../database/db_queries');
const router = express.Router();

// @route   GET /api//categories
// @desc    recieve array of all question categories
router.get('/', async (req, res) => {
    //send json

    const responseObject = {};
    responseObject['categories'] = await getListOfUniqueCategories();
    res.json(responseObject);
});

module.exports = router;
