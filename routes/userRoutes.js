const express = require('express');
const addUser = require('../queries/users/addusr')
const deleteUser = require('../queries/users/deleteuser')
const router = express.Router();

router.route('/')
    .post(addUser.adduser)
    .delete(deleteUser.delete)



module.exports = router;