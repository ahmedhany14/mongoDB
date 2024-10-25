const express = require('express');
const {getMovies} = require('../queries/movies/operation_and_filters')
const router = express.Router();

router.route('/')
    .get(getMovies)

module.exports = router;