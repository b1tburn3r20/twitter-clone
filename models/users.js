const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    username: String,
    profilePicture: String,
    handle: String,
    bio: String,
    email: String,
    password: String,
}, {
    timestamps: true
})
module.exports = mongoose.model('User', usersSchema)