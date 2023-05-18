const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');



router.get('/', postCtrl.show)
router.post('/new', postCtrl.create)
router.delete('/:id/delete', postCtrl.deletePost)

router.get('/:id/edit', postCtrl.editForm); // Show the edit form
router.put('/:id', postCtrl.update); // Update the post



module.exports = router