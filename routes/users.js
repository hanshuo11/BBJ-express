var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

// 用户注册
router.post('/userRegister', user.userRegister);

router.post('/index', user.index);



module.exports = router;
