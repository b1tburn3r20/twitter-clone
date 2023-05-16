const Post = require('../models/post')

module.exports = {
    show,
    create,
    deletePost,
}

async function show(req, res) {
    const allPosts = await Post.find({})
    console.log(allPosts)
    res.render('home', { allPosts: allPosts })

}
async function create(req, res) {
    const newPost = await Post.create(req.body)
    console.log(newPost)
    res.redirect('/posts')
}
async function deletePost(req, res) {
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/posts')
}