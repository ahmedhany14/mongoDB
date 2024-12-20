const mongoose = require('mongoose')
const blogs = require('../../models/blogs DB/blogs')
const creators = require('../../models/blogs DB/Creators')
const catchAsync = require('../../utils/catcherrors')


exports.createPost = catchAsync(async (req, res, next) => {
    const blog = req.body;
    new mongoose.Types.ObjectId

    const user_id = req.params.id;

    const new_blog = new blogs({
        content: blog.content,
        tags: blog.tags,
        createdAt: Date.now(),
        creator: {
            creator_id: user_id
        },
        comments: []
    })

    await new_blog.save()
    const blog_id = new_blog._id;
    await creators.findByIdAndUpdate(user_id, {
        $push: {Blogs: blog_id}
    })

    res.status(201).json({
        status: 'success',
        data: {
            blog,
            user_id
        }
    })
})
exports.deletePost = catchAsync(async (req, res, next) => {
    const post_id = req.params.id;

    // fetch the blog post

    const post = await blogs.findById(post_id);
    // fetch the creator of the blog post
    const creator_id = post.creator.creator_id;


    console.log(post_id, creator_id)

    // delete the blog post
    await blogs.findByIdAndDelete(post_id);

    // delete the blog post from the creator's list of blogs
    await creators.findByIdAndUpdate(creator_id, {
        $pull: {Blogs: post_id}
    })

    res.status(204).json({
        status: 'success',
        deleted: post,
        creator_id
    })

});


exports.searchPost = catchAsync(async (req, res, next) => {
    const query = req.body.text;
    // search for the query in the content of the blog
    // the $text operator is used to perform a text search on the content field of the blog
    // the $search operator is used to specify the query to search for
    // the $meta operator is used to return the textScore of the search and sort the results based on the textScore
    const posts = await blogs.find({$text: {$search: query}}, {score: {$meta: 'textScore'}});
    res.status(200).json({
        status: 'success',
        data: {
            posts
        }
    })
})