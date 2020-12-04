$jscomp.object = $jscomp.object || {};
$jscomp.object.assign = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    c = $jscomp.makeIterator(c);
    for (d = c.next(); !d.done; d = c.next())
        if (d = d.value)
            for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
    return a
};
$jscomp.object.is = function (a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
};
