var db = require('./db');

exports.queryUser = function (callback) {
    var sql = "SELECT * from t_user";
    db.query(sql, [], callback);
}

exports.findUser = function (username, callback) {
    var sql='select * from t_user where username=?';
    db.query(sql, [username],callback);
};

exports.register = function (username, password, phone, callback) {
    var sql = 'insert into t_user(username, password, phone) values(?,?,?)';
    db.query(sql, [username,password,phone], callback);
};
