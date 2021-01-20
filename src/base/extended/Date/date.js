Date.prototype.toISO8601Compact = function () {
    function leadZero(x) {
        return x > 9 ? '' + x : '0' + x
    }
    return this.getFullYear() +
        leadZero(this.getMonth() + 1) +
        leadZero(this.getDate()) + 'T' +
        leadZero(this.getHours()) +
        leadZero(this.getMinutes()) +
        leadZero(this.getSeconds());
}