const express = require('express');
const router = express.Router();
const passport = require('passport');
const postCtrl = require('../controllers/posts');

// GET /movies
router.get('/', postCtrl.show)

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
        successRedirect: '/movies',
        failureRedirect: '/movies'
    }
));
// OAuth logout route
router.get('/logout', function (req, res) {
    req.logout(function () {
        res.redirect('/movies');
    });
});

router.post('/new', postCtrl.create)

//
router.delete('/:id/delete', postCtrl.deletePost)

module.exports = router