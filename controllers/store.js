var storeModel = require('../models/storeModel');
var dbProcess=require('../public/javascripts/common.js');

// 配置上传图片的属性
var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/uploadImag/',
    domain = "http://localhost:3000";
var storeId = 00;

// exports.index=function(req, res, next) {
//     console.log(req.body);
//     userModel.queryUser(function(row){

//         res.json(row);
//         // res.cookie("yuyu", row[0], {maxAge: 60 * 1000});
//         // res.send("cookie ok")
//     });
// }

// 店铺注册
exports.storeRegister = function (req, res, next) {
    var data=req.body;
    // 增加审核状态标识是否被审核
    // store_userName, store_password, store_name, store_businessScope, store_openTime, store_address, store_bossName, store_phoneNum, store_moneyId, store_idCardNum, store_idCardName, store_idCardAddress, store_bossPhoneNum, state
    data.state = "false";
    storeModel.storeRegister(data, function (row) {
        res.json(row);
    })
    // userModel.findUser(username,function(row){
    //     if(row[0]){
    //         res.send("该账号已被注册");
    //     }else{
    //     }
    // });
}
// 店铺证件上传
exports.uploadingImg = function (req, res, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大

    form.parse(req, function (err, fields, files) {
        var insertId = fields.insertId;
        if (err) {
            res.locals.error = err;
            res.render('index', { title: TITLE });
            return;
        }
        // path.basename(files.file.path);
        var extName = '';  //后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            res.json({
                "error": "只支持png和jpg格式图片!"
            });
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        //图片写入地址；
        var newPath = form.uploadDir + avatarName;
        //显示地址；
        var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
        // console.log("newPath", newPath);
        fs.renameSync(files.file.path, newPath);  //重命名
        storeModel.uploadImg(showUrl, insertId, function (row) {
            if (row.affectedRows == 1) {
                res.json({
                    "newPath": showUrl
                });
            } else {
                res.json({
                    "error": "error"
                });
            }
        })
    });
}
