const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userProfilePicture: String,
    userName: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new Schema({
    userId: Schema.Types.ObjectId,
    userName: String,
    profilePicture: String,
    postContent: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    handle: String,
    comments: [commentSchema]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { Comment, Post };