const mongoose = require('mongoose')
const users = require('../../models/user')
const movie = require('../../models/movie')
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
});

exports.updateOperations = catchAsync(async (req, res, next) => {
    /*
        The update operations are:
        - $set: sets the value of a field in a document
        - $unset: removes the specified field from a document
        - $inc: increments the value of the field by the specified amount
        - $min: only updates the field if the specified value is less than the existing field value
        - $max: only updates the field if the specified value is greater than the existing field value
        - $mul: multiplies the value of the field by the specified amount
        - $rename: renames a field
        - $currentDate: sets the value of a field to the current date

        array update operators:
        - $push: appends a specified value to an array
        - $pop: removes the first or last element of an array
        - $pull: removes all array elements that match a specified query
        - $addToSet: adds a value to an array unless the value is already present
        - $each: modifier to $push, $addToSet, and $pull to add multiple values
     */
    const id = req.params.id;
    //const update_user_by_updateOne = await users.findOneAndUpdate({name: 'Ahmed'}, {$set: {name: 'Ahmed Hany'}});

    //const update_user_by_updateOne = await users.findOneAndUpdate({name: 'Ahmed Hany'}, {$inc: {age: 10}});

    // remove the field age
    //const update_user_by_updateOne = await users.updateMany({name: 'Ahmed Hany'}, {$unset: {age: 0}}, {new: true});

    // rename the field name to username
    const update_user_by_updateOne = await users.updateMany({name: 'Ahmed Hany'}, {$rename: {name: 'username'}}, {new: true});

    res.status(200).json({
        status: 'success',
        data: {
            users: update_user_by_updateOne
        }
    })
});