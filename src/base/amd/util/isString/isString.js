/* *** isString()    *** */
function isString(obj) {
    return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}
