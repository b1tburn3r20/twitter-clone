var express = require('express');
var router = express.Router();
const registerCtrl = require('../controllers/users');
const { create } = registerCtrl;


router.get('/', registerCtrl.show);
router.post('/', registerCtrl.create);
router.delete('/:id', registerCtrl.deleteUser);


module.exports = router;
