var express = require('express');
var router = express.Router();
var user = require('../controllers/user')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.cookie("hanshuo", {user:"hanshou"}, {maxAge: 60 * 1000});
    res.render('index', {title: 'Express'});
});

// 用户注册
router.post('/register', user.register);

router.post('/index', user.index);

module.exports = router;
