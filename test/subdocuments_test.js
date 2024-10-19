const assert = require('assert')
const user = require('./../src/userModel')
const { nextTick } = require('process')

describe('subdocuments', () => {

    it('creata a subdocuments on user', (next) => {
        const ahmed = user({
            name: 'Ahmed',
            postCount: 1,
            posts: [{ title: 'first post' }]
        })

        ahmed.save().then(() => user.findOne({ name: 'Ahmed' }))
            .then((response) => {
                assert(response.posts[0].title == 'first post')
                next()
            })
    })

    it('add new subdocuments on a user', async () => {
        const instance = new user({
            name: 'Ahmed',
            postCount: 1,
            posts: [{ title: 'first post' }]
        })
        const new_post = {
            title: 'second post'
        }

        await user.create(instance)
        await user.updateMany({ name: 'Ahmed' }, { $inc: { postCount: 1 }, $push: { posts: new_post } })

        user.findOne({ name: 'Ahmed' })
            .then(res => {
                assert(res.postCount === 2)
                assert(res.posts[1].title === 'second post')
            })
    })

})