const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');



router.get('/', postCtrl.show)
router.post('/new', postCtrl.create)
router.delete('/:id/delete', postCtrl.deletePost)



module.exports = router