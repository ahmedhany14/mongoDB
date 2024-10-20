const mongoose = require('mongoose')
const users = require('../../models/user')
const catchAsync = require('../../utils/catcherrors')

exports.delete = catchAsync(async (req, res, next) => {
    const filter = req.body;
    // To delete a user, we can use the deleteOne or deleteMany method

    // deleteOne method
    // accepts one object, and deletes the first user that matches the object

    /*
        const delete_user_by_deleteOne = await users.deleteOne(filter);
    */
    // deleteMany method
    // accepts one object, and deletes all users that match the object

    const delete_user_by_deleteOne = await users.deleteMany(filter);


    res.status(200).json({
        status: 'success deleted',
        data: {
            users: delete_user_by_deleteOne
        }
    })
})


exports.deleteId = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    // To delete a user by id, we can use the findByIdAndDelete method

    const delete_user_by_id = await users.findByIdAndDelete(id);

    res.status(200).json({
        status: 'success deleted',
        data: {
            user: delete_user_by_id
        }
    })
})