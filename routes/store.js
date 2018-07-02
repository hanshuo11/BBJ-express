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
// 得到店铺分类
router.post('/getStoreClasses', store.getStoreClasses);
// 修改店铺信息
router.post('/editorStoreInf', store.editorStoreInf);
// 删除店铺分类
router.post('/deleteStoreClasses', store.deleteStoreClasses);
// 增加店铺分类
router.post('/addStoreClasses', store.addStoreClasses);
// 商品展示图片上传
router.post('/uploadingStoreShowImg', store.uploadingStoreShowImg);
// 添加商品
router.post('/addGoodsInf', store.addGoodsInf);
// 上传商品详情图片
router.post('/uploadingStoreInfImg', store.uploadingStoreInfImg);
// 获取店铺已添加商品列表 getInf
router.post('/getStoreGoodsList', store.getStoreGoodsList);
// 得到某个商品的详情表
router.post('/getGoodsInfImg', store.getGoodsInfImg);


module.exports = router;
