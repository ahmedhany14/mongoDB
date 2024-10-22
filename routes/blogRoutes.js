const express = require('express');

const {
    createPost,
    deletePost
} = require('../queries/Blogs project/PostController')


const router = express.Router();
router.route('/:id')
    .patch(createPost)
    .delete(deletePost)
module.exports = router;
