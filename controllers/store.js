var storeModel = require('../models/storeModel');
var dbProcess = require('../public/javascripts/common.js');

var nodemailer = require('nodemailer');
const params = {
    host: 'smtp.qq.com', // 设置服务
    port: 465, // 端口
    sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
    auth: {
        user: "562358155@qq.com", // 账号
        pass: "irovcecffrhcbdja" // 授权码
    }
}
const transporter = nodemailer.createTransport(params)
function sendEmial(who, content) {
    // 邮件信息
    const mailOptions = {
        from: "BBJ系统提示<562358155@qq.com>", // 发件地址
        to: who, // 收件列表
        subject: "尊敬的用户你好：", // 标题
        text: content
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    })
}

// 配置上传图片的属性
var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');
TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/uploadImag/',
    domain = "http://localhost:3000";
var storeEmial = "xxxx@qq.com";


// exports.index=function(req, res, next) {
//     console.log(req.body);
//     userModel.queryUser(function(row){

//         res.json(row);
//         // res.cookie("yuyu", row[0], {maxAge: 60 * 1000});
//         // res.send("cookie ok")
//     });
// }

exports.storeLogin = function (req, res, next) {
    var username = req.body.store_userName;
    var password = req.body.store_password;
    storeModel.storeLogin(username, password, function (row) {
        if (row.length > 0) {
            res.json(row);
        } else {
            res.send("no");
        }
    })
}
// 店铺注册
exports.storeRegister = function (req, res, next) {
    var data = req.body;
    storeEmial = req.body.store_email;
    // 增加审核状态标识是否被审核
    // store_userName, store_password, store_name, store_businessScope, store_openTime, store_address, store_bossName, store_email, store_moneyId, store_idCardNum, store_idCardName, store_idCardAddress, store_bossPhoneNum, state
    data.state = "1";
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
        // 得到照片对应的店铺id
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
                // 发送邮件
                sendEmial(storeEmial, "您的店铺申请我们已经收到，请耐心等待审核。");
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
// 获取店铺申请表
exports.getStoreList = function (req, res, next) {
    storeModel.getStoreList(function (row) {
        res.json(row);
    })
}
// 得到相应的店铺审核照片
exports.getStoreImg = function (req, res, next) {
    var store_id = req.body.store_id;
    storeModel.getStoreImg(store_id, function (row) {
        res.json(row);
    })
}
// 店铺审核通过
exports.agreeReg = function (req, res, next) {
    var store_id = req.body.store_id;
    console.log(store_id);
    storeModel.agreeStoreReg(store_id, function (row) {
        res.json(row);
    })
}

exports.refuseReg = function (req, res, next) {
    var store_id = req.body.store_id;
    var refuse_content = req.body.refuse_content;
    var userEmail = req.body.store_email;
    // console.log(userEmail+"::"+refuse_content);
    storeModel.refuseReg(store_id, refuse_content, function (row) {
        sendEmial(userEmail, "您的店铺申请系统已驳回，原因如下：" + refuse_content + "请修改后再次申请，谢谢。");
        res.json(row);
    })
}

exports.getRefuseContent = function (req, res, next) {
    var store_id = req.body.store_id;
    storeModel.getRefuseContent(store_id, function (row) {
        res.json(row);
    })
}

exports.selectListByState = function (req, res, next) {
    var state = req.body.state;
    console.log(req.body);
    storeModel.selectListByState(state, function (row) {
        res.json(row);
    })
}

exports.getStoreClasses = function (req, res, next) {
    var store_id = req.body.store_id;
    storeModel.getStoreClasses(store_id, function (row) {
        res.json(row);
    })
}

exports.addStoreClasses = function (req, res, next) {
    var classes = req.body.classes;
    for (var i = 0; i < classes.length; i++) {
        storeModel.addStoreClasses(classes[i].store_id, classes[i].classes_name, function (row) {
            res.send("ok");
        });
    }
}

exports.editorStoreInf = function (req, res, next) {
    var data = req.body.data;
    storeModel.editorStoreInf(data, function (row) {
        res.json(row);
    })
}

exports.deleteStoreClasses = function (req, res, next) {
    var classes = req.body.classes;
    storeModel.deleteStoreClasses(classes, function (row) {
        res.json(row);
    });
}

exports.uploadingStoreShowImg = function (req, res, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大

    form.parse(req, function (err, fields, files) {
        // 得到照片对应的店铺id
        // var insertId = fields.insertId;
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
        console.log(showUrl);
        res.json({
            "newPath": showUrl
        });
    });
}

exports.addGoodsInf = function (req, res, next) {
    var data = req.body.data;
    data.sales=Math.floor(Math.random()*1000+1);
    storeModel.addGoodsInf(data, function (row) {
        res.json(row);
    });
}

exports.uploadingStoreInfImg = function (req, res, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大

    form.parse(req, function (err, fields, files) {
        // 得到照片对应的店铺id
        var goods_id = fields.goods_id;
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
        storeModel.uploadingStoreInfImg(showUrl, goods_id, function (row) {
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
// getStoreClasses
exports.getStoreGoodsList = function (req, res, next) {
    var store_id = req.body.store_id;
    storeModel.getStoreGoodsList(store_id, function (row) {
        res.json(row);
    });
}
// getGoodsInfImg
exports.getGoodsInfImg = function (req, res, next) {
    var goods_id = req.body.goods_id;
    storeModel.getGoodsInfImg(goods_id, function (row) {
        res.json(row);
    });
}