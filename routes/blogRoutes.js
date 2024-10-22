const express = require('express');

const {
    createPost,
} = require('../queries/Blogs project/PostController')


const router = express.Router();

router.route('/:id')
    .post(createPost)
module.exports = router;
