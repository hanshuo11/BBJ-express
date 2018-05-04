var db = require('./db');
var dbProcess=require('../public/javascripts/common.js');

// exports.queryUser = function (callback) {
//     var sql = "SELECT * from t_user";
//     db.query(sql, [], callback);
// }

exports.uploadImg = function (store_imgUrl,store_id, callback) {
    var sql='insert into t_store_inf_imgUrl(store_imgUrl,store_id) values(?,?)';
    db.query(sql, [store_imgUrl,store_id],callback);
};
exports.storeRegister = function (data, callback) {
    var sql = 'insert into t_store('+dbProcess.dbObject(data)+') values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    db.query(sql,dbProcess.dbGetArr(data), callback);
    // db.query(sql, [store_userName, store_password, store_name, store_businessScope, store_openTime, store_address, store_bossName, store_phoneNum, store_moneyId, store_idCardNum, store_idCardName, store_idCardAddress, store_bossPhoneNum, state], callback);
};

