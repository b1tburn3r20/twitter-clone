const { Post } = require('../models/post');

module.exports = {
    create,
    deleteComment,
};

async function create(req, res) {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            // Handle the case where the post is not found
            return res.redirect('/posts');
        }
        const commentData = {
            content: req.body.content,
            // Add user-related data as needed
            userName: req.user.name,
            userProfilePicture: req.user.avatar
        };
        console.log(req.body, commentData)
        post.comments.unshift(commentData);
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
        const { id: postId, commentId } = req.params;

        const post = await Post.findOneAndUpdate(
            { _id: postId, 'comments._id': commentId },
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
