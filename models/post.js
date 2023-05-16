const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postsSchema = new Schema({
    userName: String,
    profilePicture: String,
    postContent: String,
    likes: Array,
    handle: String
}, {
    timestamps: true
})
module.exports = mongoose.model('Post', postsSchema)