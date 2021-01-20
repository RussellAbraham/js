/* *** isDate()      *** */
function isDate(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
}