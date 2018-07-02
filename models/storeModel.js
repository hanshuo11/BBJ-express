var db = require('./db');
var dbProcess = require('../public/javascripts/common.js');

exports.storeLogin = function (store_userName, store_password, callback) {
    var sql = 'SELECT * from t_store where state=2 AND store_userName=? AND store_password=?';
    db.query(sql, [store_userName, store_password], callback);
}

exports.uploadImg = function (store_imgUrl, store_id, callback) {
    var sql = 'insert into t_store_certificate_imgurl(store_imgUrl,store_id) values(?,?)';
    db.query(sql, [store_imgUrl, store_id], callback);
};

exports.storeRegister = function (data, callback) {
    var sql = 'insert into t_store(' + dbProcess.dbObject(data) + ') values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    db.query(sql, dbProcess.dbGetArr(data), callback);
};

exports.getStoreList = function (callback) {
    var sql = 'select * from t_store';
    db.query(sql, [], callback);
};

exports.getStoreImg = function (store_id, callback) {
    // console.log(store_id);
    var sql = 'select * from t_store_certificate_imgurl where store_id=?';
    db.query(sql, [store_id], callback);
};

exports.agreeStoreReg = function (store_id, callback) {
    var sql = 'update t_store set state=2 where store_id=?;';
    db.query(sql, [store_id], callback);
};

exports.refuseReg = function (store_id, refuse_content, callback) {
    var sql1 = 'insert into t_refuse(store_id,refuse_content) values(?,?)';
    var sql2 = 'update t_store set state=3 where store_id=?;';
    db.query(sql2, [store_id]);
    db.query(sql1, [store_id, refuse_content], callback);
};

exports.getRefuseContent = function (store_id, callback) {
    var sql = 'select * from t_refuse where store_id=?;';
    db.query(sql, [store_id], callback);
};

exports.selectListByState = function (state, callback) {
    var sql = 'select * from t_store where state=?;';
    db.query(sql, [state], callback);
};

exports.getStoreClasses = function (store_id, callback) {
    var sql = 'select * from t_store_classes where store_id=?;';
    db.query(sql, [store_id], callback);
};

exports.addStoreClasses = function (store_id,classes_name, callback) {
        var sql = 'insert into t_store_classes(store_id,classes_name) values (?,?)';
        db.query(sql,[store_id,classes_name], callback);
};

exports.editorStoreInf = function (data, callback) {
    var sql = 'update t_store set store_name=?,store_describe=?,store_bossPhoneNum=? where store_id=?;';
    db.query(sql, [data.store_name, data.store_describe, data.store_bossPhoneNum, data.store_id], callback);
};

exports.deleteStoreClasses = function (classes, callback) {
    console.log(classes);
    var sql = 'DELETE FROM t_store_classes where classes_id=?';
    db.query(sql, [classes.classes_id], callback);
};


exports.addGoodsInf = function (data, callback) {
    var sql = 'insert into t_goods_inf(' + dbProcess.dbObject(data) + ') values(?,?,?,?,?,?,?,?,?,?)';
    db.query(sql, dbProcess.dbGetArr(data), callback);
};

exports.uploadingStoreInfImg = function (showUrl, goods_id, callback) {
    var sql = 'insert into t_goods_inf_img(goods_inf_url,goods_id) values(?,?)';
    db.query(sql, [showUrl, goods_id], callback);
};

exports.getStoreGoodsList = function (store_id, callback) {
    var sql = 'select * from t_goods_inf,t_store_classes where t_goods_inf.store_id=? and t_goods_inf.classes_id=t_store_classes.classes_id and t_goods_inf.store_id=t_store_classes.store_id;';
    db.query(sql, [store_id], callback);
};

exports.getGoodsInfImg = function (goods_id, callback) {
    var sql = 'select * from t_goods_inf_img where t_goods_inf_img.goods_id=?';
    db.query(sql, [goods_id], callback);
};