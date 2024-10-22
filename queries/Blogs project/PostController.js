const mongoose = require('mongoose')
const blogs = require('../../models/bolgs DB/blogs')
const creators = require('../../models/bolgs DB/Creators')
const catchAsync = require('../../utils/catcherrors')


exports.createPost = catchAsync(async (req, res, next) => {
    const blog = req.body;

    const user_id = new mongoose.Types.ObjectId(req.params.id);

    const new_blog = new blogs({
        content: blog.content,
        tags: blog.tags,
        createdAt: Date.now(),
        creator: {
            id_: user_id
        },
        comments: []
    })

    await new_blog.save()

    await creators.findByIdAndUpdate(user_id, {
        $push: { Blogs: new_blog._id }
    })

    res.status(201).json({
        status: 'success',
        data: {
            blog,
            user_id
        }
    })
})
