
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

exports.dbAddMark = function (length) {
    let sum = "";
    for (let i = 0; i < length; i++) {
        sum = "?" + ",";
    }
    return sum.substring(0, sum.length - 1);
}
// (?,?)
exports.dbAddClasses = function (arr) {
    let length = arr.length;
    let sum = "";
    if (length > 1) {
        for (let i = 0; i < length - 1; i++) {
            sum = sum + ",(?,?)";
        }
    }
    return sum.substring(0, sum.length - 1);
}

exports.dbGetClassesArr = function (arr) {
    let sum = [];
    let length=arr.length;
    for(let j=0;j<length;j++){
        for (let i in arr[j]) {
           sum.push(arr[j][i]);
        }
    }
    // console.log(sum);
    return sum;
}

