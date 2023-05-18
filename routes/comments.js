const express = require('express');
const router = express.Router({ mergeParams: true });

const commentsCtrl = require('../controllers/comments');

router.post('/', commentsCtrl.create);
router.delete('/:commentId', commentsCtrl.deleteComment);

module.exports = router;
