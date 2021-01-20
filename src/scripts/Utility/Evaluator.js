function isFunction(n) {
    return !!(n && n.constructor && n.call && n.apply)
}

function isDate(n) {
    return !!(n && n.getTimezoneOffset && n.setUTCFullYear)
}

function isRegExp(n) {
    return !(!(n && n.test && n.exec) || !n.ignoreCase && !1 !== n.ignoreCase)
}

function isObject(n) {
    var r = typeof n;
    return "function" === r || "object" === r && !!n
}

function isString(n) {
    return !!("" === n || n && n.charCodeAt && n.substr)
}

function isBoolean(n) {
    return !0 === n || !1 === n
}

function isNumber(n) {
    return !!(0 === n || n && n.toExponential && n.toFixed)
}

function isNull(n) {
    return null === n
}

function isUndefined(n) {
    return void 0 === n
}

function isObjectLike(n) {
    return null != n && "object" == typeof n
}

function isArray(n) {
    return "[object Array]" === toString.call(n)
}

function isLocation(n) {
    return "[object Location]" === toString.call(n)
}

function isCallable(n) {
    return "function" == typeof n
}

function isContstructor(n) {
    return isCallable(n)
}

function isElement(n) {
    return !(!n || 1 !== n.nodeType)
}

function isWindow(n) {
    return null != n && n === n.window
}

function isEven(n) {
    return n % 2 == 0
}

function isFinite(n) {
    return isFinite(n) && !isNaN(parseFloat(n))
}

function isBuffer(n) {
    return null !== n && !isUndefined(n) && null !== n.constructor && !isUndefined(n.constructor) && "function" == typeof n.constructor.isBuffer && n.constructor.isBuffer(n)
}

function isArrayBuffer(n) {
    return "[object ArrayBuffer]" === toString.call(n)
}

function isFile(n) {
    return "[object File]" === toString.call(n)
}

function isBlob(n) {
    return "[object Blob]" === toString.call(n)
}

function isStream(n) {
    return isObject(n) && isFunction(n.pipe)
}

function isURLSearchParams(n) {
    return "undefined" != typeof URLSearchParams && n instanceof URLSearchParams
}

function isFormData(n) {
    return "undefined" != typeof FormData && n instanceof FormData
}

function isPrime(n) {
    for (var r = 2; r < n; r++)
        if (n % r == 0) return !1;
    return n > 1
}

function isUniform(n) {
    for (var r = n[0], t = 1; t < n.length; t++)
        if (n[t] !== r) return !1;
    return !0
}

function isPlainObject(n) {
    var r, t;
    return !(!n || "[object Object]" !== toString.call(n)) && (!(r = getProto(n)) || "function" == typeof (t = hasOwn.call(r, "constructor") && r.constructor) && fnToString.call(t) === ObjectFunctionString)
}

function isEmptyObject(n) {
    var r;
    for (r in n) return !1;
    return !0
}

function isAlphaNumeric(n) {
    var r = n.charCodeAt(0);
    return r > 47 && r < 58 || r > 64 && r < 91 || r > 96 && r < 123
}

function isArrayBufferView(n) {
    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(n) : n && n.buffer && n.buffer instanceof ArrayBuffer
}

function isBase64(n) {
    return !!/^data:[^;]+;base64,/.test(n)
}

function encodeString(n) {
    return "data:application/octet-stream;base64,".concat(btoa(n))
}

function stringToUint8ToArray(n) {
    var r, t = atob(n.split(",")[1]),
        e = t.length,
        i = [],
        o = new Uint8Array(t.length);
    for (r = 0; r < e; r++) o[r] = t.charCodeAt(r), i.push(o[r]);
    return JSON.stringify(i, null, 2)
}

function stringToUint8(n) {
    var r, t = n.length,
        e = new ArrayBuffer(t),
        i = new Uint8Array(e);
    for (r = 0; r < t; r++) i[r] = n.charCodeAt(r);
    return e
}

function base64ToUint8(n) {
    var r;
    if (isBase64Url(n)) {
        var t = atob(n.split(",")[1]);
        r = new Uint8Array(t.length);
        var e, i = t.length;
        for (e = 0; e < i; ++e) r[e] = t.charCodeAt(e)
    }
    return r
}

function stringToBuffer(n) {
    var r, t = atob(n.split(",")[1]),
        e = t.length,
        i = [],
        o = new ArrayBuffer(t.length);
    for (r = 0; r < e; r++) o[r] = t.charCodeAt(r), i.push(o[r]);
    return JSON.stringify(i, null, 2)
}

function trim(n) {
    return n.replace(/^\s*/, "").replace(/\s*$/, "")
}

var idCounter = 0;

function uniqueId(n) {
    var r = idCounter++;
    return n ? n + r : r
}

function keys(n) {
    if (n !== Object(n)) throw new TypeError("Invalid object");
    var r = [];
    for (var t in n) has(n, t) && (r[r.length] = t);
    return r
}

function allKeys(n) {
    if (!obj === Object(obj)) return [];
    var r = [];
    for (var t in n) r.push(t);
    return r
}

(function (global) {

    function toSource(func) {
        if (func != null) {
            try {
                return Function.prototype.toString.call(func);
            } catch (e) {}
            try {
                return func + "";
            } catch (e) {}
        }
        return "";
    };

    function toProps(obj) {
        var resultSet = {};
        for (var o = obj; o; o = o.__proto__) {
            try {
                var names = Object.getOwnPropertyNames(o);
                for (var i = 0; i < names.length; ++i) resultSet[names[i]] = "[" + typeof obj[names[i]] + "]";
            } catch (e) {}
        }
        return JSON.stringify(resultSet, null, 2);
    };

    function data(options) {
        options = options || {};
        var prefix = '<data class="';
        var suffix = '" value="' + options.value.length + '">';
        var tail = "</data>";
        return prefix.concat(options.class).concat(suffix).concat(options.value).concat(tail);
    };

    global.evaluator = function (string) {
        var result;
        try {
            result = eval.call(this, string);
            if (typeof result == "function" || false) {
                result = data({
                    class: "function",
                    value: toSource(result)
                });
            } else if (!!(result && result.test && result.exec && (result.ignoreCase || result.ignoreCase ===
                    false))) {
                result = data({
                    class: "regexp",
                    value: new RegExp(result).toString()
                });
            } else if (!!(result && result.getTimezoneOffset && result.setUTCFullYear)) {
                result = data({
                    class: "date",
                    value: "".concat(result)
                });
            } else if (typeof result === "object" || false) {
                result = data({
                    class: "object",
                    value: toProps(result)
                });
            } else if (!!(result === "" || (result && result.charCodeAt && result.substr))) {
                result = data({
                    class: "string",
                    value: "".concat(result)
                });
            } else if (!!(result === 0 || (result && result.toExponential && result.toFixed))) {
                result = data({
                    class: "number",
                    value: "".concat(result)
                });
            } else if (result === true || result === false) {
                result = data({
                    class: "boolean",
                    value: "".concat(result)
                });
            } else if (result === void 0) {
                result = data({
                    class: "undefined",
                    value: "".concat(result)
                });
            } else if (result === null) {
                result = data({
                    class: "null",
                    value: "".concat(result)
                });
            }
        } catch (er) {
            if (er instanceof TypeError) {
                result = data({
                    class: "type-error",
                    value: "[[ Type ".concat("]] ", er.message)
                }).concat(er.message);
            } else if (er instanceof SyntaxError) {
                result = data({
                    class: "syntax-error",
                    value: "[[ Syntax ".concat("]] ")
                }).concat(er.message);
            } else if (er instanceof ReferenceError) {
                result = data({
                    class: "reference-error",
                    value: "[[ Reference ".concat("]] ")
                }).concat(er.message);
            } else if (er instanceof RangeError) {
                result = data({
                    class: "range-error",
                    value: "[[ Range ".concat("]] ")
                }).concat(er.message);
            } else if (er instanceof EvalError) {
                result = data({
                    class: "eval-error",
                    value: "[[ Eval ".concat("]] ")
                }).concat(er.message);
            } else {
                result = String(er.stack).replace(/\\"/g, '"').replace(/&/g, "&amp;").replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
        } finally {
            return result;
        }
    };
})(this)