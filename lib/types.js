/* BEGIN TYPES */

/* *** isFinite() *** */
function isFinite(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
}

/* *** isRegExp()    *** */
function isRegExp(obj) {
    return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
}

/* *** isDate()      *** */
function isDate(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
}

/* *** isFunction() *** */
function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

/* *** isObject()    *** */
function isObject(obj) {
    return obj === Object(obj);
}

/* *** isString()    *** */
function isString(obj) {
    return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}

/* *** isBoolean()   *** */
function isBoolean(obj) {
    return obj === true || obj === false;
}

/* *** isNumber()    *** */
function isNumber(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
}

/* *** isNull()      *** */
function isNull(obj) {
    return obj === null;
}

/* *** isUndefined() *** */
function isUndefined(obj) {
    return obj === void 0;
}

/* END TYPES */


/* *** toSource() *** */
function toSource(func) {
    if (func != null) {
        try {
            return Function.prototype.toString.call(func);
        } catch (er) {
            throw '';
        }
        try {
            return (func + '');
        } catch (er) {
            throw '';
        }
    }
    return '';
}

/* *** toEscaped() *** */
function toEscaped(value) {
    return String(value)
      .replace(/\\"/g, '"')
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

/* *** trim() *** */
function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/* *** allKeys() *** */
function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
}

function Message(val, type) {
    this.value = val;
    this.type = type;
}

function clone(obj) {
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
            clonedObj[prop] = clone(obj[prop]);
        }
    }
    return clonedObj;
}


function span(options) {
    options = options || {};
    const prefix = '<span class="';
    const suffix = '">';
    const tail = "</span>";
    return prefix
        .concat(options.class)
        .concat(suffix)
        .concat(options.value)
        .concat(tail);
};

function evaluator(string) {
    var result, type;
    try {
        result = eval.call(this, string);
        if (isFunction(result)) {
            result = span({
                class: "function",
                value: toSource(result)
            });
            type = 'output';
        } else if (isRegExp(result)) {
            result = span({
                class: "regexp",
                value: new RegExp(result).toString()
            });
            type = 'output';

        } else if (isDate(result)) {
            result = span({
                class: "date",
                value: "".concat(result, "")
            });
            type = 'output';

        } else if (isObject(result)) {
            result = span({
                class: "object",
                value: "".concat(result, "")
            });
            type = 'output';

        } else if (isString(result)) {
            result = span({
                class: "string",
                value: "".concat(result, "")
            });
            type = 'output';

        } else if (isNumber(result)) {
            result = span({
                class: "number",
                value: "".concat(result, "")
            });
            type = 'output';
        } else if (isBoolean(result)) {
            result = span({
                class: "boolean",
                value: "".concat(result, "")
            });
            type = 'output';

        } else if (isUndefined(result)) {
            result = span({
                class: "undefined",
                value: "".concat(result, "")
            });
            type = 'output';

        } else if (isNull(result)) {
            result = span({
                class: "null",
                value: "".concat(result, "")
            });
            type = 'output';

        }
    } catch (er) {
        if (er instanceof TypeError) {
            result = span({
                class: "type-error",
                value: "[[ Type ".concat("]] ", er.message)
            }).concat(er.message);
            type = 'error';

        } else if (er instanceof SyntaxError) {
            result = span({
                class: "syntax-error",
                value: "[[ Syntax ".concat("]] ")
            }).concat(er.message);
            type = 'error';

        } else if (er instanceof ReferenceError) {
            result = span({
                class: "reference-error",
                value: "[[ Reference ".concat("]] ")
            }).concat(er.message);
            type = 'error';

        } else if (er instanceof RangeError) {
            result = span({
                class: "range-error",
                value: "[[ Range ".concat("]] ")
            }).concat(er.message);
            type = 'error';

        } else if (er instanceof EvalError) {
            result = span({
                class: "eval-error",
                value: "[[ Eval ".concat("]] ")
            }).concat(er.message);
            type = 'error';

        } else {
            result = escaped(er.stack);
            type = 'error';

        }
    } finally {
        return new Message(result, type);
    }
};
