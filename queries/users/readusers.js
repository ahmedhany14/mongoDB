const mongoose = require('mongoose')
const users = require('../../models/user')
const catchAsync = require('../../utils/catcherrors')


exports.read = catchAsync(async (req, res, next) => {

    const filter = req.query;
    // To read all users, we can use the find method
    const all_users = await users.find(filter);

    res.status(200).json({
        status: 'success',
        data: {
            users: all_users
        }
    })
})

/*
projection: To select the fields to return, we can use the select method

for example if the database has the following fields: {name, age, password, email, phone, ....etc}
and i only want to return the name and email fields, i can use the select method
so in the find method, i will make a second object, and inside it, i will write the fields i want to return, and set the value to 1
find(filter, {name: 1, email: 1})
*/