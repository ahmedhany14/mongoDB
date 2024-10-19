/*
mongo operators used to update the data in the collection
it is used to avoid loading the data in the server and updating it in the client side
so we insted use the operators to update the data in mongodb

example:
1) update fields in the document
    * $inc - increment the value of the field by the specified amount
            {$inc: {field_name: value}}
    * $mul - multiply the value of the field by the specified amount
            {$mul: {field_name: value}}
    * $rename - renames the field
            {$rename: {old_field_name: new_field_name}}
    * $set - sets the value of a field in a document
            {$set: {field_name: value}
    * $unset - removes the specified field from a document
            {$unset: {field_name: 1}}, 1 is the value to remove the field
    * $min - only updates the field if the specified value is less than the existing field value 
            {$min: {field_name: value}}
    * $max - only updates the field if the specified value is greater than the existing field value
            {$max: {field_name: value}}


2) update arrays in the document
    * $push - appends a specified value to an array
            {$push: {field_name: value}}
    * $pop - removes the first or last element of an array 
            {pop: {field_name: 1}} removes the last element and {pop: {field_name: -1}} removes the first element
    * $pull - removes all array elements that match a specified query
            {$pull: {field_name: value}}
    * $addToSet - adds elements to an array only if they do not already exist in the set
            {$addToSet: {field_name: value}}
    * $sort - sorts the elements of an array
            {$sort: {field_name: 1}} ascending order and {$sort: {field_name: -1}} descending order
*/


const assert = require('assert')
const user = require('./../src/userModel')
const mongoose = require('mongoose')


describe('Operators test', () => {
    let ahmed;
    beforeEach((done) => {
        ahmed = new user({
            name: 'Ahmed',
            postCount: 10
        });
        ahmed.save().then(() => {
            done();
        })
    })

    /*
        * $inc - increment the value of the field by the specified amount
                {$inc: {field_name: value}}
    */
    xit('Test inc operator', (next) => {

        user.updateMany({ name: 'Ahmed' }, { $inc: { postCount: 10 } }) // that means the post count should be 20 for the user
            .then(() => {
                return user.findOne({ name: 'Ahmed' })
            })
            .then((res) => {
                assert(res.postCount === 20);
                next();
            })
    })
})