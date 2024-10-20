const express = require('express');
const addUser = require('../queries/users/addusr')
const deleteUser = require('../queries/users/deleteuser')
const updateUser = require('./../queries/users/updateuser')
const readUser = require('./../queries/users/readusers')
const router = express.Router();

router.route('/')
    .post(addUser.adduser)
    .delete(deleteUser.delete)
    .patch(updateUser.update)
    .get(readUser.read)
router.route('/:id')
    .delete(deleteUser.deleteId)

module.exports = router;