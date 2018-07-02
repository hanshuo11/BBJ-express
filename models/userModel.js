var db = require('./db');
var dbProcess = require('../public/javascripts/common.js');


exports.login = function (username,password,callback) {
    var sql = "SELECT * from t_user where user_name=? and user_password=?";
    db.query(sql, [username,password], callback);
}

exports.findUser = function (username, callback) {
    var sql='select * from t_user where user_name=?';
    db.query(sql, [username],callback);
};

exports.register = function (username, password, email, callback) {
    var sql = 'insert into t_user(user_name, user_password, user_email) values(?,?,?)';
    db.query(sql, [username,password,email], callback);
};


exports.getSearchGoods = function (key, callback) {
    var sql = 'select * from t_goods_inf,t_store  where t_goods_inf.goods_title like "%"?"%" and t_goods_inf.store_id=t_store.store_id';
    db.query(sql, [key], callback);
};

exports.getGoodsInf = function (id, callback) {
    var sql = 'select * from t_goods_inf,t_store where t_goods_inf.goods_id=? and t_goods_inf.store_id=t_store.store_id';
    db.query(sql, [id], callback);
};

exports.getGoodsInfImg = function (id, callback) {
    var sql = 'select * from t_goods_inf_img  where t_goods_inf_img.goods_id=?';
    db.query(sql, [id], callback);
};
// buyGoods
exports.buyGoods = function (data, callback) {
    var sql = 'insert into t_indent(' + dbProcess.dbObject(data) + ') values(?,?,?,?,?)';
    db.query(sql,dbProcess.dbGetArr(data), callback);
};
// getUserIndent
exports.getUserIndent = function (id, callback) {
    var sql = 'select indent_number from t_indent where user_id=?';
    db.query(sql,[id], callback);
};