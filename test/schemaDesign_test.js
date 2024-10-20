const users2 = require('./../src2/user.js')
const postBlog = require('./../src2/postBlog.js')
describe('Assosiations test', () => {

    it('comment test', (next) => {
        const ahmed = new users2({
            name: 'Ahmed',
        })
        const mohamed = new users2({
            name: 'mohamed',
        })
        ahmed.save().then(() => console.log('ahmed saved'))
        mohamed.save().then(() => console.log('ahmed saved'))

        const new_post = new postBlog({
            title: 'ahmeds post',
            content: 'new post'
        })
        new_post.save()
            .then(() => users2.updateMany({ name: 'Ahmed'}, { $push: { postIDs: new_post._id } }))
            .then(() => users2.find({ name: 'Ahmed' })).then(res => console.log(res))

        next()
    })

})