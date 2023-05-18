const Post = require('../models/post');

module.exports = {
    create,
    deleteComment,
};

async function create(req, res) {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            // Handle the case where the post is not found
            return res.redirect('/posts');
        }

        const commentData = {
            content: req.body.content,
            // Add user-related data as needed
            // user: req.user._id,
            // userName: req.user.displayName,
            // userAvatar: req.user.photos[0].value,
        };

        post.comments.push(commentData);
        await post.save();

        // Redirect back to the /posts page
        res.redirect('/posts');
    } catch (error) {
        // Handle any errors that occur during comment creation
        console.error(error);
        res.redirect('/posts');
    }
}


async function deleteComment(req, res) {
    try {
        const commentId = req.params.commentId;
        const post = await Post.findOneAndUpdate(
            { 'comments._id': commentId },
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        if (!post) {
            // Handle the case where the post is not found
            return res.redirect('/posts');
        }

        res.redirect('/posts');
    } catch (error) {
        // Handle any errors that occur during comment deletion
        console.error(error);
        res.redirect('/posts');
    }
}
