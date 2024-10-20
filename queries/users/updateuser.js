const mongoose = require('mongoose')
const users = require('../../models/user')
const catchAsync = require('../../utils/catcherrors')


exports.update = catchAsync(async (req, res, next) => {
    const filter = req.query;
    const newDate = req.body;

    // To update a user, we can use the updateOne or updateMany method

    // updateOne method
    // accepts two objects, the first object is the filter, and the second object is the new data, updates the first user that matches the filter

    /*
        const update_user_by_updateOne = await users.updateOne(filter, newDate);
    */

    // updateMany method
    // accepts two objects, the first object is the filter, and the second object is the new data, updates all users that match the filter

    const update_user_by_updateOne = await users.updateMany(filter, newDate);
    res.status(200).json({
        status: 'success',
        data: {
            users: update_user_by_updateOne
        }
    })
})