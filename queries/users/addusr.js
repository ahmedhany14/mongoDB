const mongoose = require('mongoose')
const users = require('../../models/user')
const catchAsync = require('../../utils/catcherrors')

exports.adduser = catchAsync(async (req, res, next) => {
    const user = req.body;

    // to add user by using mongoose, we can use the create or save method
    // create method is used to add multiple users at once, and save method is used to add a single user
    // we can also use the insertMany or insertOne method to add multiple or single user respectively

    // create method
    // accepts one object or an array of objects
    const add_user_by_create = await users.create(user);

    // save method
    // accepts one object

    /*
        const add_user_by_create = new users(user);
        await add_user_by_create.save();
    */


    // insertMany method
    // accepts an array of objects

    /*
        const add_user_by_create = await users.insertMany(user);
    */

    res.status(201).json({
        status: 'success',
        data: {
            user: add_user_by_create
        }
    })

})
