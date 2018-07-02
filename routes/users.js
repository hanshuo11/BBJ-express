var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

// 用户注册
router.post('/register', user.findUser);

router.post('/login', user.login);
// 搜索商品
router.post('/getSearchGoods', user.getSearchGoods);
// 根据id搜索商品
router.post('/getGoodsInf', user.getGoodsInf);
// 得到商品详情
router.post('/getGoodsInfImg', user.getGoodsInfImg);
// buyGoods
router.post('/buyGoods', user.buyGoods);
// getUserIndent
router.post('/getUserIndent', user.getUserIndent);





module.exports = router;
