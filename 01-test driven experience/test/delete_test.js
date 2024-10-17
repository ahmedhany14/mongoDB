const mongoose = require('mongoose')
const assert = require('assert')
const user = require('./../src/userModel')

describe("Delete methods", () => {
    let ahmed;
    beforeEach((done) => {
        ahmed = new user({
            name: 'Ahmed'
        });
        ahmed.save().then(() => {
            done();
        })
    });


    it('class method deleteOne', (next) => {
        user.deleteOne({ name: "Ahmed" })
            .then(() => user.find({ name: "Ahmed" }))
            .then((res) => {
                assert(res === null)
                next();
            })
        next();
    });

    it('class method findOneAndRemove', (next) => {
        user.findOneAndDelete({ name: "Ahmed" })
            .then(() => user.find({ name: "Ahmed" }))
            .then((res) => {
                assert(res === null)
                next();
            })
        next()
    });

    it('class method findByIdAndDelete', (next) => {
        user.findByIdAndDelete({ _id: ahmed._id })
            .then(() => user.find({ _id: ahmed._id }))
            .then((res) => {
                assert(res.length === 0)
                next();
            })
    });
});