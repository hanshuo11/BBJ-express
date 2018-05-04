
exports.dbObject = function (obj) {
    let sum = "";
    for (let i in obj) {
        sum += i + ",";
    }
    return sum.substring(0, sum.length - 1);
}

exports.dbGetArr = function (obj) {
    let sum = [];
    for (let i in obj) {
        sum.push(obj[i]);
    }
    return sum;
}
