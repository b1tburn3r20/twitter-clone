const express = require('express');
const router = express.Router();
const passport = require('passport');

// GET /movies
router.get('/', function (req, res) {
    res.redirect("/posts")
})

//GOOGLE OAUTH

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
        // Requesting the user's profile and email
        scope: ['profile', 'email'],
        // Optionally force pick account every time
        // prompt: "select_account"
    }
));
//
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/posts',
        failureRedirect: '/posts'
    }
));
// OAuth logout route
router.get('/logout', function (req, res) {
    req.logout(function () {
        res.redirect('/posts');
    });
});



module.exports = router