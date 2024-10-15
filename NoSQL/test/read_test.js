const Student = require('./../src/student')
const assert = require('assert')

describe('read a student', () => {
    let ahemd = new Student({ name: 'ahmed' });

    beforeEach((next) => {
        ahemd.save().then(() => next());
    });

    it('find all named ahmed', async () => {
        const response = await Student.find({ name: 'ahmed' });
        console.log(response);
        assert(response[0]._id.toString() == ahemd._id.toString());
    })

})