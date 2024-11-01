const express = require('express');
const {getMovies, useExpr, WorkingWithCorsors} = require('../queries/movies/operation_and_filters')
const router = express.Router();

router.route('/')
    .get(getMovies)

router.route('/expr')
    .get(useExpr)


router.route('/cursor/:page')
    .get(WorkingWithCorsors)


module.exports = router;