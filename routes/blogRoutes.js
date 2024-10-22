const express = require('express');

const {
    createPost,
    deletePost
} = require('../queries/Blogs project/PostController')


const {
    createComment,
    getComments
} = require('../queries/Blogs project/CommentController')

const router = express.Router();
router.route('/:id')
    .patch(createPost)
    .delete(deletePost)

router.route('/:post_id/:creator_id')
    .patch(createComment)


router.route('/comments/:post_id')
    .get(getComments)
module.exports = router;
