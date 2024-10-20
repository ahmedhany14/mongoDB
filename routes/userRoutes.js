const express = require('express');
const userQueries = require('../queries/users/addusr')

const router = express.Router();

router.route('/')
    .post(userQueries.adduser)



module.exports = router;