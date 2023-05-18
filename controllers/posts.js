const { Post } = require('../models/post'); // for Post model

module.exports = {
    show,
    create,
    deletePost,
    createComment,
    editForm,
    update,
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
        const postData = {
            postContent: req.body.postContent,
            userName: req.user.name,
            profilePicture: req.user.avatar,
            userId: req.user._id  // Add this line
        };
        console.log(req.body, postData)
        const newPost = await Post.create(postData);
        console.log(newPost);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.redirect('/error'); // Handle the error appropriately
    }
}



async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId.toString() !== req.user._id.toString()) {
            // If the userId of the post does not match the id of the current user, redirect with an error message
            req.flash('error', 'Not authorized');
            return res.redirect('/posts');
        }

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
async function editForm(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        res.render('edit', { post }); // Assumes you have an edit.ejs view
    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
}

async function update(req, res) {
    console.log("Update function called"); // log to see if the function is called
    try {
        const postId = req.params.id;
        const updatedPostContent = req.body.postContent;

        console.log("Post ID:", postId); // log the post id
        console.log("Updated Content:", updatedPostContent); // log the new content

        const post = await Post.findById(postId);
        if (!post) {
            console.log("Post not found"); // log if the post is not found
            return res.redirect('/posts');
        }

        post.postContent = updatedPostContent;
        await post.save();

        console.log("Post updated"); // log if the post is successfully updated

        res.redirect('/posts');
    } catch (error) {
        console.error("Error during update:", error); // log any errors during the update
        res.redirect('/posts');
    }
}
