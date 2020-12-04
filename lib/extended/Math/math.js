$jscomp.math = $jscomp.math || {};
$jscomp.math.clz32 = function (a) {
    a = Number(a) >>> 0;
    if (0 === a) return 32;
    var b = 0;
    0 === (a & 4294901760) && (a <<= 16, b += 16);
    0 === (a & 4278190080) && (a <<= 8, b += 8);
    0 === (a & 4026531840) && (a <<= 4, b += 4);
    0 === (a & 3221225472) && (a <<= 2, b += 2);
    0 === (a & 2147483648) && b++;
    return b
};
$jscomp.math.imul = function (a, b) {
    a = Number(a);
    b = Number(b);
    var c = a & 65535,
        d = b & 65535;
    return c * d + ((a >>> 16 & 65535) * d + c * (b >>> 16 & 65535) << 16 >>> 0) | 0
};
$jscomp.math.sign = function (a) {
    a = Number(a);
    return 0 === a || isNaN(a) ? a : 0 < a ? 1 : -1
};
$jscomp.math.log10 = function (a) {
    return Math.log(a) / Math.LN10
};
$jscomp.math.log2 = function (a) {
    return Math.log(a) / Math.LN2
};
$jscomp.math.log1p = function (a) {
    a = Number(a);
    if (.25 > a && -.25 < a) {
        for (var b = a, c = 1, d = a, e = 0, f = 1; e != d;) b *= a, f *= -1, d = (e = d) + f * b / ++c;
        return d
    }
    return Math.log(1 + a)
};
$jscomp.math.expm1 = function (a) {
    a = Number(a);
    if (.25 > a && -.25 < a) {
        for (var b = a, c = 1, d = a, e = 0; e != d;) b *= a / ++c, d = (e = d) + b;
        return d
    }
    return Math.exp(a) - 1
};
$jscomp.math.cosh = function (a) {
    a = Number(a);
    return (Math.exp(a) + Math.exp(-a)) / 2
};
$jscomp.math.sinh = function (a) {
    a = Number(a);
    return 0 === a ? a : (Math.exp(a) - Math.exp(-a)) / 2
};
$jscomp.math.tanh = function (a) {
    a = Number(a);
    if (0 === a) return a;
    var b = Math.exp(2 * -Math.abs(a)),
        b = (1 - b) / (1 + b);
    return 0 > a ? -b : b
};
$jscomp.math.acosh = function (a) {
    a = Number(a);
    return Math.log(a + Math.sqrt(a * a - 1))
};
$jscomp.math.asinh = function (a) {
    a = Number(a);
    if (0 === a) return a;
    var b = Math.log(Math.abs(a) + Math.sqrt(a * a + 1));
    return 0 > a ? -b : b
};
$jscomp.math.atanh = function (a) {
    a = Number(a);
    return ($jscomp.math.log1p(a) - $jscomp.math.log1p(-a)) / 2
};
$jscomp.math.hypot = function (a, b, c) {
    for (var d = [], e = 2; e < arguments.length; ++e) d[e - 2] = arguments[e];
    a = Number(a);
    b = Number(b);
    for (var f = Math.max(Math.abs(a), Math.abs(b)), g = $jscomp.makeIterator(d), e = g.next(); !e.done; e = g.next()) f = Math.max(f, Math.abs(e.value));
    if (1E100 < f || 1E-100 > f) {
        a /= f;
        b /= f;
        g = a * a + b * b;
        d = $jscomp.makeIterator(d);
        for (e = d.next(); !e.done; e = d.next()) e = e.value, e = Number(e) / f, g += e * e;
        return Math.sqrt(g) * f
    }
    f = a * a + b * b;
    d = $jscomp.makeIterator(d);
    for (e = d.next(); !e.done; e = d.next()) e = e.value, e = Number(e), f +=
        e * e;
    return Math.sqrt(f)
};
$jscomp.math.trunc = function (a) {
    a = Number(a);
    if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a;
    var b = Math.floor(Math.abs(a));
    return 0 > a ? -b : b
};
$jscomp.math.cbrt = function (a) {
    if (0 === a) return a;
    a = Number(a);
    var b = Math.pow(Math.abs(a), 1 / 3);
    return 0 > a ? -b : b
};
