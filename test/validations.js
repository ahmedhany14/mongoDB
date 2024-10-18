const assert = require('assert')
const user = require('./../src/userModel')
const mongoose = require('mongoose')


describe('Operators test', () => {

    it('Test validators', (next) => {
        const instance = new user({ name: 'Ahemd' });
        user.create(instance).then(() => next()).catch(err => {
            assert(err._message == 'user validation failed');
            next();
        })
    })
})