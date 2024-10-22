const mongoose = require('mongoose')
const blogs = require('../../models/blogs DB/blogs')
const comments = require('../../models/blogs DB/comments')
const catchAsync = require('../../utils/catcherrors')


exports.createComment = catchAsync(async (req, res, next) => {
    const post_id = req.params.post_id;
    const creator_id = req.params.creator_id;
    const comment = req.body;

    // 1) Create a comment

    const new_comment = new comments({
        content: comment.content,
        createdAt: Date.now(),
        creator: {
            creator_id
        },
        blog: {
            blog_id: post_id
        }
    })

    // 2) Save the comment to the database

    await new_comment.save()

    //3) Add the comment to the blog post

    await blogs.findByIdAndUpdate(post_id, {
        $push: { comments: new_comment._id }
    })


    res.status(201).json({
        status: 'success',
        data: {
            new_comment,
            post_id,
        }
    })
})


exports.getComments = catchAsync(async (req, res, next) => {
    const post_id = req.params.post_id;

    console.log(post_id)
    const blog_comment = await blogs.findById(post_id).select(['comments', '-_id']).populate('comments')

    const comments_ids = blog_comment.comments;


    const friends_comments = await comments.find({ _id: { $in: comments_ids } })
    res.status(200).json({
        status: 'success',
        data: {
            friends_comments
        }
    })
})
