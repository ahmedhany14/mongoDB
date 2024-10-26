const express = require('express');
const { getMovies,useExpr } = require('../queries/movies/operation_and_filters')
const router = express.Router();

router.route('/')
    .get(getMovies)

router.route('/expr')
    .get(useExpr)

module.exports = router;