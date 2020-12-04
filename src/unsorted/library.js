
(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document")
                }
                return factory(w)
            }
    } else {
        factory(global)
    }
})(typeof window !== "undefined" ?
    window :
    this,
    function (window, noGlobal) {
        "use strict";
        var arr = [];
        var document = window.document;
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var concat = arr.concat;
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        var isFunction = function isFunction(obj) {
            return typeof obj === "function" && typeof obj.nodeType !== "number"
        };
        var isWindow = function isWindow(obj) {
            return obj != null && obj === obj.window
        };
        var preservedScriptAttributes = {
            type: true,
            src: true,
            nonce: true,
            noModule: true
        };

        function DOMEval(code, node, doc) {
            doc = doc || document;
            var i,
                val,
                script = doc.createElement("script");
            script.text = code;
            if (node) {
                for (i in preservedScriptAttributes) {
                    val = node[i] || node.getAttribute && node.getAttribute(i);
                    if (val) {
                        script.setAttribute(i, val)
                    }
                }
            }
            doc
                .head
                .appendChild(script)
                .parentNode
                .removeChild(script)
        }

        function toType(obj) {
            if (obj == null) {
                return obj + ""
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj
        }
        var version = "3.4.1",
            jQuery = function (selector, context) {
                return new jQuery
                    .fn
                    .init(selector, context)
            },
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        jQuery.fn = jQuery.prototype = {
            jquery: version,
            constructor: jQuery,
            length: 0,
            toArray: function () {
                return slice.call(this)
            },
            get: function (num) {
                if (num == null) {
                    return slice.call(this)
                }
                return num < 0 ?
                    this[num + this.length] :
                    this[num]
            },
            pushStack: function (elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                ret.prevObject = this;
                return ret
            },
            each: function (callback) {
                return jQuery.each(this, callback)
            },
            map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem)
                }))
            },
            slice: function () {
                return this.pushStack(slice.apply(this, arguments))
            },
            first: function () {
                return this.eq(0)
            },
            last: function () {
                return this.eq(-1)
            },
            eq: function (i) {
                var len = this.length,
                    j = +i + (i < 0 ?
                        len :
                        0);
                return this.pushStack(j >= 0 && j < len ?
                    [this[j]] :
                    [])
            },
            end: function () {
                return this.prevObject || this.constructor()
            },
            push: push,
            sort: arr.sort,
            splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function () {
            var options,
                name,
                src,
                copy,
                copyIsArray,
                clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[i] || {};
                i += 1
            }
            if (typeof target !== "object" && !isFunction(target)) {
                target = {}
            }
            if (i === length) {
                target = this;
                i -= 1
            }
            for (; i < length; i += 1) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        copy = options[name];
                        if (name === "__proto__" || target === copy) {
                            continue
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                            src = target[name];
                            if (copyIsArray && !Array.isArray(src)) {
                                clone = []
                            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                                clone = {}
                            } else {
                                clone = src
                            }
                            copyIsArray = false;
                            target[name] = jQuery.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy
                        }
                    }
                }
            }
            return target
        };
        jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            isReady: true,
            error: function (msg) {
                throw new Error(msg)
            },
            noop: function () {},
            isPlainObject: function (obj) {
                var proto,
                    Ctor;
                if (!obj || toString.call(obj) !== "[object Object]") {
                    return false
                }
                proto = getProto(obj);
                if (!proto) {
                    return true
                }
                Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
                return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString
            },
            isEmptyObject: function (obj) {
                var name;
                for (name in obj) {
                    return false
                }
                return true
            },
            globalEval: function (code, options) {
                DOMEval(code, {
                    nonce: options && options.nonce
                })
            },
            each: function (obj, callback) {
                var length,
                    i = 0;
                if (isArrayLike(obj)) {
                    length = obj.length;
                    for (; i < length; i += 1) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break
                        }
                    }
                } else {
                    for (i in obj) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break
                        }
                    }
                }
                return obj
            },
            trim: function (text) {
                return text == null ?
                    "" :
                    (text + "").replace(rtrim, "")
            },
            makeArray: function (arr, results) {
                var ret = results || [];
                if (arr != null) {
                    if (isArrayLike(Object(arr))) {
                        jQuery.merge(ret, typeof arr === "string" ?
                            [arr] :
                            arr)
                    } else {
                        push.call(ret, arr)
                    }
                }
                return ret
            },
            inArray: function (elem, arr, i) {
                return arr == null ?
                    -1 :
                    indexOf.call(arr, elem, i)
            },
            merge: function (first, second) {
                var len = +second.length,
                    j = 0,
                    i = first.length;
                for (; j < len; j += 1) {
                    first[i++] = second[j]
                }
                first.length = i;
                return first
            },
            grep: function (elems, callback, invert) {
                var callbackInverse,
                    matches = [],
                    i = 0,
                    length = elems.length,
                    callbackExpect = !invert;
                for (; i < length; i += 1) {
                    callbackInverse = !callback(elems[i], i);
                    if (callbackInverse !== callbackExpect) {
                        matches.push(elems[i])
                    }
                }
                return matches
            },
            map: function (elems, callback, arg) {
                var length,
                    value,
                    i = 0,
                    ret = [];
                if (isArrayLike(elems)) {
                    length = elems.length;
                    for (; i < length; i += 1) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value)
                        }
                    }
                } else {
                    for (i in elems) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value)
                        }
                    }
                }
                return concat.apply([], ret)
            },
            guid: 1,
            support: support
        });
        if (typeof Symbol === "function") {
            jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]
        }
        jQuery
            .each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
                class2type["[object " + name + "]"] = name.toLowerCase()
            });

        function isArrayLike(obj) {
            var length = !!obj && "length" in obj && obj.length,
                type = toType(obj);
            if (isFunction(obj) || isWindow(obj)) {
                return false
            }
            return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj
        }
        var Sizzle = (function (window) {
            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                nonnativeSelectorCache = createCache(),
                sortOrder = function (a, b) {
                    if (a === b) {
                        hasDuplicate = true
                    }
                    return 0
                },
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                indexOf = function (list, elem) {
                    var i = 0,
                        len = list.length;
                    for (; i < len; i += 1) {
                        if (list[i] === elem) {
                            return i
                        }
                    }
                    return -1
                },
                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|l" +
                "oop|multiple|open|readonly|required|scoped",
                whitespace = "[\\x20\\t\\r\\n\\f]",
                identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
                pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[" +
                "\\]]|" + attributes + ")*)|.*)\\)|)",
                rwhitespace = new RegExp(whitespace + "+", "g"),
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                rdescend = new RegExp(whitespace + "|>"),
                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),
                matchExpr = {
                    "ID": new RegExp("^#(" + identifier + ")"),
                    "CLASS": new RegExp("^\\.(" + identifier + ")"),
                    "TAG": new RegExp("^(" + identifier + "|[*])"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },
                rhtml = /HTML$/i,
                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,
                rnative = /^[^{]+\{\s*\[native \w/,
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                rsibling = /[+~]/,
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function (_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                        String.fromCharCode(high + 0x10000) :
                        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00)
                },
                rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                fcssescape = function (ch, asCodePoint) {
                    if (asCodePoint) {
                        if (ch === "\0") {
                            return "\uFFFD"
                        }
                        return ch.slice(0, -1) + "\\" + ch
                            .charCodeAt(ch.length - 1)
                            .toString(16) + " "
                    }
                    return "\\" + ch
                },
                unloadHandler = function () {
                    setDocument()
                },
                inDisabledFieldset = addCombinator(function (elem) {
                    return elem.disabled === true && elem
                        .nodeName
                        .toLowerCase() === "fieldset"
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
                arr[preferredDoc.childNodes.length].nodeType
            } catch (e) {
                push = {
                    apply: arr.length ?
                        function (target, els) {
                            push_native.apply(target, slice.call(els))
                        } :
                        function (target, els) {
                            var j = target.length,
                                i = 0;
                            while ((target[j++] = els[i++])) {}
                            target.length = j - 1
                        }
                }
            }

            function Sizzle(selector, context, results, seed) {
                var m,
                    i,
                    elem,
                    nid,
                    match,
                    groups,
                    newSelector,
                    newContext = context && context.ownerDocument,
                    nodeType = context ?
                    context.nodeType :
                    9;
                results = results || [];
                if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                    return results
                }
                if (!seed) {
                    if ((context ?
                            context.ownerDocument || context :
                            preferredDoc) !== document) {
                        setDocument(context)
                    }
                    context = context || document;
                    if (documentIsHTML) {
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                            if ((m = match[1])) {
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results
                                        }
                                    } else {
                                        return results
                                    }
                                } else {
                                    if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                        results.push(elem);
                                        return results
                                    }
                                }
                            } else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;
                            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results
                            }
                        }
                        if (support.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
                            newSelector = selector;
                            newContext = context;
                            if (nodeType === 1 && rdescend.test(selector)) {
                                if ((nid = context.getAttribute("id"))) {
                                    nid = nid.replace(rcssescape, fcssescape)
                                } else {
                                    context.setAttribute("id", (nid = expando))
                                }
                                groups = tokenize(selector);
                                i = groups.length;
                                while (i--) {
                                    groups[i] = "#" + nid + " " + toSelector(groups[i])
                                }
                                newSelector = groups.join(",");
                                newContext = rsibling.test(selector) && testContext(context.parentNode) || context
                            }
                            try {
                                push.apply(results, newContext.querySelectorAll(newSelector));
                                return results
                            } catch (qsaError) {
                                nonnativeSelectorCache(selector, true)
                            } finally {
                                if (nid === expando) {
                                    context.removeAttribute("id")
                                }
                            }
                        }
                    }
                }
                return select(selector.replace(rtrim, "$1"), context, results, seed)
            }

            function createCache() {
                var keys = [];

                function cache(key, value) {
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        delete cache[keys.shift()]
                    }
                    return (cache[key + " "] = value)
                }
                return cache
            }

            function markFunction(fn) {
                fn[expando] = true;
                return fn
            }

            function assert(fn) {
                var el = document.createElement("fieldset");
                try {
                    return !!fn(el)
                } catch (e) {
                    return false
                } finally {
                    if (el.parentNode) {
                        el
                            .parentNode
                            .removeChild(el)
                    }
                    el = null
                }
            }

            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = arr.length;
                while (i--) {
                    Expr.attrHandle[arr[i]] = handler
                }
            }

            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
                if (diff) {
                    return diff
                }
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1
                        }
                    }
                }
                return a ?
                    1 :
                    -1
            }

            function createInputPseudo(type) {
                return function (elem) {
                    var name = elem
                        .nodeName
                        .toLowerCase();
                    return name === "input" && elem.type === type
                }
            }

            function createButtonPseudo(type) {
                return function (elem) {
                    var name = elem
                        .nodeName
                        .toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type
                }
            }

            function createDisabledPseudo(disabled) {
                return function (elem) {
                    if ("form" in elem) {
                        if (elem.parentNode && elem.disabled === false) {
                            if ("label" in elem) {
                                if ("label" in elem.parentNode) {
                                    return elem.parentNode.disabled === disabled
                                } else {
                                    return elem.disabled === disabled
                                }
                            }
                            return elem.isDisabled === disabled || elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled
                        }
                        return elem.disabled === disabled;
                    } else if ("label" in elem) {
                        return elem.disabled === disabled
                    }
                    return false
                }
            }

            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j])
                            }
                        }
                    })
                })
            }

            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context
            }
            support = Sizzle.support = {};
            isXML = Sizzle.isXML = function (elem) {
                var namespace = elem.namespaceURI,
                    docElem = (elem.ownerDocument || elem).documentElement;
                return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML")
            };
            setDocument = Sizzle.setDocument = function (node) {
                var hasCompare,
                    subWindow,
                    doc = node ?
                    node.ownerDocument || node :
                    preferredDoc;
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document
                }
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);
                if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
                    if (subWindow.addEventListener) {
                        subWindow.addEventListener("unload", unloadHandler, false);
                    } else if (subWindow.attachEvent) {
                        subWindow.attachEvent("onunload", unloadHandler)
                    }
                }
                support.attributes = assert(function (el) {
                    el.className = "i";
                    return !el.getAttribute("className")
                });
                support.getElementsByTagName = assert(function (el) {
                    el.appendChild(document.createComment(""));
                    return !el
                        .getElementsByTagName("*")
                        .length
                });
                support.getElementsByClassName = rnative.test(document.getElementsByClassName);
                support.getById = assert(function (el) {
                    docElem
                        .appendChild(el)
                        .id = expando;
                    return !document.getElementsByName || !document
                        .getElementsByName(expando)
                        .length
                });
                if (support.getById) {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId
                        }
                    };
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var elem = context.getElementById(id);
                            return elem ?
                                [elem] :
                                []
                        }
                    }
                } else {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                            return node && node.value === attrId
                        }
                    };
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var node,
                                i,
                                elems,
                                elem = context.getElementById(id);
                            if (elem) {
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem]
                                }
                                elems = context.getElementsByName(id);
                                i = 0;
                                while ((elem = elems[i++])) {
                                    node = elem.getAttributeNode("id");
                                    if (node && node.value === id) {
                                        return [elem]
                                    }
                                }
                            }
                            return []
                        }
                    }
                }
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== "undefined") {
                            return context.getElementsByTagName(tag);
                        } else if (support.qsa) {
                            return context.querySelectorAll(tag)
                        }
                    } :
                    function (tag, context) {
                        var elem,
                            tmp = [],
                            i = 0,
                            results = context.getElementsByTagName(tag);
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem)
                                }
                            }
                            return tmp
                        }
                        return results
                    };
                Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                    if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                        return context.getElementsByClassName(className)
                    }
                };
                rbuggyMatches = [];
                rbuggyQSA = [];
                if ((support.qsa = rnative.test(document.querySelectorAll))) {
                    assert(function (el) {
                        docElem
                            .appendChild(el)
                            .innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                        if (el.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")")
                        }
                        if (!el.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")")
                        }
                        if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=")
                        }
                        if (!el.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked")
                        }
                        if (!el.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]")
                        }
                    });
                    assert(function (el) {
                        el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select" +
                            ">";
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        el
                            .appendChild(input)
                            .setAttribute("name", "D");
                        if (el.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=")
                        }
                        if (el.querySelectorAll(":enabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled")
                        }
                        docElem
                            .appendChild(el)
                            .disabled = true;
                        if (el.querySelectorAll(":disabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled")
                        }
                        el.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:")
                    })
                }
                if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
                    assert(function (el) {
                        support.disconnectedMatch = matches.call(el, "*");
                        matches.call(el, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos)
                    })
                }
                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
                hasCompare = rnative.test(docElem.compareDocumentPosition);
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function (a, b) {
                        var adown = a.nodeType === 9 ?
                            a.documentElement :
                            a,
                            bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ?
                            adown.contains(bup) :
                            a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
                    } :
                    function (a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true
                                }
                            }
                        }
                        return false
                    };
                sortOrder = hasCompare ?
                    function (a, b) {
                        if (a === b) {
                            hasDuplicate = true;
                            return 0
                        }
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare
                        }
                        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                            a.compareDocumentPosition(b) :
                            1;
                        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                            if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1
                            }
                            if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1
                            }
                            return sortInput ?
                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                0
                        }
                        return compare & 4 ?
                            -1 :
                            1
                    } :
                    function (a, b) {
                        if (a === b) {
                            hasDuplicate = true;
                            return 0
                        }
                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];
                        if (!aup || !bup) {
                            return a === document ?
                                -1 :
                                b === document ?
                                1 :
                                aup ?
                                -1 :
                                bup ?
                                1 :
                                sortInput ?
                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                0;
                        } else if (aup === bup) {
                            return siblingCheck(a, b)
                        }
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur)
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur)
                        }
                        while (ap[i] === bp[i]) {
                            i += 1
                        }
                        return i ?
                            siblingCheck(ap[i], bp[i]) :
                            ap[i] === preferredDoc ?
                            -1 :
                            bp[i] === preferredDoc ?
                            1 :
                            0
                    };
                return document
            };
            Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements)
            };
            Sizzle.matchesSelector = function (elem, expr) {
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem)
                }
                if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                    try {
                        var ret = matches.call(elem, expr);
                        if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                            return ret
                        }
                    } catch (e) {
                        nonnativeSelectorCache(expr, true)
                    }
                }
                return Sizzle(expr, document, null, [elem]).length > 0
            };
            Sizzle.contains = function (context, elem) {
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context)
                }
                return contains(context, elem)
            };
            Sizzle.attr = function (elem, name) {
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem)
                }
                var fn = Expr.attrHandle[name.toLowerCase()],
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                    fn(elem, name, !documentIsHTML) :
                    undefined;
                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                    elem.getAttribute(name) :
                    (val = elem.getAttributeNode(name)) && val.specified ?
                    val.value :
                    null
            };
            Sizzle.escape = function (sel) {
                return (sel + "").replace(rcssescape, fcssescape)
            };
            Sizzle.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg)
            };
            Sizzle.uniqueSort = function (results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);
                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i)
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1)
                    }
                }
                sortInput = null;
                return results
            };
            getText = Sizzle.getText = function (elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;
                if (!nodeType) {
                    while ((node = elem[i++])) {
                        ret += getText(node)
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem)
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue
                }
                return ret
            };
            Expr = Sizzle.selectors = {
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: true
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: true
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    "ATTR": function (match) {
                        match[1] = match[1].replace(runescape, funescape);
                        match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " "
                        }
                        return match.slice(0, 4)
                    },
                    "CHILD": function (match) {
                        match[1] = match[1].toLowerCase();
                        if (match[1].slice(0, 3) === "nth") {
                            if (!match[3]) {
                                Sizzle.error(match[0])
                            }
                            match[4] = +(match[4] ?
                                match[5] + (match[6] || 1) :
                                2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");
                        } else if (match[3]) {
                            Sizzle.error(match[0])
                        }
                        return match
                    },
                    "PSEUDO": function (match) {
                        var excess,
                            unquoted = !match[6] && match[2];
                        if (matchExpr["CHILD"].test(match[0])) {
                            return null
                        }
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";
                        } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess)
                        }
                        return match.slice(0, 3)
                    }
                },
                filter: {
                    "TAG": function (nodeNameSelector) {
                        var nodeName = nodeNameSelector
                            .replace(runescape, funescape)
                            .toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () {
                                return true
                            } :
                            function (elem) {
                                return elem.nodeName && elem
                                    .nodeName
                                    .toLowerCase() === nodeName
                            }
                    },
                    "CLASS": function (className) {
                        var pattern = classCache[className + " "];
                        return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
                            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "")
                        })
                    },
                    "ATTR": function (name, operator, check) {
                        return function (elem) {
                            var result = Sizzle.attr(elem, name);
                            if (result == null) {
                                return operator === "!="
                            }
                            if (!operator) {
                                return true
                            }
                            result += "";
                            return operator === "=" ?
                                result === check :
                                operator === "!=" ?
                                result !== check :
                                operator === "^=" ?
                                check && result.indexOf(check) === 0 :
                                operator === "*=" ?
                                check && result.indexOf(check) > -1 :
                                operator === "$=" ?
                                check && result.slice(-check.length) === check :
                                operator === "~=" ?
                                (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                                operator === "|=" ?
                                result === check || result.slice(0, check.length + 1) === check + "-" :
                                false
                        }
                    },
                    "CHILD": function (type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";
                        return first === 1 && last === 0 ?
                            function (elem) {
                                return !!elem.parentNode
                            } :
                            function (elem, context, xml) {
                                var cache,
                                    uniqueCache,
                                    outerCache,
                                    node,
                                    nodeIndex,
                                    start,
                                    dir = simple !== forward ?
                                    "nextSibling" :
                                    "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem
                                    .nodeName
                                    .toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = false;
                                if (parent) {
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) {
                                                    return false
                                                }
                                            }
                                            start = dir = type === "only" && !start && "nextSibling"
                                        }
                                        return true
                                    }
                                    start = [forward ?
                                        parent.firstChild :
                                        parent.lastChild
                                    ];
                                    if (forward && useCache) {
                                        node = parent;
                                        outerCache = node[expando] || (node[expando] = {});
                                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];
                                        while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break
                                            }
                                        }
                                    } else {
                                        if (useCache) {
                                            node = elem;
                                            outerCache = node[expando] || (node[expando] = {});
                                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                            cache = uniqueCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex
                                        }
                                        if (diff === false) {
                                            while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                                if ((ofType ?
                                                        node.nodeName.toLowerCase() === name :
                                                        node.nodeType === 1) && ++diff) {
                                                    if (useCache) {
                                                        outerCache = node[expando] || (node[expando] = {});
                                                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                        uniqueCache[type] = [dirruns, diff]
                                                    }
                                                    if (node === elem) {
                                                        break
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    diff -= last;
                                    return diff === first || (diff % first === 0 && diff / first >= 0)
                                }
                            }
                    },
                    "PSEUDO": function (pseudo, argument) {
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                        if (fn[expando]) {
                            return fn(argument)
                        }
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr
                                .setFilters
                                .hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx,
                                        matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                        idx = indexOf(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i])
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args)
                                }
                        }
                        return fn
                    }
                },
                pseudos: {
                    "not": markFunction(function (selector) {
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));
                        return matcher[expando] ?
                            markFunction(function (seed, matches, context, xml) {
                                var elem,
                                    unmatched = matcher(seed, null, xml, []),
                                    i = seed.length;
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem)
                                    }
                                }
                            }) :
                            function (elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                input[0] = null;
                                return !results.pop()
                            }
                    }),
                    "has": markFunction(function (selector) {
                        return function (elem) {
                            return Sizzle(selector, elem).length > 0
                        }
                    }),
                    "contains": markFunction(function (text) {
                        text = text.replace(runescape, funescape);
                        return function (elem) {
                            return (elem.textContent || getText(elem)).indexOf(text) > -1
                        }
                    }),
                    "lang": markFunction(function (lang) {
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang)
                        }
                        lang = lang
                            .replace(runescape, funescape)
                            .toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                        elem.lang :
                                        elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false
                        }
                    }),
                    "target": function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id
                    },
                    "root": function (elem) {
                        return elem === docElem
                    },
                    "focus": function (elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                    },
                    "enabled": createDisabledPseudo(false),
                    "disabled": createDisabledPseudo(true),
                    "checked": function (elem) {
                        var nodeName = elem
                            .nodeName
                            .toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected)
                    },
                    "selected": function (elem) {
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex
                        }
                        return elem.selected === true
                    },
                    "empty": function (elem) {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false
                            }
                        }
                        return true
                    },
                    "parent": function (elem) {
                        return !Expr.pseudos["empty"](elem)
                    },
                    "header": function (elem) {
                        return rheader.test(elem.nodeName)
                    },
                    "input": function (elem) {
                        return rinputs.test(elem.nodeName)
                    },
                    "button": function (elem) {
                        var name = elem
                            .nodeName
                            .toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button"
                    },
                    "text": function (elem) {
                        var attr;
                        return elem
                            .nodeName
                            .toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text")
                    },
                    "first": createPositionalPseudo(function () {
                        return [0]
                    }),
                    "last": createPositionalPseudo(function (matchIndexes, length) {
                        return [length - 1]
                    }),
                    "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                        return [argument < 0 ?
                            argument + length :
                            argument
                        ]
                    }),
                    "even": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i)
                        }
                        return matchIndexes
                    }),
                    "odd": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i)
                        }
                        return matchIndexes
                    }),
                    "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ?
                            argument + length :
                            argument > length ?
                            length :
                            argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i)
                        }
                        return matchIndexes
                    }),
                    "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ?
                            argument + length :
                            argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i)
                        }
                        return matchIndexes
                    })
                }
            };
            Expr.pseudos["nth"] = Expr.pseudos["eq"];
            for (i in {
                    radio: true,
                    checkbox: true,
                    file: true,
                    password: true,
                    image: true
                }) {
                Expr.pseudos[i] = createInputPseudo(i)
            }
            for (i in {
                    submit: true,
                    reset: true
                }) {
                Expr.pseudos[i] = createButtonPseudo(i)
            }

            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();
            tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                var matched,
                    match,
                    tokens,
                    type,
                    soFar,
                    groups,
                    preFilters,
                    cached = tokenCache[selector + " "];
                if (cached) {
                    return parseOnly ?
                        0 :
                        cached.slice(0)
                }
                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;
                while (soFar) {
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            soFar = soFar.slice(match[0].length) || soFar
                        }
                        groups.push((tokens = []))
                    }
                    matched = false;
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length)
                    }
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length)
                        }
                    }
                    if (!matched) {
                        break
                    }
                }
                return parseOnly ?
                    soFar.length :
                    soFar ?
                    Sizzle.error(selector) :
                    tokenCache(selector, groups).slice(0)
            };

            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i += 1) {
                    selector += tokens[i].value
                }
                return selector
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    skip = combinator.next,
                    key = skip || dir,
                    checkNonElements = base && key === "parentNode",
                    doneName = done++;
                return combinator.first ?
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml)
                            }
                        }
                        return false
                    } :
                    function (elem, context, xml) {
                        var oldCache,
                            uniqueCache,
                            outerCache,
                            newCache = [dirruns, doneName];
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true
                                    }
                                }
                            }
                        } else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});
                                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                                    if (skip && skip === elem.nodeName.toLowerCase()) {
                                        elem = elem[dir] || elem
                                    } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                        return (newCache[2] = oldCache[2])
                                    } else {
                                        uniqueCache[key] = newCache;
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true
                                        }
                                    }
                                }
                            }
                        }
                        return false
                    }
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false
                            }
                        }
                        return true
                    } :
                    matchers[0]
            }

            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i += 1) {
                    Sizzle(selector, contexts[i], results)
                }
                return results
            }

            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;
                for (; i < len; i += 1) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i)
                            }
                        }
                    }
                }
                return newUnmatched
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter)
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector)
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp,
                        i,
                        elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,
                        elems = seed || multipleContexts(selector || "*", context.nodeType ?
                            [context] :
                            context, []),
                        matcherIn = preFilter && (seed || !selector) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems,
                        matcherOut = matcher ?
                        postFinder || (seed ?
                            preFilter :
                            preexisting || postFilter) ?
                        [] :
                        results :
                        matcherIn;
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml)
                    }
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
                            }
                        }
                    }
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        temp.push((matcherIn[i] = elem))
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml)
                            }
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) && (temp = postFinder ?
                                        indexOf(seed, elem) :
                                        preMap[i]) > -1) {
                                    seed[temp] = !(results[temp] = elem)
                                }
                            }
                        }
                    } else {
                        matcherOut = condense(matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut);
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml)
                        } else {
                            push.apply(results, matcherOut)
                        }
                    }
                })
            }

            function matcherFromTokens(tokens) {
                var checkContext,
                    matcher,
                    j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ?
                    1 :
                    0,
                    matchContext = addCombinator(function (elem) {
                        return elem === checkContext
                    }, implicitRelative, true),
                    matchAnyContext = addCombinator(function (elem) {
                        return indexOf(checkContext, elem) > -1
                    }, implicitRelative, true),
                    matchers = [function (elem, context, xml) {
                        var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml));
                        checkContext = null;
                        return ret
                    }];
                for (; i < len; i += 1) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)]
                    } else {
                        matcher = Expr
                            .filter[tokens[i].type]
                            .apply(null, tokens[i].matches);
                        if (matcher[expando]) {
                            j = ++i;
                            for (; j < len; j += 1) {
                                if (Expr.relative[tokens[j].type]) {
                                    break
                                }
                            }
                            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                                value: tokens[i - 2].type === " " ?
                                    "*" :
                                    ""
                            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens))
                        }
                        matchers.push(matcher)
                    }
                }
                return elementMatcher(matchers)
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function (seed, context, xml, results, outermost) {
                        var elem,
                            j,
                            matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                            dirrunsUnique = (dirruns += contextBackup == null ?
                                1 :
                                Math.random() || 0.1),
                            len = elems.length;
                        if (outermost) {
                            outermostContext = context === document || context || outermost
                        }
                        for (; i !== len && (elem = elems[i]) != null; i += 1) {
                            if (byElement && elem) {
                                j = 0;
                                if (!context && elem.ownerDocument !== document) {
                                    setDocument(elem);
                                    xml = !documentIsHTML
                                }
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context || document, xml)) {
                                        results.push(elem);
                                        break
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique
                                }
                            }
                            if (bySet) {
                                if ((elem = !matcher && elem)) {
                                    matchedCount -= 1
                                }
                                if (seed) {
                                    unmatched.push(elem)
                                }
                            }
                        }
                        matchedCount += i;
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml)
                            }
                            if (seed) {
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results)
                                        }
                                    }
                                }
                                setMatched = condense(setMatched)
                            }
                            push.apply(results, setMatched);
                            if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                                Sizzle.uniqueSort(results)
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup
                        }
                        return unmatched
                    };
                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher
            }
            compile = Sizzle.compile = function (selector, match) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];
                if (!cached) {
                    if (!match) {
                        match = tokenize(selector)
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached)
                        } else {
                            elementMatchers.push(cached)
                        }
                    }
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                    cached.selector = selector
                }
                return cached
            };
            select = Sizzle.select = function (selector, context, results, seed) {
                var i,
                    tokens,
                    token,
                    type,
                    find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize((selector = compiled.selector || selector));
                results = results || [];
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                        context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;
                        } else if (compiled) {
                            context = context.parentNode
                        }
                        selector = selector.slice(tokens.shift().value.length)
                    }
                    i = matchExpr["needsContext"].test(selector) ?
                        0 :
                        tokens.length;
                    while (i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) {
                            break
                        }
                        if ((find = Expr.find[type])) {
                            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results
                                }
                                break
                            }
                        }
                    }
                }
                (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
                return results
            };
            support.sortStable = expando
                .split("")
                .sort(sortOrder)
                .join("") === expando;
            support.detectDuplicates = !!hasDuplicate;
            setDocument();
            support.sortDetached = assert(function (el) {
                return el.compareDocumentPosition(document.createElement("fieldset")) & 1
            });
            if (!assert(function (el) {
                    el.innerHTML = "<a href='#'></a>";
                    return el
                        .firstChild
                        .getAttribute("href") === "#"
                })) {
                addHandle("type|href|height|width", function (elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ?
                            1 :
                            2)
                    }
                })
            }
            if (!support.attributes || !assert(function (el) {
                    el.innerHTML = "<input/>";
                    el
                        .firstChild
                        .setAttribute("value", "");
                    return el
                        .firstChild
                        .getAttribute("value") === ""
                })) {
                addHandle("value", function (elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue
                    }
                })
            }
            if (!assert(function (el) {
                    return el.getAttribute("disabled") == null
                })) {
                addHandle(booleans, function (elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ?
                            name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null
                    }
                })
            }
            return Sizzle
        })(window);
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
        jQuery.escapeSelector = Sizzle.escape;
        var dir = function (elem, dir, until) {
            var matched = [],
                truncate = until !== undefined;
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) {
                        break
                    }
                    matched.push(elem)
                }
            }
            return matched
        };
        var siblings = function (n, elem) {
            var matched = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n)
                }
            }
            return matched
        };
        var rneedsContext = jQuery.expr.match.needsContext;

        function nodeName(elem, name) {
            return elem.nodeName && elem
                .nodeName
                .toLowerCase() === name.toLowerCase()
        };
        var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);

        function winnow(elements, qualifier, not) {
            if (isFunction(qualifier)) {
                return jQuery.grep(elements, function (elem, i) {
                    return !!qualifier.call(elem, i, elem) !== not
                })
            }
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function (elem) {
                    return (elem === qualifier) !== not
                })
            }
            if (typeof qualifier !== "string") {
                return jQuery.grep(elements, function (elem) {
                    return (indexOf.call(qualifier, elem) > -1) !== not
                })
            }
            return jQuery.filter(qualifier, elements, not)
        }
        jQuery.filter = function (expr, elems, not) {
            var elem = elems[0];
            if (not) {
                expr = ":not(" + expr + ")"
            }
            if (elems.length === 1 && elem.nodeType === 1) {
                return jQuery
                    .find
                    .matchesSelector(elem, expr) ?
                    [elem] :
                    []
            }
            return jQuery
                .find
                .matches(expr, jQuery.grep(elems, function (elem) {
                    return elem.nodeType === 1
                }))
        };
        jQuery
            .fn
            .extend({
                find: function (selector) {
                    var i,
                        ret,
                        len = this.length,
                        self = this;
                    if (typeof selector !== "string") {
                        return this.pushStack(jQuery(selector).filter(function () {
                            for (i = 0; i < len; i += 1) {
                                if (jQuery.contains(self[i], this)) {
                                    return true
                                }
                            }
                        }))
                    }
                    ret = this.pushStack([]);
                    for (i = 0; i < len; i += 1) {
                        jQuery.find(selector, self[i], ret)
                    }
                    return len > 1 ?
                        jQuery.uniqueSort(ret) :
                        ret
                },
                filter: function (selector) {
                    return this.pushStack(winnow(this, selector || [], false))
                },
                not: function (selector) {
                    return this.pushStack(winnow(this, selector || [], true))
                },
                is: function (selector) {
                    return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ?
                        jQuery(selector) :
                        selector || [], false).length
                }
            });
        var rootjQuery,
            rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            init = jQuery.fn.init = function (selector, context, root) {
                var match,
                    elem;
                if (!selector) {
                    return this
                }
                root = root || rootjQuery;
                if (typeof selector === "string") {
                    if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                        match = [null, selector, null]
                    } else {
                        match = rquickExpr.exec(selector)
                    }
                    if (match && (match[1] || !context)) {
                        if (match[1]) {
                            context = context instanceof jQuery ?
                                context[0] :
                                context;
                            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ?
                                context.ownerDocument || context :
                                document, true));
                            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                                for (match in context) {
                                    if (isFunction(this[match])) {
                                        this[match](context[match]);
                                    } else {
                                        this.attr(match, context[match])
                                    }
                                }
                            }
                            return this;
                        } else {
                            elem = document.getElementById(match[2]);
                            if (elem) {
                                this[0] = elem;
                                this.length = 1
                            }
                            return this
                        }
                    } else if (!context || context.jquery) {
                        return (context || root).find(selector);
                    } else {
                        return this
                            .constructor(context)
                            .find(selector)
                    }
                } else if (selector.nodeType) {
                    this[0] = selector;
                    this.length = 1;
                    return this;
                } else if (isFunction(selector)) {
                    return root.ready !== undefined ?
                        root.ready(selector) :
                        selector(jQuery)
                }
                return jQuery.makeArray(selector, this)
            };
        init.prototype = jQuery.fn;
        rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/,
            guaranteedUnique = {
                children: true,
                contents: true,
                next: true,
                prev: true
            };
        jQuery
            .fn
            .extend({
                has: function (target) {
                    var targets = jQuery(target, this),
                        l = targets.length;
                    return this.filter(function () {
                        var i = 0;
                        for (; i < l; i += 1) {
                            if (jQuery.contains(this, targets[i])) {
                                return true
                            }
                        }
                    })
                },
                closest: function (selectors, context) {
                    var cur,
                        i = 0,
                        l = this.length,
                        matched = [],
                        targets = typeof selectors !== "string" && jQuery(selectors);
                    if (!rneedsContext.test(selectors)) {
                        for (; i < l; i += 1) {
                            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                                if (cur.nodeType < 11 && (targets ?
                                        targets.index(cur) > -1 :
                                        cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                                    matched.push(cur);
                                    break
                                }
                            }
                        }
                    }
                    return this.pushStack(matched.length > 1 ?
                        jQuery.uniqueSort(matched) :
                        matched)
                },
                index: function (elem) {
                    if (!elem) {
                        return (this[0] && this[0].parentNode) ?
                            this
                            .first()
                            .prevAll()
                            .length :
                            -1
                    }
                    if (typeof elem === "string") {
                        return indexOf.call(jQuery(elem), this[0])
                    }
                    return indexOf.call(this, elem.jquery ?
                        elem[0] :
                        elem)
                },
                add: function (selector, context) {
                    return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))))
                },
                addBack: function (selector) {
                    return this.add(selector == null ?
                        this.prevObject :
                        this.prevObject.filter(selector))
                }
            });

        function sibling(cur, dir) {
            while ((cur = cur[dir]) && cur.nodeType !== 1) {}
            return cur
        }
        jQuery
            .each({
                parent: function (elem) {
                    var parent = elem.parentNode;
                    return parent && parent.nodeType !== 11 ?
                        parent :
                        null
                },
                parents: function (elem) {
                    return dir(elem, "parentNode")
                },
                parentsUntil: function (elem, i, until) {
                    return dir(elem, "parentNode", until)
                },
                next: function (elem) {
                    return sibling(elem, "nextSibling")
                },
                prev: function (elem) {
                    return sibling(elem, "previousSibling")
                },
                nextAll: function (elem) {
                    return dir(elem, "nextSibling")
                },
                prevAll: function (elem) {
                    return dir(elem, "previousSibling")
                },
                nextUntil: function (elem, i, until) {
                    return dir(elem, "nextSibling", until)
                },
                prevUntil: function (elem, i, until) {
                    return dir(elem, "previousSibling", until)
                },
                siblings: function (elem) {
                    return siblings((elem.parentNode || {}).firstChild, elem)
                },
                children: function (elem) {
                    return siblings(elem.firstChild)
                },
                contents: function (elem) {
                    if (typeof elem.contentDocument !== "undefined") {
                        return elem.contentDocument
                    }
                    if (nodeName(elem, "template")) {
                        elem = elem.content || elem
                    }
                    return jQuery.merge([], elem.childNodes)
                }
            }, function (name, fn) {
                jQuery.fn[name] = function (until, selector) {
                    var matched = jQuery.map(this, fn, until);
                    if (name.slice(-5) !== "Until") {
                        selector = until
                    }
                    if (selector && typeof selector === "string") {
                        matched = jQuery.filter(selector, matched)
                    }
                    if (this.length > 1) {
                        if (!guaranteedUnique[name]) {
                            jQuery.uniqueSort(matched)
                        }
                        if (rparentsprev.test(name)) {
                            matched.reverse()
                        }
                    }
                    return this.pushStack(matched)
                }
            });
        var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);

        function createOptions(options) {
            var object = {};
            jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
                object[flag] = true
            });
            return object
        }
        jQuery.Callbacks = function (options) {
            options = typeof options === "string" ?
                createOptions(options) :
                jQuery.extend({}, options);
            var firing,
                memory,
                fired,
                locked,
                list = [],
                queue = [],
                firingIndex = -1,
                fire = function () {
                    locked = locked || options.once;
                    fired = firing = true;
                    for (; queue.length; firingIndex = -1) {
                        memory = queue.shift();
                        while (++firingIndex < list.length) {
                            if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                                firingIndex = list.length;
                                memory = false
                            }
                        }
                    }
                    if (!options.memory) {
                        memory = false
                    }
                    firing = false;
                    if (locked) {
                        if (memory) {
                            list = [];
                        } else {
                            list = ""
                        }
                    }
                },
                self = {
                    add: function () {
                        if (list) {
                            if (memory && !firing) {
                                firingIndex = list.length - 1;
                                queue.push(memory)
                            }
                            (function add(args) {
                                jQuery
                                    .each(args, function (_, arg) {
                                        if (isFunction(arg)) {
                                            if (!options.unique || !self.has(arg)) {
                                                list.push(arg)
                                            }
                                        } else if (arg && arg.length && toType(arg) !== "string") {
                                            add(arg)
                                        }
                                    })
                            })(arguments);
                            if (memory && !firing) {
                                fire()
                            }
                        }
                        return this
                    },
                    remove: function () {
                        jQuery
                            .each(arguments, function (_, arg) {
                                var index;
                                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                    list.splice(index, 1);
                                    if (index <= firingIndex) {
                                        firingIndex -= 1
                                    }
                                }
                            });
                        return this
                    },
                    has: function (fn) {
                        return fn ?
                            jQuery.inArray(fn, list) > -1 :
                            list.length > 0
                    },
                    empty: function () {
                        if (list) {
                            list = []
                        }
                        return this
                    },
                    disable: function () {
                        locked = queue = [];
                        list = memory = "";
                        return this
                    },
                    disabled: function () {
                        return !list
                    },
                    lock: function () {
                        locked = queue = [];
                        if (!memory && !firing) {
                            list = memory = ""
                        }
                        return this
                    },
                    locked: function () {
                        return !!locked
                    },
                    fireWith: function (context, args) {
                        if (!locked) {
                            args = args || [];
                            args = [
                                context, args.slice ?
                                args.slice() :
                                args
                            ];
                            queue.push(args);
                            if (!firing) {
                                fire()
                            }
                        }
                        return this
                    },
                    fire: function () {
                        self.fireWith(this, arguments);
                        return this
                    },
                    fired: function () {
                        return !!fired
                    }
                };
            return self
        };

        function Identity(v) {
            return v
        }

        function Thrower(ex) {
            throw ex
        }

        function adoptValue(value, resolve, reject, noValue) {
            var method;
            try {
                if (value && isFunction((method = value.promise))) {
                    method
                        .call(value)
                        .done(resolve)
                        .fail(reject);
                } else if (value && isFunction((method = value.then))) {
                    method.call(value, resolve, reject);
                } else {
                    resolve.apply(undefined, [value].slice(noValue))
                }
            } catch (value) {
                reject.apply(undefined, [value])
            }
        }
        jQuery.extend({
            Deferred: function (func) {
                var tuples = [
                        [
                            "notify", "progress", jQuery.Callbacks("memory"),
                            jQuery.Callbacks("memory"),
                            2
                        ],
                        [
                            "resolve", "done", jQuery.Callbacks("once memory"),
                            jQuery.Callbacks("once memory"),
                            0,
                            "resolved"
                        ],
                        [
                            "reject", "fail", jQuery.Callbacks("once memory"),
                            jQuery.Callbacks("once memory"),
                            1,
                            "rejected"
                        ]
                    ],
                    state = "pending",
                    promise = {
                        state: function () {
                            return state
                        },
                        always: function () {
                            deferred
                                .done(arguments)
                                .fail(arguments);
                            return this
                        },
                        "catch": function (fn) {
                            return promise.then(null, fn)
                        },
                        pipe: function () {
                            var fns = arguments;
                            return jQuery.Deferred(function (newDefer) {
                                jQuery
                                    .each(tuples, function (i, tuple) {
                                        var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                                        deferred[tuple[1]](function () {
                                            var returned = fn && fn.apply(this, arguments);
                                            if (returned && isFunction(returned.promise)) {
                                                returned
                                                    .promise()
                                                    .progress(newDefer.notify)
                                                    .done(newDefer.resolve)
                                                    .fail(newDefer.reject)
                                            } else {
                                                newDefer[tuple[0] + "With"](this, fn ?
                                                    [returned] :
                                                    arguments)
                                            }
                                        })
                                    });
                                fns = null
                            }).promise()
                        },
                        then: function (onFulfilled, onRejected, onProgress) {
                            var maxDepth = 0;

                            function resolve(depth, deferred, handler, special) {
                                return function () {
                                    var that = this,
                                        args = arguments,
                                        mightThrow = function () {
                                            var returned,
                                                then;
                                            if (depth < maxDepth) {
                                                return
                                            }
                                            returned = handler.apply(that, args);
                                            if (returned === deferred.promise()) {
                                                throw new TypeError("Thenable self-resolution")
                                            }
                                            then = returned && (typeof returned === "object" || typeof returned === "function") && returned.then;
                                            if (isFunction(then)) {
                                                if (special) {
                                                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                                                } else {
                                                    maxDepth += 1;
                                                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith))
                                                }
                                            } else {
                                                if (handler !== Identity) {
                                                    that = undefined;
                                                    args = [returned]
                                                }
                                                (special || deferred.resolveWith)(that, args)
                                            }
                                        },
                                        process = special ?
                                        mightThrow :
                                        function () {
                                            try {
                                                mightThrow()
                                            } catch (e) {
                                                if (jQuery.Deferred.exceptionHook) {
                                                    jQuery
                                                        .Deferred
                                                        .exceptionHook(e, process.stackTrace)
                                                }
                                                if (depth + 1 >= maxDepth) {
                                                    if (handler !== Thrower) {
                                                        that = undefined;
                                                        args = [e]
                                                    }
                                                    deferred.rejectWith(that, args)
                                                }
                                            }
                                        };
                                    if (depth) {
                                        process()
                                    } else {
                                        if (jQuery.Deferred.getStackHook) {
                                            process.stackTrace = jQuery
                                                .Deferred
                                                .getStackHook()
                                        }
                                        window.setTimeout(process)
                                    }
                                }
                            }
                            return jQuery.Deferred(function (newDefer) {
                                tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ?
                                    onProgress :
                                    Identity, newDefer.notifyWith));
                                tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ?
                                    onFulfilled :
                                    Identity));
                                tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ?
                                    onRejected :
                                    Thrower))
                            }).promise()
                        },
                        promise: function (obj) {
                            return obj != null ?
                                jQuery.extend(obj, promise) :
                                promise
                        }
                    },
                    deferred = {};
                jQuery.each(tuples, function (i, tuple) {
                    var list = tuple[2],
                        stateString = tuple[5];
                    promise[tuple[1]] = list.add;
                    if (stateString) {
                        list
                            .add(function () {
                                state = stateString
                            }, tuples[3 - i][2].disable, tuples[3 - i][3].disable, tuples[0][2].lock, tuples[0][3].lock)
                    }
                    list.add(tuple[3].fire);
                    deferred[tuple[0]] = function () {
                        deferred[tuple[0] + "With"](this === deferred ?
                            undefined :
                            this, arguments);
                        return this
                    };
                    deferred[tuple[0] + "With"] = list.fireWith
                });
                promise.promise(deferred);
                if (func) {
                    func.call(deferred, deferred)
                }
                return deferred
            },
            when: function (singleValue) {
                var remaining = arguments.length,
                    i = remaining,
                    resolveContexts = Array(i),
                    resolveValues = slice.call(arguments),
                    master = jQuery.Deferred(),
                    updateFunc = function (i) {
                        return function (value) {
                            resolveContexts[i] = this;
                            resolveValues[i] = arguments.length > 1 ?
                                slice.call(arguments) :
                                value;
                            if (!(remaining -= 1)) {
                                master.resolveWith(resolveContexts, resolveValues)
                            }
                        }
                    };
                if (remaining <= 1) {
                    adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);
                    if (master.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
                        return master.then()
                    }
                }
                while (i--) {
                    adoptValue(resolveValues[i], updateFunc(i), master.reject)
                }
                return master.promise()
            }
        });
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function (error, stack) {
            if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
                window
                    .console
                    .warn("jQuery.Deferred exception: " + error.message, error.stack, stack)
            }
        };
        jQuery.readyException = function (error) {
            window
                .setTimeout(function () {
                    throw error
                })
        };
        var readyList = jQuery.Deferred();
        jQuery.fn.ready = function (fn) {
            readyList
                .then(fn)
                .catch(function (error) {
                    jQuery.readyException(error)
                });
            return this
        };
        jQuery.extend({
            isReady: false,
            readyWait: 1,
            ready: function (wait) {
                if (wait === true ?
                    --jQuery.readyWait :
                    jQuery.isReady) {
                    return
                }
                jQuery.isReady = true;
                if (wait !== true && --jQuery.readyWait > 0) {
                    return
                }
                readyList.resolveWith(document, [jQuery])
            }
        });
        jQuery.ready.then = readyList.then;

        function completed() {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
            jQuery.ready()
        }
        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            window.setTimeout(jQuery.ready)
        } else {
            document.addEventListener("DOMContentLoaded", completed);
            window.addEventListener("load", completed)
        }
        var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
                len = elems.length,
                bulk = key == null;
            if (toType(key) === "object") {
                chainable = true;
                for (i in key) {
                    access(elems, fn, i, key[i], true, emptyGet, raw)
                }
            } else if (value !== undefined) {
                chainable = true;
                if (!isFunction(value)) {
                    raw = true
                }
                if (bulk) {
                    if (raw) {
                        fn.call(elems, value);
                        fn = null;
                    } else {
                        bulk = fn;
                        fn = function (elem, key, value) {
                            return bulk.call(jQuery(elem), value)
                        }
                    }
                }
                if (fn) {
                    for (; i < len; i += 1) {
                        fn(elems[i], key, raw ?
                            value :
                            value.call(elems[i], i, fn(elems[i], key)))
                    }
                }
            }
            if (chainable) {
                return elems
            }
            if (bulk) {
                return fn.call(elems)
            }
            return len ?
                fn(elems[0], key) :
                emptyGet
        };
        var rmsPrefix = /^-ms-/,
            rdashAlpha = /-([a-z])/g;

        function fcamelCase(all, letter) {
            return letter.toUpperCase()
        }

        function camelCase(string) {
            return string
                .replace(rmsPrefix, "ms-")
                .replace(rdashAlpha, fcamelCase)
        }
        var acceptData = function (owner) {
            return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType)
        };

        function Data() {
            this.expando = jQuery.expando + Data.uid++
        }
        Data.uid = 1;
        Data.prototype = {
            cache: function (owner) {
                var value = owner[this.expando];
                if (!value) {
                    value = {};
                    if (acceptData(owner)) {
                        if (owner.nodeType) {
                            owner[this.expando] = value;
                        } else {
                            Object.defineProperty(owner, this.expando, {
                                value: value,
                                configurable: true
                            })
                        }
                    }
                }
                return value
            },
            set: function (owner, data, value) {
                var prop,
                    cache = this.cache(owner);
                if (typeof data === "string") {
                    cache[camelCase(data)] = value;
                } else {
                    for (prop in data) {
                        cache[camelCase(prop)] = data[prop]
                    }
                }
                return cache
            },
            get: function (owner, key) {
                return key === undefined ?
                    this.cache(owner) :
                    owner[this.expando] && owner[this.expando][camelCase(key)]
            },
            access: function (owner, key, value) {
                if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
                    return this.get(owner, key)
                }
                this.set(owner, key, value);
                return value !== undefined ?
                    value :
                    key
            },
            remove: function (owner, key) {
                var i,
                    cache = owner[this.expando];
                if (cache === undefined) {
                    return
                }
                if (key !== undefined) {
                    if (Array.isArray(key)) {
                        key = key.map(camelCase)
                    } else {
                        key = camelCase(key);
                        key = key in cache ?
                            [key] :
                            (key.match(rnothtmlwhite) || [])
                    }
                    i = key.length;
                    while (i--) {
                        delete cache[key[i]]
                    }
                }
                if (key === undefined || jQuery.isEmptyObject(cache)) {
                    if (owner.nodeType) {
                        owner[this.expando] = undefined
                    } else {
                        delete owner[this.expando]
                    }
                }
            },
            hasData: function (owner) {
                var cache = owner[this.expando];
                return cache !== undefined && !jQuery.isEmptyObject(cache)
            }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            rmultiDash = /[A-Z]/g;

        function getData(data) {
            if (data === "true") {
                return true
            }
            if (data === "false") {
                return false
            }
            if (data === "null") {
                return null
            }
            if (data === +data + "") {
                return +data
            }
            if (rbrace.test(data)) {
                return JSON.parse(data)
            }
            return data
        }

        function dataAttr(elem, key, data) {
            var name;
            if (data === undefined && elem.nodeType === 1) {
                name = "data-" + key
                    .replace(rmultiDash, "-$&")
                    .toLowerCase();
                data = elem.getAttribute(name);
                if (typeof data === "string") {
                    try {
                        data = getData(data)
                    } catch (e) {}
                    dataUser.set(elem, key, data)
                } else {
                    data = undefined
                }
            }
            return data
        }
        jQuery.extend({
            hasData: function (elem) {
                return dataUser.hasData(elem) || dataPriv.hasData(elem)
            },
            data: function (elem, name, data) {
                return dataUser.access(elem, name, data)
            },
            removeData: function (elem, name) {
                dataUser.remove(elem, name)
            },
            _data: function (elem, name, data) {
                return dataPriv.access(elem, name, data)
            },
            _removeData: function (elem, name) {
                dataPriv.remove(elem, name)
            }
        });
        jQuery
            .fn
            .extend({
                data: function (key, value) {
                    var i,
                        name,
                        data,
                        elem = this[0],
                        attrs = elem && elem.attributes;
                    if (key === undefined) {
                        if (this.length) {
                            data = dataUser.get(elem);
                            if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                                i = attrs.length;
                                while (i--) {
                                    if (attrs[i]) {
                                        name = attrs[i].name;
                                        if (name.indexOf("data-") === 0) {
                                            name = camelCase(name.slice(5));
                                            dataAttr(elem, name, data[name])
                                        }
                                    }
                                }
                                dataPriv.set(elem, "hasDataAttrs", true)
                            }
                        }
                        return data
                    }
                    if (typeof key === "object") {
                        return this.each(function () {
                            dataUser.set(this, key)
                        })
                    }
                    return access(this, function (value) {
                        var data;
                        if (elem && value === undefined) {
                            data = dataUser.get(elem, key);
                            if (data !== undefined) {
                                return data
                            }
                            data = dataAttr(elem, key);
                            if (data !== undefined) {
                                return data
                            }
                            return
                        }
                        this
                            .each(function () {
                                dataUser.set(this, key, value)
                            })
                    }, null, value, arguments.length > 1, null, true)
                },
                removeData: function (key) {
                    return this.each(function () {
                        dataUser.remove(this, key)
                    })
                }
            });
        jQuery.extend({
            queue: function (elem, type, data) {
                var queue;
                if (elem) {
                    type = (type || "fx") + "queue";
                    queue = dataPriv.get(elem, type);
                    if (data) {
                        if (!queue || Array.isArray(data)) {
                            queue = dataPriv.access(elem, type, jQuery.makeArray(data))
                        } else {
                            queue.push(data)
                        }
                    }
                    return queue || []
                }
            },
            dequeue: function (elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type),
                    startLength = queue.length,
                    fn = queue.shift(),
                    hooks = jQuery._queueHooks(elem, type),
                    next = function () {
                        jQuery.dequeue(elem, type)
                    };
                if (fn === "inprogress") {
                    fn = queue.shift();
                    startLength -= 1
                }
                if (fn) {
                    if (type === "fx") {
                        queue.unshift("inprogress")
                    }
                    delete hooks.stop;
                    fn.call(elem, next, hooks)
                }
                if (!startLength && hooks) {
                    hooks
                        .empty
                        .fire()
                }
            },
            _queueHooks: function (elem, type) {
                var key = type + "queueHooks";
                return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                    empty: jQuery
                        .Callbacks("once memory")
                        .add(function () {
                            dataPriv.remove(elem, [
                                type + "queue",
                                key
                            ])
                        })
                })
            }
        });
        jQuery
            .fn
            .extend({
                queue: function (type, data) {
                    var setter = 2;
                    if (typeof type !== "string") {
                        data = type;
                        type = "fx";
                        setter -= 1
                    }
                    if (arguments.length < setter) {
                        return jQuery.queue(this[0], type)
                    }
                    return data === undefined ?
                        this :
                        this.each(function () {
                            var queue = jQuery.queue(this, type, data);
                            jQuery._queueHooks(this, type);
                            if (type === "fx" && queue[0] !== "inprogress") {
                                jQuery.dequeue(this, type)
                            }
                        })
                },
                dequeue: function (type) {
                    return this.each(function () {
                        jQuery.dequeue(this, type)
                    })
                },
                clearQueue: function (type) {
                    return this.queue(type || "fx", [])
                },
                promise: function (type, obj) {
                    var tmp,
                        count = 1,
                        defer = jQuery.Deferred(),
                        elements = this,
                        i = this.length,
                        resolve = function () {
                            if (!(count -= 1)) {
                                defer.resolveWith(elements, [elements])
                            }
                        };
                    if (typeof type !== "string") {
                        obj = type;
                        type = undefined
                    }
                    type = type || "fx";
                    while (i--) {
                        tmp = dataPriv.get(elements[i], type + "queueHooks");
                        if (tmp && tmp.empty) {
                            count += 1;
                            tmp
                                .empty
                                .add(resolve)
                        }
                    }
                    resolve();
                    return defer.promise(obj)
                }
            });
        var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var documentElement = document.documentElement;
        var isAttached = function (elem) {
                return jQuery.contains(elem.ownerDocument, elem)
            },
            composed = {
                composed: true
            };
        if (documentElement.getRootNode) {
            isAttached = function (elem) {
                return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument
            }
        }
        var isHiddenWithinTree = function (elem, el) {
            elem = el || elem;
            return elem.style.display === "none" || elem.style.display === "" && isAttached(elem) && jQuery.css(elem, "display") === "none"
        };
        var swap = function (elem, options, callback, args) {
            var ret,
                name,
                old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name]
            }
            ret = callback.apply(elem, args || []);
            for (name in options) {
                elem.style[name] = old[name]
            }
            return ret
        };

        function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted,
                scale,
                maxIterations = 20,
                currentValue = tween ?
                function () {
                    return tween.cur()
                } :
                function () {
                    return jQuery.css(elem, prop, "")
                },
                initial = currentValue(),
                unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ?
                    "" :
                    "px"),
                initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
            if (initialInUnit && initialInUnit[3] !== unit) {
                initial = initial / 2;
                unit = unit || initialInUnit[3];
                initialInUnit = +initial || 1;
                while (maxIterations--) {
                    jQuery.style(elem, prop, initialInUnit + unit);
                    if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                        maxIterations = 0
                    }
                    initialInUnit = initialInUnit / scale
                }
                initialInUnit = initialInUnit * 2;
                jQuery.style(elem, prop, initialInUnit + unit);
                valueParts = valueParts || []
            }
            if (valueParts) {
                initialInUnit = +initialInUnit || +initial || 0;
                adjusted = valueParts[1] ?
                    initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                    +valueParts[2];
                if (tween) {
                    tween.unit = unit;
                    tween.start = initialInUnit;
                    tween.end = adjusted
                }
            }
            return adjusted
        }
        var defaultDisplayMap = {};

        function getDefaultDisplay(elem) {
            var temp,
                doc = elem.ownerDocument,
                nodeName = elem.nodeName,
                display = defaultDisplayMap[nodeName];
            if (display) {
                return display
            }
            temp = doc
                .body
                .appendChild(doc.createElement(nodeName));
            display = jQuery.css(temp, "display");
            temp
                .parentNode
                .removeChild(temp);
            if (display === "none") {
                display = "block"
            }
            defaultDisplayMap[nodeName] = display;
            return display
        }

        function showHide(elements, show) {
            var display,
                elem,
                values = [],
                index = 0,
                length = elements.length;
            for (; index < length; index += 1) {
                elem = elements[index];
                if (!elem.style) {
                    continue
                }
                display = elem.style.display;
                if (show) {
                    if (display === "none") {
                        values[index] = dataPriv.get(elem, "display") || null;
                        if (!values[index]) {
                            elem.style.display = ""
                        }
                    }
                    if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                        values[index] = getDefaultDisplay(elem)
                    }
                } else {
                    if (display !== "none") {
                        values[index] = "none";
                        dataPriv.set(elem, "display", display)
                    }
                }
            }
            for (index = 0; index < length; index += 1) {
                if (values[index] != null) {
                    elements[index].style.display = values[index]
                }
            }
            return elements
        }
        jQuery
            .fn
            .extend({
                show: function () {
                    return showHide(this, true)
                },
                hide: function () {
                    return showHide(this)
                },
                toggle: function (state) {
                    if (typeof state === "boolean") {
                        return state ?
                            this.show() :
                            this.hide()
                    }
                    return this.each(function () {
                        if (isHiddenWithinTree(this)) {
                            jQuery(this).show()
                        } else {
                            jQuery(this).hide()
                        }
                    })
                }
            });
        var rcheckableType = (/^(?:checkbox|radio)$/i);
        var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i);
        var rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);
        var wrapMap = {
            option: [
                1, "<select multiple='multiple'>", "</select>"
            ],
            thead: [
                1, "<table>", "</table>"
            ],
            col: [
                2, "<table><colgroup>", "</colgroup></table>"
            ],
            tr: [
                2, "<table><tbody>", "</tbody></table>"
            ],
            td: [
                3, "<table><tbody><tr>", "</tr></tbody></table>"
            ],
            _default: [0, "", ""]
        };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

        function getAll(context, tag) {
            var ret;
            if (typeof context.getElementsByTagName !== "undefined") {
                ret = context.getElementsByTagName(tag || "*")
            } else if (typeof context.querySelectorAll !== "undefined") {
                ret = context.querySelectorAll(tag || "*")
            } else {
                ret = []
            }
            if (tag === undefined || tag && nodeName(context, tag)) {
                return jQuery.merge([context], ret)
            }
            return ret
        }

        function setGlobalEval(elems, refElements) {
            var i = 0,
                l = elems.length;
            for (; i < l; i += 1) {
                dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"))
            }
        }
        var rhtml = /<|&#?\w+;/;

        function buildFragment(elems, context, scripts, selection, ignored) {
            var elem,
                tmp,
                tag,
                wrap,
                attached,
                j,
                fragment = context.createDocumentFragment(),
                nodes = [],
                i = 0,
                l = elems.length;
            for (; i < l; i += 1) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (toType(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ?
                            [elem] :
                            elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp = tmp || fragment.appendChild(context.createElement("div"));
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild
                        }
                        jQuery.merge(nodes, tmp.childNodes);
                        tmp = fragment.firstChild;
                        tmp.textContent = ""
                    }
                }
            }
            fragment.textContent = "";
            i = 0;
            while ((elem = nodes[i++])) {
                if (selection && jQuery.inArray(elem, selection) > -1) {
                    if (ignored) {
                        ignored.push(elem)
                    }
                    continue
                }
                attached = isAttached(elem);
                tmp = getAll(fragment.appendChild(elem), "script");
                if (attached) {
                    setGlobalEval(tmp)
                }
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem)
                        }
                    }
                }
            }
            return fragment
        }(function () {
            var fragment = document.createDocumentFragment(),
                div = fragment.appendChild(document.createElement("div")),
                input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("checked", "checked");
            input.setAttribute("name", "t");
            div.appendChild(input);
            support.checkClone = div
                .cloneNode(true)
                .cloneNode(true)
                .lastChild
                .checked;
            div.innerHTML = "<textarea>x</textarea>";
            support.noCloneChecked = !!div
                .cloneNode(true)
                .lastChild
                .defaultValue
        })();
        var rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

        function returnTrue() {
            return true
        }

        function returnFalse() {
            return false
        }

        function expectSync(elem, type) {
            return (elem === safeActiveElement()) === (type === "focus")
        }

        function safeActiveElement() {
            try {
                return document.activeElement
            } catch (err) {}
        }

        function on(elem, types, selector, data, fn, one) {
            var origFn,
                type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined
                }
                for (type in types) {
                    on(elem, type, selector, data, types[type], one)
                }
                return elem
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined
                }
            }
            if (fn === false) {
                fn = returnFalse
            } else if (!fn) {
                return elem
            }
            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments)
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
            }
            return elem.each(function () {
                jQuery
                    .event
                    .add(this, types, fn, data, selector)
            })
        }
        jQuery.event = {
            global: {},
            add: function (elem, types, handler, data, selector) {
                var handleObjIn,
                    eventHandle,
                    tmp,
                    events,
                    t,
                    handleObj,
                    special,
                    handlers,
                    type,
                    namespaces,
                    origType,
                    elemData = dataPriv.get(elem);
                if (!elemData) {
                    return
                }
                if (handler.handler) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector
                }
                if (selector) {
                    jQuery
                        .find
                        .matchesSelector(documentElement, selector)
                }
                if (!handler.guid) {
                    handler.guid = jQuery.guid++
                }
                if (!(events = elemData.events)) {
                    events = elemData.events = {}
                }
                if (!(eventHandle = elemData.handle)) {
                    eventHandle = elemData.handle = function (e) {
                        return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                            jQuery
                            .event
                            .dispatch
                            .apply(elem, arguments) :
                            undefined
                    }
                }
                types = (types || "").match(rnothtmlwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "")
                        .split(".")
                        .sort();
                    if (!type) {
                        continue
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ?
                        special.delegateType :
                        special.bindType) || type;
                    special = jQuery.event.special[type] || {};
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery
                            .expr
                            .match
                            .needsContext
                            .test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn);
                    if (!(handlers = events[type])) {
                        handlers = events[type] = [];
                        handlers.delegateCount = 0;
                        if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                            if (elem.addEventListener) {
                                elem.addEventListener(type, eventHandle)
                            }
                        }
                    }
                    if (special.add) {
                        special
                            .add
                            .call(elem, handleObj);
                        if (!handleObj.handler.guid) {
                            handleObj.handler.guid = handler.guid
                        }
                    }
                    if (selector) {
                        handlers.splice(handlers.delegateCount++, 0, handleObj)
                    } else {
                        handlers.push(handleObj)
                    }
                    jQuery.event.global[type] = true
                }
            },
            remove: function (elem, types, handler, selector, mappedTypes) {
                var j,
                    origCount,
                    tmp,
                    events,
                    t,
                    handleObj,
                    special,
                    handlers,
                    type,
                    namespaces,
                    origType,
                    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                if (!elemData || !(events = elemData.events)) {
                    return
                }
                types = (types || "").match(rnothtmlwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "")
                        .split(".")
                        .sort();
                    if (!type) {
                        for (type in events) {
                            jQuery
                                .event
                                .remove(elem, type + types[t], handler, selector, true)
                        }
                        continue
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ?
                        special.delegateType :
                        special.bindType) || type;
                    handlers = events[type] || [];
                    tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    origCount = j = handlers.length;
                    while (j--) {
                        handleObj = handlers[j];
                        if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                            handlers.splice(j, 1);
                            if (handleObj.selector) {
                                handlers.delegateCount -= 1
                            }
                            if (special.remove) {
                                special
                                    .remove
                                    .call(elem, handleObj)
                            }
                        }
                    }
                    if (origCount && !handlers.length) {
                        if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                            jQuery.removeEvent(elem, type, elemData.handle)
                        }
                        delete events[type]
                    }
                }
                if (jQuery.isEmptyObject(events)) {
                    dataPriv.remove(elem, "handle events")
                }
            },
            dispatch: function (nativeEvent) {
                var event = jQuery
                    .event
                    .fix(nativeEvent);
                var i,
                    j,
                    ret,
                    matched,
                    handleObj,
                    handlerQueue,
                    args = [arguments.length],
                    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
                    special = jQuery.event.special[event.type] || {};
                args[0] = event;
                for (i = 1; i < arguments.length; i += 1) {
                    args[i] = arguments[i]
                }
                event.delegateTarget = this;
                if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                    return
                }
                handlerQueue = jQuery
                    .event
                    .handlers
                    .call(this, event, handlers);
                i = 0;
                while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                    event.currentTarget = matched.elem;
                    j = 0;
                    while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                        if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                            event.handleObj = handleObj;
                            event.data = handleObj.data;
                            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                            if (ret !== undefined) {
                                if ((event.result = ret) === false) {
                                    event.preventDefault();
                                    event.stopPropagation()
                                }
                            }
                        }
                    }
                }
                if (special.postDispatch) {
                    special
                        .postDispatch
                        .call(this, event)
                }
                return event.result
            },
            handlers: function (event, handlers) {
                var i,
                    handleObj,
                    sel,
                    matchedHandlers,
                    matchedSelectors,
                    handlerQueue = [],
                    delegateCount = handlers.delegateCount,
                    cur = event.target;
                if (delegateCount && cur.nodeType && !(event.type === "click" && event.button >= 1)) {
                    for (; cur !== this; cur = cur.parentNode || this) {
                        if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                            matchedHandlers = [];
                            matchedSelectors = {};
                            for (i = 0; i < delegateCount; i += 1) {
                                handleObj = handlers[i];
                                sel = handleObj.selector + " ";
                                if (matchedSelectors[sel] === undefined) {
                                    matchedSelectors[sel] = handleObj.needsContext ?
                                        jQuery(sel, this).index(cur) > -1 :
                                        jQuery
                                        .find(sel, this, null, [cur])
                                        .length
                                }
                                if (matchedSelectors[sel]) {
                                    matchedHandlers.push(handleObj)
                                }
                            }
                            if (matchedHandlers.length) {
                                handlerQueue.push({
                                    elem: cur,
                                    handlers: matchedHandlers
                                })
                            }
                        }
                    }
                }
                cur = this;
                if (delegateCount < handlers.length) {
                    handlerQueue.push({
                        elem: cur,
                        handlers: handlers.slice(delegateCount)
                    })
                }
                return handlerQueue
            },
            addProp: function (name, hook) {
                Object.defineProperty(jQuery.Event.prototype, name, {
                    enumerable: true,
                    configurable: true,
                    get: isFunction(hook) ?
                        function () {
                            if (this.originalEvent) {
                                return hook(this.originalEvent)
                            }
                        } :
                        function () {
                            if (this.originalEvent) {
                                return this.originalEvent[name]
                            }
                        },
                    set: function (value) {
                        Object.defineProperty(this, name, {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: value
                        })
                    }
                })
            },
            fix: function (originalEvent) {
                return originalEvent[jQuery.expando] ?
                    originalEvent :
                    new jQuery.Event(originalEvent)
            },
            special: {
                load: {
                    noBubble: true
                },
                click: {
                    setup: function (data) {
                        var el = this || data;
                        if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                            leverageNative(el, "click", returnTrue)
                        }
                        return false
                    },
                    trigger: function (data) {
                        var el = this || data;
                        if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                            leverageNative(el, "click")
                        }
                        return true
                    },
                    _default: function (event) {
                        var target = event.target;
                        return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function (event) {
                        if (event.result !== undefined && event.originalEvent) {
                            event.originalEvent.returnValue = event.result
                        }
                    }
                }
            }
        };

        function leverageNative(el, type, expectSync) {
            if (!expectSync) {
                if (dataPriv.get(el, type) === undefined) {
                    jQuery
                        .event
                        .add(el, type, returnTrue)
                }
                return
            }
            dataPriv.set(el, type, false);
            jQuery
                .event
                .add(el, type, {
                    namespace: false,
                    handler: function (event) {
                        var notAsync,
                            result,
                            saved = dataPriv.get(this, type);
                        if ((event.isTrigger & 1) && this[type]) {
                            if (!saved.length) {
                                saved = slice.call(arguments);
                                dataPriv.set(this, type, saved);
                                notAsync = expectSync(this, type);
                                this[type]();
                                result = dataPriv.get(this, type);
                                if (saved !== result || notAsync) {
                                    dataPriv.set(this, type, false)
                                } else {
                                    result = {}
                                }
                                if (saved !== result) {
                                    event.stopImmediatePropagation();
                                    event.preventDefault();
                                    return result.value
                                }
                            } else if ((jQuery.event.special[type] || {}).delegateType) {
                                event.stopPropagation()
                            }
                        } else if (saved.length) {
                            dataPriv.set(this, type, {
                                value: jQuery
                                    .event
                                    .trigger(jQuery.extend(saved[0], jQuery.Event.prototype), saved.slice(1), this)
                            });
                            event.stopImmediatePropagation()
                        }
                    }
                })
        }
        jQuery.removeEvent = function (elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle)
            }
        };
        jQuery.Event = function (src, props) {
            if (!(this instanceof jQuery.Event)) {
                return new jQuery.Event(src, props)
            }
            if (src && src.type) {
                this.originalEvent = src;
                this.type = src.type;
                this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ?
                    returnTrue :
                    returnFalse;
                this.target = (src.target && src.target.nodeType === 3) ?
                    src.target.parentNode :
                    src.target;
                this.currentTarget = src.currentTarget;
                this.relatedTarget = src.relatedTarget;
            } else {
                this.type = src
            }
            if (props) {
                jQuery.extend(this, props)
            }
            this.timeStamp = src && src.timeStamp || Date.now();
            this[jQuery.expando] = true
        };
        jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: false,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue;
                if (e && !this.isSimulated) {
                    e.preventDefault()
                }
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue;
                if (e && !this.isSimulated) {
                    e.stopPropagation()
                }
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue;
                if (e && !this.isSimulated) {
                    e.stopImmediatePropagation()
                }
                this.stopPropagation()
            }
        };
        jQuery.each({
            altKey: true,
            bubbles: true,
            cancelable: true,
            changedTouches: true,
            ctrlKey: true,
            detail: true,
            eventPhase: true,
            metaKey: true,
            pageX: true,
            pageY: true,
            shiftKey: true,
            view: true,
            "char": true,
            code: true,
            charCode: true,
            key: true,
            keyCode: true,
            button: true,
            buttons: true,
            clientX: true,
            clientY: true,
            offsetX: true,
            offsetY: true,
            pointerId: true,
            pointerType: true,
            screenX: true,
            screenY: true,
            targetTouches: true,
            toElement: true,
            touches: true,
            which: function (event) {
                var button = event.button;
                if (event.which == null && rkeyEvent.test(event.type)) {
                    return event.charCode != null ?
                        event.charCode :
                        event.keyCode
                }
                if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                    if (button & 1) {
                        return 1
                    }
                    if (button & 2) {
                        return 3
                    }
                    if (button & 4) {
                        return 2
                    }
                    return 0
                }
                return event.which
            }
        }, jQuery.event.addProp);
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function (type, delegateType) {
            jQuery.event.special[type] = {
                setup: function () {
                    leverageNative(this, type, expectSync);
                    return false
                },
                trigger: function () {
                    leverageNative(this, type);
                    return true
                },
                delegateType: delegateType
            }
        });
        jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function (event) {
                    var ret,
                        target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;
                    if (!related || (related !== target && !jQuery.contains(target, related))) {
                        event.type = handleObj.origType;
                        ret = handleObj
                            .handler
                            .apply(this, arguments);
                        event.type = fix
                    }
                    return ret
                }
            }
        });
        jQuery
            .fn
            .extend({
                on: function (types, selector, data, fn) {
                    return on(this, types, selector, data, fn)
                },
                one: function (types, selector, data, fn) {
                    return on(this, types, selector, data, fn, 1)
                },
                off: function (types, selector, fn) {
                    var handleObj,
                        type;
                    if (types && types.preventDefault && types.handleObj) {
                        handleObj = types.handleObj;
                        jQuery(types.delegateTarget).off(handleObj.namespace ?
                            handleObj.origType + "." + handleObj.namespace :
                            handleObj.origType, handleObj.selector, handleObj.handler);
                        return this
                    }
                    if (typeof types === "object") {
                        for (type in types) {
                            this.off(type, selector, types[type])
                        }
                        return this
                    }
                    if (selector === false || typeof selector === "function") {
                        fn = selector;
                        selector = undefined
                    }
                    if (fn === false) {
                        fn = returnFalse
                    }
                    return this.each(function () {
                        jQuery
                            .event
                            .remove(this, types, fn, selector)
                    })
                }
            });
        var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            rnoInnerhtml = /<script|<style|<link/i,
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

        function manipulationTarget(elem, content) {
            if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ?
                    content :
                    content.firstChild, "tr")) {
                return jQuery(elem).children("tbody")[0] || elem
            }
            return elem
        }

        function disableScript(elem) {
            elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
            return elem
        }

        function restoreScript(elem) {
            if ((elem.type || "").slice(0, 5) === "true/") {
                elem.type = elem
                    .type
                    .slice(5)
            } else {
                elem.removeAttribute("type")
            }
            return elem
        }

        function cloneCopyEvent(src, dest) {
            var i,
                l,
                type,
                pdataOld,
                pdataCur,
                udataOld,
                udataCur,
                events;
            if (dest.nodeType !== 1) {
                return
            }
            if (dataPriv.hasData(src)) {
                pdataOld = dataPriv.access(src);
                pdataCur = dataPriv.set(dest, pdataOld);
                events = pdataOld.events;
                if (events) {
                    delete pdataCur.handle;
                    pdataCur.events = {};
                    for (type in events) {
                        for (i = 0, l = events[type].length; i < l; i += 1) {
                            jQuery
                                .event
                                .add(dest, type, events[type][i])
                        }
                    }
                }
            }
            if (dataUser.hasData(src)) {
                udataOld = dataUser.access(src);
                udataCur = jQuery.extend({}, udataOld);
                dataUser.set(dest, udataCur)
            }
        }

        function fixInput(src, dest) {
            var nodeName = dest
                .nodeName
                .toLowerCase();
            if (nodeName === "input" && rcheckableType.test(src.type)) {
                dest.checked = src.checked;
            } else if (nodeName === "input" || nodeName === "textarea") {
                dest.defaultValue = src.defaultValue
            }
        }

        function domManip(collection, args, callback, ignored) {
            args = concat.apply([], args);
            var fragment,
                first,
                scripts,
                hasScripts,
                node,
                doc,
                i = 0,
                l = collection.length,
                iNoClone = l - 1,
                value = args[0],
                valueIsFunction = isFunction(value);
            if (valueIsFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
                return collection.each(function (index) {
                    var self = collection.eq(index);
                    if (valueIsFunction) {
                        args[0] = value.call(this, index, self.html())
                    }
                    domManip(self, args, callback, ignored)
                })
            }
            if (l) {
                fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first
                }
                if (first || ignored) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (; i < l; i += 1) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"))
                            }
                        }
                        callback.call(collection[i], node, i)
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i += 1) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src && (node.type || "").toLowerCase() !== "module") {
                                    if (jQuery._evalUrl && !node.noModule) {
                                        jQuery._evalUrl(node.src, {
                                            nonce: node.nonce || node.getAttribute("nonce")
                                        })
                                    }
                                } else {
                                    DOMEval(node.textContent.replace(rcleanScript, ""), node, doc)
                                }
                            }
                        }
                    }
                }
            }
            return collection
        }

        function remove(elem, selector, keepData) {
            var node,
                nodes = selector ?
                jQuery.filter(selector, elem) :
                elem,
                i = 0;
            for (;
                (node = nodes[i]) != null; i += 1) {
                if (!keepData && node.nodeType === 1) {
                    jQuery.cleanData(getAll(node))
                }
                if (node.parentNode) {
                    if (keepData && isAttached(node)) {
                        setGlobalEval(getAll(node, "script"))
                    }
                    node
                        .parentNode
                        .removeChild(node)
                }
            }
            return elem
        }
        jQuery.extend({
            htmlPrefilter: function (html) {
                return html.replace(rxhtmlTag, "<$1></$2>")
            },
            clone: function (elem, dataAndEvents, deepDataAndEvents) {
                var i,
                    l,
                    srcElements,
                    destElements,
                    clone = elem.cloneNode(true),
                    inPage = isAttached(elem);
                if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                    destElements = getAll(clone);
                    srcElements = getAll(elem);
                    for (i = 0, l = srcElements.length; i < l; i += 1) {
                        fixInput(srcElements[i], destElements[i])
                    }
                }
                if (dataAndEvents) {
                    if (deepDataAndEvents) {
                        srcElements = srcElements || getAll(elem);
                        destElements = destElements || getAll(clone);
                        for (i = 0, l = srcElements.length; i < l; i += 1) {
                            cloneCopyEvent(srcElements[i], destElements[i])
                        }
                    } else {
                        cloneCopyEvent(elem, clone)
                    }
                }
                destElements = getAll(clone, "script");
                if (destElements.length > 0) {
                    setGlobalEval(destElements, !inPage && getAll(elem, "script"))
                }
                return clone
            },
            cleanData: function (elems) {
                var data,
                    elem,
                    type,
                    special = jQuery.event.special,
                    i = 0;
                for (;
                    (elem = elems[i]) !== undefined; i += 1) {
                    if (acceptData(elem)) {
                        if ((data = elem[dataPriv.expando])) {
                            if (data.events) {
                                for (type in data.events) {
                                    if (special[type]) {
                                        jQuery
                                            .event
                                            .remove(elem, type);
                                    } else {
                                        jQuery.removeEvent(elem, type, data.handle)
                                    }
                                }
                            }
                            elem[dataPriv.expando] = undefined
                        }
                        if (elem[dataUser.expando]) {
                            elem[dataUser.expando] = undefined
                        }
                    }
                }
            }
        });
        jQuery
            .fn
            .extend({
                detach: function (selector) {
                    return remove(this, selector, true)
                },
                remove: function (selector) {
                    return remove(this, selector)
                },
                text: function (value) {
                    return access(this, function (value) {
                        return value === undefined ?
                            jQuery.text(this) :
                            this
                            .empty()
                            .each(function () {
                                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                    this.textContent = value
                                }
                            })
                    }, null, value, arguments.length)
                },
                append: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var target = manipulationTarget(this, elem);
                            target.appendChild(elem)
                        }
                    })
                },
                prepend: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var target = manipulationTarget(this, elem);
                            target.insertBefore(elem, target.firstChild)
                        }
                    })
                },
                before: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.parentNode) {
                            this
                                .parentNode
                                .insertBefore(elem, this)
                        }
                    })
                },
                after: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.parentNode) {
                            this
                                .parentNode
                                .insertBefore(elem, this.nextSibling)
                        }
                    })
                },
                empty: function () {
                    var elem,
                        i = 0;
                    for (;
                        (elem = this[i]) != null; i += 1) {
                        if (elem.nodeType === 1) {
                            jQuery.cleanData(getAll(elem, false));
                            elem.textContent = ""
                        }
                    }
                    return this
                },
                clone: function (dataAndEvents, deepDataAndEvents) {
                    dataAndEvents = dataAndEvents == null ?
                        false :
                        dataAndEvents;
                    deepDataAndEvents = deepDataAndEvents == null ?
                        dataAndEvents :
                        deepDataAndEvents;
                    return this.map(function () {
                        return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
                    })
                },
                html: function (value) {
                    return access(this, function (value) {
                        var elem = this[0] || {},
                            i = 0,
                            l = this.length;
                        if (value === undefined && elem.nodeType === 1) {
                            return elem.innerHTML
                        }
                        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                            value = jQuery.htmlPrefilter(value);
                            try {
                                for (; i < l; i += 1) {
                                    elem = this[i] || {};
                                    if (elem.nodeType === 1) {
                                        jQuery.cleanData(getAll(elem, false));
                                        elem.innerHTML = value
                                    }
                                }
                                elem = 0;
                            } catch (e) {}
                        }
                        if (elem) {
                            this
                                .empty()
                                .append(value)
                        }
                    }, null, value, arguments.length)
                },
                replaceWith: function () {
                    var ignored = [];
                    return domManip(this, arguments, function (elem) {
                        var parent = this.parentNode;
                        if (jQuery.inArray(this, ignored) < 0) {
                            jQuery.cleanData(getAll(this));
                            if (parent) {
                                parent.replaceChild(elem, this)
                            }
                        }
                    }, ignored)
                }
            });
        jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (name, original) {
            jQuery.fn[name] = function (selector) {
                var elems,
                    ret = [],
                    insert = jQuery(selector),
                    last = insert.length - 1,
                    i = 0;
                for (; i <= last; i += 1) {
                    elems = i === last ?
                        this :
                        this.clone(true);
                    jQuery(insert[i])[original](elems);
                    push.apply(ret, elems.get())
                }
                return this.pushStack(ret)
            }
        });
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var getStyles = function (elem) {
            var view = elem.ownerDocument.defaultView;
            if (!view || !view.opener) {
                view = window
            }
            return view.getComputedStyle(elem)
        };
        var rboxStyle = new RegExp(cssExpand.join("|"), "i");
        (function () {
            function computeStyleTests() {
                if (!div) {
                    return
                }
                container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
                div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:aut" +
                    "o;border:1px;padding:1px;width:60%;top:1%";
                documentElement
                    .appendChild(container)
                    .appendChild(div);
                var divStyle = window.getComputedStyle(div);
                pixelPositionVal = divStyle.top !== "1%";
                reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
                div.style.right = "60%";
                pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
                boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
                div.style.position = "absolute";
                scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
                documentElement.removeChild(container);
                div = null
            }

            function roundPixelMeasures(measure) {
                return Math.round(parseFloat(measure))
            }
            var pixelPositionVal,
                boxSizingReliableVal,
                scrollboxSizeVal,
                pixelBoxStylesVal,
                reliableMarginLeftVal,
                container = document.createElement("div"),
                div = document.createElement("div");
            if (!div.style) {
                return
            }
            div.style.backgroundClip = "content-box";
            div
                .cloneNode(true)
                .style
                .backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";
            jQuery.extend(support, {
                boxSizingReliable: function () {
                    computeStyleTests();
                    return boxSizingReliableVal
                },
                pixelBoxStyles: function () {
                    computeStyleTests();
                    return pixelBoxStylesVal
                },
                pixelPosition: function () {
                    computeStyleTests();
                    return pixelPositionVal
                },
                reliableMarginLeft: function () {
                    computeStyleTests();
                    return reliableMarginLeftVal
                },
                scrollboxSize: function () {
                    computeStyleTests();
                    return scrollboxSizeVal
                }
            })
        })();

        function curCSS(elem, name, computed) {
            var width,
                minWidth,
                maxWidth,
                ret,
                style = elem.style;
            computed = computed || getStyles(elem);
            if (computed) {
                ret = computed.getPropertyValue(name) || computed[name];
                if (ret === "" && !isAttached(elem)) {
                    ret = jQuery.style(elem, name)
                }
                if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth
                }
            }
            return ret !== undefined ?
                ret + "" :
                ret
        }

        function addGetHookIf(conditionFn, hookFn) {
            return {
                get: function () {
                    if (conditionFn()) {
                        delete this.get;
                        return
                    }
                    return (this.get = hookFn).apply(this, arguments)
                }
            }
        }
        var cssPrefixes = [
                "Webkit", "Moz", "ms"
            ],
            emptyStyle = document
            .createElement("div")
            .style,
            vendorProps = {};

        function vendorPropName(name) {
            var capName = name[0].toUpperCase() + name.slice(1),
                i = cssPrefixes.length;
            while (i--) {
                name = cssPrefixes[i] + capName;
                if (name in emptyStyle) {
                    return name
                }
            }
        }

        function finalPropName(name) {
            var final = jQuery.cssProps[name] || vendorProps[name];
            if (final) {
                return final
            }
            if (name in emptyStyle) {
                return name
            }
            return vendorProps[name] = vendorPropName(name) || name
        }
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            rcustomProp = /^--/,
            cssShow = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            cssNormalTransform = {
                letterSpacing: "0",
                fontWeight: "400"
            };

        function setPositiveNumber(elem, value, subtract) {
            var matches = rcssNum.exec(value);
            return matches ?
                Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
                value
        }

        function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
            var i = dimension === "width" ?
                1 :
                0,
                extra = 0,
                delta = 0;
            if (box === (isBorderBox ?
                    "border" :
                    "content")) {
                return 0
            }
            for (; i < 4; i += 2) {
                if (box === "margin") {
                    delta += jQuery.css(elem, box + cssExpand[i], true, styles)
                }
                if (!isBorderBox) {
                    delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    if (box !== "padding") {
                        delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    } else {
                        extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
                    }
                } else {
                    if (box === "content") {
                        delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles)
                    }
                    if (box !== "margin") {
                        delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
                    }
                }
            }
            if (!isBorderBox && computedVal >= 0) {
                delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5)) || 0
            }
            return delta
        }

        function getWidthOrHeight(elem, dimension, extra) {
            var styles = getStyles(elem),
                boxSizingNeeded = !support.boxSizingReliable() || extra,
                isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                valueIsBorderBox = isBorderBox,
                val = curCSS(elem, dimension, styles),
                offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
            if (rnumnonpx.test(val)) {
                if (!extra) {
                    return val
                }
                val = "auto"
            }
            if ((!support.boxSizingReliable() && isBorderBox || val === "auto" || !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && elem.getClientRects().length) {
                isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
                valueIsBorderBox = offsetProp in elem;
                if (valueIsBorderBox) {
                    val = elem[offsetProp]
                }
            }
            val = parseFloat(val) || 0;
            return (val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ?
                "border" :
                "content"), valueIsBorderBox, styles, val)) + "px"
        }
        jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function (elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return ret === "" ?
                                "1" :
                                ret
                        }
                    }
                }
            },
            cssNumber: {
                "animationIterationCount": true,
                "columnCount": true,
                "fillOpacity": true,
                "flexGrow": true,
                "flexShrink": true,
                "fontWeight": true,
                "gridArea": true,
                "gridColumn": true,
                "gridColumnEnd": true,
                "gridColumnStart": true,
                "gridRow": true,
                "gridRowEnd": true,
                "gridRowStart": true,
                "lineHeight": true,
                "opacity": true,
                "order": true,
                "orphans": true,
                "widows": true,
                "zIndex": true,
                "zoom": true
            },
            cssProps: {},
            style: function (elem, name, value, extra) {
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                    return
                }
                var ret,
                    type,
                    hooks,
                    origName = camelCase(name),
                    isCustomProp = rcustomProp.test(name),
                    style = elem.style;
                if (!isCustomProp) {
                    name = finalPropName(origName)
                }
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                if (value !== undefined) {
                    type = typeof value;
                    if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                        value = adjustCSS(elem, name, ret);
                        type = "number"
                    }
                    if (value == null || value !== value) {
                        return
                    }
                    if (type === "number" && !isCustomProp) {
                        value += ret && ret[3] || (jQuery.cssNumber[origName] ?
                            "" :
                            "px")
                    }
                    if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                        style[name] = "inherit"
                    }
                    if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                        if (isCustomProp) {
                            style.setProperty(name, value)
                        } else {
                            style[name] = value
                        }
                    }
                } else {
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                        return ret
                    }
                    return style[name]
                }
            },
            css: function (elem, name, extra, styles) {
                var val,
                    num,
                    hooks,
                    origName = camelCase(name),
                    isCustomProp = rcustomProp.test(name);
                if (!isCustomProp) {
                    name = finalPropName(origName)
                }
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                if (hooks && "get" in hooks) {
                    val = hooks.get(elem, true, extra)
                }
                if (val === undefined) {
                    val = curCSS(elem, name, styles)
                }
                if (val === "normal" && name in cssNormalTransform) {
                    val = cssNormalTransform[name]
                }
                if (extra === "" || extra) {
                    num = parseFloat(val);
                    return extra === true || isFinite(num) ?
                        num || 0 :
                        val
                }
                return val
            }
        });
        jQuery.each([
            "height", "width"
        ], function (i, dimension) {
            jQuery.cssHooks[dimension] = {
                get: function (elem, computed, extra) {
                    if (computed) {
                        return rdisplayswap.test(jQuery.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                            swap(elem, cssShow, function () {
                                return getWidthOrHeight(elem, dimension, extra)
                            }) :
                            getWidthOrHeight(elem, dimension, extra)
                    }
                },
                set: function (elem, value, extra) {
                    var matches,
                        styles = getStyles(elem),
                        scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
                        boxSizingNeeded = scrollboxSizeBuggy || extra,
                        isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                        subtract = extra ?
                        boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) :
                        0;
                    if (isBorderBox && scrollboxSizeBuggy) {
                        subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5)
                    }
                    if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                        elem.style[dimension] = value;
                        value = jQuery.css(elem, dimension)
                    }
                    return setPositiveNumber(elem, value, subtract)
                }
            }
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
            if (computed) {
                return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
                    marginLeft: 0
                }, function () {
                    return elem
                        .getBoundingClientRect()
                        .left
                })) + "px"
            }
        });
        jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function (value) {
                    var i = 0,
                        expanded = {},
                        parts = typeof value === "string" ?
                        value.split(" ") :
                        [value];
                    for (; i < 4; i += 1) {
                        expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
                    }
                    return expanded
                }
            };
            if (prefix !== "margin") {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
            }
        });
        jQuery
            .fn
            .extend({
                css: function (name, value) {
                    return access(this, function (elem, name, value) {
                        var styles,
                            len,
                            map = {},
                            i = 0;
                        if (Array.isArray(name)) {
                            styles = getStyles(elem);
                            len = name.length;
                            for (; i < len; i += 1) {
                                map[name[i]] = jQuery.css(elem, name[i], false, styles)
                            }
                            return map
                        }
                        return value !== undefined ?
                            jQuery.style(elem, name, value) :
                            jQuery.css(elem, name)
                    }, name, value, arguments.length > 1)
                }
            });

        function Tween(elem, options, prop, end, easing) {
            return new Tween
                .prototype
                .init(elem, options, prop, end, easing)
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
            constructor: Tween,
            init: function (elem, options, prop, end, easing, unit) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || jQuery.easing._default;
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || (jQuery.cssNumber[prop] ?
                    "" :
                    "px")
            },
            cur: function () {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ?
                    hooks.get(this) :
                    Tween
                    .propHooks
                    ._default
                    .get(this)
            },
            run: function (percent) {
                var eased,
                    hooks = Tween.propHooks[this.prop];
                if (this.options.duration) {
                    this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
                } else {
                    this.pos = eased = percent
                }
                this.now = (this.end - this.start) * eased + this.start;
                if (this.options.step) {
                    this
                        .options
                        .step
                        .call(this.elem, this.now, this)
                }
                if (hooks && hooks.set) {
                    hooks.set(this)
                } else {
                    Tween
                        .propHooks
                        ._default
                        .set(this)
                }
                return this
            }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
            _default: {
                get: function (tween) {
                    var result;
                    if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                        return tween.elem[tween.prop]
                    }
                    result = jQuery.css(tween.elem, tween.prop, "");
                    return !result || result === "auto" ?
                        0 :
                        result
                },
                set: function (tween) {
                    if (jQuery.fx.step[tween.prop]) {
                        jQuery.fx.step[tween.prop](tween)
                    } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
                    } else {
                        tween.elem[tween.prop] = tween.now
                    }
                }
            }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function (tween) {
                if (tween.elem.nodeType && tween.elem.parentNode) {
                    tween.elem[tween.prop] = tween.now
                }
            }
        };
        jQuery.easing = {
            linear: function (p) {
                return p
            },
            swing: function (p) {
                return 0.5 - Math.cos(p * Math.PI) / 2
            },
            _default: "swing"
        };
        jQuery.fx = Tween.prototype.init;
        jQuery.fx.step = {};
        var fxNow,
            inProgress,
            rfxtypes = /^(?:toggle|show|hide)$/,
            rrun = /queueHooks$/;

        function schedule() {
            if (inProgress) {
                if (document.hidden === false && window.requestAnimationFrame) {
                    window.requestAnimationFrame(schedule)
                } else {
                    window.setTimeout(schedule, jQuery.fx.interval)
                }
                jQuery
                    .fx
                    .tick()
            }
        }

        function createFxNow() {
            window
                .setTimeout(function () {
                    fxNow = undefined
                });
            return (fxNow = Date.now())
        }

        function genFx(type, includeWidth) {
            var which,
                i = 0,
                attrs = {
                    height: type
                };
            includeWidth = includeWidth ?
                1 :
                0;
            for (; i < 4; i += 2 - includeWidth) {
                which = cssExpand[i];
                attrs["margin" + which] = attrs["padding" + which] = type
            }
            if (includeWidth) {
                attrs.opacity = attrs.width = type
            }
            return attrs
        }

        function createTween(value, prop, animation) {
            var tween,
                collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
                index = 0,
                length = collection.length;
            for (; index < length; index += 1) {
                if ((tween = collection[index].call(animation, prop, value))) {
                    return tween
                }
            }
        }

        function defaultPrefilter(elem, props, opts) {
            var prop,
                value,
                toggle,
                hooks,
                oldfire,
                propTween,
                restoreDisplay,
                display,
                isBox = "width" in props || "height" in props,
                anim = this,
                orig = {},
                style = elem.style,
                hidden = elem.nodeType && isHiddenWithinTree(elem),
                dataShow = dataPriv.get(elem, "fxshow");
            if (!opts.queue) {
                hooks = jQuery._queueHooks(elem, "fx");
                if (hooks.unqueued == null) {
                    hooks.unqueued = 0;
                    oldfire = hooks.empty.fire;
                    hooks.empty.fire = function () {
                        if (!hooks.unqueued) {
                            oldfire()
                        }
                    }
                }
                hooks.unqueued += 1;
                anim.always(function () {
                    anim
                        .always(function () {
                            hooks.unqueued -= 1;
                            if (!jQuery.queue(elem, "fx").length) {
                                hooks
                                    .empty
                                    .fire()
                            }
                        })
                })
            }
            for (prop in props) {
                value = props[prop];
                if (rfxtypes.test(value)) {
                    delete props[prop];
                    toggle = toggle || value === "toggle";
                    if (value === (hidden ?
                            "hide" :
                            "show")) {
                        if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                            hidden = true;
                        } else {
                            continue
                        }
                    }
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
                }
            }
            propTween = !jQuery.isEmptyObject(props);
            if (!propTween && jQuery.isEmptyObject(orig)) {
                return
            }
            if (isBox && elem.nodeType === 1) {
                opts.overflow = [style.overflow, style.overflowX, style.overflowY];
                restoreDisplay = dataShow && dataShow.display;
                if (restoreDisplay == null) {
                    restoreDisplay = dataPriv.get(elem, "display")
                }
                display = jQuery.css(elem, "display");
                if (display === "none") {
                    if (restoreDisplay) {
                        display = restoreDisplay
                    } else {
                        showHide([elem], true);
                        restoreDisplay = elem.style.display || restoreDisplay;
                        display = jQuery.css(elem, "display");
                        showHide([elem])
                    }
                }
                if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                    if (jQuery.css(elem, "float") === "none") {
                        if (!propTween) {
                            anim
                                .done(function () {
                                    style.display = restoreDisplay
                                });
                            if (restoreDisplay == null) {
                                display = style.display;
                                restoreDisplay = display === "none" ?
                                    "" :
                                    display
                            }
                        }
                        style.display = "inline-block"
                    }
                }
            }
            if (opts.overflow) {
                style.overflow = "hidden";
                anim.always(function () {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2]
                })
            }
            propTween = false;
            for (prop in orig) {
                if (!propTween) {
                    if (dataShow) {
                        if ("hidden" in dataShow) {
                            hidden = dataShow.hidden
                        }
                    } else {
                        dataShow = dataPriv.access(elem, "fxshow", {
                            display: restoreDisplay
                        })
                    }
                    if (toggle) {
                        dataShow.hidden = !hidden
                    }
                    if (hidden) {
                        showHide([elem], true)
                    }
                    anim
                        .done(function () {
                            if (!hidden) {
                                showHide([elem])
                            }
                            dataPriv.remove(elem, "fxshow");
                            for (prop in orig) {
                                jQuery.style(elem, prop, orig[prop])
                            }
                        })
                }
                propTween = createTween(hidden ?
                    dataShow[prop] :
                    0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = propTween.start;
                    if (hidden) {
                        propTween.end = propTween.start;
                        propTween.start = 0
                    }
                }
            }
        }

        function propFilter(props, specialEasing) {
            var index,
                name,
                easing,
                value,
                hooks;
            for (index in props) {
                name = camelCase(index);
                easing = specialEasing[name];
                value = props[index];
                if (Array.isArray(value)) {
                    easing = value[1];
                    value = props[index] = value[0]
                }
                if (index !== name) {
                    props[name] = value;
                    delete props[index]
                }
                hooks = jQuery.cssHooks[name];
                if (hooks && "expand" in hooks) {
                    value = hooks.expand(value);
                    delete props[name];
                    for (index in value) {
                        if (!(index in props)) {
                            props[index] = value[index];
                            specialEasing[index] = easing
                        }
                    }
                } else {
                    specialEasing[name] = easing
                }
            }
        }

        function Animation(elem, properties, options) {
            var result,
                stopped,
                index = 0,
                length = Animation.prefilters.length,
                deferred = jQuery
                .Deferred()
                .always(function () {
                    delete tick.elem
                }),
                tick = function () {
                    if (stopped) {
                        return false
                    }
                    var currentTime = fxNow || createFxNow(),
                        remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                        temp = remaining / animation.duration || 0,
                        percent = 1 - temp,
                        index = 0,
                        length = animation.tweens.length;
                    for (; index < length; index += 1) {
                        animation
                            .tweens[index]
                            .run(percent)
                    }
                    deferred.notifyWith(elem, [animation, percent, remaining]);
                    if (percent < 1 && length) {
                        return remaining
                    }
                    if (!length) {
                        deferred.notifyWith(elem, [animation, 1, 0])
                    }
                    deferred.resolveWith(elem, [animation]);
                    return false
                },
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend({}, properties),
                    opts: jQuery.extend(true, {
                        specialEasing: {},
                        easing: jQuery.easing._default
                    }, options),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    tweens: [],
                    createTween: function (prop, end) {
                        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                        animation
                            .tweens
                            .push(tween);
                        return tween
                    },
                    stop: function (gotoEnd) {
                        var index = 0,
                            length = gotoEnd ?
                            animation.tweens.length :
                            0;
                        if (stopped) {
                            return this
                        }
                        stopped = true;
                        for (; index < length; index += 1) {
                            animation
                                .tweens[index]
                                .run(1)
                        }
                        if (gotoEnd) {
                            deferred.notifyWith(elem, [animation, 1, 0]);
                            deferred.resolveWith(elem, [animation, gotoEnd])
                        } else {
                            deferred.rejectWith(elem, [animation, gotoEnd])
                        }
                        return this
                    }
                }),
                props = animation.props;
            propFilter(props, animation.opts.specialEasing);
            for (; index < length; index += 1) {
                result = Animation
                    .prefilters[index]
                    .call(animation, elem, props, animation.opts);
                if (result) {
                    if (isFunction(result.stop)) {
                        jQuery
                            ._queueHooks(animation.elem, animation.opts.queue)
                            .stop = result
                            .stop
                            .bind(result)
                    }
                    return result
                }
            }
            jQuery.map(props, createTween, animation);
            if (isFunction(animation.opts.start)) {
                animation
                    .opts
                    .start
                    .call(elem, animation)
            }
            animation
                .progress(animation.opts.progress)
                .done(animation.opts.done, animation.opts.complete)
                .fail(animation.opts.fail)
                .always(animation.opts.always);
            jQuery
                .fx
                .timer(jQuery.extend(tick, {
                    elem: elem,
                    anim: animation,
                    queue: animation.opts.queue
                }));
            return animation
        }
        jQuery.Animation = jQuery.extend(Animation, {
            tweeners: {
                "*": [function (prop, value) {
                    var tween = this.createTween(prop, value);
                    adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                    return tween
                }]
            },
            tweener: function (props, callback) {
                if (isFunction(props)) {
                    callback = props;
                    props = ["*"]
                } else {
                    props = props.match(rnothtmlwhite)
                }
                var prop,
                    index = 0,
                    length = props.length;
                for (; index < length; index += 1) {
                    prop = props[index];
                    Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                    Animation
                        .tweeners[prop]
                        .unshift(callback)
                }
            },
            prefilters: [defaultPrefilter],
            prefilter: function (callback, prepend) {
                if (prepend) {
                    Animation
                        .prefilters
                        .unshift(callback)
                } else {
                    Animation
                        .prefilters
                        .push(callback)
                }
            }
        });
        jQuery.speed = function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ?
                jQuery.extend({}, speed) :
                {
                    complete: fn || !fn && easing || isFunction(speed) && speed,
                    duration: speed,
                    easing: fn && easing || easing && !isFunction(easing) && easing
                };
            if (jQuery.fx.off) {
                opt.duration = 0
            } else {
                if (typeof opt.duration !== "number") {
                    if (opt.duration in jQuery.fx.speeds) {
                        opt.duration = jQuery.fx.speeds[opt.duration]
                    } else {
                        opt.duration = jQuery.fx.speeds._default
                    }
                }
            }
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx"
            }
            opt.old = opt.complete;
            opt.complete = function () {
                if (isFunction(opt.old)) {
                    opt
                        .old
                        .call(this)
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue)
                }
            };
            return opt
        };
        jQuery
            .fn
            .extend({
                fadeTo: function (speed, to, easing, callback) {
                    return this
                        .filter(isHiddenWithinTree)
                        .css("opacity", 0)
                        .show()
                        .end()
                        .animate({
                            opacity: to
                        }, speed, easing, callback)
                },
                animate: function (prop, speed, easing, callback) {
                    var empty = jQuery.isEmptyObject(prop),
                        optall = jQuery.speed(speed, easing, callback),
                        doAnimation = function () {
                            var anim = Animation(this, jQuery.extend({}, prop), optall);
                            if (empty || dataPriv.get(this, "finish")) {
                                anim.stop(true)
                            }
                        };
                    doAnimation.finish = doAnimation;
                    return empty || optall.queue === false ?
                        this.each(doAnimation) :
                        this.queue(optall.queue, doAnimation)
                },
                stop: function (type, clearQueue, gotoEnd) {
                    var stopQueue = function (hooks) {
                        var stop = hooks.stop;
                        delete hooks.stop;
                        stop(gotoEnd)
                    };
                    if (typeof type !== "string") {
                        gotoEnd = clearQueue;
                        clearQueue = type;
                        type = undefined
                    }
                    if (clearQueue && type !== false) {
                        this.queue(type || "fx", [])
                    }
                    return this.each(function () {
                        var dequeue = true,
                            index = type != null && type + "queueHooks",
                            timers = jQuery.timers,
                            data = dataPriv.get(this);
                        if (index) {
                            if (data[index] && data[index].stop) {
                                stopQueue(data[index])
                            }
                        } else {
                            for (index in data) {
                                if (data[index] && data[index].stop && rrun.test(index)) {
                                    stopQueue(data[index])
                                }
                            }
                        }
                        for (index = timers.length; index -= 1;) {
                            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                                timers[index]
                                    .anim
                                    .stop(gotoEnd);
                                dequeue = false;
                                timers.splice(index, 1)
                            }
                        }
                        if (dequeue || !gotoEnd) {
                            jQuery.dequeue(this, type)
                        }
                    })
                },
                finish: function (type) {
                    if (type !== false) {
                        type = type || "fx"
                    }
                    return this.each(function () {
                        var index,
                            data = dataPriv.get(this),
                            queue = data[type + "queue"],
                            hooks = data[type + "queueHooks"],
                            timers = jQuery.timers,
                            length = queue ?
                            queue.length :
                            0;
                        data.finish = true;
                        jQuery.queue(this, type, []);
                        if (hooks && hooks.stop) {
                            hooks
                                .stop
                                .call(this, true)
                        }
                        for (index = timers.length; index -= 1;) {
                            if (timers[index].elem === this && timers[index].queue === type) {
                                timers[index]
                                    .anim
                                    .stop(true);
                                timers.splice(index, 1)
                            }
                        }
                        for (index = 0; index < length; index += 1) {
                            if (queue[index] && queue[index].finish) {
                                queue[index]
                                    .finish
                                    .call(this)
                            }
                        }
                        delete data.finish
                    })
                }
            });
        jQuery.each([
            "toggle", "show", "hide"
        ], function (i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function (speed, easing, callback) {
                return speed == null || typeof speed === "boolean" ?
                    cssFn.apply(this, arguments) :
                    this.animate(genFx(name, true), speed, easing, callback)
            }
        });
        jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (name, props) {
            jQuery.fn[name] = function (speed, easing, callback) {
                return this.animate(props, speed, easing, callback)
            }
        });
        jQuery.timers = [];
        jQuery.fx.tick = function () {
            var timer,
                i = 0,
                timers = jQuery.timers;
            fxNow = Date.now();
            for (; i < timers.length; i += 1) {
                timer = timers[i];
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1)
                }
            }
            if (!timers.length) {
                jQuery
                    .fx
                    .stop()
            }
            fxNow = undefined
        };
        jQuery.fx.timer = function (timer) {
            jQuery
                .timers
                .push(timer);
            jQuery
                .fx
                .start()
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function () {
            if (inProgress) {
                return
            }
            inProgress = true;
            schedule()
        };
        jQuery.fx.stop = function () {
            inProgress = null
        };
        jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        };
        jQuery.fn.delay = function (time, type) {
            time = jQuery.fx ?
                jQuery.fx.speeds[time] || time :
                time;
            type = type || "fx";
            return this.queue(type, function (next, hooks) {
                var timeout = window.setTimeout(next, time);
                hooks.stop = function () {
                    window.clearTimeout(timeout)
                }
            })
        };
        (function () {
            var input = document.createElement("input"),
                select = document.createElement("select"),
                opt = select.appendChild(document.createElement("option"));
            input.type = "checkbox";
            support.checkOn = input.value !== "";
            support.optSelected = opt.selected;
            input = document.createElement("input");
            input.value = "t";
            input.type = "radio";
            support.radioValue = input.value === "t"
        })();
        var boolHook,
            attrHandle = jQuery.expr.attrHandle;
        jQuery
            .fn
            .extend({
                attr: function (name, value) {
                    return access(this, jQuery.attr, name, value, arguments.length > 1)
                },
                removeAttr: function (name) {
                    return this.each(function () {
                        jQuery.removeAttr(this, name)
                    })
                }
            });
        jQuery.extend({
            attr: function (elem, name, value) {
                var ret,
                    hooks,
                    nType = elem.nodeType;
                if (nType === 3 || nType === 8 || nType === 2) {
                    return
                }
                if (typeof elem.getAttribute === "undefined") {
                    return jQuery.prop(elem, name, value)
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ?
                        boolHook :
                        undefined)
                }
                if (value !== undefined) {
                    if (value === null) {
                        jQuery.removeAttr(elem, name);
                        return
                    }
                    if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret
                    }
                    elem.setAttribute(name, value + "");
                    return value
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                }
                ret = jQuery
                    .find
                    .attr(elem, name);
                return ret == null ?
                    undefined :
                    ret
            },
            attrHooks: {
                type: {
                    set: function (elem, value) {
                        if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val
                            }
                            return value
                        }
                    }
                }
            },
            removeAttr: function (elem, value) {
                var name,
                    i = 0,
                    attrNames = value && value.match(rnothtmlwhite);
                if (attrNames && elem.nodeType === 1) {
                    while ((name = attrNames[i++])) {
                        elem.removeAttribute(name)
                    }
                }
            }
        });
        boolHook = {
            set: function (elem, value, name) {
                if (value === false) {
                    jQuery.removeAttr(elem, name)
                } else {
                    elem.setAttribute(name, name)
                }
                return name
            }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function (elem, name, isXML) {
                var ret,
                    handle,
                    lowercaseName = name.toLowerCase();
                if (!isXML) {
                    handle = attrHandle[lowercaseName];
                    attrHandle[lowercaseName] = ret;
                    ret = getter(elem, name, isXML) != null ?
                        lowercaseName :
                        null;
                    attrHandle[lowercaseName] = handle
                }
                return ret
            }
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i,
            rclickable = /^(?:a|area)$/i;
        jQuery
            .fn
            .extend({
                prop: function (name, value) {
                    return access(this, jQuery.prop, name, value, arguments.length > 1)
                },
                removeProp: function (name) {
                    return this.each(function () {
                        delete this[jQuery.propFix[name] || name]
                    })
                }
            });
        jQuery.extend({
            prop: function (elem, name, value) {
                var ret,
                    hooks,
                    nType = elem.nodeType;
                if (nType === 3 || nType === 8 || nType === 2) {
                    return
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    name = jQuery.propFix[name] || name;
                    hooks = jQuery.propHooks[name]
                }
                if (value !== undefined) {
                    if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret
                    }
                    return (elem[name] = value)
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                }
                return elem[name]
            },
            propHooks: {
                tabIndex: {
                    get: function (elem) {
                        var tabindex = jQuery
                            .find
                            .attr(elem, "tabindex");
                        if (tabindex) {
                            return parseInt(tabindex, 10)
                        }
                        if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                            return 0
                        }
                        return -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        });
        if (!support.optSelected) {
            jQuery.propHooks.selected = {
                get: function (elem) {
                    var parent = elem.parentNode;
                    if (parent && parent.parentNode) {
                        parent.parentNode.selectedIndex
                    }
                    return null
                },
                set: function (elem) {
                    var parent = elem.parentNode;
                    if (parent) {
                        parent.selectedIndex;
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex
                        }
                    }
                }
            }
        }
        jQuery
            .each([
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable"
            ], function () {
                jQuery.propFix[this.toLowerCase()] = this
            });

        function stripAndCollapse(value) {
            var tokens = value.match(rnothtmlwhite) || [];
            return tokens.join(" ")
        }

        function getClass(elem) {
            return elem.getAttribute && elem.getAttribute("class") || ""
        }

        function classesToArray(value) {
            if (Array.isArray(value)) {
                return value
            }
            if (typeof value === "string") {
                return value.match(rnothtmlwhite) || []
            }
            return []
        }
        jQuery
            .fn
            .extend({
                addClass: function (value) {
                    var classes,
                        elem,
                        cur,
                        curValue,
                        clazz,
                        j,
                        finalValue,
                        i = 0;
                    if (isFunction(value)) {
                        return this.each(function (j) {
                            jQuery(this).addClass(value.call(this, j, getClass(this)))
                        })
                    }
                    classes = classesToArray(value);
                    if (classes.length) {
                        while ((elem = this[i++])) {
                            curValue = getClass(elem);
                            cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                            if (cur) {
                                j = 0;
                                while ((clazz = classes[j++])) {
                                    if (cur.indexOf(" " + clazz + " ") < 0) {
                                        cur += clazz + " "
                                    }
                                }
                                finalValue = stripAndCollapse(cur);
                                if (curValue !== finalValue) {
                                    elem.setAttribute("class", finalValue)
                                }
                            }
                        }
                    }
                    return this
                },
                removeClass: function (value) {
                    var classes,
                        elem,
                        cur,
                        curValue,
                        clazz,
                        j,
                        finalValue,
                        i = 0;
                    if (isFunction(value)) {
                        return this.each(function (j) {
                            jQuery(this).removeClass(value.call(this, j, getClass(this)))
                        })
                    }
                    if (!arguments.length) {
                        return this.attr("class", "")
                    }
                    classes = classesToArray(value);
                    if (classes.length) {
                        while ((elem = this[i++])) {
                            curValue = getClass(elem);
                            cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                            if (cur) {
                                j = 0;
                                while ((clazz = classes[j++])) {
                                    while (cur.indexOf(" " + clazz + " ") > -1) {
                                        cur = cur.replace(" " + clazz + " ", " ")
                                    }
                                }
                                finalValue = stripAndCollapse(cur);
                                if (curValue !== finalValue) {
                                    elem.setAttribute("class", finalValue)
                                }
                            }
                        }
                    }
                    return this
                },
                toggleClass: function (value, stateVal) {
                    var type = typeof value,
                        isValidValue = type === "string" || Array.isArray(value);
                    if (typeof stateVal === "boolean" && isValidValue) {
                        return stateVal ?
                            this.addClass(value) :
                            this.removeClass(value)
                    }
                    if (isFunction(value)) {
                        return this.each(function (i) {
                            jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal)
                        })
                    }
                    return this.each(function () {
                        var className,
                            i,
                            self,
                            classNames;
                        if (isValidValue) {
                            i = 0;
                            self = jQuery(this);
                            classNames = classesToArray(value);
                            while ((className = classNames[i++])) {
                                if (self.hasClass(className)) {
                                    self.removeClass(className)
                                } else {
                                    self.addClass(className)
                                }
                            }
                        } else if (value === undefined || type === "boolean") {
                            className = getClass(this);
                            if (className) {
                                dataPriv.set(this, "__className__", className)
                            }
                            if (this.setAttribute) {
                                this.setAttribute("class", className || value === false ?
                                    "" :
                                    dataPriv.get(this, "__className__") || "")
                            }
                        }
                    })
                },
                hasClass: function (selector) {
                    var className,
                        elem,
                        i = 0;
                    className = " " + selector + " ";
                    while ((elem = this[i++])) {
                        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                            return true
                        }
                    }
                    return false
                }
            });
        var rreturn = /\r/g;
        jQuery
            .fn
            .extend({
                val: function (value) {
                    var hooks,
                        ret,
                        valueIsFunction,
                        elem = this[0];
                    if (!arguments.length) {
                        if (elem) {
                            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[
                                elem
                                .nodeName
                                .toLowerCase()
                            ];
                            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                                return ret
                            }
                            ret = elem.value;
                            if (typeof ret === "string") {
                                return ret.replace(rreturn, "")
                            }
                            return ret == null ?
                                "" :
                                ret
                        }
                        return
                    }
                    valueIsFunction = isFunction(value);
                    return this.each(function (i) {
                        var val;
                        if (this.nodeType !== 1) {
                            return
                        }
                        if (valueIsFunction) {
                            val = value.call(this, i, jQuery(this).val())
                        } else {
                            val = value
                        }
                        if (val == null) {
                            val = ""
                        } else if (typeof val === "number") {
                            val += ""
                        } else if (Array.isArray(val)) {
                            val = jQuery.map(val, function (value) {
                                return value == null ?
                                    "" :
                                    value + ""
                            })
                        }
                        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[
                            this
                            .nodeName
                            .toLowerCase()
                        ];
                        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                            this.value = val
                        }
                    })
                }
            });
        jQuery.extend({
            valHooks: {
                option: {
                    get: function (elem) {
                        var val = jQuery
                            .find
                            .attr(elem, "value");
                        return val != null ?
                            val :
                            stripAndCollapse(jQuery.text(elem))
                    }
                },
                select: {
                    get: function (elem) {
                        var value,
                            option,
                            i,
                            options = elem.options,
                            index = elem.selectedIndex,
                            one = elem.type === "select-one",
                            values = one ?
                            null :
                            [],
                            max = one ?
                            index + 1 :
                            options.length;
                        if (index < 0) {
                            i = max
                        } else {
                            i = one ?
                                index :
                                0
                        }
                        for (; i < max; i += 1) {
                            option = options[i];
                            if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                                value = jQuery(option).val();
                                if (one) {
                                    return value
                                }
                                values.push(value)
                            }
                        }
                        return values
                    },
                    set: function (elem, value) {
                        var optionSet,
                            option,
                            options = elem.options,
                            values = jQuery.makeArray(value),
                            i = options.length;
                        while (i--) {
                            option = options[i];
                            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                                optionSet = true
                            }
                        }
                        if (!optionSet) {
                            elem.selectedIndex = -1
                        }
                        return values
                    }
                }
            }
        });
        jQuery.each([
            "radio", "checkbox"
        ], function () {
            jQuery.valHooks[this] = {
                set: function (elem, value) {
                    if (Array.isArray(value)) {
                        return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1)
                    }
                }
            };
            if (!support.checkOn) {
                jQuery.valHooks[this].get = function (elem) {
                    return elem.getAttribute("value") === null ?
                        "on" :
                        elem.value
                }
            }
        });
        support.focusin = "onfocusin" in window;
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
            stopPropagationCallback = function (e) {
                e.stopPropagation()
            };
        jQuery.extend(jQuery.event, {
            trigger: function (event, data, elem, onlyHandlers) {
                var i,
                    cur,
                    tmp,
                    bubbleType,
                    ontype,
                    handle,
                    special,
                    lastElement,
                    eventPath = [elem || document],
                    type = hasOwn.call(event, "type") ?
                    event.type :
                    event,
                    namespaces = hasOwn.call(event, "namespace") ?
                    event
                    .namespace
                    .split(".") :
                    [];
                cur = lastElement = tmp = elem = elem || document;
                if (elem.nodeType === 3 || elem.nodeType === 8) {
                    return
                }
                if (rfocusMorph.test(type + jQuery.event.triggered)) {
                    return
                }
                if (type.indexOf(".") > -1) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespaces.sort()
                }
                ontype = type.indexOf(":") < 0 && "on" + type;
                event = event[jQuery.expando] ?
                    event :
                    new jQuery.Event(type, typeof event === "object" && event);
                event.isTrigger = onlyHandlers ?
                    2 :
                    3;
                event.namespace = namespaces.join(".");
                event.rnamespace = event.namespace ?
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                    null;
                event.result = undefined;
                if (!event.target) {
                    event.target = elem
                }
                data = data == null ?
                    [event] :
                    jQuery.makeArray(data, [event]);
                special = jQuery.event.special[type] || {};
                if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                    return
                }
                if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
                    bubbleType = special.delegateType || type;
                    if (!rfocusMorph.test(bubbleType + type)) {
                        cur = cur.parentNode
                    }
                    for (; cur; cur = cur.parentNode) {
                        eventPath.push(cur);
                        tmp = cur
                    }
                    if (tmp === (elem.ownerDocument || document)) {
                        eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                    }
                }
                i = 0;
                while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                    lastElement = cur;
                    event.type = i > 1 ?
                        bubbleType :
                        special.bindType || type;
                    handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
                    if (handle) {
                        handle.apply(cur, data)
                    }
                    handle = ontype && cur[ontype];
                    if (handle && handle.apply && acceptData(cur)) {
                        event.result = handle.apply(cur, data);
                        if (event.result === false) {
                            event.preventDefault()
                        }
                    }
                }
                event.type = type;
                if (!onlyHandlers && !event.isDefaultPrevented()) {
                    if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                        if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                            tmp = elem[ontype];
                            if (tmp) {
                                elem[ontype] = null
                            }
                            jQuery.event.triggered = type;
                            if (event.isPropagationStopped()) {
                                lastElement.addEventListener(type, stopPropagationCallback)
                            }
                            elem[type]();
                            if (event.isPropagationStopped()) {
                                lastElement.removeEventListener(type, stopPropagationCallback)
                            }
                            jQuery.event.triggered = undefined;
                            if (tmp) {
                                elem[ontype] = tmp
                            }
                        }
                    }
                }
                return event.result
            },
            simulate: function (type, elem, event) {
                var e = jQuery.extend(new jQuery.Event(), event, {
                    type: type,
                    isSimulated: true
                });
                jQuery
                    .event
                    .trigger(e, null, elem)
            }
        });
        jQuery
            .fn
            .extend({
                trigger: function (type, data) {
                    return this.each(function () {
                        jQuery
                            .event
                            .trigger(type, data, this)
                    })
                },
                triggerHandler: function (type, data) {
                    var elem = this[0];
                    if (elem) {
                        return jQuery
                            .event
                            .trigger(type, data, elem, true)
                    }
                }
            });
        if (!support.focusin) {
            jQuery
                .each({
                    focus: "focusin",
                    blur: "focusout"
                }, function (orig, fix) {
                    var handler = function (event) {
                        jQuery
                            .event
                            .simulate(fix, event.target, jQuery.event.fix(event))
                    };
                    jQuery.event.special[fix] = {
                        setup: function () {
                            var doc = this.ownerDocument || this,
                                attaches = dataPriv.access(doc, fix);
                            if (!attaches) {
                                doc.addEventListener(orig, handler, true)
                            }
                            dataPriv.access(doc, fix, (attaches || 0) + 1)
                        },
                        teardown: function () {
                            var doc = this.ownerDocument || this,
                                attaches = dataPriv.access(doc, fix) - 1;
                            if (!attaches) {
                                doc.removeEventListener(orig, handler, true);
                                dataPriv.remove(doc, fix)
                            } else {
                                dataPriv.access(doc, fix, attaches)
                            }
                        }
                    }
                })
        }
        var location = window.location;
        var nonce = Date.now();
        var rquery = (/\?/);
        jQuery.parseXML = function (data) {
            var xml;
            if (!data || typeof data !== "string") {
                return null
            }
            try {
                xml = (new window.DOMParser()).parseFromString(data, "text/xml")
            } catch (e) {
                xml = undefined
            }
            if (!xml || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data)
            }
            return xml
        };
        var rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;

        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (Array.isArray(obj)) {
                jQuery
                    .each(obj, function (i, v) {
                        if (traditional || rbracket.test(prefix)) {
                            add(prefix, v)
                        } else {
                            buildParams(prefix + "[" + (typeof v === "object" && v != null ?
                                i :
                                "") + "]", v, traditional, add)
                        }
                    })
            } else if (!traditional && toType(obj) === "object") {
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
                }
            } else {
                add(prefix, obj)
            }
        }
        jQuery.param = function (a, traditional) {
            var prefix,
                s = [],
                add = function (key, valueOrFunction) {
                    var value = isFunction(valueOrFunction) ?
                        valueOrFunction() :
                        valueOrFunction;
                    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ?
                        "" :
                        value)
                };
            if (a == null) {
                return ""
            }
            if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                jQuery
                    .each(a, function () {
                        add(this.name, this.value)
                    })
            } else {
                for (prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add)
                }
            }
            return s.join("&")
        };
        jQuery
            .fn
            .extend({
                serialize: function () {
                    return jQuery.param(this.serializeArray())
                },
                serializeArray: function () {
                    return this.map(function () {
                            var elements = jQuery.prop(this, "elements");
                            return elements ?
                                jQuery.makeArray(elements) :
                                this
                        })
                        .filter(function () {
                            var type = this.type;
                            return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
                        })
                        .map(function (i, elem) {
                            var val = jQuery(this).val();
                            if (val == null) {
                                return null
                            }
                            if (Array.isArray(val)) {
                                return jQuery.map(val, function (val) {
                                    return {
                                        name: elem.name,
                                        value: val.replace(rCRLF, "\r\n")
                                    }
                                })
                            }
                            return {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            }
                        })
                        .get()
                }
            });
        var r20 = /%20/g,
            rhash = /#.*$/,
            rantiCache = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            prefilters = {},
            transports = {},
            allTypes = "*/".concat("*"),
            originAnchor = document.createElement("a");
        originAnchor.href = location.href;

        function addToPrefiltersOrTransports(structure) {
            return function (dataTypeExpression, func) {
                if (typeof dataTypeExpression !== "string") {
                    func = dataTypeExpression;
                    dataTypeExpression = "*"
                }
                var dataType,
                    i = 0,
                    dataTypes = dataTypeExpression
                    .toLowerCase()
                    .match(rnothtmlwhite) || [];
                if (isFunction(func)) {
                    while ((dataType = dataTypes[i++])) {
                        if (dataType[0] === "+") {
                            dataType = dataType.slice(1) || "*";
                            (structure[dataType] = structure[dataType] || []).unshift(func);
                        } else {
                            (structure[dataType] = structure[dataType] || []).push(func)
                        }
                    }
                }
            }
        }

        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            var inspected = {},
                seekingTransport = (structure === transports);

            function inspect(dataType) {
                var selected;
                inspected[dataType] = true;
                jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                        options
                            .dataTypes
                            .unshift(dataTypeOrTransport);
                        inspect(dataTypeOrTransport);
                        return false
                    } else if (seekingTransport) {
                        return !(selected = dataTypeOrTransport)
                    }
                });
                return selected
            }
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
        }

        function ajaxExtend(target, src) {
            var key,
                deep,
                flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[key] ?
                        target :
                        (deep || (deep = {})))[key] = src[key]
                }
            }
            if (deep) {
                jQuery.extend(true, target, deep)
            }
            return target
        }

        function ajaxHandleResponses(s, jqXHR, responses) {
            var ct,
                type,
                finalDataType,
                firstDataType,
                contents = s.contents,
                dataTypes = s.dataTypes;
            while (dataTypes[0] === "*") {
                dataTypes.shift();
                if (ct === undefined) {
                    ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
                }
            }
            if (ct) {
                for (type in contents) {
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break
                    }
                }
            }
            if (dataTypes[0] in responses) {
                finalDataType = dataTypes[0]
            } else {
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break
                    }
                    if (!firstDataType) {
                        firstDataType = type
                    }
                }
                finalDataType = finalDataType || firstDataType
            }
            if (finalDataType) {
                if (finalDataType !== dataTypes[0]) {
                    dataTypes.unshift(finalDataType)
                }
                return responses[finalDataType]
            }
        }

        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2,
                current,
                conv,
                tmp,
                prev,
                converters = {},
                dataTypes = s
                .dataTypes
                .slice();
            if (dataTypes[1]) {
                for (conv in s.converters) {
                    converters[conv.toLowerCase()] = s.converters[conv]
                }
            }
            current = dataTypes.shift();
            while (current) {
                if (s.responseFields[current]) {
                    jqXHR[s.responseFields[current]] = response
                }
                if (!prev && isSuccess && s.dataFilter) {
                    response = s.dataFilter(response, s.dataType)
                }
                prev = current;
                current = dataTypes.shift();
                if (current) {
                    if (current === "*") {
                        current = prev;
                    } else if (prev !== "*" && prev !== current) {
                        conv = converters[prev + " " + current] || converters["* " + current];
                        if (!conv) {
                            for (conv2 in converters) {
                                tmp = conv2.split(" ");
                                if (tmp[1] === current) {
                                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                    if (conv) {
                                        if (conv === true) {
                                            conv = converters[conv2];
                                        } else if (converters[conv2] !== true) {
                                            current = tmp[0];
                                            dataTypes.unshift(tmp[1])
                                        }
                                        break
                                    }
                                }
                            }
                        }
                        if (conv !== true) {
                            if (conv && s.throws) {
                                response = conv(response)
                            } else {
                                try {
                                    response = conv(response)
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: conv ?
                                            e :
                                            "No conversion from " + prev + " to " + current
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return {
                state: "success",
                data: response
            }
        }
        jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: location.href,
                type: "GET",
                isLocal: rlocalProtocol.test(location.protocol),
                global: true,
                processData: true,
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": true,
                    "text json": JSON.parse,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: true,
                    context: true
                }
            },
            ajaxSetup: function (target, settings) {
                return settings ?
                    ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
                    ajaxExtend(jQuery.ajaxSettings, target)
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function (url, options) {
                if (typeof url === "object") {
                    options = url;
                    url = undefined
                }
                options = options || {};
                var transport,
                    cacheURL,
                    responseHeadersString,
                    responseHeaders,
                    timeoutTimer,
                    urlAnchor,
                    completed,
                    fireGlobals,
                    i,
                    uncached,
                    s = jQuery.ajaxSetup({}, options),
                    callbackContext = s.context || s,
                    globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
                    jQuery(callbackContext) :
                    jQuery.event,
                    deferred = jQuery.Deferred(),
                    completeDeferred = jQuery.Callbacks("once memory"),
                    statusCode = s.statusCode || {},
                    requestHeaders = {},
                    requestHeadersNames = {},
                    strAbort = "canceled",
                    jqXHR = {
                        readyState: 0,
                        getResponseHeader: function (key) {
                            var match;
                            if (completed) {
                                if (!responseHeaders) {
                                    responseHeaders = {};
                                    while ((match = rheaders.exec(responseHeadersString))) {
                                        responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2])
                                    }
                                }
                                match = responseHeaders[key.toLowerCase() + " "]
                            }
                            return match == null ?
                                null :
                                match.join(", ")
                        },
                        getAllResponseHeaders: function () {
                            return completed ?
                                responseHeadersString :
                                null
                        },
                        setRequestHeader: function (name, value) {
                            if (completed == null) {
                                name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                                requestHeaders[name] = value
                            }
                            return this
                        },
                        overrideMimeType: function (type) {
                            if (completed == null) {
                                s.mimeType = type
                            }
                            return this
                        },
                        statusCode: function (map) {
                            var code;
                            if (map) {
                                if (completed) {
                                    jqXHR.always(map[jqXHR.status])
                                } else {
                                    for (code in map) {
                                        statusCode[code] = [statusCode[code], map[code]]
                                    }
                                }
                            }
                            return this
                        },
                        abort: function (statusText) {
                            var finalText = statusText || strAbort;
                            if (transport) {
                                transport.abort(finalText)
                            }
                            done(0, finalText);
                            return this
                        }
                    };
                deferred.promise(jqXHR);
                s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
                s.type = options.method || options.type || s.method || s.type;
                s.dataTypes = (s.dataType || "*")
                    .toLowerCase()
                    .match(rnothtmlwhite) || [""];
                if (s.crossDomain == null) {
                    urlAnchor = document.createElement("a");
                    try {
                        urlAnchor.href = s.url;
                        urlAnchor.href = urlAnchor.href;
                        s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host
                    } catch (e) {
                        s.crossDomain = true
                    }
                }
                if (s.data && s.processData && typeof s.data !== "string") {
                    s.data = jQuery.param(s.data, s.traditional)
                }
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                if (completed) {
                    return jqXHR
                }
                fireGlobals = jQuery.event && s.global;
                if (fireGlobals && jQuery.active++ === 0) {
                    jQuery
                        .event
                        .trigger("ajaxStart")
                }
                s.type = s
                    .type
                    .toUpperCase();
                s.hasContent = !rnoContent.test(s.type);
                cacheURL = s
                    .url
                    .replace(rhash, "");
                if (!s.hasContent) {
                    uncached = s
                        .url
                        .slice(cacheURL.length);
                    if (s.data && (s.processData || typeof s.data === "string")) {
                        cacheURL += (rquery.test(cacheURL) ?
                            "&" :
                            "?") + s.data;
                        delete s.data
                    }
                    if (s.cache === false) {
                        cacheURL = cacheURL.replace(rantiCache, "$1");
                        uncached = (rquery.test(cacheURL) ?
                            "&" :
                            "?") + "_=" + (nonce++) + uncached
                    }
                    s.url = cacheURL + uncached;
                } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                    s.data = s
                        .data
                        .replace(r20, "+")
                }
                if (s.ifModified) {
                    if (jQuery.lastModified[cacheURL]) {
                        jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL])
                    }
                    if (jQuery.etag[cacheURL]) {
                        jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
                    }
                }
                if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                    jqXHR.setRequestHeader("Content-Type", s.contentType)
                }
                jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                    s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ?
                        ", " + allTypes + "; q=0.01" :
                        "") :
                    s.accepts["*"]);
                for (i in s.headers) {
                    jqXHR.setRequestHeader(i, s.headers[i])
                }
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
                    return jqXHR.abort()
                }
                strAbort = "abort";
                completeDeferred.add(s.complete);
                jqXHR.done(s.success);
                jqXHR.fail(s.error);
                transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                if (!transport) {
                    done(-1, "No Transport")
                } else {
                    jqXHR.readyState = 1;
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxSend", [jqXHR, s])
                    }
                    if (completed) {
                        return jqXHR
                    }
                    if (s.async && s.timeout > 0) {
                        timeoutTimer = window.setTimeout(function () {
                            jqXHR.abort("timeout")
                        }, s.timeout)
                    }
                    try {
                        completed = false;
                        transport.send(requestHeaders, done)
                    } catch (e) {
                        if (completed) {
                            throw e
                        }
                        done(-1, e)
                    }
                }

                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess,
                        success,
                        error,
                        response,
                        modified,
                        statusText = nativeStatusText;
                    if (completed) {
                        return
                    }
                    completed = true;
                    if (timeoutTimer) {
                        window.clearTimeout(timeoutTimer)
                    }
                    transport = undefined;
                    responseHeadersString = headers || "";
                    jqXHR.readyState = status > 0 ?
                        4 :
                        0;
                    isSuccess = status >= 200 && status < 300 || status === 304;
                    if (responses) {
                        response = ajaxHandleResponses(s, jqXHR, responses)
                    }
                    response = ajaxConvert(s, response, jqXHR, isSuccess);
                    if (isSuccess) {
                        if (s.ifModified) {
                            modified = jqXHR.getResponseHeader("Last-Modified");
                            if (modified) {
                                jQuery.lastModified[cacheURL] = modified
                            }
                            modified = jqXHR.getResponseHeader("etag");
                            if (modified) {
                                jQuery.etag[cacheURL] = modified
                            }
                        }
                        if (status === 204 || s.type === "HEAD") {
                            statusText = "nocontent";
                        } else if (status === 304) {
                            statusText = "notmodified";
                        } else {
                            statusText = response.state;
                            success = response.data;
                            error = response.error;
                            isSuccess = !error
                        }
                    } else {
                        error = statusText;
                        if (status || !statusText) {
                            statusText = "error";
                            if (status < 0) {
                                status = 0
                            }
                        }
                    }
                    jqXHR.status = status;
                    jqXHR.statusText = (nativeStatusText || statusText) + "";
                    if (isSuccess) {
                        deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
                    } else {
                        deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
                    }
                    jqXHR.statusCode(statusCode);
                    statusCode = undefined;
                    if (fireGlobals) {
                        globalEventContext.trigger(isSuccess ?
                            "ajaxSuccess" :
                            "ajaxError", [
                                jqXHR, s, isSuccess ?
                                success :
                                error
                            ])
                    }
                    completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                        if (!(--jQuery.active)) {
                            jQuery
                                .event
                                .trigger("ajaxStop")
                        }
                    }
                }
                return jqXHR
            },
            getJSON: function (url, data, callback) {
                return jQuery.get(url, data, callback, "json")
            },
            getScript: function (url, callback) {
                return jQuery.get(url, undefined, callback, "script")
            }
        });
        jQuery.each([
            "get", "post"
        ], function (i, method) {
            jQuery[method] = function (url, data, callback, type) {
                if (isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined
                }
                return jQuery.ajax(jQuery.extend({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                }, jQuery.isPlainObject(url) && url))
            }
        });
        jQuery._evalUrl = function (url, options) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                cache: true,
                async: false,
                global: false,
                converters: {
                    "text script": function () {}
                },
                dataFilter: function (response) {
                    jQuery.globalEval(response, options)
                }
            })
        };
        jQuery
            .fn
            .extend({
                wrapAll: function (html) {
                    var wrap;
                    if (this[0]) {
                        if (isFunction(html)) {
                            html = html.call(this[0])
                        }
                        wrap = jQuery(html, this[0].ownerDocument)
                            .eq(0)
                            .clone(true);
                        if (this[0].parentNode) {
                            wrap.insertBefore(this[0])
                        }
                        wrap
                            .map(function () {
                                var elem = this;
                                while (elem.firstElementChild) {
                                    elem = elem.firstElementChild
                                }
                                return elem
                            })
                            .append(this)
                    }
                    return this
                },
                wrapInner: function (html) {
                    if (isFunction(html)) {
                        return this.each(function (i) {
                            jQuery(this).wrapInner(html.call(this, i))
                        })
                    }
                    return this.each(function () {
                        var self = jQuery(this),
                            contents = self.contents();
                        if (contents.length) {
                            contents.wrapAll(html)
                        } else {
                            self.append(html)
                        }
                    })
                },
                wrap: function (html) {
                    var htmlIsFunction = isFunction(html);
                    return this.each(function (i) {
                        jQuery(this).wrapAll(htmlIsFunction ?
                            html.call(this, i) :
                            html)
                    })
                },
                unwrap: function (selector) {
                    this
                        .parent(selector)
                        .not("body")
                        .each(function () {
                            jQuery(this).replaceWith(this.childNodes)
                        });
                    return this
                }
            });
        jQuery.expr.pseudos.hidden = function (elem) {
            return !jQuery
                .expr
                .pseudos
                .visible(elem)
        };
        jQuery.expr.pseudos.visible = function (elem) {
            return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
        };
        jQuery.ajaxSettings.xhr = function () {
            try {
                return new window.XMLHttpRequest()
            } catch (e) {}
        };
        var xhrSuccessStatus = {
                0: 200,
                1223: 204
            },
            xhrSupported = jQuery
            .ajaxSettings
            .xhr();
        support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function (options) {
            var callback,
                errorCallback;
            if (support.cors || xhrSupported && !options.crossDomain) {
                return {
                    send: function (headers, complete) {
                        var i,
                            xhr = options.xhr();
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i]
                            }
                        }
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType)
                        }
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest"
                        }
                        for (i in headers) {
                            xhr.setRequestHeader(i, headers[i])
                        }
                        callback = function (type) {
                            return function () {
                                if (callback) {
                                    callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                                    if (type === "abort") {
                                        xhr.abort()
                                    } else if (type === "error") {
                                        if (typeof xhr.status !== "number") {
                                            complete(0, "error")
                                        } else {
                                            complete(xhr.status, xhr.statusText)
                                        }
                                    } else {
                                        complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ?
                                            {
                                                binary: xhr.response
                                            } :
                                            {
                                                text: xhr.responseText
                                            }, xhr.getAllResponseHeaders())
                                    }
                                }
                            }
                        };
                        xhr.onload = callback();
                        errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                        if (xhr.onabort !== undefined) {
                            xhr.onabort = errorCallback
                        } else {
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4) {
                                    window
                                        .setTimeout(function () {
                                            if (callback) {
                                                errorCallback()
                                            }
                                        })
                                }
                            }
                        }
                        callback = callback("abort");
                        try {
                            xhr.send(options.hasContent && options.data || null)
                        } catch (e) {
                            if (callback) {
                                throw e
                            }
                        }
                    },
                    abort: function () {
                        if (callback) {
                            callback()
                        }
                    }
                }
            }
        });
        jQuery.ajaxPrefilter(function (s) {
            if (s.crossDomain) {
                s.contents.script = false
            }
        });
        jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-e" +
                    "cmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function (text) {
                    jQuery.globalEval(text);
                    return text
                }
            }
        });
        jQuery.ajaxPrefilter("script", function (s) {
            if (s.cache === undefined) {
                s.cache = false
            }
            if (s.crossDomain) {
                s.type = "GET"
            }
        });
        jQuery.ajaxTransport("script", function (s) {
            if (s.crossDomain || s.scriptAttrs) {
                var script,
                    callback;
                return {
                    send: function (_, complete) {
                        script = jQuery("<script>")
                            .attr(s.scriptAttrs || {})
                            .prop({
                                charset: s.scriptCharset,
                                src: s.url
                            })
                            .on("load error", callback = function (evt) {
                                script.remove();
                                callback = null;
                                if (evt) {
                                    complete(evt.type === "error" ?
                                        404 :
                                        200, evt.type)
                                }
                            });
                        document
                            .head
                            .appendChild(script[0])
                    },
                    abort: function () {
                        if (callback) {
                            callback()
                        }
                    }
                }
            }
        });
        var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
                this[callback] = true;
                return callback
            }
        });
        jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
            var callbackName,
                overwritten,
                responseContainer,
                jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                    "url" :
                    typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
            if (jsonProp || s.dataTypes[0] === "jsonp") {
                callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
                    s.jsonpCallback() :
                    s.jsonpCallback;
                if (jsonProp) {
                    s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName)
                } else if (s.jsonp !== false) {
                    s.url += (rquery.test(s.url) ?
                        "&" :
                        "?") + s.jsonp + "=" + callbackName
                }
                s.converters["script json"] = function () {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called")
                    }
                    return responseContainer[0]
                };
                s.dataTypes[0] = "json";
                overwritten = window[callbackName];
                window[callbackName] = function () {
                    responseContainer = arguments
                };
                jqXHR.always(function () {
                    if (overwritten === undefined) {
                        jQuery(window).removeProp(callbackName);
                    } else {
                        window[callbackName] = overwritten
                    }
                    if (s[callbackName]) {
                        s.jsonpCallback = originalSettings.jsonpCallback;
                        oldCallbacks.push(callbackName)
                    }
                    if (responseContainer && isFunction(overwritten)) {
                        overwritten(responseContainer[0])
                    }
                    responseContainer = overwritten = undefined
                });
                return "script"
            }
        });
        support.createHTMLDocument = (function () {
            var body = document
                .implementation
                .createHTMLDocument("")
                .body;
            body.innerHTML = "<form></form><form></form>";
            return body.childNodes.length === 2
        })();
        jQuery.parseHTML = function (data, context, keepScripts) {
            if (typeof data !== "string") {
                return []
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false
            }
            var base,
                parsed,
                scripts;
            if (!context) {
                if (support.createHTMLDocument) {
                    context = document
                        .implementation
                        .createHTMLDocument("");
                    base = context.createElement("base");
                    base.href = document.location.href;
                    context
                        .head
                        .appendChild(base)
                } else {
                    context = document
                }
            }
            parsed = rsingleTag.exec(data);
            scripts = !keepScripts && [];
            if (parsed) {
                return [context.createElement(parsed[1])]
            }
            parsed = buildFragment([data], context, scripts);
            if (scripts && scripts.length) {
                jQuery(scripts).remove()
            }
            return jQuery.merge([], parsed.childNodes)
        };
        jQuery.fn.load = function (url, params, callback) {
            var selector,
                type,
                response,
                self = this,
                off = url.indexOf(" ");
            if (off > -1) {
                selector = stripAndCollapse(url.slice(off));
                url = url.slice(0, off)
            }
            if (isFunction(params)) {
                callback = params;
                params = undefined;
            } else if (params && typeof params === "object") {
                type = "POST"
            }
            if (self.length > 0) {
                jQuery
                    .ajax({
                        url: url,
                        type: type || "GET",
                        dataType: "html",
                        data: params
                    })
                    .done(function (responseText) {
                        response = arguments;
                        self.html(selector ?
                            jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
                            responseText);
                    })
                    .always(callback && function (jqXHR, status) {
                        self
                            .each(function () {
                                callback.apply(this, response || [jqXHR.responseText, status, jqXHR])
                            })
                    })
            }
            return this
        };
        jQuery.each([
            "ajaxStart",
            "ajaxStop",
            "ajaxComplete",
            "ajaxError",
            "ajaxSuccess",
            "ajaxSend"
        ], function (i, type) {
            jQuery.fn[type] = function (fn) {
                return this.on(type, fn)
            }
        });
        jQuery.expr.pseudos.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem
            }).length
        };
        jQuery.offset = {
            setOffset: function (elem, options, i) {
                var curPosition,
                    curLeft,
                    curCSSTop,
                    curTop,
                    curOffset,
                    curCSSLeft,
                    calculatePosition,
                    position = jQuery.css(elem, "position"),
                    curElem = jQuery(elem),
                    props = {};
                if (position === "static") {
                    elem.style.position = "relative"
                }
                curOffset = curElem.offset();
                curCSSTop = jQuery.css(elem, "top");
                curCSSLeft = jQuery.css(elem, "left");
                calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
                if (calculatePosition) {
                    curPosition = curElem.position();
                    curTop = curPosition.top;
                    curLeft = curPosition.left
                } else {
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCSSLeft) || 0
                }
                if (isFunction(options)) {
                    options = options.call(elem, i, jQuery.extend({}, curOffset))
                }
                if (options.top != null) {
                    props.top = (options.top - curOffset.top) + curTop
                }
                if (options.left != null) {
                    props.left = (options.left - curOffset.left) + curLeft
                }
                if ("using" in options) {
                    options
                        .using
                        .call(elem, props)
                } else {
                    curElem.css(props)
                }
            }
        };
        jQuery
            .fn
            .extend({
                offset: function (options) {
                    if (arguments.length) {
                        return options === undefined ?
                            this :
                            this.each(function (i) {
                                jQuery
                                    .offset
                                    .setOffset(this, options, i)
                            })
                    }
                    var rect,
                        win,
                        elem = this[0];
                    if (!elem) {
                        return
                    }
                    if (!elem.getClientRects().length) {
                        return {
                            top: 0,
                            left: 0
                        }
                    }
                    rect = elem.getBoundingClientRect();
                    win = elem.ownerDocument.defaultView;
                    return {
                        top: rect.top + win.pageYOffset,
                        left: rect.left + win.pageXOffset
                    }
                },
                position: function () {
                    if (!this[0]) {
                        return
                    }
                    var offsetParent,
                        offset,
                        doc,
                        elem = this[0],
                        parentOffset = {
                            top: 0,
                            left: 0
                        };
                    if (jQuery.css(elem, "position") === "fixed") {
                        offset = elem.getBoundingClientRect()
                    } else {
                        offset = this.offset();
                        doc = elem.ownerDocument;
                        offsetParent = elem.offsetParent || doc.documentElement;
                        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
                            offsetParent = offsetParent.parentNode
                        }
                        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
                            parentOffset = jQuery(offsetParent).offset();
                            parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                            parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true)
                        }
                    }
                    return {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        var offsetParent = this.offsetParent;
                        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                            offsetParent = offsetParent.offsetParent
                        }
                        return offsetParent || documentElement
                    })
                }
            });
        jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function (val) {
                return access(this, function (elem, method, val) {
                    var win;
                    if (isWindow(elem)) {
                        win = elem
                    } else if (elem.nodeType === 9) {
                        win = elem.defaultView
                    }
                    if (val === undefined) {
                        return win ?
                            win[prop] :
                            elem[method]
                    }
                    if (win) {
                        win.scrollTo(!top ?
                            val :
                            win.pageXOffset, top ?
                            val :
                            win.pageYOffset)
                    } else {
                        elem[method] = val
                    }
                }, method, val, arguments.length)
            }
        });
        jQuery.each([
            "top", "left"
        ], function (i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed
                }
            })
        });
        jQuery.each({
            Height: "height",
            Width: "width"
        }, function (name, type) {
            jQuery
                .each({
                    padding: "inner" + name,
                    content: type,
                    "": "outer" + name
                }, function (defaultExtra, funcName) {
                    jQuery.fn[funcName] = function (margin, value) {
                        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                            extra = defaultExtra || (margin === true || value === true ?
                                "margin" :
                                "border");
                        return access(this, function (elem, type, value) {
                                var doc;
                                if (isWindow(elem)) {
                                    return funcName.indexOf("outer") === 0 ?
                                        elem["inner" + name] :
                                        elem.document.documentElement["client" + name]
                                }
                                if (elem.nodeType === 9) {
                                    doc = elem.documentElement;
                                    return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
                                }
                                return value === undefined ?
                                    jQuery.css(elem, type, extra) :
                                    jQuery.style(elem, type, value, extra)
                            }, type, chainable ?
                            margin :
                            undefined, chainable)
                    }
                })
        });
        jQuery.each(("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mouse" +
            "move mouseover mouseout mouseenter mouseleave change select submit keydown keypr" +
            "ess keyup contextmenu").split(" "), function (i, name) {
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name)
            }
        });
        jQuery
            .fn
            .extend({
                hover: function (fnOver, fnOut) {
                    return this
                        .mouseenter(fnOver)
                        .mouseleave(fnOut || fnOver)
                }
            });
        jQuery
            .fn
            .extend({
                bind: function (types, data, fn) {
                    return this.on(types, null, data, fn)
                },
                unbind: function (types, fn) {
                    return this.off(types, null, fn)
                },
                delegate: function (selector, types, data, fn) {
                    return this.on(types, selector, data, fn)
                },
                undelegate: function (selector, types, fn) {
                    return arguments.length === 1 ?
                        this.off(selector, "**") :
                        this.off(types, selector || "**", fn)
                }
            });
        jQuery.proxy = function (fn, context) {
            var tmp,
                args,
                proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp
            }
            if (!isFunction(fn)) {
                return undefined
            }
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)))
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy
        };
        jQuery.holdReady = function (hold) {
            if (hold) {
                jQuery.readyWait += 1
            } else {
                jQuery.ready(true)
            }
        };
        jQuery.isArray = Array.isArray;
        jQuery.parseJSON = JSON.parse;
        jQuery.nodeName = nodeName;
        jQuery.isFunction = isFunction;
        jQuery.isWindow = isWindow;
        jQuery.camelCase = camelCase;
        jQuery.type = toType;
        jQuery.now = Date.now;
        jQuery.isNumeric = function (obj) {
            var type = jQuery.type(obj);
            return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj))
        };
        if (typeof define === "function" && define.amd) {
            define("jquery", [], function () {
                return jQuery
            })
        }
        var _jQuery = window.jQuery,
            _$ = window.$;
        jQuery.noConflict = function (deep) {
            if (window.$ === jQuery) {
                window.$ = _$
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery
            }
            return jQuery
        };
        if (!noGlobal) {
            window.jQuery = window.$ = jQuery
        }
        return jQuery
    });
/*underscore*/
(function () {
    var root = this;
    var previousUnderscore = root._;
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind,
        nativeCreate = Object.create;
    var Ctor = function () {};
    var _ = function (obj) {
        if (obj instanceof _) {
            return obj
        }
        if (!(this instanceof _)) {
            return new _(obj)
        }
        this._wrapped = obj
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _
        }
        exports._ = _
    } else {
        root._ = _
    }
    _.VERSION = '1.8.3';
    var optimizeCb = function (func, context, argCount) {
        if (context === void 0) {
            return func
        }
        switch (argCount == null ?
            3 :
            argCount) {
            case 1:
                return function (value) {
                    return func.call(context, value)
                };
            case 2:
                return function (value, other) {
                    return func.call(context, value, other)
                };
            case 3:
                return function (value, index, collection) {
                    return func.call(context, value, index, collection)
                };
            case 4:
                return function (accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection)
                }
        }
        return function () {
            return func.apply(context, arguments)
        }
    };
    var cb = function (value, context, argCount) {
        if (value == null) {
            return _.identity
        }
        if (_.isFunction(value)) {
            return optimizeCb(value, context, argCount)
        }
        if (_.isObject(value)) {
            return _.matcher(value)
        }
        return _.property(value)
    };
    _.iteratee = function (value, context) {
        return cb(value, context, Infinity)
    };
    var createAssigner = function (keysFunc, undefinedOnly) {
        return function (obj) {
            var length = arguments.length;
            if (length < 2 || obj == null) {
                return obj
            }
            for (var index = 1; index < length; index += 1) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i += 1) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) {
                        obj[key] = source[key]
                    }
                }
            }
            return obj
        }
    };
    var baseCreate = function (prototype) {
        if (!_.isObject(prototype)) {
            return {}
        }
        if (nativeCreate) {
            return nativeCreate(prototype)
        }
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result
    };
    var property = function (key) {
        return function (obj) {
            return obj == null ?
                void 0 :
                obj[key]
        }
    };
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    var isArrayLike = function (collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
    };
    _.each = _.forEach = function (obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i,
            length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i += 1) {
                iteratee(obj[i], i, obj)
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i += 1) {
                iteratee(obj[keys[i]], keys[i], obj)
            }
        }
        return obj
    };
    _.map = _.collect = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index += 1) {
            var currentKey = keys ?
                keys[index] :
                index;
            results[index] = iteratee(obj[currentKey], currentKey, obj)
        }
        return results
    };

    function createReduce(dir) {
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ?
                    keys[index] :
                    index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj)
            }
            return memo
        }
        return function (obj, iteratee, memo, context) {
            iteratee = optimizeCb(iteratee, context, 4);
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ?
                0 :
                length - 1;
            if (arguments.length < 3) {
                memo = obj[keys ?
                    keys[index] :
                    index];
                index += dir
            }
            return iterator(obj, iteratee, memo, keys, index, length)
        }
    }
    _.reduce = _.foldl = _.inject = createReduce(1);
    _.reduceRight = _.foldr = createReduce(-1);
    _.find = _.detect = function (obj, predicate, context) {
        var key;
        if (isArrayLike(obj)) {
            key = _.findIndex(obj, predicate, context)
        } else {
            key = _.findKey(obj, predicate, context)
        }
        if (key !== void 0 && key !== -1) {
            return obj[key]
        }
    }
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        predicate = cb(predicate, context);
        _.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) {
                results.push(value)
            }
        });
        return results
    };
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context)
    };
    _.every = _.all = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index += 1) {
            var currentKey = keys ?
                keys[index] :
                index;
            if (!predicate(obj[currentKey], currentKey, obj)) {
                return false
            }
        }
        return true
    };
    _.some = _.any = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index += 1) {
            var currentKey = keys ?
                keys[index] :
                index;
            if (predicate(obj[currentKey], currentKey, obj)) {
                return true
            }
        }
        return false
    };
    _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
        if (!isArrayLike(obj)) {
            obj = _.values(obj)
        }
        if (typeof fromIndex != 'number' || guard) {
            fromIndex = 0
        }
        return _.indexOf(obj, item, fromIndex) >= 0
    };
    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            var func = isFunc ?
                method :
                value[method];
            return func == null ?
                func :
                func.apply(value, args)
        })
    };
    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key))
    };
    _.where = function (obj, attrs) {
        return _.filter(obj, _.matcher(attrs))
    };
    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matcher(attrs))
    };
    _.max = function (obj, iteratee, context) {
        var result = -Infinity,
            lastComputed = -Infinity,
            value,
            computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ?
                obj :
                _.values(obj);
            for (var i = 0, length = obj.length; i < length; i += 1) {
                value = obj[i];
                if (value > result) {
                    result = value
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed
                }
            })
        }
        return result
    };
    _.min = function (obj, iteratee, context) {
        var result = Infinity,
            lastComputed = Infinity,
            value,
            computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ?
                obj :
                _.values(obj);
            for (var i = 0, length = obj.length; i < length; i += 1) {
                value = obj[i];
                if (value < result) {
                    result = value
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = value;
                    lastComputed = computed
                }
            })
        }
        return result
    };
    _.shuffle = function (obj) {
        var set = isArrayLike(obj) ?
            obj :
            _.values(obj);
        var length = set.length;
        var shuffled = Array(length);
        for (var index = 0, rand; index < length; index += 1) {
            rand = _.random(0, index);
            if (rand !== index) {
                shuffled[index] = shuffled[rand]
            }
            shuffled[rand] = set[index]
        }
        return shuffled
    };
    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (!isArrayLike(obj)) {
                obj = _.values(obj)
            }
            return obj[_.random(obj.length - 1)]
        }
        return _
            .shuffle(obj)
            .slice(0, Math.max(0, n))
    };
    _.sortBy = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            }
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) {
                    return 1
                }
                if (a < b || b === void 0) {
                    return -1
                }
            }
            return left.index - right.index
        }), 'value')
    };
    var group = function (behavior) {
        return function (obj, iteratee, context) {
            var result = {};
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key)
            });
            return result
        }
    };
    _.groupBy = group(function (result, value, key) {
        if (_.has(result, key)) {
            result[key].push(value)
        } else {
            result[key] = [value]
        }
    });
    _.indexBy = group(function (result, value, key) {
        result[key] = value
    });
    _.countBy = group(function (result, value, key) {
        if (_.has(result, key)) {
            result[key] += 1
        } else {
            result[key] = 1
        }
    });
    _.toArray = function (obj) {
        if (!obj) {
            return []
        }
        if (_.isArray(obj)) {
            return slice.call(obj)
        }
        if (isArrayLike(obj)) {
            return _.map(obj, _.identity)
        }
        return _.values(obj)
    };
    _.size = function (obj) {
        if (obj == null) {
            return 0
        }
        return isArrayLike(obj) ?
            obj.length :
            _
            .keys(obj)
            .length
    };
    _.partition = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var pass = [],
            fail = [];
        _.each(obj, function (value, key, obj) {
            (predicate(value, key, obj) ?
                pass :
                fail).push(value)
        });
        return [pass, fail]
    };
    _.first = _.head = _.take = function (array, n, guard) {
        if (array == null) {
            return void 0
        }
        if (n == null || guard) {
            return array[0]
        }
        return _.initial(array, array.length - n)
    };
    _.initial = function (array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ?
            1 :
            n)))
    };
    _.last = function (array, n, guard) {
        if (array == null) {
            return void 0
        }
        if (n == null || guard) {
            return array[array.length - 1]
        }
        return _.rest(array, Math.max(0, array.length - n))
    };
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, n == null || guard ?
            1 :
            n)
    };
    _.compact = function (array) {
        return _.filter(array, _.identity)
    };
    var flatten = function (input, shallow, strict, startIndex) {
        var output = [],
            idx = 0;
        for (var i = startIndex || 0, length = getLength(input); i < length; i += 1) {
            var value = input[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                if (!shallow) {
                    value = flatten(value, shallow, strict)
                }
                var j = 0,
                    len = value.length;
                output.length += len;
                while (j < len) {
                    output[idx++] = value[j++]
                }
            } else if (!strict) {
                output[idx++] = value
            }
        }
        return output
    };
    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false)
    };
    _.without = function (array) {
        return _.difference(array, slice.call(arguments, 1))
    };
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false
        }
        if (iteratee != null) {
            iteratee = cb(iteratee, context)
        }
        var result = [];
        var seen = [];
        for (var i = 0, length = getLength(array); i < length; i += 1) {
            var value = array[i],
                computed = iteratee ?
                iteratee(value, i, array) :
                value;
            if (isSorted) {
                if (!i || seen !== computed) {
                    result.push(value)
                }
                seen = computed
            } else if (iteratee) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value)
                }
            } else if (!_.contains(result, value)) {
                result.push(value)
            }
        }
        return result
    };
    _.union = function () {
        return _.uniq(flatten(arguments, true, true))
    };
    _.intersection = function (array) {
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = getLength(array); i < length; i += 1) {
            var item = array[i];
            if (_.contains(result, item)) {
                continue
            }
            for (var j = 1; j < argsLength; j += 1) {
                if (!_.contains(arguments[j], item)) {
                    break
                }
            }
            if (j === argsLength) {
                result.push(item)
            }
        }
        return result
    };
    _.difference = function (array) {
        var rest = flatten(arguments, true, true, 1);
        return _.filter(array, function (value) {
            return !_.contains(rest, value)
        })
    };
    _.zip = function () {
        return _.unzip(arguments)
    };
    _.unzip = function (array) {
        var length = array && _
            .max(array, getLength)
            .length || 0;
        var result = Array(length);
        for (var index = 0; index < length; index += 1) {
            result[index] = _.pluck(array, index)
        }
        return result
    };
    _.object = function (list, values) {
        var result = {};
        for (var i = 0, length = getLength(list); i < length; i += 1) {
            if (values) {
                result[list[i]] = values[i]
            } else {
                result[list[i][0]] = list[i][1]
            }
        }
        return result
    };

    function createPredicateIndexFinder(dir) {
        return function (array, predicate, context) {
            predicate = cb(predicate, context);
            var length = getLength(array);
            var index = dir > 0 ?
                0 :
                length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) {
                    return index
                }
            }
            return -1
        }
    }
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);
    _.sortedIndex = function (array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0,
            high = getLength(array);
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value) {
                low = mid + 1
            } else {
                high = mid
            }
        }
        return low
    };

    function createIndexFinder(dir, predicateFind, sortedIndex) {
        return function (array, item, idx) {
            var i = 0,
                length = getLength(array);
            if (typeof idx == 'number') {
                if (dir > 0) {
                    i = idx >= 0 ?
                        idx :
                        Math.max(idx + length, i)
                } else {
                    length = idx >= 0 ?
                        Math.min(idx + 1, length) :
                        idx + length + 1
                }
            } else if (sortedIndex && idx && length) {
                idx = sortedIndex(array, item);
                return array[idx] === item ?
                    idx :
                    -1
            }
            if (item !== item) {
                idx = predicateFind(slice.call(array, i, length), _.isNaN);
                return idx >= 0 ?
                    idx + i :
                    -1
            }
            for (idx = dir > 0 ?
                i :
                length - 1; idx >= 0 && idx < length; idx += dir) {
                if (array[idx] === item) {
                    return idx
                }
            }
            return -1
        }
    }
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
    _.range = function (start, stop, step) {
        if (stop == null) {
            stop = start || 0;
            start = 0
        }
        step = step || 1;
        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);
        for (var idx = 0; idx < length; idx += 1, start += step) {
            range[idx] = start
        }
        return range
    };
    var executeBound = function (sourceFunc, boundFunc, context, callingContext, args) {
        if (!(callingContext instanceof boundFunc)) {
            return sourceFunc.apply(context, args)
        }
        var self = baseCreate(sourceFunc.prototype);
        var result = sourceFunc.apply(self, args);
        if (_.isObject(result)) {
            return result
        }
        return self
    };
    _.bind = function (func, context) {
        if (nativeBind && func.bind === nativeBind) {
            return nativeBind.apply(func, slice.call(arguments, 1))
        }
        if (!_.isFunction(func)) {
            throw new TypeError('Bind must be called on a function')
        }
        var args = slice.call(arguments, 2);
        var bound = function () {
            return executeBound(func, bound, context, this, args.concat(slice.call(arguments)))
        };
        return bound
    };
    _.partial = function (func) {
        var boundArgs = slice.call(arguments, 1);
        var bound = function () {
            var position = 0,
                length = boundArgs.length;
            var args = Array(length);
            for (var i = 0; i < length; i += 1) {
                args[i] = boundArgs[i] === _ ?
                    arguments[position++] :
                    boundArgs[i]
            }
            while (position < arguments.length) {
                args.push(arguments[position++])
            }
            return executeBound(func, bound, this, this, args)
        };
        return bound
    };
    _.bindAll = function (obj) {
        var i,
            length = arguments.length,
            key;
        if (length <= 1) {
            throw new Error('bindAll must be passed function names')
        }
        for (i = 1; i < length; i += 1) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj)
        }
        return obj
    };
    _.memoize = function (func, hasher) {
        var memoize = function (key) {
            var cache = memoize.cache;
            var address = '' + (hasher ?
                hasher.apply(this, arguments) :
                key);
            if (!_.has(cache, address)) {
                cache[address] = func.apply(this, arguments)
            }
            return cache[address]
        };
        memoize.cache = {};
        return memoize
    };
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args)
        }, wait)
    };
    _.defer = _.partial(_.delay, _, 1);
    _.throttle = function (func, wait, options) {
        var context,
            args,
            result;
        var timeout = null;
        var previous = 0;
        if (!options) {
            options = {}
        }
        var later = function () {
            previous = options.leading === false ?
                0 :
                _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null
            }
        }
        return function () {
            var now = _.now();
            if (!previous && options.leading === false) {
                previous = now
            }
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) {
                    context = args = null
                }
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }
            return result
        }
    };
    _.debounce = function (func, wait, immediate) {
        var timeout,
            args,
            context,
            timestamp,
            result;
        var later = function () {
            var last = _.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last)
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) {
                        context = args = null
                    }
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait)
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null
            }
            return result
        }
    };
    _.wrap = function (func, wrapper) {
        return _.partial(wrapper, func)
    };
    _.negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments)
        }
    };
    _.compose = function () {
        var args = arguments;
        var start = args.length - 1;
        return function () {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) {
                result = args[i].call(this, result)
            }
            return result
        }
    };
    _.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments)
            }
        }
    };
    _.before = function (times, func) {
        var memo;
        return function () {
            if (--times > 0) {
                memo = func.apply(this, arguments)
            }
            if (times <= 1) {
                func = null
            }
            return memo
        }
    };
    _.once = _.partial(_.before, 2);
    var hasEnumBug = !{
        toString: null
    }.propertyIsEnumerable('toString');
    var nonEnumerableProps = [
        'valueOf',
        'isPrototypeOf',
        'toString',
        'propertyIsEnumerable',
        'hasOwnProperty',
        'toLocaleString'
    ];

    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) {
            keys.push(prop)
        }
        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop)
            }
        }
    }
    _.keys = function (obj) {
        if (!_.isObject(obj)) {
            return []
        }
        if (nativeKeys) {
            return nativeKeys(obj)
        }
        var keys = [];
        for (var key in obj) {
            if (_.has(obj, key)) {
                keys.push(key)
            }
        }
        if (hasEnumBug) {
            collectNonEnumProps(obj, keys)
        }
        return keys
    };
    _.allKeys = function (obj) {
        if (!_.isObject(obj)) {
            return []
        }
        var keys = [];
        for (var key in obj) {
            keys.push(key)
        }
        if (hasEnumBug) {
            collectNonEnumProps(obj, keys)
        }
        return keys
    };
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i += 1) {
            values[i] = obj[keys[i]]
        }
        return values
    };
    _.mapObject = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = _.keys(obj),
            length = keys.length,
            results = {},
            currentKey;
        for (var index = 0; index < length; index += 1) {
            currentKey = keys[index];
            results[currentKey] = iteratee(obj[currentKey], currentKey, obj)
        }
        return results
    };
    _.pairs = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i += 1) {
            pairs[i] = [
                keys[i],
                obj[keys[i]]
            ]
        }
        return pairs
    };
    _.invert = function (obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i += 1) {
            result[obj[keys[i]]] = keys[i]
        }
        return result
    };
    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) {
                names.push(key)
            }
        }
        return names.sort()
    };
    _.extend = createAssigner(_.allKeys);
    _.extendOwn = _.assign = createAssigner(_.keys);
    _.findKey = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj),
            key;
        for (var i = 0, length = keys.length; i < length; i += 1) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) {
                return key
            }
        }
    };
    _.pick = function (object, oiteratee, context) {
        var result = {},
            obj = object,
            iteratee,
            keys;
        if (obj == null) {
            return result
        }
        if (_.isFunction(oiteratee)) {
            keys = _.allKeys(obj);
            iteratee = optimizeCb(oiteratee, context)
        } else {
            keys = flatten(arguments, false, false, 1);
            iteratee = function (value, key, obj) {
                return key in obj
            };
            obj = Object(obj)
        }
        for (var i = 0, length = keys.length; i < length; i += 1) {
            var key = keys[i];
            var value = obj[key];
            if (iteratee(value, key, obj)) {
                result[key] = value
            }
        }
        return result
    };
    _.omit = function (obj, iteratee, context) {
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee)
        } else {
            var keys = _.map(flatten(arguments, false, false, 1), String);
            iteratee = function (value, key) {
                return !_.contains(keys, key)
            }
        }
        return _.pick(obj, iteratee, context)
    };
    _.defaults = createAssigner(_.allKeys, true);
    _.create = function (prototype, props) {
        var result = baseCreate(prototype);
        if (props) {
            _.extendOwn(result, props)
        }
        return result
    };
    _.clone = function (obj) {
        if (!_.isObject(obj)) {
            return obj
        }
        return _.isArray(obj) ?
            obj.slice() :
            _.extend({}, obj)
    };
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj
    };
    _.isMatch = function (object, attrs) {
        var keys = _.keys(attrs),
            length = keys.length;
        if (object == null) {
            return !length
        }
        var obj = Object(object);
        for (var i = 0; i < length; i += 1) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) {
                return false
            }
        }
        return true
    };
    var eq = function (a, b, aStack, bStack) {
        if (a === b) {
            return a !== 0 || 1 / a === 1 / b
        }
        if (a == null || b == null) {
            return a === b
        }
        if (a instanceof _) {
            a = a._wrapped
        }
        if (b instanceof _) {
            b = b._wrapped
        }
        var className = toString.call(a);
        if (className !== toString.call(b)) {
            return false
        }
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) {
                    return +b !== +b
                }
                return +a === 0 ?
                    1 / +a === 1 / b :
                    +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b
        }
        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a != 'object' || typeof b != 'object') {
                return false
            }
            var aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                return false
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            if (aStack[length] === a) {
                return bStack[length] === b
            }
        }
        aStack.push(a);
        bStack.push(b);
        if (areArrays) {
            length = a.length;
            if (length !== b.length) {
                return false
            }
            while (length--) {
                if (!eq(a[length], b[length], aStack, bStack)) {
                    return false
                }
            }
        } else {
            var keys = _.keys(a),
                key;
            length = keys.length;
            if (_.keys(b).length !== length) {
                return false
            }
            while (length--) {
                key = keys[length];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) {
                    return false
                }
            }
        }
        aStack.pop();
        bStack.pop();
        return true
    };
    _.isEqual = function (a, b) {
        return eq(a, b)
    };
    _.isEmpty = function (obj) {
        if (obj == null) {
            return true
        }
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) {
            return obj.length === 0
        }
        return _
            .keys(obj)
            .length === 0
    };
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1)
    };
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]'
    };
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj
    };
    _.each([
        'Arguments',
        'Function',
        'String',
        'Number',
        'Date',
        'RegExp',
        'Error'
    ], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']'
        }
    });
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return _.has(obj, 'callee')
        }
    }
    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
        _.isFunction = function (obj) {
            return typeof obj == 'function' || false
        }
    }
    _.isFinite = function (obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj))
    };
    _.isNaN = function (obj) {
        return _.isNumber(obj) && obj !== +obj
    };
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]'
    };
    _.isNull = function (obj) {
        return obj === null
    };
    _.isUndefined = function (obj) {
        return obj === void 0
    };
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key)
    };
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this
    };
    _.identity = function (value) {
        return value
    };
    _.constant = function (value) {
        return function () {
            return value
        }
    };
    _.noop = function () {};
    _.property = property;
    _.propertyOf = function (obj) {
        return obj == null ?
            function () {} :
            function (key) {
                return obj[key]
            }
    };
    _.matcher = _.matches = function (attrs) {
        attrs = _.extendOwn({}, attrs);
        return function (obj) {
            return _.isMatch(obj, attrs)
        }
    };
    _.times = function (n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i += 1) {
            accum[i] = iteratee(i)
        }
        return accum
    };
    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0
        }
        return min + Math.floor(Math.random() * (max - min + 1))
    };
    _.now = Date.now || function () {
        return new Date().getTime()
    };
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);
    var createEscaper = function (map) {
        var escaper = function (match) {
            return map[match]
        };
        var source = '(?:' + _
            .keys(map)
            .join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function (string) {
            string = string == null ?
                '' :
                '' + string;
            return testRegexp.test(string) ?
                string.replace(replaceRegexp, escaper) :
                string
        }
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);
    _.result = function (object, property, fallback) {
        var value = object == null ?
            void 0 :
            object[property];
        if (value === void 0) {
            value = fallback
        }
        return _.isFunction(value) ?
            value.call(object) :
            value
    };
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = ++idCounter + '';
        return prefix ?
            prefix + id :
            id
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
    var escapeChar = function (match) {
        return '\\' + escapes[match]
    };
    _.template = function (text, settings, oldSettings) {
        if (!settings && oldSettings) {
            settings = oldSettings
        }
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text
                .slice(index, offset)
                .replace(escaper, escapeChar);
            index = offset + match.length;
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='"
            }
            return match
        });
        source += "';\n";
        if (!settings.variable) {
            source = 'with(obj||{}){\n' + source + '}\n'
        }
        source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments" +
            ",'');};\n" + source + 'return __p;\n';
        try {
            var render = new Function(settings.variable || 'obj', '_', source)
        } catch (e) {
            e.source = source;
            throw e
        }
        var template = function (data) {
            return render.call(this, data, _)
        };
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';
        return template
    };
    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance
    };
    var result = function (instance, obj) {
        return instance._chain ?
            _(obj).chain() :
            obj
    };
    _.mixin = function (obj) {
        _
            .each(_.functions(obj), function (name) {
                var func = _[name] = obj[name];
                _.prototype[name] = function () {
                    var args = [this._wrapped];
                    push.apply(args, arguments);
                    return result(this, func.apply(_, args))
                }
            })
    };
    _.mixin(_);
    _.each([
        'pop',
        'push',
        'reverse',
        'shift',
        'sort',
        'splice',
        'unshift'
    ], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0) {
                delete obj[0]
            }
            return result(this, obj)
        }
    });
    _.each([
        'concat', 'join', 'slice'
    ], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            return result(this, method.apply(this._wrapped, arguments))
        }
    });
    _.prototype.value = function () {
        return this._wrapped
    };
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
    _.prototype.toString = function () {
        return '' + this._wrapped
    };
    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function () {
            return _
        })
    }
}.call(this));

(function (factory) {

    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global;

    // Set up Backbone appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'jquery', 'exports'], function (_, $, exports) {
            // Export global even in AMD case in case this script is loaded with
            // others that may still expect a global Backbone.
            root.Backbone = factory(root, exports, _, $);
        });

        // Next for Node.js or CommonJS. jQuery may not be needed as a module.
    } else if (typeof exports !== 'undefined') {
        var _ = require('underscore'),
            $;
        try {
            $ = require('jquery');
        } catch (e) {}
        factory(root, exports, _, $);

        // Finally, as a browser global.
    } else {
        root.Backbone = factory(root, {}, root._, root.jQuery || root.Zepto || root.ender || root.$);
    }

})(function (root, Backbone, _, $) {

    // Initial Setup
    // -------------

    // Save the previous value of the `Backbone` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousBackbone = root.Backbone;

    var slice = Array.prototype.slice;
    Backbone.VERSION = '1.4.0';
    Backbone.$ = $;
    Backbone.noConflict = function () {
        root.Backbone = previousBackbone;
        return this;
    };

    Backbone.emulateHTTP = false;
    Backbone.emulateJSON = false;

    var Events = Backbone.Events = {};
    var eventSplitter = /\s+/;
    var _listening;

    var eventsApi = function (iteratee, events, name, callback, opts) {
        var i = 0,
            names;
        if (name && typeof name === 'object') {
            // Handle event maps.
            if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
            for (names = _.keys(name); i < names.length; i++) {
                events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
            }
        } else if (name && eventSplitter.test(name)) {
            // Handle space-separated event names by delegating them individually.
            for (names = name.split(eventSplitter); i < names.length; i++) {
                events = iteratee(events, names[i], callback, opts);
            }
        } else {
            // Finally, standard events.
            events = iteratee(events, name, callback, opts);
        }
        return events;
    };

    Events.on = function (name, callback, context) {
        this._events = eventsApi(onApi, this._events || {}, name, callback, {
            context: context,
            ctx: this,
            listening: _listening
        });
        if (_listening) {
            var listeners = this._listeners || (this._listeners = {});
            listeners[_listening.id] = _listening;
            _listening.interop = false;
        }
        return this;
    };

    Events.listenTo = function (obj, name, callback) {
        if (!obj) return this;
        var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var listening = _listening = listeningTo[id];
        if (!listening) {
            this._listenId || (this._listenId = _.uniqueId('l'));
            listening = _listening = listeningTo[id] = new Listening(this, obj);
        }
        var error = tryCatchOn(obj, name, callback, this);
        _listening = void 0;

        if (error) throw error;

        if (listening.interop) listening.on(name, callback);

        return this;
    };

    var onApi = function (events, name, callback, options) {
        if (callback) {
            var handlers = events[name] || (events[name] = []);
            var context = options.context,
                ctx = options.ctx,
                listening = options.listening;
            if (listening) listening.count++;

            handlers.push({
                callback: callback,
                context: context,
                ctx: context || ctx,
                listening: listening
            });
        }
        return events;
    };

    var tryCatchOn = function (obj, name, callback, context) {
        try {
            obj.on(name, callback, context);
        } catch (e) {
            return e;
        }
    };

    Events.off = function (name, callback, context) {
        if (!this._events) return this;
        this._events = eventsApi(offApi, this._events, name, callback, {
            context: context,
            listeners: this._listeners
        });

        return this;
    };

    Events.stopListening = function (obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;

        var ids = obj ? [obj._listenId] : _.keys(listeningTo);
        for (var i = 0; i < ids.length; i++) {
            var listening = listeningTo[ids[i]];

            // If listening doesn't exist, this object is not currently
            // listening to obj. Break out early.
            if (!listening) break;

            listening.obj.off(name, callback, this);
            if (listening.interop) listening.off(name, callback);
        }
        if (_.isEmpty(listeningTo)) this._listeningTo = void 0;

        return this;
    };

    // The reducing API that removes a callback from the `events` object.
    var offApi = function (events, name, callback, options) {
        if (!events) return;

        var context = options.context,
            listeners = options.listeners;
        var i = 0,
            names;

        // Delete all event listeners and "drop" events.
        if (!name && !context && !callback) {
            for (names = _.keys(listeners); i < names.length; i++) {
                listeners[names[i]].cleanup();
            }
            return;
        }

        names = name ? [name] : _.keys(events);
        for (; i < names.length; i++) {
            name = names[i];
            var handlers = events[name];

            // Bail out if there are no events stored.
            if (!handlers) break;

            // Find any remaining events.
            var remaining = [];
            for (var j = 0; j < handlers.length; j++) {
                var handler = handlers[j];
                if (
                    callback && callback !== handler.callback &&
                    callback !== handler.callback._callback ||
                    context && context !== handler.context
                ) {
                    remaining.push(handler);
                } else {
                    var listening = handler.listening;
                    if (listening) listening.off(name, callback);
                }
            }

            // Replace events if there are any remaining.  Otherwise, clean up.
            if (remaining.length) {
                events[name] = remaining;
            } else {
                delete events[name];
            }
        }

        return events;
    };

    Events.once = function (name, callback, context) {
        var events = eventsApi(onceMap, {}, name, callback, this.off.bind(this));
        if (typeof name === 'string' && context == null) callback = void 0;
        return this.on(events, callback, context);
    };

    Events.listenToOnce = function (obj, name, callback) {
        var events = eventsApi(onceMap, {}, name, callback, this.stopListening.bind(this, obj));
        return this.listenTo(obj, events);
    };

    var onceMap = function (map, name, callback, offer) {
        if (callback) {
            var once = map[name] = _.once(function () {
                offer(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
        }
        return map;
    };

    Events.trigger = function (name) {
        if (!this._events) return this;

        var length = Math.max(0, arguments.length - 1);
        var args = Array(length);
        for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

        eventsApi(triggerApi, this._events, name, void 0, args);
        return this;
    };

    var triggerApi = function (objEvents, name, callback, args) {
        if (objEvents) {
            var events = objEvents[name];
            var allEvents = objEvents.all;
            if (events && allEvents) allEvents = allEvents.slice();
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, [name].concat(args));
        }
        return objEvents;
    };

    var triggerEvents = function (events, args) {
        var ev, i = -1,
            l = events.length,
            a1 = args[0],
            a2 = args[1],
            a3 = args[2];
        switch (args.length) {
            case 0:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx);
                return;
            case 1:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1);
                return;
            case 2:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2);
                return;
            case 3:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                return;
            default:
                while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
                return;
        }
    };

    // A listening class that tracks and cleans up memory bindings
    // when all callbacks have been offed.
    var Listening = function (listener, obj) {
        this.id = listener._listenId;
        this.listener = listener;
        this.obj = obj;
        this.interop = true;
        this.count = 0;
        this._events = void 0;
    };

    Listening.prototype.on = Events.on;


    Listening.prototype.off = function (name, callback) {
        var cleanup;
        if (this.interop) {
            this._events = eventsApi(offApi, this._events, name, callback, {
                context: void 0,
                listeners: void 0
            });
            cleanup = !this._events;
        } else {
            this.count--;
            cleanup = this.count === 0;
        }
        if (cleanup) this.cleanup();
    };

    // Cleans up memory bindings between the listener and the listenee.
    Listening.prototype.cleanup = function () {
        delete this.listener._listeningTo[this.obj._listenId];
        if (!this.interop) delete this.obj._listeners[this.id];
    };

    // Aliases for backwards compatibility.
    Events.bind = Events.on;
    Events.unbind = Events.off;


    _.extend(Backbone, Events);

    var Model = Backbone.Model = function (attributes, options) {
        var attrs = attributes || {};
        options || (options = {});
        this.preinitialize.apply(this, arguments);
        this.cid = _.uniqueId(this.cidPrefix);
        this.attributes = {};
        if (options.collection) this.collection = options.collection;
        if (options.parse) attrs = this.parse(attrs, options) || {};
        var defaults = _.result(this, 'defaults');
        attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
    };

    // Attach all inheritable methods to the Model prototype.
    _.extend(Model.prototype, Events, {

        // A hash of attributes whose current and previous value differ.
        changed: null,

        // The value returned during the last failed validation.
        validationError: null,

        // The default name for the JSON `id` attribute is `"id"`. MongoDB and
        // CouchDB users may want to set this to `"_id"`.
        idAttribute: 'id',

        // The prefix is used to create the client id which is used to identify models locally.
        // You may want to override this if you're experiencing name clashes with model ids.
        cidPrefix: 'c',

        // preinitialize is an empty function by default. You can override it with a function
        // or object.  preinitialize will run before any instantiation logic is run in the Model.
        preinitialize: function () {},

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () {},

        // Return a copy of the model's `attributes` object.
        toJSON: function (options) {
            return _.clone(this.attributes);
        },

        // Proxy `Backbone.sync` by default -- but override this if you need
        // custom syncing semantics for *this* particular model.
        sync: function () {
            return Backbone.sync.apply(this, arguments);
        },

        // Get the value of an attribute.
        get: function (attr) {
            return this.attributes[attr];
        },

        // Get the HTML-escaped value of an attribute.
        escape: function (attr) {
            return _.escape(this.get(attr));
        },

        // Returns `true` if the attribute contains a value that is not null
        // or undefined.
        has: function (attr) {
            return this.get(attr) != null;
        },

        // Special-cased proxy to underscore's `_.matches` method.
        matches: function (attrs) {
            return !!_.iteratee(attrs, this)(this.attributes);
        },

        // Set a hash of model attributes on the object, firing `"change"`. This is
        // the core primitive operation of a model, updating the data and notifying
        // anyone who needs to know about the change in state. The heart of the beast.
        set: function (key, val, options) {
            if (key == null) return this;

            // Handle both `"key", value` and `{key: value}` -style arguments.
            var attrs;
            if (typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }

            options || (options = {});

            // Run validation.
            if (!this._validate(attrs, options)) return false;

            // Extract attributes and options.
            var unset = options.unset;
            var silent = options.silent;
            var changes = [];
            var changing = this._changing;
            this._changing = true;

            if (!changing) {
                this._previousAttributes = _.clone(this.attributes);
                this.changed = {};
            }

            var current = this.attributes;
            var changed = this.changed;
            var prev = this._previousAttributes;

            // For each `set` attribute, update or delete the current value.
            for (var attr in attrs) {
                val = attrs[attr];
                if (!_.isEqual(current[attr], val)) changes.push(attr);
                if (!_.isEqual(prev[attr], val)) {
                    changed[attr] = val;
                } else {
                    delete changed[attr];
                }
                unset ? delete current[attr] : current[attr] = val;
            }

            // Update the `id`.
            if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

            // Trigger all relevant attribute changes.
            if (!silent) {
                if (changes.length) this._pending = options;
                for (var i = 0; i < changes.length; i++) {
                    this.trigger('change:' + changes[i], this, current[changes[i]], options);
                }
            }

            // You might be wondering why there's a `while` loop here. Changes can
            // be recursively nested within `"change"` events.
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    options = this._pending;
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        },

        // Remove an attribute from the model, firing `"change"`. `unset` is a noop
        // if the attribute doesn't exist.
        unset: function (attr, options) {
            return this.set(attr, void 0, _.extend({}, options, {
                unset: true
            }));
        },

        // Clear all attributes on the model, firing `"change"`.
        clear: function (options) {
            var attrs = {};
            for (var key in this.attributes) attrs[key] = void 0;
            return this.set(attrs, _.extend({}, options, {
                unset: true
            }));
        },

        // Determine if the model has changed since the last `"change"` event.
        // If you specify an attribute name, determine if that attribute has changed.
        hasChanged: function (attr) {
            if (attr == null) return !_.isEmpty(this.changed);
            return _.has(this.changed, attr);
        },

        // Return an object containing all the attributes that have changed, or
        // false if there are no changed attributes. Useful for determining what
        // parts of a view need to be updated and/or what attributes need to be
        // persisted to the server. Unset attributes will be set to undefined.
        // You can also pass an attributes object to diff against the model,
        // determining if there *would be* a change.
        changedAttributes: function (diff) {
            if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
            var old = this._changing ? this._previousAttributes : this.attributes;
            var changed = {};
            var hasChanged;
            for (var attr in diff) {
                var val = diff[attr];
                if (_.isEqual(old[attr], val)) continue;
                changed[attr] = val;
                hasChanged = true;
            }
            return hasChanged ? changed : false;
        },

        // Get the previous value of an attribute, recorded at the time the last
        // `"change"` event was fired.
        previous: function (attr) {
            if (attr == null || !this._previousAttributes) return null;
            return this._previousAttributes[attr];
        },

        // Get all of the attributes of the model at the time of the previous
        // `"change"` event.
        previousAttributes: function () {
            return _.clone(this._previousAttributes);
        },

        // Fetch the model from the server, merging the response with the model's
        // local attributes. Any changed attributes will trigger a "change" event.
        fetch: function (options) {
            options = _.extend({
                parse: true
            }, options);
            var model = this;
            var success = options.success;
            options.success = function (resp) {
                var serverAttrs = options.parse ? model.parse(resp, options) : resp;
                if (!model.set(serverAttrs, options)) return false;
                if (success) success.call(options.context, model, resp, options);
                model.trigger('sync', model, resp, options);
            };
            wrapError(this, options);
            return this.sync('read', this, options);
        },

        // Set a hash of model attributes, and sync the model to the server.
        // If the server returns an attributes hash that differs, the model's
        // state will be `set` again.
        save: function (key, val, options) {
            // Handle both `"key", value` and `{key: value}` -style arguments.
            var attrs;
            if (key == null || typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }

            options = _.extend({
                validate: true,
                parse: true
            }, options);
            var wait = options.wait;

            // If we're not waiting and attributes exist, save acts as
            // `set(attr).save(null, opts)` with validation. Otherwise, check if
            // the model will be valid when the attributes, if any, are set.
            if (attrs && !wait) {
                if (!this.set(attrs, options)) return false;
            } else if (!this._validate(attrs, options)) {
                return false;
            }

            // After a successful server-side save, the client is (optionally)
            // updated with the server-side state.
            var model = this;
            var success = options.success;
            var attributes = this.attributes;
            options.success = function (resp) {
                // Ensure attributes are restored during synchronous saves.
                model.attributes = attributes;
                var serverAttrs = options.parse ? model.parse(resp, options) : resp;
                if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
                if (serverAttrs && !model.set(serverAttrs, options)) return false;
                if (success) success.call(options.context, model, resp, options);
                model.trigger('sync', model, resp, options);
            };
            wrapError(this, options);

            // Set temporary attributes if `{wait: true}` to properly find new ids.
            if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

            var method = this.isNew() ? 'create' : options.patch ? 'patch' : 'update';
            if (method === 'patch' && !options.attrs) options.attrs = attrs;
            var xhr = this.sync(method, this, options);

            // Restore attributes.
            this.attributes = attributes;

            return xhr;
        },

        // Destroy this model on the server if it was already persisted.
        // Optimistically removes the model from its collection, if it has one.
        // If `wait: true` is passed, waits for the server to respond before removal.
        destroy: function (options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;
            var wait = options.wait;

            var destroy = function () {
                model.stopListening();
                model.trigger('destroy', model, model.collection, options);
            };

            options.success = function (resp) {
                if (wait) destroy();
                if (success) success.call(options.context, model, resp, options);
                if (!model.isNew()) model.trigger('sync', model, resp, options);
            };

            var xhr = false;
            if (this.isNew()) {
                _.defer(options.success);
            } else {
                wrapError(this, options);
                xhr = this.sync('delete', this, options);
            }
            if (!wait) destroy();
            return xhr;
        },

        // Default URL for the model's representation on the server -- if you're
        // using Backbone's restful methods, override this to change the endpoint
        // that will be called.
        url: function () {
            var base =
                _.result(this, 'urlRoot') ||
                _.result(this.collection, 'url') ||
                urlError();
            if (this.isNew()) return base;
            var id = this.get(this.idAttribute);
            return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
        },

        // **parse** converts a response into the hash of attributes to be `set` on
        // the model. The default implementation is just to pass the response along.
        parse: function (resp, options) {
            return resp;
        },

        // Create a new model with identical attributes to this one.
        clone: function () {
            return new this.constructor(this.attributes);
        },

        // A model is new if it has never been saved to the server, and lacks an id.
        isNew: function () {
            return !this.has(this.idAttribute);
        },

        // Check if the model is currently in a valid state.
        isValid: function (options) {
            return this._validate({}, _.extend({}, options, {
                validate: true
            }));
        },

        // Run validation against the next complete set of model attributes,
        // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
        _validate: function (attrs, options) {
            if (!options.validate || !this.validate) return true;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validationError = this.validate(attrs, options) || null;
            if (!error) return true;
            this.trigger('invalid', this, error, _.extend(options, {
                validationError: error
            }));
            return false;
        }

    });


    var Collection = Backbone.Collection = function (models, options) {
        options || (options = {});
        this.preinitialize.apply(this, arguments);
        if (options.model) this.model = options.model;
        if (options.comparator !== void 0) this.comparator = options.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (models) this.reset(models, _.extend({
            silent: true
        }, options));
    };

    var setOptions = {
        add: true,
        remove: true,
        merge: true
    };
    var addOptions = {
        add: true,
        remove: false
    };

    var splice = function (array, insert, at) {
        at = Math.min(Math.max(at, 0), array.length);
        var tail = Array(array.length - at);
        var length = insert.length;
        var i;
        for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
        for (i = 0; i < length; i++) array[i + at] = insert[i];
        for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
    };

    _.extend(Collection.prototype, Events, {

        model: Model,

        preinitialize: function () {},

        initialize: function () {},

        toJSON: function (options) {
            return this.map(function (model) {
                return model.toJSON(options);
            });
        },

        sync: function () {
            return Backbone.sync.apply(this, arguments);
        },

        add: function (models, options) {
            return this.set(models, _.extend({
                merge: false
            }, options, addOptions));
        },

        remove: function (models, options) {
            options = _.extend({}, options);
            var singular = !_.isArray(models);
            models = singular ? [models] : models.slice();
            var removed = this._removeModels(models, options);
            if (!options.silent && removed.length) {
                options.changes = {
                    added: [],
                    merged: [],
                    removed: removed
                };
                this.trigger('update', this, options);
            }
            return singular ? removed[0] : removed;
        },

        set: function (models, options) {
            if (models == null) return;

            options = _.extend({}, setOptions, options);
            if (options.parse && !this._isModel(models)) {
                models = this.parse(models, options) || [];
            }

            var singular = !_.isArray(models);
            models = singular ? [models] : models.slice();

            var at = options.at;
            if (at != null) at = +at;
            if (at > this.length) at = this.length;
            if (at < 0) at += this.length + 1;

            var set = [];
            var toAdd = [];
            var toMerge = [];
            var toRemove = [];
            var modelMap = {};

            var add = options.add;
            var merge = options.merge;
            var remove = options.remove;

            var sort = false;
            var sortable = this.comparator && at == null && options.sort !== false;
            var sortAttr = _.isString(this.comparator) ? this.comparator : null;

            // Turn bare objects into model references, and prevent invalid models
            // from being added.
            var model, i;
            for (i = 0; i < models.length; i++) {
                model = models[i];

                // If a duplicate is found, prevent it from being added and
                // optionally merge it into the existing model.
                var existing = this.get(model);
                if (existing) {
                    if (merge && model !== existing) {
                        var attrs = this._isModel(model) ? model.attributes : model;
                        if (options.parse) attrs = existing.parse(attrs, options);
                        existing.set(attrs, options);
                        toMerge.push(existing);
                        if (sortable && !sort) sort = existing.hasChanged(sortAttr);
                    }
                    if (!modelMap[existing.cid]) {
                        modelMap[existing.cid] = true;
                        set.push(existing);
                    }
                    models[i] = existing;

                    // If this is a new, valid model, push it to the `toAdd` list.
                } else if (add) {
                    model = models[i] = this._prepareModel(model, options);
                    if (model) {
                        toAdd.push(model);
                        this._addReference(model, options);
                        modelMap[model.cid] = true;
                        set.push(model);
                    }
                }
            }

            // Remove stale models.
            if (remove) {
                for (i = 0; i < this.length; i++) {
                    model = this.models[i];
                    if (!modelMap[model.cid]) toRemove.push(model);
                }
                if (toRemove.length) this._removeModels(toRemove, options);
            }

            // See if sorting is needed, update `length` and splice in new models.
            var orderChanged = false;
            var replace = !sortable && add && remove;
            if (set.length && replace) {
                orderChanged = this.length !== set.length || _.some(this.models, function (m, index) {
                    return m !== set[index];
                });
                this.models.length = 0;
                splice(this.models, set, 0);
                this.length = this.models.length;
            } else if (toAdd.length) {
                if (sortable) sort = true;
                splice(this.models, toAdd, at == null ? this.length : at);
                this.length = this.models.length;
            }

            // Silently sort the collection if appropriate.
            if (sort) this.sort({
                silent: true
            });

            // Unless silenced, it's time to fire all appropriate add/sort/update events.
            if (!options.silent) {
                for (i = 0; i < toAdd.length; i++) {
                    if (at != null) options.index = at + i;
                    model = toAdd[i];
                    model.trigger('add', model, this, options);
                }
                if (sort || orderChanged) this.trigger('sort', this, options);
                if (toAdd.length || toRemove.length || toMerge.length) {
                    options.changes = {
                        added: toAdd,
                        removed: toRemove,
                        merged: toMerge
                    };
                    this.trigger('update', this, options);
                }
            }

            // Return the added (or merged) model (or models).
            return singular ? models[0] : models;
        },

        // When you have more items than you want to add or remove individually,
        // you can reset the entire set with a new list of models, without firing
        // any granular `add` or `remove` events. Fires `reset` when finished.
        // Useful for bulk operations and optimizations.
        reset: function (models, options) {
            options = options ? _.clone(options) : {};
            for (var i = 0; i < this.models.length; i++) {
                this._removeReference(this.models[i], options);
            }
            options.previousModels = this.models;
            this._reset();
            models = this.add(models, _.extend({
                silent: true
            }, options));
            if (!options.silent) this.trigger('reset', this, options);
            return models;
        },

        // Add a model to the end of the collection.
        push: function (model, options) {
            return this.add(model, _.extend({
                at: this.length
            }, options));
        },

        // Remove a model from the end of the collection.
        pop: function (options) {
            var model = this.at(this.length - 1);
            return this.remove(model, options);
        },

        // Add a model to the beginning of the collection.
        unshift: function (model, options) {
            return this.add(model, _.extend({
                at: 0
            }, options));
        },

        // Remove a model from the beginning of the collection.
        shift: function (options) {
            var model = this.at(0);
            return this.remove(model, options);
        },

        // Slice out a sub-array of models from the collection.
        slice: function () {
            return slice.apply(this.models, arguments);
        },

        // Get a model from the set by id, cid, model object with id or cid
        // properties, or an attributes object that is transformed through modelId.
        get: function (obj) {
            if (obj == null) return void 0;
            return this._byId[obj] ||
                this._byId[this.modelId(this._isModel(obj) ? obj.attributes : obj, obj.idAttribute)] ||
                obj.cid && this._byId[obj.cid];
        },

        // Returns `true` if the model is in the collection.
        has: function (obj) {
            return this.get(obj) != null;
        },

        // Get the model at the given index.
        at: function (index) {
            if (index < 0) index += this.length;
            return this.models[index];
        },

        // Return models with matching attributes. Useful for simple cases of
        // `filter`.
        where: function (attrs, first) {
            return this[first ? 'find' : 'filter'](attrs);
        },

        // Return the first model with matching attributes. Useful for simple cases
        // of `find`.
        findWhere: function (attrs) {
            return this.where(attrs, true);
        },

        // Force the collection to re-sort itself. You don't need to call this under
        // normal circumstances, as the set will maintain sort order as each item
        // is added.
        sort: function (options) {
            var comparator = this.comparator;
            if (!comparator) throw new Error('Cannot sort a set without a comparator');
            options || (options = {});

            var length = comparator.length;
            if (_.isFunction(comparator)) comparator = comparator.bind(this);

            // Run sort based on type of `comparator`.
            if (length === 1 || _.isString(comparator)) {
                this.models = this.sortBy(comparator);
            } else {
                this.models.sort(comparator);
            }
            if (!options.silent) this.trigger('sort', this, options);
            return this;
        },

        // Pluck an attribute from each model in the collection.
        pluck: function (attr) {
            return this.map(attr + '');
        },

        // Fetch the default set of models for this collection, resetting the
        // collection when they arrive. If `reset: true` is passed, the response
        // data will be passed through the `reset` method instead of `set`.
        fetch: function (options) {
            options = _.extend({
                parse: true
            }, options);
            var success = options.success;
            var collection = this;
            options.success = function (resp) {
                var method = options.reset ? 'reset' : 'set';
                collection[method](resp, options);
                if (success) success.call(options.context, collection, resp, options);
                collection.trigger('sync', collection, resp, options);
            };
            wrapError(this, options);
            return this.sync('read', this, options);
        },

        // Create a new instance of a model in this collection. Add the model to the
        // collection immediately, unless `wait: true` is passed, in which case we
        // wait for the server to agree.
        create: function (model, options) {
            options = options ? _.clone(options) : {};
            var wait = options.wait;
            model = this._prepareModel(model, options);
            if (!model) return false;
            if (!wait) this.add(model, options);
            var collection = this;
            var success = options.success;
            options.success = function (m, resp, callbackOpts) {
                if (wait) collection.add(m, callbackOpts);
                if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
            };
            model.save(null, options);
            return model;
        },

        // **parse** converts a response into a list of models to be added to the
        // collection. The default implementation is just to pass it through.
        parse: function (resp, options) {
            return resp;
        },

        // Create a new collection with an identical list of models as this one.
        clone: function () {
            return new this.constructor(this.models, {
                model: this.model,
                comparator: this.comparator
            });
        },

        // Define how to uniquely identify models in the collection.
        modelId: function (attrs, idAttribute) {
            return attrs[idAttribute || this.model.prototype.idAttribute || 'id'];
        },
        values: function () {
            return new CollectionIterator(this, ITERATOR_VALUES);
        },
        keys: function () {
            return new CollectionIterator(this, ITERATOR_KEYS);
        },
        entries: function () {
            return new CollectionIterator(this, ITERATOR_KEYSVALUES);
        },
        _reset: function () {
            this.length = 0;
            this.models = [];
            this._byId = {};
        },
        _prepareModel: function (attrs, options) {
            if (this._isModel(attrs)) {
                if (!attrs.collection) attrs.collection = this;
                return attrs;
            }
            options = options ? _.clone(options) : {};
            options.collection = this;
            var model = new this.model(attrs, options);
            if (!model.validationError) return model;
            this.trigger('invalid', this, model.validationError, options);
            return false;
        },
        _removeModels: function (models, options) {
            var removed = [];
            for (var i = 0; i < models.length; i++) {
                var model = this.get(models[i]);
                if (!model) continue;
                var index = this.indexOf(model);
                this.models.splice(index, 1);
                this.length--;
                delete this._byId[model.cid];
                var id = this.modelId(model.attributes, model.idAttribute);
                if (id != null) delete this._byId[id];
                if (!options.silent) {
                    options.index = index;
                    model.trigger('remove', model, this, options);
                }
                removed.push(model);
                this._removeReference(model, options);
            }
            return removed;
        },
        _isModel: function (model) {
            return model instanceof Model;
        },
        _addReference: function (model, options) {
            this._byId[model.cid] = model;
            var id = this.modelId(model.attributes, model.idAttribute);
            if (id != null) this._byId[id] = model;
            model.on('all', this._onModelEvent, this);
        },
        _removeReference: function (model, options) {
            delete this._byId[model.cid];
            var id = this.modelId(model.attributes, model.idAttribute);
            if (id != null) delete this._byId[id];
            if (this === model.collection) delete model.collection;
            model.off('all', this._onModelEvent, this);
        },
        _onModelEvent: function (event, model, collection, options) {
            if (model) {
                if ((event === 'add' || event === 'remove') && collection !== this) return;
                if (event === 'destroy') this.remove(model, options);
                if (event === 'change') {
                    var prevId = this.modelId(model.previousAttributes(), model.idAttribute);
                    var id = this.modelId(model.attributes, model.idAttribute);
                    if (prevId !== id) {
                        if (prevId != null) delete this._byId[prevId];
                        if (id != null) this._byId[id] = model;
                    }
                }
            }
            this.trigger.apply(this, arguments);
        }
    });
    var $$iterator = typeof Symbol === 'function' && Symbol.iterator;
    if ($$iterator) {
        Collection.prototype[$$iterator] = Collection.prototype.values;
    }
    var CollectionIterator = function (collection, kind) {
        this._collection = collection;
        this._kind = kind;
        this._index = 0;
    };
    var ITERATOR_VALUES = 1;
    var ITERATOR_KEYS = 2;
    var ITERATOR_KEYSVALUES = 3;
    if ($$iterator) {
        CollectionIterator.prototype[$$iterator] = function () {
            return this;
        };
    }
    CollectionIterator.prototype.next = function () {
        if (this._collection) {
            if (this._index < this._collection.length) {
                var model = this._collection.at(this._index);
                this._index++;
                var value;
                if (this._kind === ITERATOR_VALUES) {
                    value = model;
                } else {
                    var id = this._collection.modelId(model.attributes);
                    if (this._kind === ITERATOR_KEYS) {
                        value = id;
                    } else {
                        value = [id, model];
                    }
                }
                return {
                    value: value,
                    done: false
                };
            }
            this._collection = void 0;
        }
        return {
            value: void 0,
            done: true
        };
    };
    var View = Backbone.View = function (options) {
        this.cid = _.uniqueId('view');
        this.preinitialize.apply(this, arguments);
        _.extend(this, _.pick(options, viewOptions));
        this._ensureElement();
        this.initialize.apply(this, arguments);
    };
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
    _.extend(View.prototype, Events, {
        tagName: 'div',
        $: function (selector) {
            return this.$el.find(selector);
        },
        preinitialize: function () {},
        initialize: function () {},
        render: function () {
            return this;
        },
        remove: function () {
            this._removeElement();
            this.stopListening();
            return this;
        },
        _removeElement: function () {
            this.$el.remove();
        },
        setElement: function (element) {
            this.undelegateEvents();
            this._setElement(element);
            this.delegateEvents();
            return this;
        },
        _setElement: function (el) {
            this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
            this.el = this.$el[0];
        },
        delegateEvents: function (events) {
            events || (events = _.result(this, 'events'));
            if (!events) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[method];
                if (!method) continue;
                var match = key.match(delegateEventSplitter);
                this.delegate(match[1], match[2], method.bind(this));
            }
            return this;
        },
        delegate: function (eventName, selector, listener) {
            this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
            return this;
        },
        undelegateEvents: function () {
            if (this.$el) this.$el.off('.delegateEvents' + this.cid);
            return this;
        },
        undelegate: function (eventName, selector, listener) {
            this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
            return this;
        },
        _createElement: function (tagName) {
            return document.createElement(tagName);
        },
        _ensureElement: function () {
            if (!this.el) {
                var attrs = _.extend({}, _.result(this, 'attributes'));
                if (this.id) attrs.id = _.result(this, 'id');
                if (this.className) attrs['class'] = _.result(this, 'className');
                this.setElement(this._createElement(_.result(this, 'tagName')));
                this._setAttributes(attrs);
            } else {
                this.setElement(_.result(this, 'el'));
            }
        },
        _setAttributes: function (attributes) {
            this.$el.attr(attributes);
        }
    });
    var addMethod = function (base, length, method, attribute) {
        switch (length) {
            case 1:
                return function () {
                    return base[method](this[attribute]);
                };
            case 2:
                return function (value) {
                    return base[method](this[attribute], value);
                };
            case 3:
                return function (iteratee, context) {
                    return base[method](this[attribute], cb(iteratee, this), context);
                };
            case 4:
                return function (iteratee, defaultVal, context) {
                    return base[method](this[attribute], cb(iteratee, this), defaultVal, context);
                };
            default:
                return function () {
                    var args = slice.call(arguments);
                    args.unshift(this[attribute]);
                    return base[method].apply(base, args);
                };
        }
    };
    var addUnderscoreMethods = function (Class, base, methods, attribute) {
        _.each(methods, function (length, method) {
            if (base[method]) Class.prototype[method] = addMethod(base, length, method, attribute);
        });
    };
    var cb = function (iteratee, instance) {
        if (_.isFunction(iteratee)) return iteratee;
        if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
        if (_.isString(iteratee)) return function (model) {
            return model.get(iteratee);
        };
        return iteratee;
    };
    var modelMatcher = function (attrs) {
        var matcher = _.matches(attrs);
        return function (model) {
            return matcher(model.attributes);
        };
    };
    var collectionMethods = {
        forEach: 3,
        each: 3,
        map: 3,
        collect: 3,
        reduce: 0,
        foldl: 0,
        inject: 0,
        reduceRight: 0,
        foldr: 0,
        find: 3,
        detect: 3,
        filter: 3,
        select: 3,
        reject: 3,
        every: 3,
        all: 3,
        some: 3,
        any: 3,
        include: 3,
        includes: 3,
        contains: 3,
        invoke: 0,
        max: 3,
        min: 3,
        toArray: 1,
        size: 1,
        first: 3,
        head: 3,
        take: 3,
        initial: 3,
        rest: 3,
        tail: 3,
        drop: 3,
        last: 3,
        without: 0,
        difference: 0,
        indexOf: 3,
        shuffle: 1,
        lastIndexOf: 3,
        isEmpty: 1,
        chain: 1,
        sample: 3,
        partition: 3,
        groupBy: 3,
        countBy: 3,
        sortBy: 3,
        indexBy: 3,
        findIndex: 3,
        findLastIndex: 3
    };
    var modelMethods = {
        keys: 1,
        values: 1,
        pairs: 1,
        invert: 1,
        pick: 0,
        omit: 0,
        chain: 1,
        isEmpty: 1
    };
    _.each([
        [Collection, collectionMethods, 'models'],
        [Model, modelMethods, 'attributes']
    ], function (config) {
        var Base = config[0],
            methods = config[1],
            attribute = config[2];
        Base.mixin = function (obj) {
            var mappings = _.reduce(_.functions(obj), function (memo, name) {
                memo[name] = 0;
                return memo;
            }, {});
            addUnderscoreMethods(Base, obj, mappings, attribute);
        };
        addUnderscoreMethods(Base, _, methods, attribute);
    });
    Backbone.sync = function (method, model, options) {
        var type = methodMap[method];
        _.defaults(options || (options = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });
        var params = {
            type: type,
            dataType: 'json'
        };
        if (!options.url) {
            params.url = _.result(model, 'url') || urlError();
        }
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.contentType = 'application/json';
            params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }
        if (options.emulateJSON) {
            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? {
                model: params.data
            } : {};
        }
        if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
            params.type = 'POST';
            if (options.emulateJSON) params.data._method = type;
            var beforeSend = options.beforeSend;
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', type);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }
        if (params.type !== 'GET' && !options.emulateJSON) {
            params.processData = false;
        }
        var error = options.error;
        options.error = function (xhr, textStatus, errorThrown) {
            options.textStatus = textStatus;
            options.errorThrown = errorThrown;
            if (error) error.call(options.context, xhr, textStatus, errorThrown);
        };
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        model.trigger('request', model, xhr, options);
        return xhr;
    };
    var methodMap = {
        create: 'POST',
        update: 'PUT',
        patch: 'PATCH',
        delete: 'DELETE',
        read: 'GET'
    };
    Backbone.ajax = function () {
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    };
    var Router = Backbone.Router = function (options) {
        options || (options = {});
        this.preinitialize.apply(this, arguments);
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };
    var optionalParam = /\((.*?)\)/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*\w+/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    _.extend(Router.prototype, Events, {
        preinitialize: function () {},
        initialize: function () {},
        route: function (route, name, callback) {
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) callback = this[name];
            var router = this;
            Backbone.history.route(route, function (fragment) {
                var args = router._extractParameters(route, fragment);
                if (router.execute(callback, args, name) !== false) {
                    router.trigger.apply(router, ['route:' + name].concat(args));
                    router.trigger('route', name, args);
                    Backbone.history.trigger('route', router, name, args);
                }
            });
            return this;
        },
        execute: function (callback, args, name) {
            if (callback) callback.apply(this, args);
        },
        navigate: function (fragment, options) {
            Backbone.history.navigate(fragment, options);
            return this;
        },
        _bindRoutes: function () {
            if (!this.routes) return;
            this.routes = _.result(this, 'routes');
            var route, routes = _.keys(this.routes);
            while ((route = routes.pop()) != null) {
                this.route(route, this.routes[route]);
            }
        },
        _routeToRegExp: function (route) {
            route = route.replace(escapeRegExp, '\\$&')
                .replace(optionalParam, '(?:$1)?')
                .replace(namedParam, function (match, optional) {
                    return optional ? match : '([^/?]+)';
                })
                .replace(splatParam, '([^?]*?)');
            return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
        },
        _extractParameters: function (route, fragment) {
            var params = route.exec(fragment).slice(1);
            return _.map(params, function (param, i) {
                if (i === params.length - 1) return param || null;
                return param ? decodeURIComponent(param) : null;
            });
        }
    });
    var History = Backbone.History = function () {
        this.handlers = [];
        this.checkUrl = this.checkUrl.bind(this);
        if (typeof window !== 'undefined') {
            this.location = window.location;
            this.history = window.history;
        }
    };
    var routeStripper = /^[#\/]|\s+$/g;
    var rootStripper = /^\/+|\/+$/g;
    var pathStripper = /#.*$/;
    History.started = false;
    _.extend(History.prototype, Events, {
        interval: 50,
        atRoot: function () {
            var path = this.location.pathname.replace(/[^\/]$/, '$&/');
            return path === this.root && !this.getSearch();
        },
        matchRoot: function () {
            var path = this.decodeFragment(this.location.pathname);
            var rootPath = path.slice(0, this.root.length - 1) + '/';
            return rootPath === this.root;
        },
        decodeFragment: function (fragment) {
            return decodeURI(fragment.replace(/%25/g, '%2525'));
        },
        getSearch: function () {
            var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
            return match ? match[0] : '';
        },
        getHash: function (window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : '';
        },
        getPath: function () {
            var path = this.decodeFragment(
                this.location.pathname + this.getSearch()
            ).slice(this.root.length - 1);
            return path.charAt(0) === '/' ? path.slice(1) : path;
        },
        getFragment: function (fragment) {
            if (fragment == null) {
                if (this._usePushState || !this._wantsHashChange) {
                    fragment = this.getPath();
                } else {
                    fragment = this.getHash();
                }
            }
            return fragment.replace(routeStripper, '');
        },
        start: function (options) {
            if (History.started) throw new Error('Backbone.history has already been started');
            History.started = true;
            this.options = _.extend({
                root: '/'
            }, this.options, options);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._hasHashChange = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
            this._useHashChange = this._wantsHashChange && this._hasHashChange;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.history && this.history.pushState);
            this._usePushState = this._wantsPushState && this._hasPushState;
            this.fragment = this.getFragment();
            this.root = ('/' + this.root + '/').replace(rootStripper, '/');
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) {
                    var rootPath = this.root.slice(0, -1) || '/';
                    this.location.replace(rootPath + '#' + this.getPath());
                    return true;
                } else if (this._hasPushState && this.atRoot()) {
                    this.navigate(this.getHash(), {
                        replace: true
                    });
                }
            }
            if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                this.iframe = document.createElement('iframe');
                this.iframe.src = 'javascript:0';
                this.iframe.style.display = 'none';
                this.iframe.tabIndex = -1;
                var body = document.body;
                var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
                iWindow.document.open();
                iWindow.document.close();
                iWindow.location.hash = '#' + this.fragment;
            }
            var addEventListener = window.addEventListener || function (eventName, listener) {
                return attachEvent('on' + eventName, listener);
            };
            if (this._usePushState) {
                addEventListener('popstate', this.checkUrl, false);
            } else if (this._useHashChange && !this.iframe) {
                addEventListener('hashchange', this.checkUrl, false);
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            }
            if (!this.options.silent) return this.loadUrl();
        },
        stop: function () {
            var removeEventListener = window.removeEventListener || function (eventName, listener) {
                return detachEvent('on' + eventName, listener);
            };
            if (this._usePushState) {
                removeEventListener('popstate', this.checkUrl, false);
            } else if (this._useHashChange && !this.iframe) {
                removeEventListener('hashchange', this.checkUrl, false);
            }
            if (this.iframe) {
                document.body.removeChild(this.iframe);
                this.iframe = null;
            }
            if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
            History.started = false;
        },
        route: function (route, callback) {
            this.handlers.unshift({
                route: route,
                callback: callback
            });
        },
        checkUrl: function (e) {
            var current = this.getFragment();
            if (current === this.fragment && this.iframe) {
                current = this.getHash(this.iframe.contentWindow);
            }
            if (current === this.fragment) return false;
            if (this.iframe) this.navigate(current);
            this.loadUrl();
        },
        loadUrl: function (fragment) {
            if (!this.matchRoot()) return false;
            fragment = this.fragment = this.getFragment(fragment);
            return _.some(this.handlers, function (handler) {
                if (handler.route.test(fragment)) {
                    handler.callback(fragment);
                    return true;
                }
            });
        },
        navigate: function (fragment, options) {
            if (!History.started) return false;
            if (!options || options === true) options = {
                trigger: !!options
            };
            fragment = this.getFragment(fragment || '');
            var rootPath = this.root;
            if (fragment === '' || fragment.charAt(0) === '?') {
                rootPath = rootPath.slice(0, -1) || '/';
            }
            var url = rootPath + fragment;
            fragment = fragment.replace(pathStripper, '');
            var decodedFragment = this.decodeFragment(fragment);
            if (this.fragment === decodedFragment) return;
            this.fragment = decodedFragment;
            if (this._usePushState) {
                this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, fragment, options.replace);
                if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
                    var iWindow = this.iframe.contentWindow;
                    if (!options.replace) {
                        iWindow.document.open();
                        iWindow.document.close();
                    }
                    this._updateHash(iWindow.location, fragment, options.replace);
                }
            } else {
                return this.location.assign(url);
            }
            if (options.trigger) return this.loadUrl(fragment);
        },
        _updateHash: function (location, fragment, replace) {
            if (replace) {
                var href = location.href.replace(/(javascript:|#).*$/, '');
                location.replace(href + '#' + fragment);
            } else {
                location.hash = '#' + fragment;
            }
        }
    });
    Backbone.history = new History;
    var extend = function (protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }
        _.extend(child, parent, staticProps);
        child.prototype = _.create(parent.prototype, protoProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };
    Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
    var urlError = function () {
        throw new Error('A "url" property or function must be specified');
    };
    var wrapError = function (model, options) {
        var error = options.error;
        options.error = function (resp) {
            if (error) error.call(options.context, model, resp, options);
            model.trigger('error', model, resp, options);
        };
    };

    return Backbone;
});

(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.localforage = f()
    }
})(function () {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw (f.code = "MODULE_NOT_FOUND", f)
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function (_dereq_, module, exports) {
            (function (global) {
                'use strict';
                var Mutation = global.MutationObserver || global.WebKitMutationObserver;

                var scheduleDrain;

                {
                    if (Mutation) {
                        var called = 0;
                        var observer = new Mutation(nextTick);
                        var element = global.document.createTextNode('');
                        observer.observe(element, {
                            characterData: true
                        });
                        scheduleDrain = function () {
                            element.data = (called = ++called % 2);
                        };
                    } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
                        var channel = new global.MessageChannel();
                        channel.port1.onmessage = nextTick;
                        scheduleDrain = function () {
                            channel.port2.postMessage(0);
                        };
                    } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
                        scheduleDrain = function () {

                            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                            var scriptEl = global.document.createElement('script');
                            scriptEl.onreadystatechange = function () {
                                nextTick();

                                scriptEl.onreadystatechange = null;
                                scriptEl.parentNode.removeChild(scriptEl);
                                scriptEl = null;
                            };
                            global.document.documentElement.appendChild(scriptEl);
                        };
                    } else {
                        scheduleDrain = function () {
                            setTimeout(nextTick, 0);
                        };
                    }
                }

                var draining;
                var queue = [];
                //named nextTick for less confusing stack traces
                function nextTick() {
                    draining = true;
                    var i, oldQueue;
                    var len = queue.length;
                    while (len) {
                        oldQueue = queue;
                        queue = [];
                        i = -1;
                        while (++i < len) {
                            oldQueue[i]();
                        }
                        len = queue.length;
                    }
                    draining = false;
                }

                module.exports = immediate;

                function immediate(task) {
                    if (queue.push(task) === 1 && !draining) {
                        scheduleDrain();
                    }
                }

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}],
        2: [function (_dereq_, module, exports) {
            'use strict';
            var immediate = _dereq_(1);

            /* istanbul ignore next */
            function INTERNAL() {}

            var handlers = {};

            var REJECTED = ['REJECTED'];
            var FULFILLED = ['FULFILLED'];
            var PENDING = ['PENDING'];

            module.exports = Promise;

            function Promise(resolver) {
                if (typeof resolver !== 'function') {
                    throw new TypeError('resolver must be a function');
                }
                this.state = PENDING;
                this.queue = [];
                this.outcome = void 0;
                if (resolver !== INTERNAL) {
                    safelyResolveThenable(this, resolver);
                }
            }

            Promise.prototype["catch"] = function (onRejected) {
                return this.then(null, onRejected);
            };
            Promise.prototype.then = function (onFulfilled, onRejected) {
                if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
                    typeof onRejected !== 'function' && this.state === REJECTED) {
                    return this;
                }
                var promise = new this.constructor(INTERNAL);
                if (this.state !== PENDING) {
                    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
                    unwrap(promise, resolver, this.outcome);
                } else {
                    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
                }

                return promise;
            };

            function QueueItem(promise, onFulfilled, onRejected) {
                this.promise = promise;
                if (typeof onFulfilled === 'function') {
                    this.onFulfilled = onFulfilled;
                    this.callFulfilled = this.otherCallFulfilled;
                }
                if (typeof onRejected === 'function') {
                    this.onRejected = onRejected;
                    this.callRejected = this.otherCallRejected;
                }
            }
            QueueItem.prototype.callFulfilled = function (value) {
                handlers.resolve(this.promise, value);
            };
            QueueItem.prototype.otherCallFulfilled = function (value) {
                unwrap(this.promise, this.onFulfilled, value);
            };
            QueueItem.prototype.callRejected = function (value) {
                handlers.reject(this.promise, value);
            };
            QueueItem.prototype.otherCallRejected = function (value) {
                unwrap(this.promise, this.onRejected, value);
            };

            function unwrap(promise, func, value) {
                immediate(function () {
                    var returnValue;
                    try {
                        returnValue = func(value);
                    } catch (e) {
                        return handlers.reject(promise, e);
                    }
                    if (returnValue === promise) {
                        handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
                    } else {
                        handlers.resolve(promise, returnValue);
                    }
                });
            }

            handlers.resolve = function (self, value) {
                var result = tryCatch(getThen, value);
                if (result.status === 'error') {
                    return handlers.reject(self, result.value);
                }
                var thenable = result.value;

                if (thenable) {
                    safelyResolveThenable(self, thenable);
                } else {
                    self.state = FULFILLED;
                    self.outcome = value;
                    var i = -1;
                    var len = self.queue.length;
                    while (++i < len) {
                        self.queue[i].callFulfilled(value);
                    }
                }
                return self;
            };
            handlers.reject = function (self, error) {
                self.state = REJECTED;
                self.outcome = error;
                var i = -1;
                var len = self.queue.length;
                while (++i < len) {
                    self.queue[i].callRejected(error);
                }
                return self;
            };

            function getThen(obj) {
                // Make sure we only access the accessor once as required by the spec
                var then = obj && obj.then;
                if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
                    return function appyThen() {
                        then.apply(obj, arguments);
                    };
                }
            }

            function safelyResolveThenable(self, thenable) {
                // Either fulfill, reject or reject with error
                var called = false;

                function onError(value) {
                    if (called) {
                        return;
                    }
                    called = true;
                    handlers.reject(self, value);
                }

                function onSuccess(value) {
                    if (called) {
                        return;
                    }
                    called = true;
                    handlers.resolve(self, value);
                }

                function tryToUnwrap() {
                    thenable(onSuccess, onError);
                }

                var result = tryCatch(tryToUnwrap);
                if (result.status === 'error') {
                    onError(result.value);
                }
            }

            function tryCatch(func, value) {
                var out = {};
                try {
                    out.value = func(value);
                    out.status = 'success';
                } catch (e) {
                    out.status = 'error';
                    out.value = e;
                }
                return out;
            }

            Promise.resolve = resolve;

            function resolve(value) {
                if (value instanceof this) {
                    return value;
                }
                return handlers.resolve(new this(INTERNAL), value);
            }

            Promise.reject = reject;

            function reject(reason) {
                var promise = new this(INTERNAL);
                return handlers.reject(promise, reason);
            }

            Promise.all = all;

            function all(iterable) {
                var self = this;
                if (Object.prototype.toString.call(iterable) !== '[object Array]') {
                    return this.reject(new TypeError('must be an array'));
                }

                var len = iterable.length;
                var called = false;
                if (!len) {
                    return this.resolve([]);
                }

                var values = new Array(len);
                var resolved = 0;
                var i = -1;
                var promise = new this(INTERNAL);

                while (++i < len) {
                    allResolver(iterable[i], i);
                }
                return promise;

                function allResolver(value, i) {
                    self.resolve(value).then(resolveFromAll, function (error) {
                        if (!called) {
                            called = true;
                            handlers.reject(promise, error);
                        }
                    });

                    function resolveFromAll(outValue) {
                        values[i] = outValue;
                        if (++resolved === len && !called) {
                            called = true;
                            handlers.resolve(promise, values);
                        }
                    }
                }
            }

            Promise.race = race;

            function race(iterable) {
                var self = this;
                if (Object.prototype.toString.call(iterable) !== '[object Array]') {
                    return this.reject(new TypeError('must be an array'));
                }

                var len = iterable.length;
                var called = false;
                if (!len) {
                    return this.resolve([]);
                }

                var i = -1;
                var promise = new this(INTERNAL);

                while (++i < len) {
                    resolver(iterable[i]);
                }
                return promise;

                function resolver(value) {
                    self.resolve(value).then(function (response) {
                        if (!called) {
                            called = true;
                            handlers.resolve(promise, response);
                        }
                    }, function (error) {
                        if (!called) {
                            called = true;
                            handlers.reject(promise, error);
                        }
                    });
                }
            }

        }, {
            "1": 1
        }],
        3: [function (_dereq_, module, exports) {
            (function (global) {
                'use strict';
                if (typeof global.Promise !== 'function') {
                    global.Promise = _dereq_(2);
                }

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "2": 2
        }],
        4: [function (_dereq_, module, exports) {
            'use strict';

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function getIDB() {
                /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
                try {
                    if (typeof indexedDB !== 'undefined') {
                        return indexedDB;
                    }
                    if (typeof webkitIndexedDB !== 'undefined') {
                        return webkitIndexedDB;
                    }
                    if (typeof mozIndexedDB !== 'undefined') {
                        return mozIndexedDB;
                    }
                    if (typeof OIndexedDB !== 'undefined') {
                        return OIndexedDB;
                    }
                    if (typeof msIndexedDB !== 'undefined') {
                        return msIndexedDB;
                    }
                } catch (e) {
                    return;
                }
            }

            var idb = getIDB();

            function isIndexedDBValid() {
                try {

                    if (!idb) {
                        return false;
                    }
 
                    var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

                    var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

                    return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&

                        typeof IDBKeyRange !== 'undefined';
                } catch (e) {
                    return false;
                }
            }

            function createBlob(parts, properties) {
                /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
                parts = parts || [];
                properties = properties || {};
                try {
                    return new Blob(parts, properties);
                } catch (e) {
                    if (e.name !== 'TypeError') {
                        throw e;
                    }
                    var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
                    var builder = new Builder();
                    for (var i = 0; i < parts.length; i += 1) {
                        builder.append(parts[i]);
                    }
                    return builder.getBlob(properties.type);
                }
            }

            // This is CommonJS because lie is an external dependency, so Rollup
            // can just ignore it.
            if (typeof Promise === 'undefined') {
                // In the "nopromises" build this will just throw if you don't have
                // a global promise object, but it would throw anyway later.
                _dereq_(3);
            }
            var Promise$1 = Promise;

            function executeCallback(promise, callback) {
                if (callback) {
                    promise.then(function (result) {
                        callback(null, result);
                    }, function (error) {
                        callback(error);
                    });
                }
            }

            function executeTwoCallbacks(promise, callback, errorCallback) {
                if (typeof callback === 'function') {
                    promise.then(callback);
                }

                if (typeof errorCallback === 'function') {
                    promise["catch"](errorCallback);
                }
            }

            function normalizeKey(key) {
                // Cast the key to a string, as that's all we can set as a key.
                if (typeof key !== 'string') {
                    console.warn(key + ' used as a key, but it is not a string.');
                    key = String(key);
                }

                return key;
            }

            function getCallback() {
                if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
                    return arguments[arguments.length - 1];
                }
            }


            var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
            var supportsBlobs = void 0;
            var dbContexts = {};
            var toString = Object.prototype.toString;

            // Transaction Modes
            var READ_ONLY = 'readonly';
            var READ_WRITE = 'readwrite';

            function _binStringToArrayBuffer(bin) {
                var length = bin.length;
                var buf = new ArrayBuffer(length);
                var arr = new Uint8Array(buf);
                for (var i = 0; i < length; i++) {
                    arr[i] = bin.charCodeAt(i);
                }
                return buf;
            }


            function _checkBlobSupportWithoutCaching(idb) {
                return new Promise$1(function (resolve) {
                    var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
                    var blob = createBlob(['']);
                    txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

                    txn.onabort = function (e) {
                        // If the transaction aborts now its due to not being able to
                        // write to the database, likely due to the disk being full
                        e.preventDefault();
                        e.stopPropagation();
                        resolve(false);
                    };

                    txn.oncomplete = function () {
                        var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                        var matchedEdge = navigator.userAgent.match(/Edge\//);
                        // MS Edge pretends to be Chrome 42:
                        // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
                        resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
                    };
                })["catch"](function () {
                    return false; // error, so assume unsupported
                });
            }

            function _checkBlobSupport(idb) {
                if (typeof supportsBlobs === 'boolean') {
                    return Promise$1.resolve(supportsBlobs);
                }
                return _checkBlobSupportWithoutCaching(idb).then(function (value) {
                    supportsBlobs = value;
                    return supportsBlobs;
                });
            }

            function _deferReadiness(dbInfo) {
                var dbContext = dbContexts[dbInfo.name];

                // Create a deferred object representing the current database operation.
                var deferredOperation = {};

                deferredOperation.promise = new Promise$1(function (resolve, reject) {
                    deferredOperation.resolve = resolve;
                    deferredOperation.reject = reject;
                });

                // Enqueue the deferred operation.
                dbContext.deferredOperations.push(deferredOperation);

                // Chain its promise to the database readiness.
                if (!dbContext.dbReady) {
                    dbContext.dbReady = deferredOperation.promise;
                } else {
                    dbContext.dbReady = dbContext.dbReady.then(function () {
                        return deferredOperation.promise;
                    });
                }
            }

            function _advanceReadiness(dbInfo) {
                var dbContext = dbContexts[dbInfo.name];

                // Dequeue a deferred operation.
                var deferredOperation = dbContext.deferredOperations.pop();

                // Resolve its promise (which is part of the database readiness
                // chain of promises).
                if (deferredOperation) {
                    deferredOperation.resolve();
                    return deferredOperation.promise;
                }
            }

            function _rejectReadiness(dbInfo, err) {
                var dbContext = dbContexts[dbInfo.name];

                // Dequeue a deferred operation.
                var deferredOperation = dbContext.deferredOperations.pop();

                // Reject its promise (which is part of the database readiness
                // chain of promises).
                if (deferredOperation) {
                    deferredOperation.reject(err);
                    return deferredOperation.promise;
                }
            }

            function _getConnection(dbInfo, upgradeNeeded) {
                return new Promise$1(function (resolve, reject) {
                    dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

                    if (dbInfo.db) {
                        if (upgradeNeeded) {
                            _deferReadiness(dbInfo);
                            dbInfo.db.close();
                        } else {
                            return resolve(dbInfo.db);
                        }
                    }

                    var dbArgs = [dbInfo.name];

                    if (upgradeNeeded) {
                        dbArgs.push(dbInfo.version);
                    }

                    var openreq = idb.open.apply(idb, dbArgs);

                    if (upgradeNeeded) {
                        openreq.onupgradeneeded = function (e) {
                            var db = openreq.result;
                            try {
                                db.createObjectStore(dbInfo.storeName);
                                if (e.oldVersion <= 1) {
                                    // Added when support for blob shims was added
                                    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                                }
                            } catch (ex) {
                                if (ex.name === 'ConstraintError') {
                                    console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                                } else {
                                    throw ex;
                                }
                            }
                        };
                    }

                    openreq.onerror = function (e) {
                        e.preventDefault();
                        reject(openreq.error);
                    };

                    openreq.onsuccess = function () {
                        resolve(openreq.result);
                        _advanceReadiness(dbInfo);
                    };
                });
            }

            function _getOriginalConnection(dbInfo) {
                return _getConnection(dbInfo, false);
            }

            function _getUpgradedConnection(dbInfo) {
                return _getConnection(dbInfo, true);
            }

            function _isUpgradeNeeded(dbInfo, defaultVersion) {
                if (!dbInfo.db) {
                    return true;
                }

                var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
                var isDowngrade = dbInfo.version < dbInfo.db.version;
                var isUpgrade = dbInfo.version > dbInfo.db.version;

                if (isDowngrade) {
                    // If the version is not the default one
                    // then warn for impossible downgrade.
                    if (dbInfo.version !== defaultVersion) {
                        console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
                    }
                    // Align the versions to prevent errors.
                    dbInfo.version = dbInfo.db.version;
                }

                if (isUpgrade || isNewStore) {
                    // If the store is new then increment the version (if needed).
                    // This will trigger an "upgradeneeded" event which is required
                    // for creating a store.
                    if (isNewStore) {
                        var incVersion = dbInfo.db.version + 1;
                        if (incVersion > dbInfo.version) {
                            dbInfo.version = incVersion;
                        }
                    }

                    return true;
                }

                return false;
            }

            // encode a blob for indexeddb engines that don't support blobs
            function _encodeBlob(blob) {
                return new Promise$1(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.onerror = reject;
                    reader.onloadend = function (e) {
                        var base64 = btoa(e.target.result || '');
                        resolve({
                            __local_forage_encoded_blob: true,
                            data: base64,
                            type: blob.type
                        });
                    };
                    reader.readAsBinaryString(blob);
                });
            }

            // decode an encoded blob
            function _decodeBlob(encodedBlob) {
                var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
                return createBlob([arrayBuff], {
                    type: encodedBlob.type
                });
            }

            // is this one of our fancy encoded blobs?
            function _isEncodedBlob(value) {
                return value && value.__local_forage_encoded_blob;
            }

            function _fullyReady(callback) {
                var self = this;

                var promise = self._initReady().then(function () {
                    var dbContext = dbContexts[self._dbInfo.name];

                    if (dbContext && dbContext.dbReady) {
                        return dbContext.dbReady;
                    }
                });

                executeTwoCallbacks(promise, callback, callback);
                return promise;
            }

            // Try to establish a new db connection to replace the
            // current one which is broken (i.e. experiencing
            // InvalidStateError while creating a transaction).
            function _tryReconnect(dbInfo) {
                _deferReadiness(dbInfo);

                var dbContext = dbContexts[dbInfo.name];
                var forages = dbContext.forages;

                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    if (forage._dbInfo.db) {
                        forage._dbInfo.db.close();
                        forage._dbInfo.db = null;
                    }
                }
                dbInfo.db = null;

                return _getOriginalConnection(dbInfo).then(function (db) {
                    dbInfo.db = db;
                    if (_isUpgradeNeeded(dbInfo)) {
                        // Reopen the database for upgrading.
                        return _getUpgradedConnection(dbInfo);
                    }
                    return db;
                }).then(function (db) {
                    // store the latest db reference
                    // in case the db was upgraded
                    dbInfo.db = dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        forages[i]._dbInfo.db = db;
                    }
                })["catch"](function (err) {
                    _rejectReadiness(dbInfo, err);
                    throw err;
                });
            }

            // FF doesn't like Promises (micro-tasks) and IDDB store operations,
            // so we have to do it with callbacks
            function createTransaction(dbInfo, mode, callback, retries) {
                if (retries === undefined) {
                    retries = 1;
                }

                try {
                    var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                    callback(null, tx);
                } catch (err) {
                    if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
                        return Promise$1.resolve().then(function () {
                            if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                                // increase the db version, to create the new ObjectStore
                                if (dbInfo.db) {
                                    dbInfo.version = dbInfo.db.version + 1;
                                }
                                // Reopen the database for upgrading.
                                return _getUpgradedConnection(dbInfo);
                            }
                        }).then(function () {
                            return _tryReconnect(dbInfo).then(function () {
                                createTransaction(dbInfo, mode, callback, retries - 1);
                            });
                        })["catch"](callback);
                    }

                    callback(err);
                }
            }

            function createDbContext() {
                return {
                    // Running localForages sharing a database.
                    forages: [],
                    // Shared database.
                    db: null,
                    // Database readiness (promise).
                    dbReady: null,
                    // Deferred operations on the database.
                    deferredOperations: []
                };
            }

            // Open the IndexedDB database (automatically creates one if one didn't
            // previously exist), using any options set in the config.
            function _initStorage(options) {
                var self = this;
                var dbInfo = {
                    db: null
                };

                if (options) {
                    for (var i in options) {
                        dbInfo[i] = options[i];
                    }
                }

                // Get the current context of the database;
                var dbContext = dbContexts[dbInfo.name];

                // ...or create a new context.
                if (!dbContext) {
                    dbContext = createDbContext();
                    // Register the new context in the global container.
                    dbContexts[dbInfo.name] = dbContext;
                }

                // Register itself as a running localForage in the current context.
                dbContext.forages.push(self);

                // Replace the default `ready()` function with the specialized one.
                if (!self._initReady) {
                    self._initReady = self.ready;
                    self.ready = _fullyReady;
                }

                // Create an array of initialization states of the related localForages.
                var initPromises = [];

                function ignoreErrors() {
                    // Don't handle errors here,
                    // just makes sure related localForages aren't pending.
                    return Promise$1.resolve();
                }

                for (var j = 0; j < dbContext.forages.length; j++) {
                    var forage = dbContext.forages[j];
                    if (forage !== self) {
                        // Don't wait for itself...
                        initPromises.push(forage._initReady()["catch"](ignoreErrors));
                    }
                }

                // Take a snapshot of the related localForages.
                var forages = dbContext.forages.slice(0);

                // Initialize the connection process only when
                // all the related localForages aren't pending.
                return Promise$1.all(initPromises).then(function () {
                    dbInfo.db = dbContext.db;
                    // Get the connection or open a new one without upgrade.
                    return _getOriginalConnection(dbInfo);
                }).then(function (db) {
                    dbInfo.db = db;
                    if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
                        // Reopen the database for upgrading.
                        return _getUpgradedConnection(dbInfo);
                    }
                    return db;
                }).then(function (db) {
                    dbInfo.db = dbContext.db = db;
                    self._dbInfo = dbInfo;
                    // Share the final connection amongst related localForages.
                    for (var k = 0; k < forages.length; k++) {
                        var forage = forages[k];
                        if (forage !== self) {
                            // Self is already up-to-date.
                            forage._dbInfo.db = dbInfo.db;
                            forage._dbInfo.version = dbInfo.version;
                        }
                    }
                });
            }

            function getItem(key, callback) {
                var self = this;

                key = normalizeKey(key);

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                            if (err) {
                                return reject(err);
                            }

                            try {
                                var store = transaction.objectStore(self._dbInfo.storeName);
                                var req = store.get(key);

                                req.onsuccess = function () {
                                    var value = req.result;
                                    if (value === undefined) {
                                        value = null;
                                    }
                                    if (_isEncodedBlob(value)) {
                                        value = _decodeBlob(value);
                                    }
                                    resolve(value);
                                };

                                req.onerror = function () {
                                    reject(req.error);
                                };
                            } catch (e) {
                                reject(e);
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Iterate over all items stored in database.
            function iterate(iterator, callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                            if (err) {
                                return reject(err);
                            }

                            try {
                                var store = transaction.objectStore(self._dbInfo.storeName);
                                var req = store.openCursor();
                                var iterationNumber = 1;

                                req.onsuccess = function () {
                                    var cursor = req.result;

                                    if (cursor) {
                                        var value = cursor.value;
                                        if (_isEncodedBlob(value)) {
                                            value = _decodeBlob(value);
                                        }
                                        var result = iterator(value, cursor.key, iterationNumber++);
                                        if (result !== void 0) {
                                            resolve(result);
                                        } else {
                                            cursor["continue"]();
                                        }
                                    } else {
                                        resolve();
                                    }
                                };

                                req.onerror = function () {
                                    reject(req.error);
                                };
                            } catch (e) {
                                reject(e);
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);

                return promise;
            }

            function setItem(key, value, callback) {
                var self = this;

                key = normalizeKey(key);

                var promise = new Promise$1(function (resolve, reject) {
                    var dbInfo;
                    self.ready().then(function () {
                        dbInfo = self._dbInfo;
                        if (toString.call(value) === '[object Blob]') {
                            return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                                if (blobSupport) {
                                    return value;
                                }
                                return _encodeBlob(value);
                            });
                        }
                        return value;
                    }).then(function (value) {
                        createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                            if (err) {
                                return reject(err);
                            }

                            try {
                                var store = transaction.objectStore(self._dbInfo.storeName);

                                if (value === null) {
                                    value = undefined;
                                }

                                var req = store.put(value, key);

                                transaction.oncomplete = function () {
                                    if (value === undefined) {
                                        value = null;
                                    }

                                    resolve(value);
                                };
                                transaction.onabort = transaction.onerror = function () {
                                    var err = req.error ? req.error : req.transaction.error;
                                    reject(err);
                                };
                            } catch (e) {
                                reject(e);
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function removeItem(key, callback) {
                var self = this;

                key = normalizeKey(key);

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                            if (err) {
                                return reject(err);
                            }

                            try {
                                var store = transaction.objectStore(self._dbInfo.storeName);
                                var req = store["delete"](key);
                                transaction.oncomplete = function () {
                                    resolve();
                                };

                                transaction.onerror = function () {
                                    reject(req.error);
                                };
                                transaction.onabort = function () {
                                    var err = req.error ? req.error : req.transaction.error;
                                    reject(err);
                                };
                            } catch (e) {
                                reject(e);
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function clear(callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                            if (err) {
                                return reject(err);
                            }

                            try {
                                var store = transaction.objectStore(self._dbInfo.storeName);
                                var req = store.clear();

                                transaction.oncomplete = function () {
                                    resolve();
                                };

                                transaction.onabort = transaction.onerror = function () {
                                    var err = req.error ? req.error : req.transaction.error;
                                    reject(err);
                                };
                            } catch (e) {
                                reject(e);
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function length(callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                            if (err) {
                                return reject(err);
                            }

                            try {
                                var store = transaction.objectStore(self._dbInfo.storeName);
                                var req = store.count();

                                req.onsuccess = function () {
                                    resolve(req.result);
                                };

                                req.onerror = function () {
                                    reject(req.error);
                                };
                            } catch (e) {
                                reject(e);
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function key(n, callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    if (n < 0) {
                        resolve(null);

                        return;
                    }

                    self.ready().then(function () {
                        createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                            if (err) {
                                return reject(err);
                            }

                            try {
                                var store = transaction.objectStore(self._dbInfo.storeName);
                                var advanced = false;
                                var req = store.openCursor();

                                req.onsuccess = function () {
                                    var cursor = req.result;
                                    if (!cursor) {
                                        // this means there weren't enough keys
                                        resolve(null);

                                        return;
                                    }

                                    if (n === 0) {
                                        // We have the first key, return it if that's what they
                                        // wanted.
                                        resolve(cursor.key);
                                    } else {
                                        if (!advanced) {
                                            // Otherwise, ask the cursor to skip ahead n
                                            // records.
                                            advanced = true;
                                            cursor.advance(n);
                                        } else {
                                            // When we get here, we've got the nth key.
                                            resolve(cursor.key);
                                        }
                                    }
                                };

                                req.onerror = function () {
                                    reject(req.error);
                                };
                            } catch (e) {
                                reject(e);
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function keys(callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                            if (err) {
                                return reject(err);
                            }

                            try {
                                var store = transaction.objectStore(self._dbInfo.storeName);
                                var req = store.openCursor();
                                var keys = [];

                                req.onsuccess = function () {
                                    var cursor = req.result;

                                    if (!cursor) {
                                        resolve(keys);
                                        return;
                                    }

                                    keys.push(cursor.key);
                                    cursor["continue"]();
                                };

                                req.onerror = function () {
                                    reject(req.error);
                                };
                            } catch (e) {
                                reject(e);
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function dropInstance(options, callback) {
                callback = getCallback.apply(this, arguments);

                var currentConfig = this.config();
                options = typeof options !== 'function' && options || {};
                if (!options.name) {
                    options.name = options.name || currentConfig.name;
                    options.storeName = options.storeName || currentConfig.storeName;
                }

                var self = this;
                var promise;
                if (!options.name) {
                    promise = Promise$1.reject('Invalid arguments');
                } else {
                    var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

                    var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
                        var dbContext = dbContexts[options.name];
                        var forages = dbContext.forages;
                        dbContext.db = db;
                        for (var i = 0; i < forages.length; i++) {
                            forages[i]._dbInfo.db = db;
                        }
                        return db;
                    });

                    if (!options.storeName) {
                        promise = dbPromise.then(function (db) {
                            _deferReadiness(options);

                            var dbContext = dbContexts[options.name];
                            var forages = dbContext.forages;

                            db.close();
                            for (var i = 0; i < forages.length; i++) {
                                var forage = forages[i];
                                forage._dbInfo.db = null;
                            }

                            var dropDBPromise = new Promise$1(function (resolve, reject) {
                                var req = idb.deleteDatabase(options.name);

                                req.onerror = req.onblocked = function (err) {
                                    var db = req.result;
                                    if (db) {
                                        db.close();
                                    }
                                    reject(err);
                                };

                                req.onsuccess = function () {
                                    var db = req.result;
                                    if (db) {
                                        db.close();
                                    }
                                    resolve(db);
                                };
                            });

                            return dropDBPromise.then(function (db) {
                                dbContext.db = db;
                                for (var i = 0; i < forages.length; i++) {
                                    var _forage = forages[i];
                                    _advanceReadiness(_forage._dbInfo);
                                }
                            })["catch"](function (err) {
                                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                                throw err;
                            });
                        });
                    } else {
                        promise = dbPromise.then(function (db) {
                            if (!db.objectStoreNames.contains(options.storeName)) {
                                return;
                            }

                            var newVersion = db.version + 1;

                            _deferReadiness(options);

                            var dbContext = dbContexts[options.name];
                            var forages = dbContext.forages;

                            db.close();
                            for (var i = 0; i < forages.length; i++) {
                                var forage = forages[i];
                                forage._dbInfo.db = null;
                                forage._dbInfo.version = newVersion;
                            }

                            var dropObjectPromise = new Promise$1(function (resolve, reject) {
                                var req = idb.open(options.name, newVersion);

                                req.onerror = function (err) {
                                    var db = req.result;
                                    db.close();
                                    reject(err);
                                };

                                req.onupgradeneeded = function () {
                                    var db = req.result;
                                    db.deleteObjectStore(options.storeName);
                                };

                                req.onsuccess = function () {
                                    var db = req.result;
                                    db.close();
                                    resolve(db);
                                };
                            });

                            return dropObjectPromise.then(function (db) {
                                dbContext.db = db;
                                for (var j = 0; j < forages.length; j++) {
                                    var _forage2 = forages[j];
                                    _forage2._dbInfo.db = db;
                                    _advanceReadiness(_forage2._dbInfo);
                                }
                            })["catch"](function (err) {
                                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                                throw err;
                            });
                        });
                    }
                }

                executeCallback(promise, callback);
                return promise;
            }

            var asyncStorage = {
                _driver: 'asyncStorage',
                _initStorage: _initStorage,
                _support: isIndexedDBValid(),
                iterate: iterate,
                getItem: getItem,
                setItem: setItem,
                removeItem: removeItem,
                clear: clear,
                length: length,
                key: key,
                keys: keys,
                dropInstance: dropInstance
            };

            function isWebSQLValid() {
                return typeof openDatabase === 'function';
            }

            var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

            var BLOB_TYPE_PREFIX = '~~local_forage_type~';
            var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

            var SERIALIZED_MARKER = '__lfsc__:';
            var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

            // OMG the serializations!
            var TYPE_ARRAYBUFFER = 'arbf';
            var TYPE_BLOB = 'blob';
            var TYPE_INT8ARRAY = 'si08';
            var TYPE_UINT8ARRAY = 'ui08';
            var TYPE_UINT8CLAMPEDARRAY = 'uic8';
            var TYPE_INT16ARRAY = 'si16';
            var TYPE_INT32ARRAY = 'si32';
            var TYPE_UINT16ARRAY = 'ur16';
            var TYPE_UINT32ARRAY = 'ui32';
            var TYPE_FLOAT32ARRAY = 'fl32';
            var TYPE_FLOAT64ARRAY = 'fl64';
            var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

            var toString$1 = Object.prototype.toString;

            function stringToBuffer(serializedString) {
                // Fill the string into a ArrayBuffer.
                var bufferLength = serializedString.length * 0.75;
                var len = serializedString.length;
                var i;
                var p = 0;
                var encoded1, encoded2, encoded3, encoded4;

                if (serializedString[serializedString.length - 1] === '=') {
                    bufferLength--;
                    if (serializedString[serializedString.length - 2] === '=') {
                        bufferLength--;
                    }
                }

                var buffer = new ArrayBuffer(bufferLength);
                var bytes = new Uint8Array(buffer);

                for (i = 0; i < len; i += 4) {
                    encoded1 = BASE_CHARS.indexOf(serializedString[i]);
                    encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
                    encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
                    encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

                    /*jslint bitwise: true */
                    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
                    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
                    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
                }
                return buffer;
            }

            // Converts a buffer to a string to store, serialized, in the backend
            // storage library.
            function bufferToString(buffer) {
                // base64-arraybuffer
                var bytes = new Uint8Array(buffer);
                var base64String = '';
                var i;

                for (i = 0; i < bytes.length; i += 3) {
                    /*jslint bitwise: true */
                    base64String += BASE_CHARS[bytes[i] >> 2];
                    base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
                    base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
                    base64String += BASE_CHARS[bytes[i + 2] & 63];
                }

                if (bytes.length % 3 === 2) {
                    base64String = base64String.substring(0, base64String.length - 1) + '=';
                } else if (bytes.length % 3 === 1) {
                    base64String = base64String.substring(0, base64String.length - 2) + '==';
                }

                return base64String;
            }

            function serialize(value, callback) {
                var valueType = '';
                if (value) {
                    valueType = toString$1.call(value);
                }

                if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {

                    var buffer;
                    var marker = SERIALIZED_MARKER;

                    if (value instanceof ArrayBuffer) {
                        buffer = value;
                        marker += TYPE_ARRAYBUFFER;
                    } else {
                        buffer = value.buffer;

                        if (valueType === '[object Int8Array]') {
                            marker += TYPE_INT8ARRAY;
                        } else if (valueType === '[object Uint8Array]') {
                            marker += TYPE_UINT8ARRAY;
                        } else if (valueType === '[object Uint8ClampedArray]') {
                            marker += TYPE_UINT8CLAMPEDARRAY;
                        } else if (valueType === '[object Int16Array]') {
                            marker += TYPE_INT16ARRAY;
                        } else if (valueType === '[object Uint16Array]') {
                            marker += TYPE_UINT16ARRAY;
                        } else if (valueType === '[object Int32Array]') {
                            marker += TYPE_INT32ARRAY;
                        } else if (valueType === '[object Uint32Array]') {
                            marker += TYPE_UINT32ARRAY;
                        } else if (valueType === '[object Float32Array]') {
                            marker += TYPE_FLOAT32ARRAY;
                        } else if (valueType === '[object Float64Array]') {
                            marker += TYPE_FLOAT64ARRAY;
                        } else {
                            callback(new Error('Failed to get type for BinaryArray'));
                        }
                    }

                    callback(marker + bufferToString(buffer));
                } else if (valueType === '[object Blob]') {
                    // Conver the blob to a binaryArray and then to a string.
                    var fileReader = new FileReader();

                    fileReader.onload = function () {
                        // Backwards-compatible prefix for the blob type.
                        var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

                        callback(SERIALIZED_MARKER + TYPE_BLOB + str);
                    };

                    fileReader.readAsArrayBuffer(value);
                } else {
                    try {
                        callback(JSON.stringify(value));
                    } catch (e) {
                        console.error("Couldn't convert value into a JSON string: ", value);

                        callback(null, e);
                    }
                }
            }

            function deserialize(value) {

                if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
                    return JSON.parse(value);
                }

                var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
                var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

                var blobType;

                if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
                    var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
                    blobType = matcher[1];
                    serializedString = serializedString.substring(matcher[0].length);
                }
                var buffer = stringToBuffer(serializedString);

                switch (type) {
                    case TYPE_ARRAYBUFFER:
                        return buffer;
                    case TYPE_BLOB:
                        return createBlob([buffer], {
                            type: blobType
                        });
                    case TYPE_INT8ARRAY:
                        return new Int8Array(buffer);
                    case TYPE_UINT8ARRAY:
                        return new Uint8Array(buffer);
                    case TYPE_UINT8CLAMPEDARRAY:
                        return new Uint8ClampedArray(buffer);
                    case TYPE_INT16ARRAY:
                        return new Int16Array(buffer);
                    case TYPE_UINT16ARRAY:
                        return new Uint16Array(buffer);
                    case TYPE_INT32ARRAY:
                        return new Int32Array(buffer);
                    case TYPE_UINT32ARRAY:
                        return new Uint32Array(buffer);
                    case TYPE_FLOAT32ARRAY:
                        return new Float32Array(buffer);
                    case TYPE_FLOAT64ARRAY:
                        return new Float64Array(buffer);
                    default:
                        throw new Error('Unkown type: ' + type);
                }
            }

            var localforageSerializer = {
                serialize: serialize,
                deserialize: deserialize,
                stringToBuffer: stringToBuffer,
                bufferToString: bufferToString
            };

            function createDbTable(t, dbInfo, callback, errorCallback) {
                t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
            }

            function _initStorage$1(options) {
                var self = this;
                var dbInfo = {
                    db: null
                };

                if (options) {
                    for (var i in options) {
                        dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
                    }
                }

                var dbInfoPromise = new Promise$1(function (resolve, reject) {

                    try {
                        dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
                    } catch (e) {
                        return reject(e);
                    }

                    // Create our key/value table if it doesn't exist.
                    dbInfo.db.transaction(function (t) {
                        createDbTable(t, dbInfo, function () {
                            self._dbInfo = dbInfo;
                            resolve();
                        }, function (t, error) {
                            reject(error);
                        });
                    }, reject);
                });

                dbInfo.serializer = localforageSerializer;
                return dbInfoPromise;
            }

            function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
                t.executeSql(sqlStatement, args, callback, function (t, error) {
                    if (error.code === error.SYNTAX_ERR) {
                        t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                            if (!results.rows.length) {
                                // if the table is missing (was deleted)
                                // re-create it table and retry
                                createDbTable(t, dbInfo, function () {
                                    t.executeSql(sqlStatement, args, callback, errorCallback);
                                }, errorCallback);
                            } else {
                                errorCallback(t, error);
                            }
                        }, errorCallback);
                    } else {
                        errorCallback(t, error);
                    }
                }, errorCallback);
            }

            function getItem$1(key, callback) {
                var self = this;

                key = normalizeKey(key);

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        var dbInfo = self._dbInfo;
                        dbInfo.db.transaction(function (t) {
                            tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                                var result = results.rows.length ? results.rows.item(0).value : null;

                                // Check to see if this is serialized content we need to
                                // unpack.
                                if (result) {
                                    result = dbInfo.serializer.deserialize(result);
                                }

                                resolve(result);
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function iterate$1(iterator, callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        var dbInfo = self._dbInfo;

                        dbInfo.db.transaction(function (t) {
                            tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                                var rows = results.rows;
                                var length = rows.length;

                                for (var i = 0; i < length; i++) {
                                    var item = rows.item(i);
                                    var result = item.value;

                                    // Check to see if this is serialized content
                                    // we need to unpack.
                                    if (result) {
                                        result = dbInfo.serializer.deserialize(result);
                                    }

                                    result = iterator(result, item.key, i + 1);

                                    // void(0) prevents problems with redefinition
                                    // of `undefined`.
                                    if (result !== void 0) {
                                        resolve(result);
                                        return;
                                    }
                                }

                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function _setItem(key, value, callback, retriesLeft) {
                var self = this;

                key = normalizeKey(key);

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        // The localStorage API doesn't return undefined values in an
                        // "expected" way, so undefined is always cast to null in all
                        // drivers. See: https://github.com/mozilla/localForage/pull/42
                        if (value === undefined) {
                            value = null;
                        }

                        // Save the original value to pass to the callback.
                        var originalValue = value;

                        var dbInfo = self._dbInfo;
                        dbInfo.serializer.serialize(value, function (value, error) {
                            if (error) {
                                reject(error);
                            } else {
                                dbInfo.db.transaction(function (t) {
                                    tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                                        resolve(originalValue);
                                    }, function (t, error) {
                                        reject(error);
                                    });
                                }, function (sqlError) {
                                    // The transaction failed; check
                                    // to see if it's a quota error.
                                    if (sqlError.code === sqlError.QUOTA_ERR) {
                                        // We reject the callback outright for now, but
                                        // it's worth trying to re-run the transaction.
                                        // Even if the user accepts the prompt to use
                                        // more storage on Safari, this error will
                                        // be called.
                                        //
                                        // Try to re-run the transaction.
                                        if (retriesLeft > 0) {
                                            resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                            return;
                                        }
                                        reject(sqlError);
                                    }
                                });
                            }
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function setItem$1(key, value, callback) {
                return _setItem.apply(this, [key, value, callback, 1]);
            }

            function removeItem$1(key, callback) {
                var self = this;

                key = normalizeKey(key);

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        var dbInfo = self._dbInfo;
                        dbInfo.db.transaction(function (t) {
                            tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Deletes every item in the table.
            // TODO: Find out if this resets the AUTO_INCREMENT number.
            function clear$1(callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        var dbInfo = self._dbInfo;
                        dbInfo.db.transaction(function (t) {
                            tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Does a simple `COUNT(key)` to get the number of items stored in
            // localForage.
            function length$1(callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        var dbInfo = self._dbInfo;
                        dbInfo.db.transaction(function (t) {
                            // Ahhh, SQL makes this one soooooo easy.
                            tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                                var result = results.rows.item(0).c;
                                resolve(result);
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Return the key located at key index X; essentially gets the key from a
            // `WHERE id = ?`. This is the most efficient way I can think to implement
            // this rarely-used (in my experience) part of the API, but it can seem
            // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
            // the ID of each key will change every time it's updated. Perhaps a stored
            // procedure for the `setItem()` SQL would solve this problem?
            // TODO: Don't change ID on `setItem()`.
            function key$1(n, callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        var dbInfo = self._dbInfo;
                        dbInfo.db.transaction(function (t) {
                            tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                                var result = results.rows.length ? results.rows.item(0).key : null;
                                resolve(result);
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            function keys$1(callback) {
                var self = this;

                var promise = new Promise$1(function (resolve, reject) {
                    self.ready().then(function () {
                        var dbInfo = self._dbInfo;
                        dbInfo.db.transaction(function (t) {
                            tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                                var keys = [];

                                for (var i = 0; i < results.rows.length; i++) {
                                    keys.push(results.rows.item(i).key);
                                }

                                resolve(keys);
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    })["catch"](reject);
                });

                executeCallback(promise, callback);
                return promise;
            }

            // https://www.w3.org/TR/webdatabase/#databases
            // > There is no way to enumerate or delete the databases available for an origin from this API.
            function getAllStoreNames(db) {
                return new Promise$1(function (resolve, reject) {
                    db.transaction(function (t) {
                        t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                            var storeNames = [];

                            for (var i = 0; i < results.rows.length; i++) {
                                storeNames.push(results.rows.item(i).name);
                            }

                            resolve({
                                db: db,
                                storeNames: storeNames
                            });
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        reject(sqlError);
                    });
                });
            }

            function dropInstance$1(options, callback) {
                callback = getCallback.apply(this, arguments);

                var currentConfig = this.config();
                options = typeof options !== 'function' && options || {};
                if (!options.name) {
                    options.name = options.name || currentConfig.name;
                    options.storeName = options.storeName || currentConfig.storeName;
                }

                var self = this;
                var promise;
                if (!options.name) {
                    promise = Promise$1.reject('Invalid arguments');
                } else {
                    promise = new Promise$1(function (resolve) {
                        var db;
                        if (options.name === currentConfig.name) {
                            // use the db reference of the current instance
                            db = self._dbInfo.db;
                        } else {
                            db = openDatabase(options.name, '', '', 0);
                        }

                        if (!options.storeName) {
                            // drop all database tables
                            resolve(getAllStoreNames(db));
                        } else {
                            resolve({
                                db: db,
                                storeNames: [options.storeName]
                            });
                        }
                    }).then(function (operationInfo) {
                        return new Promise$1(function (resolve, reject) {
                            operationInfo.db.transaction(function (t) {
                                function dropTable(storeName) {
                                    return new Promise$1(function (resolve, reject) {
                                        t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                            resolve();
                                        }, function (t, error) {
                                            reject(error);
                                        });
                                    });
                                }

                                var operations = [];
                                for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                                    operations.push(dropTable(operationInfo.storeNames[i]));
                                }

                                Promise$1.all(operations).then(function () {
                                    resolve();
                                })["catch"](function (e) {
                                    reject(e);
                                });
                            }, function (sqlError) {
                                reject(sqlError);
                            });
                        });
                    });
                }

                executeCallback(promise, callback);
                return promise;
            }

            var webSQLStorage = {
                _driver: 'webSQLStorage',
                _initStorage: _initStorage$1,
                _support: isWebSQLValid(),
                iterate: iterate$1,
                getItem: getItem$1,
                setItem: setItem$1,
                removeItem: removeItem$1,
                clear: clear$1,
                length: length$1,
                key: key$1,
                keys: keys$1,
                dropInstance: dropInstance$1
            };

            function isLocalStorageValid() {
                try {
                    return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
                        // in IE8 typeof localStorage.setItem === 'object'
                        !!localStorage.setItem;
                } catch (e) {
                    return false;
                }
            }

            function _getKeyPrefix(options, defaultConfig) {
                var keyPrefix = options.name + '/';

                if (options.storeName !== defaultConfig.storeName) {
                    keyPrefix += options.storeName + '/';
                }
                return keyPrefix;
            }

            // Check if localStorage throws when saving an item
            function checkIfLocalStorageThrows() {
                var localStorageTestKey = '_localforage_support_test';

                try {
                    localStorage.setItem(localStorageTestKey, true);
                    localStorage.removeItem(localStorageTestKey);

                    return false;
                } catch (e) {
                    return true;
                }
            }

            // Check if localStorage is usable and allows to save an item
            // This method checks if localStorage is usable in Safari Private Browsing
            // mode, or in any other case where the available quota for localStorage
            // is 0 and there wasn't any saved items yet.
            function _isLocalStorageUsable() {
                return !checkIfLocalStorageThrows() || localStorage.length > 0;
            }

            // Config the localStorage backend, using options set in the config.
            function _initStorage$2(options) {
                var self = this;
                var dbInfo = {};
                if (options) {
                    for (var i in options) {
                        dbInfo[i] = options[i];
                    }
                }

                dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

                if (!_isLocalStorageUsable()) {
                    return Promise$1.reject();
                }

                self._dbInfo = dbInfo;
                dbInfo.serializer = localforageSerializer;

                return Promise$1.resolve();
            }

            // Remove all keys from the datastore, effectively destroying all data in
            // the app's key/value store!
            function clear$2(callback) {
                var self = this;
                var promise = self.ready().then(function () {
                    var keyPrefix = self._dbInfo.keyPrefix;

                    for (var i = localStorage.length - 1; i >= 0; i--) {
                        var key = localStorage.key(i);

                        if (key.indexOf(keyPrefix) === 0) {
                            localStorage.removeItem(key);
                        }
                    }
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Retrieve an item from the store. Unlike the original async_storage
            // library in Gaia, we don't modify return values at all. If a key's value
            // is `undefined`, we pass that value to the callback function.
            function getItem$2(key, callback) {
                var self = this;

                key = normalizeKey(key);

                var promise = self.ready().then(function () {
                    var dbInfo = self._dbInfo;
                    var result = localStorage.getItem(dbInfo.keyPrefix + key);

                    // If a result was found, parse it from the serialized
                    // string into a JS object. If result isn't truthy, the key
                    // is likely undefined and we'll pass it straight to the
                    // callback.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    return result;
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Iterate over all items in the store.
            function iterate$2(iterator, callback) {
                var self = this;

                var promise = self.ready().then(function () {
                    var dbInfo = self._dbInfo;
                    var keyPrefix = dbInfo.keyPrefix;
                    var keyPrefixLength = keyPrefix.length;
                    var length = localStorage.length;
                    var iterationNumber = 1;

                    for (var i = 0; i < length; i++) {
                        var key = localStorage.key(i);
                        if (key.indexOf(keyPrefix) !== 0) {
                            continue;
                        }
                        var value = localStorage.getItem(key);
                        if (value) {
                            value = dbInfo.serializer.deserialize(value);
                        }

                        value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

                        if (value !== void 0) {
                            return value;
                        }
                    }
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Same as localStorage's key() method, except takes a callback.
            function key$2(n, callback) {
                var self = this;
                var promise = self.ready().then(function () {
                    var dbInfo = self._dbInfo;
                    var result;
                    try {
                        result = localStorage.key(n);
                    } catch (error) {
                        result = null;
                    }

                    // Remove the prefix from the key, if a key is found.
                    if (result) {
                        result = result.substring(dbInfo.keyPrefix.length);
                    }

                    return result;
                });

                executeCallback(promise, callback);
                return promise;
            }

            function keys$2(callback) {
                var self = this;
                var promise = self.ready().then(function () {
                    var dbInfo = self._dbInfo;
                    var length = localStorage.length;
                    var keys = [];

                    for (var i = 0; i < length; i++) {
                        var itemKey = localStorage.key(i);
                        if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                            keys.push(itemKey.substring(dbInfo.keyPrefix.length));
                        }
                    }

                    return keys;
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Supply the number of keys in the datastore to the callback function.
            function length$2(callback) {
                var self = this;
                var promise = self.keys().then(function (keys) {
                    return keys.length;
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Remove an item from the store, nice and simple.
            function removeItem$2(key, callback) {
                var self = this;

                key = normalizeKey(key);

                var promise = self.ready().then(function () {
                    var dbInfo = self._dbInfo;
                    localStorage.removeItem(dbInfo.keyPrefix + key);
                });

                executeCallback(promise, callback);
                return promise;
            }

            // Set a key's value and run an optional callback once the value is set.
            // Unlike Gaia's implementation, the callback function is passed the value,
            // in case you want to operate on that value only after you're sure it
            // saved, or something like that.
            function setItem$2(key, value, callback) {
                var self = this;

                key = normalizeKey(key);

                var promise = self.ready().then(function () {
                    // Convert undefined values to null.
                    // https://github.com/mozilla/localForage/pull/42
                    if (value === undefined) {
                        value = null;
                    }

                    // Save the original value to pass to the callback.
                    var originalValue = value;

                    return new Promise$1(function (resolve, reject) {
                        var dbInfo = self._dbInfo;
                        dbInfo.serializer.serialize(value, function (value, error) {
                            if (error) {
                                reject(error);
                            } else {
                                try {
                                    localStorage.setItem(dbInfo.keyPrefix + key, value);
                                    resolve(originalValue);
                                } catch (e) {
                                    // localStorage capacity exceeded.
                                    // TODO: Make this a specific error/event.
                                    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                                        reject(e);
                                    }
                                    reject(e);
                                }
                            }
                        });
                    });
                });

                executeCallback(promise, callback);
                return promise;
            }

            function dropInstance$2(options, callback) {
                callback = getCallback.apply(this, arguments);

                options = typeof options !== 'function' && options || {};
                if (!options.name) {
                    var currentConfig = this.config();
                    options.name = options.name || currentConfig.name;
                    options.storeName = options.storeName || currentConfig.storeName;
                }

                var self = this;
                var promise;
                if (!options.name) {
                    promise = Promise$1.reject('Invalid arguments');
                } else {
                    promise = new Promise$1(function (resolve) {
                        if (!options.storeName) {
                            resolve(options.name + '/');
                        } else {
                            resolve(_getKeyPrefix(options, self._defaultConfig));
                        }
                    }).then(function (keyPrefix) {
                        for (var i = localStorage.length - 1; i >= 0; i--) {
                            var key = localStorage.key(i);

                            if (key.indexOf(keyPrefix) === 0) {
                                localStorage.removeItem(key);
                            }
                        }
                    });
                }

                executeCallback(promise, callback);
                return promise;
            }

            var localStorageWrapper = {
                _driver: 'localStorageWrapper',
                _initStorage: _initStorage$2,
                _support: isLocalStorageValid(),
                iterate: iterate$2,
                getItem: getItem$2,
                setItem: setItem$2,
                removeItem: removeItem$2,
                clear: clear$2,
                length: length$2,
                key: key$2,
                keys: keys$2,
                dropInstance: dropInstance$2
            };

            var sameValue = function sameValue(x, y) {
                return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
            };

            var includes = function includes(array, searchElement) {
                var len = array.length;
                var i = 0;
                while (i < len) {
                    if (sameValue(array[i], searchElement)) {
                        return true;
                    }
                    i++;
                }

                return false;
            };

            var isArray = Array.isArray || function (arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };

            // Drivers are stored here when `defineDriver()` is called.
            // They are shared across all instances of localForage.
            var DefinedDrivers = {};

            var DriverSupport = {};

            var DefaultDrivers = {
                INDEXEDDB: asyncStorage,
                WEBSQL: webSQLStorage,
                LOCALSTORAGE: localStorageWrapper
            };

            var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

            var OptionalDriverMethods = ['dropInstance'];

            var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

            var DefaultConfig = {
                description: '',
                driver: DefaultDriverOrder.slice(),
                name: 'localforage',
                // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
                // we can use without a prompt.
                size: 4980736,
                storeName: 'keyvaluepairs',
                version: 1.0
            };

            function callWhenReady(localForageInstance, libraryMethod) {
                localForageInstance[libraryMethod] = function () {
                    var _args = arguments;
                    return localForageInstance.ready().then(function () {
                        return localForageInstance[libraryMethod].apply(localForageInstance, _args);
                    });
                };
            }

            function extend() {
                for (var i = 1; i < arguments.length; i++) {
                    var arg = arguments[i];

                    if (arg) {
                        for (var _key in arg) {
                            if (arg.hasOwnProperty(_key)) {
                                if (isArray(arg[_key])) {
                                    arguments[0][_key] = arg[_key].slice();
                                } else {
                                    arguments[0][_key] = arg[_key];
                                }
                            }
                        }
                    }
                }

                return arguments[0];
            }

            var LocalForage = function () {
                function LocalForage(options) {
                    _classCallCheck(this, LocalForage);

                    for (var driverTypeKey in DefaultDrivers) {
                        if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                            var driver = DefaultDrivers[driverTypeKey];
                            var driverName = driver._driver;
                            this[driverTypeKey] = driverName;

                            if (!DefinedDrivers[driverName]) {

                                this.defineDriver(driver);
                            }
                        }
                    }

                    this._defaultConfig = extend({}, DefaultConfig);
                    this._config = extend({}, this._defaultConfig, options);
                    this._driverSet = null;
                    this._initDriver = null;
                    this._ready = false;
                    this._dbInfo = null;

                    this._wrapLibraryMethodsWithReady();
                    this.setDriver(this._config.driver)["catch"](function () {});
                }

                LocalForage.prototype.config = function config(options) {

                    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {

                        if (this._ready) {
                            return new Error("Can't call config() after localforage " + 'has been used.');
                        }

                        for (var i in options) {
                            if (i === 'storeName') {
                                options[i] = options[i].replace(/\W/g, '_');
                            }

                            if (i === 'version' && typeof options[i] !== 'number') {
                                return new Error('Database version must be a number.');
                            }

                            this._config[i] = options[i];
                        }

                        if ('driver' in options && options.driver) {
                            return this.setDriver(this._config.driver);
                        }

                        return true;
                    } else if (typeof options === 'string') {
                        return this._config[options];
                    } else {
                        return this._config;
                    }
                };

                LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
                    var promise = new Promise$1(function (resolve, reject) {
                        try {
                            var driverName = driverObject._driver;
                            var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                            if (!driverObject._driver) {
                                reject(complianceError);
                                return;
                            }

                            var driverMethods = LibraryMethods.concat('_initStorage');
                            for (var i = 0, len = driverMethods.length; i < len; i++) {
                                var driverMethodName = driverMethods[i];

                                var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                                if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                                    reject(complianceError);
                                    return;
                                }
                            }

                            var configureMissingMethods = function configureMissingMethods() {
                                var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                                    return function () {
                                        var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                                        var promise = Promise$1.reject(error);
                                        executeCallback(promise, arguments[arguments.length - 1]);
                                        return promise;
                                    };
                                };

                                for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                                    var optionalDriverMethod = OptionalDriverMethods[_i];
                                    if (!driverObject[optionalDriverMethod]) {
                                        driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                                    }
                                }
                            };

                            configureMissingMethods();

                            var setDriverSupport = function setDriverSupport(support) {
                                if (DefinedDrivers[driverName]) {
                                    console.info('Redefining LocalForage driver: ' + driverName);
                                }
                                DefinedDrivers[driverName] = driverObject;
                                DriverSupport[driverName] = support;

                                resolve();
                            };

                            if ('_support' in driverObject) {
                                if (driverObject._support && typeof driverObject._support === 'function') {
                                    driverObject._support().then(setDriverSupport, reject);
                                } else {
                                    setDriverSupport(!!driverObject._support);
                                }
                            } else {
                                setDriverSupport(true);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });

                    executeTwoCallbacks(promise, callback, errorCallback);
                    return promise;
                };

                LocalForage.prototype.driver = function driver() {
                    return this._driver || null;
                };

                LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
                    var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

                    executeTwoCallbacks(getDriverPromise, callback, errorCallback);
                    return getDriverPromise;
                };

                LocalForage.prototype.getSerializer = function getSerializer(callback) {
                    var serializerPromise = Promise$1.resolve(localforageSerializer);
                    executeTwoCallbacks(serializerPromise, callback);
                    return serializerPromise;
                };

                LocalForage.prototype.ready = function ready(callback) {
                    var self = this;

                    var promise = self._driverSet.then(function () {
                        if (self._ready === null) {
                            self._ready = self._initDriver();
                        }

                        return self._ready;
                    });

                    executeTwoCallbacks(promise, callback, callback);
                    return promise;
                };

                LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
                    var self = this;

                    if (!isArray(drivers)) {
                        drivers = [drivers];
                    }

                    var supportedDrivers = this._getSupportedDrivers(drivers);

                    function setDriverToConfig() {
                        self._config.driver = self.driver();
                    }

                    function extendSelfWithDriver(driver) {
                        self._extend(driver);
                        setDriverToConfig();

                        self._ready = self._initStorage(self._config);
                        return self._ready;
                    }

                    function initDriver(supportedDrivers) {
                        return function () {
                            var currentDriverIndex = 0;

                            function driverPromiseLoop() {
                                while (currentDriverIndex < supportedDrivers.length) {
                                    var driverName = supportedDrivers[currentDriverIndex];
                                    currentDriverIndex++;

                                    self._dbInfo = null;
                                    self._ready = null;

                                    return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                                }

                                setDriverToConfig();
                                var error = new Error('No available storage method found.');
                                self._driverSet = Promise$1.reject(error);
                                return self._driverSet;
                            }

                            return driverPromiseLoop();
                        };
                    }

                    var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
                        return Promise$1.resolve();
                    }) : Promise$1.resolve();

                    this._driverSet = oldDriverSetDone.then(function () {
                        var driverName = supportedDrivers[0];
                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(function (driver) {
                            self._driver = driver._driver;
                            setDriverToConfig();
                            self._wrapLibraryMethodsWithReady();
                            self._initDriver = initDriver(supportedDrivers);
                        });
                    })["catch"](function () {
                        setDriverToConfig();
                        var error = new Error('No available storage method found.');
                        self._driverSet = Promise$1.reject(error);
                        return self._driverSet;
                    });

                    executeTwoCallbacks(this._driverSet, callback, errorCallback);
                    return this._driverSet;
                };

                LocalForage.prototype.supports = function supports(driverName) {
                    return !!DriverSupport[driverName];
                };

                LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
                    extend(this, libraryMethodsAndProperties);
                };

                LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
                    var supportedDrivers = [];
                    for (var i = 0, len = drivers.length; i < len; i++) {
                        var driverName = drivers[i];
                        if (this.supports(driverName)) {
                            supportedDrivers.push(driverName);
                        }
                    }
                    return supportedDrivers;
                };

                LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
                    for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                        callWhenReady(this, LibraryMethods[i]);
                    }
                };

                LocalForage.prototype.createInstance = function createInstance(options) {
                    return new LocalForage(options);
                };

                return LocalForage;
            }();

            var localforage_js = new LocalForage();

            module.exports = localforage_js;

        }, {
            "3": 3
        }]
    }, {}, [4])(4)
});
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['localforage', 'backbone', 'underscore'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        var localforage = require('localforage');
        var Backbone = require('backbone');
        var _ = require('underscore');
        module.exports = factory(localforage, Backbone, _);
    } else {
        factory(root.localforage, root.Backbone, root._);
    }
}(this, function (localforage, Backbone, _) {
    function S4() {
        // jshint -W016
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
        // jshint +W016
    }

    function guid() {
        return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
    }

    function updateCollectionReferences(collection, callback, err, data) {
        // If this model has a collection, keep the collection in =
        // sync as well.
        if (collection) {
            // Create an array of `model.collection` models' ids.
            var collectionData = collection.map(function (model) {
                return collection.model.prototype.sync._localforageNamespace + '/' + model.id;
            });
            callback = callback ? _.partial(callback, err, data) : undefined;

            if (!collection.sync.localforageKey) {
                localforageKey(collection);
            }
            localforage.setItem(collection.sync.localforageKey, collectionData, callback);
        }
    }

    function localforageKey(model) {

        if (model instanceof Backbone.Collection) {
            model.sync.localforageKey = model.sync._localforageNamespace;
        } else { // `this` is a `Backbone.Model` if not a `Backbone.Collection`.
            // Generate an id if one is not set yet.
            if (!model.id) {
                model[model.idAttribute] = model.attributes[model.idAttribute] = guid();
            }

            model.sync.localforageKey = model.sync._localforageNamespace + '/' + model.id;
        }
    }

    Backbone.localforage = {
        localforageInstance: localforage,

        sync: function (name) {
            var self = this;
            var sync = function (method, model, options) {
                localforageKey(model);

                switch (method) {
                    case 'read':
                        return model.id ? self.find(model, options) : self.findAll(model, options);
                    case 'create':
                        return self.create(model, options);
                    case 'update':
                        return self.update(model, options);
                    case 'delete':
                        return self.destroy(model, options);
                }
            };

            sync._localforageNamespace = name;

            sync._localeForageKeyFn = localforageKey;

            return sync;
        },

        save: function (model, callback) {
            localforage.setItem(model.sync.localforageKey, model.toJSON(), function (err, data) {

                if (model.collection) {
                    updateCollectionReferences(model.collection, callback, err, data);
                } else if (callback) {
                    callback(data);
                }
            });
        },

        create: function (model, callbacks) {

            return this.update(model, callbacks);
        },

        update: function (model, callbacks) {
            this.save(model, function (data) {
                if (callbacks.success) {
                    callbacks.success(data);
                }
            });
        },

        find: function (model, callbacks) {
            localforage.getItem(model.sync.localforageKey, function (err, data) {
                if (!err && !_.isEmpty(data)) {
                    if (callbacks.success) {
                        callbacks.success(data);
                    }
                } else if (callbacks.error) {
                    callbacks.error();
                }
            });
        },

        findAll: function (collection, callbacks) {
            localforage.getItem(collection.sync.localforageKey, function (err, data) {
                if (!err && data && data.length) {
                    var done = function () {
                        if (callbacks.success) {
                            callbacks.success(data);
                        }
                    };
                    done = _.after(data.length, done);

                    var onModel = function (i, err, model) {
                        data[i] = model;
                        done();
                    };

                    for (var i = 0; i < data.length; ++i) {
                        localforage.getItem(data[i], _.partial(onModel, i));
                    }
                } else {
                    data = [];
                    if (callbacks.success) {
                        callbacks.success(data);
                    }
                }
            });
        },
        destroy: function (model, callbacks) {
            var collection = model.collection;
            localforage.removeItem(model.sync.localforageKey, function () {
                if (collection) {
                    updateCollectionReferences(collection, callbacks.success, null, model.toJSON());
                } else if (callbacks.success) {
                    callbacks.success(model.toJSON());
                }
            });
        }
    };

    return Backbone.localforage;
}));