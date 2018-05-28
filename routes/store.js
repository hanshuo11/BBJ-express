var express = require('express');
var router = express.Router();
var store = require('../controllers/store.js');


// 商铺用户注册
router.post('/storeRegister', store.storeRegister);

// 商家注册上传图片
router.post('/uploadingImg', store.uploadingImg);
// 管理员获取店铺申请表
router.post('/getStoreList', store.getStoreList);
// 获取店铺的证件照片
router.post('/getStoreImg', store.getStoreImg);
// 店铺审核通过
router.post('/agreeReg', store.agreeReg);
//店铺审核驳回
router.post('/refuseReg', store.refuseReg);
// 获得店铺驳回信息
router.post('/getRefuseContent', store.getRefuseContent);
// 查询列表
router.post('/selectListByState', store.selectListByState);
// 店铺登录
router.post('/storeLogin', store.storeLogin);

module.exports = router;
