
window.clone = function clone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (Array.isArray(obj)) {
        var clonedArr = [];
        obj.forEach(function (element) {
            clonedArr.push(clone(element))
        });
        return clonedArr;
    }
    var clonedObj = new obj.constructor();
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            clonedObj[prop] = window.clone(obj[prop]);
        }
    }
    return clonedObj;
}
