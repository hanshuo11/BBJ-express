var userModel = require('../models/userModel');
var dbProcess = require('../public/javascripts/common.js');



exports.login = function (req, res, next) {
    var user_name = req.body.user_name;
    var user_password = req.body.user_password;
    userModel.login(user_name, user_password, function (row) {
        if (row[0]) {
            res.json(row);
        } else {
            res.send("用户名或密码错误");
        }
    });
}

// 用户注册
exports.findUser = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    userModel.findUser(username, function (row) {
        if (row[0]) {
            res.send("该账号已被注册");
        } else {
            userModel.register(username, password, email, function (row) {
                res.json(row);
            })
        }
    });
}

exports.getSearchGoods = function (req, res, next) {
    var key = req.body.key;
    console.log(key);
    userModel.getSearchGoods(key, function (row) {
        res.json(row);
    });
}
// getGoodsInf
exports.getGoodsInf = function (req, res, next) {
    var id = req.body.goods_id;
    console.log(id);
    userModel.getGoodsInf(id, function (row) {
        res.json(row);
    });
}
// getGoodsInfImg
exports.getGoodsInfImg = function (req, res, next) {
    var id = req.body.goods_id;
    userModel.getGoodsInfImg(id, function (row) {
        res.json(row);
    });
}
// buyGoods
exports.buyGoods = function (req, res, next) {
    var result = [];
    var sum_price = req.body.sum_price;
    var goodsList = req.body.goodsList;
    var indent_number = req.body.indent_number;
    console.log(indent_number);
    var user_id = req.body.user_id;
    var state = 2;
    var data = {
        "sum_price": sum_price,
        "goods_id": null,
        "indent_number": indent_number,
        "user_id": user_id,
        "indent_state": state,
    }
    var rows = [];
    for (let i = 0; i < goodsList.length; i++) {
        data.goods_id = goodsList[i];
        userModel.buyGoods(data, function (row) {
            rows.push(row);
        });
    }
    setTimeout(function(){
        res.json(rows);
    },500)  
}
// getUserIndent
exports.getUserIndent = function (req, res, next) {
    var user_id = req.body.user_id;
    userModel.getUserIndent(user_id, function (row) {
        res.json(row);
    });
}