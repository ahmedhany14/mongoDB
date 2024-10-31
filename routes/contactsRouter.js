const express = require('express');
const {getContacts} = require('../queries/contactsIndex');
const router = express.Router();


router.route('/')
    .get(getContacts);

module.exports = router;