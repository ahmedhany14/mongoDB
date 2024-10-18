const mongoose = require('mongoose')
const assert = require('assert')
const user = require('./../src/userModel')

describe('Creating user', () => {

    it('save user', (next) => {
        const ahmed = new user({
            name: "Ahmed"
        });
        ahmed.save().then(() => {
             assert(ahmed.isNew === false);
            next();
        })
    })
})