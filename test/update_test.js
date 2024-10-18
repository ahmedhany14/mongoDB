const mongoose = require('mongoose')
const assert = require('assert')
const user = require('./../src/userModel')

describe("Update methods", () => {
    let ahmed;
    beforeEach((done) => {
        ahmed = new user({
            name: 'Ahmed'
        });
        ahmed.save().then(() => {
            done();
        })
    });


    it('set and save', (next) => {
        ahmed.set('name', 'hany');
        ahmed.save()
            .then(() => user.find({ 'name': 'hany' }))
            .then((res) => {
                assert(res.length === 1)
                assert(res[0].name === 'hany')
                next();
            })
    });

    it('class method updateOne', (next) => {
        user.updateOne({ name: 'Ahmed' }, { name: 'hany' })
            .then(() => user.find({ 'name': 'hany' }))
            .then((res) => {
                assert(res.length === 1)
                assert(res[0].name === 'hany')
                next();
            })
    });

    it('class method updateMany', (next) => {
        user.updateMany({ name: 'Ahmed' }, { name: 'hany' })
            .then(() => user.find({ 'name': 'hany' }))
            .then((res) => {
                assert(res.length === 1)
                assert(res[0].name === 'hany')
                next();
            })
    });
});