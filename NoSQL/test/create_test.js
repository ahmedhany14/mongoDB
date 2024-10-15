const mongoose = require('mongoose')
const Student = require('./../src/student')
const assert = require('assert')

 ('Create the first student', () => {
    it('Save the Sutudent', (next) => {
        const ahmed = new Student({
            name: 'Ahmed'
        })
        ahmed.save().then(() => {
            assert(ahmed.isNew ===  false)
            next();
        });
    })
})