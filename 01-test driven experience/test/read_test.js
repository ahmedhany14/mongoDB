const mongoose = require('mongoose');
const user = require('./../src/userModel');
const assert = require('assert')

describe("read by name tests", () => {
    let ahmed;
    beforeEach((done) => {
        ahmed = new user({
            name: 'Ahmed'
        });
        ahmed.save().then(() => {
            done();
        })
    })
    it("find all users with name ahmed", (next) => {
        user.find({
            name: 'Ahmed'
        }).then((res) => {
            assert(res[0].name.toString() === ahmed.name.toString());
            assert(res[0]._id.toString() === ahmed._id.toString());
            next();
        });
    })

    it("find users without _id", (next) => {
        user.findOne({
            _id: ahmed._id.toString()
        }).then((res) => {
            assert(res.name.toString() === 'Ahmed');
            next();
        });

    })
})
