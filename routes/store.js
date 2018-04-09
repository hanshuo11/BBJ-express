var express = require('express');
var router = express.Router();
var store = require('../controllers/store.js');


// 商铺用户注册
router.post('/storeRegister', store.storeRegister);

// 商家注册上传图片
router.post('/uploadingImg', store.uploadingImg)
module.exports = router;
