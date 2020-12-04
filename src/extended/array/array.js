$jscomp.array = $jscomp.array || {};

$jscomp.array.done_ = function () {
    return {
        done: !0,
        value: void 0
    }
};

$jscomp.array.arrayIterator_ = function (a, b) {
    a instanceof String && (a = String(a));
    var c = 0;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var d = {},
        e = (d.next = function () {
            if (c < a.length) {
                var d = c++;
                return {
                    value: b(d, a[d]),
                    done: !1
                }
            }
            e.next = $jscomp.array.done_;
            return $jscomp.array.done_()
        }, d[Symbol.iterator] = function () {
            return e
        }, d);
    return e
};
$jscomp.array.findInternal_ = function (a, b, c) {
    a instanceof String && (a = String(a));
    for (var d = a.length, e = 0; e < d; e++) {
        var f = a[e];
        if (b.call(c, f, e, a)) return {
            i: e,
            v: f
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.array.from = function (a, b, c) {
    b = void 0 === b ? function (a) {
        return a
    } : b;
    var d = [];
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    if (a[Symbol.iterator]) {
        $jscomp.initSymbol();
        $jscomp.initSymbolIterator();
        a = a[Symbol.iterator]();
        for (var e; !(e = a.next()).done;) d.push(b.call(c, e.value))
    } else {
        e = a.length;
        for (var f = 0; f < e; f++) d.push(b.call(c, a[f]))
    }
    return d
};
$jscomp.array.of = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    return $jscomp.array.from(b)
};
$jscomp.array.entries = function () {
    return $jscomp.array.arrayIterator_(this, function (a, b) {
        return [a, b]
    })
};
$jscomp.array.entries$install = function () {
    Array.prototype.entries || (Array.prototype.entries = $jscomp.array.entries)
};
$jscomp.array.keys = function () {
    return $jscomp.array.arrayIterator_(this, function (a) {
        return a
    })
};
$jscomp.array.keys$install = function () {
    Array.prototype.keys || (Array.prototype.keys = $jscomp.array.keys)
};
$jscomp.array.values = function () {
    return $jscomp.array.arrayIterator_(this, function (a, b) {
        return b
    })
};
$jscomp.array.values$install = function () {
    Array.prototype.values || (Array.prototype.values = $jscomp.array.values)
};
$jscomp.array.copyWithin = function (a, b, c) {
    var d = this.length;
    a = Number(a);
    b = Number(b);
    c = Number(null != c ? c : d);
    if (a < b)
        for (c = Math.min(c, d); b < c;) b in this ? this[a++] = this[b++] : (delete this[a++], b++);
    else
        for (c = Math.min(c, d + b - a), a += c - b; c > b;) --c in this ? this[--a] = this[c] : delete this[a];
    return this
};
$jscomp.array.copyWithin$install = function () {
    Array.prototype.copyWithin || (Array.prototype.copyWithin = $jscomp.array.copyWithin)
};
$jscomp.array.fill = function (a, b, c) {
    null != c && a.length || (c = this.length || 0);
    c = Number(c);
    for (b = Number((void 0 === b ? 0 : b) || 0); b < c; b++) this[b] = a;
    return this
};
$jscomp.array.fill$install = function () {
    Array.prototype.fill || (Array.prototype.fill = $jscomp.array.fill)
};
$jscomp.array.find = function (a, b) {
    return $jscomp.array.findInternal_(this, a, b).v
};
$jscomp.array.find$install = function () {
    Array.prototype.find || (Array.prototype.find = $jscomp.array.find)
};
$jscomp.array.findIndex = function (a, b) {
    return $jscomp.array.findInternal_(this, a, b).i
};
$jscomp.array.findIndex$install = function () {
    Array.prototype.findIndex || (Array.prototype.findIndex = $jscomp.array.findIndex)
};