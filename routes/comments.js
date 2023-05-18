const express = require('express');
const router = express.Router({ mergeParams: true });

const commentsCtrl = require('../controllers/comments');

router.post('/posts/:id/comments', commentsCtrl.create);
router.delete('/posts/:id/comments/:commentId', commentsCtrl.deleteComment);

module.exports = router;