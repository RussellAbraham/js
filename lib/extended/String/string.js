
String.prototype.noRegExp = function(a, b){
    if (a instanceof RegExp) throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression");
};

String.prototype.fromCodePoint = function(a){
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    
    // implement iterator protocol 
    for (var c = "", b = $jscomp.makeIterator(b), d = b.next(); !d.done; d = b.next()) {

        d = d.value;
        d = +d;
        if (0 > d || 1114111 < d || d !== Math.floor(d)) throw new RangeError("invalid_code_point " + d);
        65535 >= d ? c += String.fromCharCode(d) : (d -= 65536, c += String.fromCharCode(d >>> 10 & 1023 | 55296), c += String.fromCharCode(d & 1023 | 56320))
    }
    return c    
};
String.prototype.codePointAt = function (a) {
    var b = this.toString(),
        c = b.length;
    a = Number(a) || 0;
    if (0 <= a && a < c) {
        a |= 0;
        var d = b.charCodeAt(a);
        if (55296 > d || 56319 < d || a + 1 === c) return d;
        a = b.charCodeAt(a + 1);
        return 56320 > a || 57343 < a ? d : 1024 * (d - 55296) + a + 9216
    }
};

String.prototype.repeat = function (a) {
    var b = this.toString();
    if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
    a |= 0;
    for (var c = ""; a;)
        if (a & 1 && (c += b), a >>>= 1) b += b;
    return c
};

String.prototype.includes = function (a, b) {
    b = void 0 === b ? 0 : b;
    String.noRegExp(a, "includes");
    return -1 !== this.toString().indexOf(a, b)
};

String.prototype.startsWith = function (a, b) {
    b = void 0 === b ? 0 : b;
    String.noRegExp(a, "startsWith");
    var c = this.toString();
    a += "";
    for (var d = c.length, e = a.length, f = Math.max(0, Math.min(b | 0, c.length)), g = 0; g < e && f < d;)
        if (c[f++] != a[g++]) return !1;
    return g >= e
};

String.prototype.endsWith = function (a, b) {
    String.noRegExp(a, "endsWith");
    var c = this.toString();
    a += "";
    void 0 === b && (b = c.length);
    for (var d = Math.max(0, Math.min(b | 0, c.length)), e = a.length; 0 < e && 0 < d;)
        if (c[--d] != a[--e]) return !1;
    return 0 >= e
};

/* Sanitize */

function sanitizeHref(href) {
    return href && href.trim().toLowerCase().startsWith("javascript:") ? "" : href;
}

/* String Extensions */

String.prototype.hasSubstring = function (string, caseInsensitive) {
    if (!caseInsensitive)
        return this.indexOf(string) !== -1;
    return this.match(new RegExp(string.escapeForRegExp(), "i"));
}

String.prototype.findAll = function (string) {
    var matches = [];
    var i = this.indexOf(string);
    while (i !== -1) {
        matches.push(i);
        i = this.indexOf(string, i + string.length);
    }
    return matches;
}

String.prototype.lineEndings = function () {
    if (!this._lineEndings) {
        this._lineEndings = this.findAll("\n");
        this._lineEndings.push(this.length);
    }
    return this._lineEndings;
}

String.prototype.escapeCharacters = function (chars) {
    var foundChar = false;
    for (var i = 0; i < chars.length; ++i) {
        if (this.indexOf(chars.charAt(i)) !== -1) {
            foundChar = true;
            break;
        }
    }

    if (!foundChar)
        return String(this);

    var result = "";
    for (var i = 0; i < this.length; ++i) {
        if (chars.indexOf(this.charAt(i)) !== -1)
            result += "\\";
        result += this.charAt(i);
    }

    return result;
}

String.regexSpecialCharacters = function () {
    return "^[]{}()\\.$*+?|-,";
}

String.prototype.escapeForRegExp = function () {
    return this.escapeCharacters(String.regexSpecialCharacters);
}

String.prototype.escapeHTML = function () {
    return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); //" doublequotes just for editor
}

String.prototype.collapseWhitespace = function () {
    return this.replace(/[\s\xA0]+/g, " ");
}

String.prototype.trimMiddle = function (maxLength) {
    if (this.length <= maxLength)
        return String(this);
    var leftHalf = maxLength >> 1;
    var rightHalf = maxLength - leftHalf - 1;
    return this.substr(0, leftHalf) + "\u2026" + this.substr(this.length - rightHalf, rightHalf);
}

String.prototype.trimEnd = function (maxLength) {
    if (this.length <= maxLength)
        return String(this);
    return this.substr(0, maxLength - 1) + "\u2026";
}

String.prototype.trimURL = function (baseURLDomain) {
    var result = this.replace(/^(https|http|file):\/\//i, "");
    if (baseURLDomain)
        result = result.replace(new RegExp("^" + baseURLDomain.escapeForRegExp(), "i"), "");
    return result;
}

String.prototype.toTitleCase = function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
}

String.prototype.compareTo = function (other) {
    if (this > other)
        return 1;
    if (this < other)
        return -1;
    return 0;
}

String.prototype.removeURLFragment = function () {
    var fragmentIndex = this.indexOf("#");
    if (fragmentIndex == -1)
        fragmentIndex = this.length;
    return this.substring(0, fragmentIndex);
}

String.prototype.startsWith = function (substring) {
    return !this.lastIndexOf(substring, 0);
}

String.prototype.endsWith = function (substring) {
    return this.indexOf(substring, this.length - substring.length) !== -1;
}

/*-----------sprintf,vsprintf--------------*/

String.sprintf = function (format, var_arg) {
    return String.vsprintf(format, Array.prototype.slice.call(arguments, 1));
}

String.tokenizeFormatString = function (format, formatters) {
    var tokens = [];
    var substitutionIndex = 0;

    function addStringToken(str) {
        tokens.push({
            type: "string",
            value: str
        });
    }

    function addSpecifierToken(specifier, precision, substitutionIndex) {
        tokens.push({
            type: "specifier",
            specifier: specifier,
            precision: precision,
            substitutionIndex: substitutionIndex
        });
    }

    function isDigit(c) {
        return !!/[0-9]/.exec(c);
    }

    var index = 0;
    for (var precentIndex = format.indexOf("%", index); precentIndex !== -1; precentIndex = format.indexOf("%", index)) {
        addStringToken(format.substring(index, precentIndex));
        index = precentIndex + 1;

        if (isDigit(format[index])) {
            // The first character is a number, it might be a substitution index.
            var number = parseInt(format.substring(index), 10);
            while (isDigit(format[index]))
                ++index;

            // If the number is greater than zero and ends with a "$",
            // then this is a substitution index.
            if (number > 0 && format[index] === "$") {
                substitutionIndex = (number - 1);
                ++index;
            }
        }

        var precision = -1;
        if (format[index] === ".") {
            // This is a precision specifier. If no digit follows the ".",
            // then the precision should be zero.
            ++index;
            precision = parseInt(format.substring(index), 10);
            if (isNaN(precision))
                precision = 0;

            while (isDigit(format[index]))
                ++index;
        }

        if (!(format[index] in formatters)) {
            addStringToken(format.substring(precentIndex, index + 1));
            ++index;
            continue;
        }

        addSpecifierToken(format[index], precision, substitutionIndex);

        ++substitutionIndex;
        ++index;
    }

    addStringToken(format.substring(index));

    return tokens;
}

String.standardFormatters = {
    d: function (substitution) {
        return !isNaN(substitution) ? substitution : 0;
    },

    f: function (substitution, token) {
        if (substitution && token.precision > -1)
            substitution = substitution.toFixed(token.precision);
        return !isNaN(substitution) ? substitution : (token.precision > -1 ? Number(0).toFixed(token.precision) : 0);
    },

    s: function (substitution) {
        return substitution;
    }
}

String.vsprintf = function (format, substitutions) {
    return String.format(format, substitutions, String.standardFormatters, "", function (a, b) {
        return a + b;
    }).formattedResult;
}

String.format = function (format, substitutions, formatters, initialValue, append) {
    if (!format || !substitutions || !substitutions.length)
        return {
            formattedResult: append(initialValue, format),
            unusedSubstitutions: substitutions
        };

    function prettyFunctionName() {
        return "String.format(\"" + format + "\", \"" + substitutions.join("\", \"") + "\")";
    }

    function warn(msg) {
        console.warn(prettyFunctionName() + ": " + msg);
    }

    function error(msg) {
        console.error(prettyFunctionName() + ": " + msg);
    }

    var result = initialValue;
    var tokens = String.tokenizeFormatString(format, formatters);
    var usedSubstitutionIndexes = {};

    for (var i = 0; i < tokens.length; ++i) {
        var token = tokens[i];

        if (token.type === "string") {
            result = append(result, token.value);
            continue;
        }

        if (token.type !== "specifier") {
            error("Unknown token type \"" + token.type + "\" found.");
            continue;
        }

        if (token.substitutionIndex >= substitutions.length) {
            // If there are not enough substitutions for the current substitutionIndex
            // just output the format specifier literally and move on.
            error("not enough substitution arguments. Had " + substitutions.length + " but needed " + (token.substitutionIndex + 1) + ", so substitution was skipped.");
            result = append(result, "%" + (token.precision > -1 ? token.precision : "") + token.specifier);
            continue;
        }

        usedSubstitutionIndexes[token.substitutionIndex] = true;

        if (!(token.specifier in formatters)) {
            // Encountered an unsupported format character, treat as a string.
            warn("unsupported format character \u201C" + token.specifier + "\u201D. Treating as a string.");
            result = append(result, substitutions[token.substitutionIndex]);
            continue;
        }

        result = append(result, formatters[token.specifier](substitutions[token.substitutionIndex], token));
    }

    var unusedSubstitutions = [];
    for (var i = 0; i < substitutions.length; ++i) {
        if (i in usedSubstitutionIndexes)
            continue;
        unusedSubstitutions.push(substitutions[i]);
    }

    return {
        formattedResult: result,
        unusedSubstitutions: unusedSubstitutions
    };
}

/* String Pool */

function StringPool() {
    this.reset();
}

StringPool.prototype = {
    intern: function (string) {
        // Do not mess with setting __proto__ to anything but null, just handle it explicitly.
        if (string === "__proto__")
            return "__proto__";
        var result = this._strings[string];
        if (result === undefined) {
            this._strings[string] = string;
            result = string;
        }
        return result;
    },

    reset: function () {
        this._strings = Object.create(null);
    },

    internObjectStrings: function (obj, depthLimit) {
        if (typeof depthLimit !== "number")
            depthLimit = 100;
        else if (--depthLimit < 0)
            throw "recursion depth limit reached in StringPool.deepIntern(), perhaps attempting to traverse cyclical references?";

        for (var field in obj) {
            switch (typeof obj[field]) {
                case "string":
                    obj[field] = this.intern(obj[field]);
                    break;
                case "object":
                    this.internObjectStrings(obj[field], depthLimit);
                    break;
            }
        }
    }
}