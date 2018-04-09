var userModel = require('../models/userModel')


exports.index=function(req, res, next) {
    userModel.queryUser(function(row){
        res.json(row);
        // res.cookie("yuyu", row[0], {maxAge: 60 * 1000});
        // res.send("cookie ok")
    });
}

// 用户注册
exports.userRegister=function(req, res, next) {
    var username=req.body.username;
    var password=req.body.password;
    var phone=req.body.username;
    var data={
        username:username,
        phone:phone
    };
    userModel.findUser(username,function(row){
        console.log(row[0]);
        if(row[0]){
            res.send("该账号已被注册");
        }else{
            userModel.register(username,password,phone,function(row){
                res.json(data);
            })
        }
    });
}