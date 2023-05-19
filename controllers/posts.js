const { Post } = require('../models/post');

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
        res.redirect('/error');
    }
}


async function create(req, res) {
    try {
        const postData = {
            postContent: req.body.postContent,
            userName: req.user.name,
            profilePicture: req.user.avatar,
            userId: req.user._id
        };
        console.log(req.body, postData)
        const newPost = await Post.create(postData);
        console.log(newPost);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
}



async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId.toString() !== req.user._id.toString()) {

            req.flash('error', 'Not authorized');
            return res.redirect('/posts');
        }

        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
}


async function createComment(req, res) {
    try {
        const post = await Post.findById(req.params.id);


        const newComment = {
            ...req.body,
            user: req.user._id,
            userName: req.user.displayName || 'Anonymous',
            userAvatar: req.user.photos?.[0]?.value || '',
        };

        post.comments.push(newComment);
        await post.save();

        res.redirect(`/posts/${post._id}`);
    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
}
async function editForm(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        res.render('edit', { post });
    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
}

async function update(req, res) {
    console.log("Update function called");
    try {
        const postId = req.params.id;
        const updatedPostContent = req.body.postContent;

        console.log("Post ID:", postId);
        console.log("Updated Content:", updatedPostContent);

        const post = await Post.findById(postId);
        if (!post) {
            console.log("Post not found");
            return res.redirect('/posts');
        }

        post.postContent = updatedPostContent;
        await post.save();

        console.log("Post updated");

        res.redirect('/posts');
    } catch (error) {
        console.error("Error during update:", error);
        res.redirect('/posts');
    }
}
