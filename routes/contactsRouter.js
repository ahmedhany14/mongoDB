const express = require('express');
const {getContacts} = require('../queries/contactsIndex');
const {aggregateContacts} = require('../queries/aggregations/aggControll');
const router = express.Router();


router.route('/')
    .get(getContacts);

router.route('/agg')
    .get(aggregateContacts)

module.exports = router;