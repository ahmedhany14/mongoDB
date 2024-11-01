const express = require('express');
const {getSessions, createSession} = require('../queries/sessions/sessionController')
const router = express.Router();

router.route('/')
    .get(getSessions)
    .post(createSession)
module.exports = router;