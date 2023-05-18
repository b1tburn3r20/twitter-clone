const { Post } = require('../models/post'); // for Post model

module.exports = {
    show,
    create,
    deletePost,
    createComment,
};

async function show(req, res) {
    try {
        const allPosts = await Post.find({}).sort('-createdAt');
        console.log(allPosts);
        res.render('home', { allPosts });
    } catch (err) {
        console.log(err);
        res.redirect('/error'); // Handle the error appropriately
    }
}


async function create(req, res) {
    try {
        const newPost = await Post.create({
            ...req.body,
            userName: req.user.displayName || 'Anonymous', // Use 'Anonymous' if displayName is not available
            profilePicture: req.user.photos?.[0]?.value || '', // Use an empty string if photos is not available or the URL is not available
        });
        console.log(newPost);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.redirect('/error'); // Handle the error appropriately
    }
}

async function deletePost(req, res) {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.redirect('/error'); // Handle the error appropriately
    }
}

async function createComment(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        // Add the user-centric info to req.body (the new comment)
        const newComment = {
            ...req.body,
            user: req.user._id,
            userName: req.user.displayName || 'Anonymous', // Use 'Anonymous' if displayName is not available
            userAvatar: req.user.photos?.[0]?.value || '', // Use an empty string if photos is not available or the URL is not available
        };

        // We can push (or unshift) subdocs into Mongoose arrays
        post.comments.push(newComment);
        await post.save();

        res.redirect(`/posts/${post._id}`);
    } catch (err) {
        console.log(err);
        res.redirect('/error'); // Handle the error appropriately
    }
}