const assert = require('assert')
const user = require('./../src/userModel')


describe('virtual type', () => {

    it('postconut', (next) => {
        const ahmed = new user({
            name: 'Ahmed',
            posts: [{ title: 'first' }]
        })

        ahmed.save()
            .then(() => user.findOne({ name: 'Ahmed' }))
            .then((res) => {
                assert(res.postCount == 1)
                next();
            })
    })
})