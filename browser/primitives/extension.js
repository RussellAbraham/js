"use strict";

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
};

Object.isEmpty = function (obj) {
    for (var i in obj) {
        return false
    }
    return true
};
Object.values = function (obj) {
    var keys = Object.keys(obj);
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
        result.push(obj[keys[i]])
    }
    return result
};
String.prototype.hasSubstring = function (string, caseInsensitive) {
    if (!caseInsensitive) {
        return this.indexOf(string) !== -1
    }
    return this.match(new RegExp(string.escapeForRegExp(), "i"))
};
String.prototype.findAll = function (string) {
    var matches = [];
    var i = this.indexOf(string);
    while (i !== -1) {
        matches.push(i);
        i = this.indexOf(string, i + string.length)
    }
    return matches
};
String.prototype.lineEndings = function () {
    if (!this._lineEndings) {
        this._lineEndings = this.findAll("\n");
        this
            ._lineEndings
            .push(this.length)
    }
    return this._lineEndings
};
String.prototype.escapeCharacters = function (chars) {
    var foundChar = false;
    for (var i = 0; i < chars.length; i += 1) {
        if (this.indexOf(chars.charAt(i)) !== -1) {
            foundChar = true;
            break
        }
    }
    if (!foundChar) {
        return String(this)
    }
    var result = "";
    for (var i = 0; i < this.length; i += 1) {
        if (chars.indexOf(this.charAt(i)) !== -1) {
            result += "\\"
        }
        result += this.charAt(i)
    }
    return result
};
String.regexSpecialCharacters = function () {
    return "^[]{}()\\.$*+?|-,"
};
String.prototype.escapeForRegExp = function () {
    return this.escapeCharacters(String.regexSpecialCharacters)
};
String.prototype.escapeHTML = function () {
    return this
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
};
String.prototype.collapseWhitespace = function () {
    return this.replace(/[\s\xA0]+/g, " ")
};
String.prototype.trimMiddle = function (maxLength) {
    if (this.length <= maxLength) {
        return String(this)
    }
    var leftHalf = maxLength >> 1;
    var rightHalf = maxLength - leftHalf - 1;
    return this.substr(0, leftHalf) + "\u2026" + this.substr(this.length - rightHalf, rightHalf)
};
String.prototype.trimEnd = function (maxLength) {
    if (this.length <= maxLength) {
        return String(this)
    }
    return this.substr(0, maxLength - 1) + "\u2026"
};
String.prototype.trimURL = function (baseURLDomain) {
    var result = this.replace(/^(https|http|file):\/\//i, "");
    if (baseURLDomain) {
        result = result.replace(new RegExp("^" + baseURLDomain.escapeForRegExp(), "i"), "")
    }
    return result
};
String.prototype.toTitleCase = function () {
    return this
        .substring(0, 1)
        .toUpperCase() + this.substring(1)
};
String.prototype.compareTo = function (other) {
    if (this > other) {
        return 1
    }
    if (this < other) {
        return -1
    }
    return 0
};

function sanitizeHref(href) {
    return href && href
        .trim()
        .toLowerCase()
        .startsWith("javascript:") ?
        "" :
        href
}
String.prototype.removeURLFragment = function () {
    var fragmentIndex = this.indexOf("#");
    if (fragmentIndex == -1) {
        fragmentIndex = this.length
    }
    return this.substring(0, fragmentIndex)
};
String.prototype.startsWith = function (substring) {
    return !this.lastIndexOf(substring, 0)
};
String.prototype.endsWith = function (substring) {
    return this.indexOf(substring, this.length - substring.length) !== -1
};
Number.constrain = function (num, min, max) {
    if (num < min) {
        num = min
    } else if (num > max) {
        num = max
    }
    return num
};
Date.prototype.toISO8601Compact = function () {
    function leadZero(x) {
        return x > 9 ?
            '' + x :
            '0' + x
    }
    return this.getFullYear() + leadZero(this.getMonth() + 1) + leadZero(this.getDate()) + 'T' + leadZero(this.getHours()) + leadZero(this.getMinutes()) + leadZero(this.getSeconds())
};
Object.defineProperty(Array.prototype, "remove", {
    value: function (value, onlyFirst) {
        if (onlyFirst) {
            var index = this.indexOf(value);
            if (index !== -1) {
                this.splice(index, 1)
            }
            return
        }
        var length = this.length;
        for (var i = 0; i < length; i += 1) {
            if (this[i] === value) {
                this.splice(i, 1)
            }
        }
    }
});
Object.defineProperty(Array.prototype, "keySet", {
    value: function () {
        var keys = {};
        for (var i = 0; i < this.length; i += 1) {
            keys[this[i]] = true
        }
        return keys
    }
});
Object.defineProperty(Array.prototype, "upperBound", {
    value: function (value) {
        var first = 0;
        var count = this.length;
        while (count > 0) {
            var step = count >> 1;
            var middle = first + step;
            if (value >= this[middle]) {
                first = middle + 1;
                count -= step + 1
            } else {
                count = step
            }
        }
        return first
    }
});
Object.defineProperty(Array.prototype, "rotate", {
    value: function (index) {
        var result = [];
        for (var i = index; i < index + this.length; i += 1) {
            result.push(this[i % this.length])
        }
        return result
    }
});
Object.defineProperty(Uint32Array.prototype, "sort", {
    value: Array.prototype.sort
});
(function () {
    var partition = {
        value: function (comparator, left, right, pivotIndex) {
            function swap(array, i1, i2) {
                var temp = array[i1];
                array[i1] = array[i2];
                array[i2] = temp
            }
            var pivotValue = this[pivotIndex];
            swap(this, right, pivotIndex);
            var storeIndex = left;
            for (var i = left; i < right; i += 1) {
                if (comparator(this[i], pivotValue) < 0) {
                    swap(this, storeIndex, i);
                    storeIndex += 1
                }
            }
            swap(this, right, storeIndex);
            return storeIndex
        }
    };
    Object.defineProperty(Array.prototype, "partition", partition);
    Object.defineProperty(Uint32Array.prototype, "partition", partition);
    var sortRange = {
        value: function (comparator, leftBound, rightBound, k) {
            function quickSortFirstK(array, comparator, left, right, k) {
                if (right <= left) {
                    return
                }
                var pivotIndex = Math.floor(Math.random() * (right - left)) + left;
                var pivotNewIndex = array.partition(comparator, left, right, pivotIndex);
                quickSortFirstK(array, comparator, left, pivotNewIndex - 1, k);
                if (pivotNewIndex < left + k - 1) {
                    quickSortFirstK(array, comparator, pivotNewIndex + 1, right, k)
                }
            }
            if (leftBound === 0 && rightBound === (this.length - 1) && k >= this.length) {
                this.sort(comparator)
            } else {
                quickSortFirstK(this, comparator, leftBound, rightBound, k)
            }
            return this
        }
    };
    Object.defineProperty(Array.prototype, "sortRange", sortRange);
    Object.defineProperty(Uint32Array.prototype, "sortRange", sortRange)
})();
Object.defineProperty(Array.prototype, "qselect", {
    value: function (k, comparator) {
        if (k < 0 || k >= this.length) {
            return
        }
        if (!comparator) {
            comparator = function (a, b) {
                return a - b
            }
        }
        var low = 0;
        var high = this.length - 1;
        for (;;) {
            var pivotPosition = this.partition(comparator, low, high, Math.floor((high + low) / 2));
            if (pivotPosition === k) {
                return this[k]
            } else if (pivotPosition > k) {
                high = pivotPosition - 1
            } else {
                low = pivotPosition + 1
            }
        }
    }
});

function binarySearch(object, array, comparator) {
    var first = 0;
    var last = array.length - 1;
    while (first <= last) {
        var mid = (first + last) >> 1;
        var c = comparator(object, array[mid]);
        if (c > 0) {
            first = mid + 1
        } else if (c < 0) {
            last = mid - 1
        } else {
            return mid
        }
    }
    return -(first + 1)
}
Object.defineProperty(Array.prototype, "binaryIndexOf", {
    value: function (value, comparator) {
        var result = binarySearch(value, this, comparator);
        return result >= 0 ?
            result :
            -1
    }
});
Object.defineProperty(Array.prototype, "select", {
    value: function (field) {
        var result = [this.length];
        for (var i = 0; i < this.length; i += 1) {
            result[i] = this[i][field]
        }
        return result
    }
});
Object.defineProperty(Array.prototype, "peekLast", {
    value: function () {
        return this[this.length - 1]
    }
});

function insertionIndexForObjectInListSortedByFunction(anObject, aList, aFunction) {
    var index = binarySearch(anObject, aList, aFunction);
    if (index < 0) {
        return -index - 1
    } else {
        while (index > 0 && aFunction(anObject, aList[index - 1]) === 0) {
            index -= 1
        }
        return index
    }
}
String.sprintf = function (format, var_arg) {
    return String.vsprintf(format, Array.prototype.slice.call(arguments, 1))
};
String.tokenizeFormatString = function (format, formatters) {
    var tokens = [];
    var substitutionIndex = 0;

    function addStringToken(str) {
        tokens.push({
            type: "string",
            value: str
        })
    }

    function addSpecifierToken(specifier, precision, substitutionIndex) {
        tokens.push({
            type: "specifier",
            specifier: specifier,
            precision: precision,
            substitutionIndex: substitutionIndex
        })
    }

    function isDigit(c) {
        return !!/[0-9]/.exec(c)
    }
    var index = 0;
    for (var precentIndex = format.indexOf("%", index); precentIndex !== -1; precentIndex = format.indexOf("%", index)) {
        addStringToken(format.substring(index, precentIndex));
        index = precentIndex + 1;
        if (isDigit(format[index])) {
            var number = parseInt(format.substring(index), 10);
            while (isDigit(format[index])) {
                ++index
            }
            if (number > 0 && format[index] === "$") {
                substitutionIndex = (number - 1);
                index += 1
            }
        }
        var precision = -1;
        if (format[index] === ".") {
            ++index;
            precision = parseInt(format.substring(index), 10);
            if (isNaN(precision)) {
                precision = 0
            }
            while (isDigit(format[index])) {
                ++index
            }
        }
        if (!(format[index] in formatters)) {
            addStringToken(format.substring(precentIndex, index + 1));
            index += 1;
            continue
        }
        addSpecifierToken(format[index], precision, substitutionIndex);
        substitutionIndex += 1;
        index += 1
    }
    addStringToken(format.substring(index));
    return tokens
};

String.vsprintf = function (format, substitutions) {
    return String.format(format, substitutions, String.standardFormatters, "", function (a, b) {
        return a + b
    }).formattedResult
};
String.format = function (format, substitutions, formatters, initialValue, append) {
    if (!format || !substitutions || !substitutions.length) {
        return {
            formattedResult: append(initialValue, format),
            unusedSubstitutions: substitutions
        }
    }

    function prettyFunctionName() {
        return "String.format(\"" + format + "\", \"" + substitutions.join("\", \"") + "\")"
    }

    function warn(msg) {
        console.warn(prettyFunctionName() + ": " + msg)
    }

    function error(msg) {
        console.error(prettyFunctionName() + ": " + msg)
    }
    var result = initialValue;
    var tokens = String.tokenizeFormatString(format, formatters);
    var usedSubstitutionIndexes = {};
    for (var i = 0; i < tokens.length; i += 1) {
        var token = tokens[i];
        if (token.type === "string") {
            result = append(result, token.value);
            continue
        }
        if (token.type !== "specifier") {
            error("Unknown token type \"" + token.type + "\" found.");
            continue
        }
        if (token.substitutionIndex >= substitutions.length) {
            error("not enough substitution arguments. Had " + substitutions.length + " but needed " + (token.substitutionIndex + 1) + ", so substitution was skipped.");
            result = append(result, "%" + (token.precision > -1 ?
                token.precision :
                "") + token.specifier);
            continue
        }
        usedSubstitutionIndexes[token.substitutionIndex] = true;
        if (!(token.specifier in formatters)) {
            warn("unsupported format character \u201C" + token.specifier + "\u201D. Treating as a string.");
            result = append(result, substitutions[token.substitutionIndex]);
            continue
        }
        result = append(result, formatters[token.specifier](substitutions[token.substitutionIndex], token))
    }
    var unusedSubstitutions = [];
    for (var i = 0; i < substitutions.length; i += 1) {
        if (i in usedSubstitutionIndexes) {
            continue
        }
        unusedSubstitutions.push(substitutions[i])
    }
    return {
        formattedResult: result,
        unusedSubstitutions: unusedSubstitutions
    }
};

function createSearchRegex(query, caseSensitive, isRegex) {
    var regexFlags = caseSensitive ?
        "g" :
        "gi";
    var regexObject;
    if (isRegex) {
        try {
            regexObject = new RegExp(query, regexFlags)
        } catch (e) {}
    }
    if (!regexObject) {
        regexObject = createPlainTextSearchRegex(query, regexFlags)
    }
    return regexObject
}

function createPlainTextSearchRegex(query, flags) {
    var regexSpecialCharacters = String.regexSpecialCharacters();
    var regex = "";
    for (var i = 0; i < query.length; i += 1) {
        var c = query.charAt(i);
        if (regexSpecialCharacters.indexOf(c) != -1) {
            regex += "\\"
        }
        regex += c
    }
    return new RegExp(regex, flags || "")
}

function countRegexMatches(regex, content) {
    var text = content;
    var result = 0;
    var match;
    while (text && (match = regex.exec(text))) {
        if (match[0].length > 0) {
            ++result
        }
        text = text.substring(match.index + 1)
    }
    return result
}

function numberToStringWithSpacesPadding(value, symbolsCount) {
    var numberString = value.toString();
    var paddingLength = Math.max(0, symbolsCount - numberString.length);
    var paddingString = Array(paddingLength + 1).join("\u00a0");
    return paddingString + numberString
}
var createObjectIdentifier = function () {
    return '_' + ++createObjectIdentifier._last
};
createObjectIdentifier._last = 0;
var Set = function () {
    this._set = {};
    this._size = 0
};
Set.prototype = {
    add: function (item) {
        var objectIdentifier = item.__identifier;
        if (!objectIdentifier) {
            objectIdentifier = createObjectIdentifier();
            item.__identifier = objectIdentifier
        }
        if (!this._set[objectIdentifier]) {
            ++this._size
        }
        this._set[objectIdentifier] = item
    },
    remove: function (item) {
        if (this._set[item.__identifier]) {
            --this._size;
            delete this._set[item.__identifier]
        }
    },
    items: function () {
        var result = [this._size];
        var i = 0;
        for (var objectIdentifier in this._set) {
            result[i++] = this._set[objectIdentifier]
        }
        return result
    },
    hasItem: function (item) {
        return this._set[item.__identifier]
    },
    size: function () {
        return this._size
    },
    clear: function () {
        this._set = {};
        this._size = 0
    }
};
var Map = function () {
    this._map = {};
    this._size = 0
};
Map.prototype = {
    put: function (key, value) {
        var objectIdentifier = key.__identifier;
        if (!objectIdentifier) {
            objectIdentifier = createObjectIdentifier();
            key.__identifier = objectIdentifier
        }
        if (!this._map[objectIdentifier]) {
            ++this._size
        }
        this._map[objectIdentifier] = [key, value]
    },
    remove: function (key) {
        var result = this._map[key.__identifier];
        if (!result) {
            return undefined
        }
        --this._size;
        delete this._map[key.__identifier];
        return result[1]
    },
    keys: function () {
        return this._list(0)
    },
    values: function () {
        return this._list(1)
    },
    _list: function (index) {
        var result = [this._size];
        var i = 0;
        for (var objectIdentifier in this._map) {
            result[i++] = this._map[objectIdentifier][index]
        }
        return result
    },
    get: function (key) {
        var entry = this._map[key.__identifier];
        return entry ?
            entry[1] :
            undefined
    },
    size: function () {
        return this._size
    },
    clear: function () {
        this._map = {};
        this._size = 0
    }
};



function loadXHR(url, async, callback) {
    function onReadyStateChanged() {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return
        }
        if (xhr.status === 200) {
            callback(xhr.responseText);
            return
        }
        callback(null)
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, async);
    if (async) {
        xhr.onreadystatechange = onReadyStateChanged
    }
    xhr.send(null);
    if (!async) {
        if (xhr.status === 200) {
            return xhr.responseText
        }
        return null
    }
    return null
}

function StringPool() {
    this.reset()
}
StringPool.prototype = {
    intern: function (string) {
        if (string === "__proto__") {
            return "__proto__"
        }
        var result = this._strings[string];
        if (result === undefined) {
            this._strings[string] = string;
            result = string
        }
        return result
    },
    reset: function () {
        this._strings = Object.create(null)
    },
    internObjectStrings: function (obj, depthLimit) {
        if (typeof depthLimit !== "number") {
            depthLimit = 100
        } else if (--depthLimit < 0) {
            throw "recursion depth limit reached in StringPool.deepIntern(), perhaps attempting to " +
                "traverse cyclical references?"
        }
        for (var field in obj) {
            switch (typeof obj[field]) {
                case "string":
                    obj[field] = this.intern(obj[field]);
                    break;
                case "object":
                    this.internObjectStrings(obj[field], depthLimit);
                    break
            }
        }
    }
};

var _importedScripts = {};

function importScript(scriptName) {
    if (_importedScripts[scriptName]) {
        return
    }
    var xhr = new XMLHttpRequest();
    _importedScripts[scriptName] = true;
    if (window.flattenImports) {
        scriptName = scriptName
            .split("/")
            .reverse()[0]
    }
    xhr.open("GET", scriptName, false);
    xhr.send(null);
    if (!xhr.responseText) {
        throw "empty response arrived for script '" + scriptName + "'"
    }
    var sourceURL = WebInspector
        .ParsedURL
        .completeURL(window.location.href, scriptName);
    window.eval(xhr.responseText + "\n//@ sourceURL=" + sourceURL)
}

var loadScript = importScript;
