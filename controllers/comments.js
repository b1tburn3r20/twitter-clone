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
            // Yo, can't find that post, homie
            return res.redirect('/posts');
        }
        const commentData = {
            content: req.body.content,
            userName: req.user.name,
            userProfilePicture: req.user.avatar
        };
        console.log(req.body, commentData)
        post.comments.unshift(commentData);
        await post.save();

        // Gotta bounce back to the /posts page, ya feel me?
        res.redirect('/posts');
    } catch (error) {
        // Yo, something went wrong while creating the comment, my bad
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
            // Yo, can't find that post, homie
            return res.redirect('/posts');
        }

        res.redirect('/posts');
    } catch (error) {
        // Yo, something went wrong while deleting the comment
        console.error(error);
        res.redirect('/posts');
    }
}
