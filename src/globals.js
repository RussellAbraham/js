/*--------------------------------------------------------------------------*/

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
/*--------------------------------------------------------------------------*/
var setOptions = {
    add: true,
    remove: true,
    merge: true
};

var addOptions = {
    add: true,
    remove: false
};

/*--------------------------------------------------------------------------*/
var typeMap = {
    'A': 'Array',
    'D': 'Date',
    'N': 'Number',
    'S': 'String',
    'F': 'Function',
    'O': 'Object'
};
/*--------------------------------------------------------------------------*/

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

/*--------------------------------------------------------------------------*/

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

/*--------------------------------------------------------------------------*/

var methodMap = {
    create: "POST",
    update: "PUT",
    patch: "PATCH",
    delete: "DELETE",
    read: "GET"
};

/*--------------------------------------------------------------------------*/

var routeStripper = /^[#\/]|\s+$/g;
var rootStripper = /^\/+|\/+$/g;
var pathStripper = /#.*$/;
var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

/*--------------------------------------------------------------------------*/

var BLOCK_GENERIC = 0;
var BLOCK_IF = 1;
var BLOCK_FOR = 2;
var BLOCK_WHILE = 3;
var BLOCK_WITH = 4;
var BLOCK_SWITCH = 5;
var BLOCK_ELSE_SPACE = 6;
var rootBlock;
var parseErrors = [];
var prevIfBlock = null;
var isInsideVoidFunction = false;

/*--------------------------------------------------------------------------*/

/** Used as a safe reference for `undefined` in pre-ES5 environments. */
var undefined;

/** Used as the semantic version number. */
var VERSION = '4.17.20';

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Error message constants. */
var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
    FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256,
    WRAP_FLIP_FLAG = 512;

/** Used as default options for `_.truncate`. */
var DEFAULT_TRUNC_LENGTH = 30,
    DEFAULT_TRUNC_OMISSION = '...';

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/** Used to indicate the type of lazy iteratees. */
var LAZY_FILTER_FLAG = 1,
    LAZY_MAP_FLAG = 2,
    LAZY_WHILE_FLAG = 3;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
];

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    domExcTag = '[object DOMException]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]',
    weakSetTag = '[object WeakSet]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match empty string literals in compiled template source. */
var reEmptyStringLeading = /\b__p \+= '';/g,
    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

/** Used to match HTML entities and HTML characters. */
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
    reUnescapedHtml = /[&<>"']/g,
    reHasEscapedHtml = RegExp(reEscapedHtml.source),
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/** Used to match template delimiters. */
var reEscape = /<%-([\s\S]+?)%>/g,
    reEvaluate = /<%([\s\S]+?)%>/g,
    reInterpolate = /<%=([\s\S]+?)%>/g;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g,
    reTrimStart = /^\s+/,
    reTrimEnd = /\s+$/;

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
    reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Used to match
 * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
 */
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to ensure capturing order of template delimiters. */
var reNoMatch = /($^)/;

/** Used to match unescaped characters in compiled string literals. */
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsAstral = '[' + rsAstralRange + ']',
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

new RegExp(
    // Known URL protocol are "http", "https", and "ftp".
    '(?:http|https|ftp)://' +

    // Optionally allow username and passwords.
    '(?:[^:@/ \u00A0]*(?::[^@/ \u00A0]*)?@)?' +

    // Hostname.
    '(?:[1-9][0-9]{0,2}(?:[.][1-9][0-9]{0,2}){3}|' +
    '[0-9a-fA-F]{0,4}(?::{1,2}[0-9a-fA-F]{1,4})+|' +
    '(?!-)[^[!"#$%&\'()*+,/:;<=>?@\\^_`{|}~\u0000- \u007F-\u00A0]+)' +

    // Port
    '(?::[1-9][0-9]*)?' +

    // Path.
    '(?:/(?:(?![/ \u00A0]|[,.)}"\u0027!]+[ \u00A0]|[,.)}"\u0027!]+$).)*)*|' +

    (linkifyURLs <= 1 ? '' :
        // Also support URLs without a protocol (assume "http").
        // Optional username and password.
        '(?:[^:@/ \u00A0]*(?::[^@/ \u00A0]*)?@)?' +

        // Hostnames must end with a well-known top-level domain or must be
        // numeric.
        '(?:[1-9][0-9]{0,2}(?:[.][1-9][0-9]{0,2}){3}|' +
        'localhost|' +
        '(?:(?!-)' +
        '[^.[!"#$%&\'()*+,/:;<=>?@\\^_`{|}~\u0000- \u007F-\u00A0]+[.]){2,}' +
        '(?:(?:com|net|org|edu|gov|aero|asia|biz|cat|coop|info|int|jobs|mil|mobi|' +
        'museum|name|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|' +
        'au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|' +
        'ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|' +
        'dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|' +
        'gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|' +
        'ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|' +
        'lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|' +
        'mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|' +
        'pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|' +
        'sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|' +
        'tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|' +
        'yu|za|zm|zw|arpa)(?![a-zA-Z0-9])|[Xx][Nn]--[-a-zA-Z0-9]+))' +

        // Port
        '(?::[1-9][0-9]{0,4})?' +

        // Path.
        '(?:/(?:(?![/ \u00A0]|[,.)}"\u0027!]+[ \u00A0]|[,.)}"\u0027!]+$).)*)*|') +

    // In addition, support e-mail address. Optionally, recognize "mailto:"
    '(?:mailto:)' + (linkifyURLs <= 1 ? '' : '?') +

    // Username:
    '[-_.+a-zA-Z0-9]+@' +

    // Hostname.
    '(?!-)[-a-zA-Z0-9]+(?:[.](?!-)[-a-zA-Z0-9]+)?[.]' +
    '(?:(?:com|net|org|edu|gov|aero|asia|biz|cat|coop|info|int|jobs|mil|mobi|' +
    'museum|name|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|' +
    'au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|' +
    'ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|' +
    'dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|' +
    'gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|' +
    'ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|' +
    'lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|' +
    'mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|' +
    'pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|' +
    'sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|' +
    'tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|' +
    'yu|za|zm|zw|arpa)(?![a-zA-Z0-9])|[Xx][Nn]--[-a-zA-Z0-9]+)' +

    // Optional arguments
    '(?:[?](?:(?![ \u00A0]|[,.)}"\u0027!]+[ \u00A0]|[,.)}"\u0027!]+$).)*)?'

);

/*--------------------------------------------------------------------------*/

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
].join('|'), 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to assign default `context` object properties. */
var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
];

/** Used to make template sourceURLs easier to identify. */
var templateCounter = -1;

/*--------------------------------------------------------------------------*/

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag] = typedArrayTags[funcTag] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
    cloneableTags[boolTag] = cloneableTags[dateTag] =
    cloneableTags[float32Tag] = cloneableTags[float64Tag] =
    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
    cloneableTags[int32Tag] = cloneableTags[mapTag] =
    cloneableTags[numberTag] = cloneableTags[objectTag] =
    cloneableTags[regexpTag] = cloneableTags[setTag] =
    cloneableTags[stringTag] = cloneableTags[symbolTag] =
    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
    cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
    cloneableTags[weakMapTag] = false;


/*--------------------------------------------------------------------------*/

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',
    '\xc1': 'A',
    '\xc2': 'A',
    '\xc3': 'A',
    '\xc4': 'A',
    '\xc5': 'A',
    '\xe0': 'a',
    '\xe1': 'a',
    '\xe2': 'a',
    '\xe3': 'a',
    '\xe4': 'a',
    '\xe5': 'a',
    '\xc7': 'C',
    '\xe7': 'c',
    '\xd0': 'D',
    '\xf0': 'd',
    '\xc8': 'E',
    '\xc9': 'E',
    '\xca': 'E',
    '\xcb': 'E',
    '\xe8': 'e',
    '\xe9': 'e',
    '\xea': 'e',
    '\xeb': 'e',
    '\xcc': 'I',
    '\xcd': 'I',
    '\xce': 'I',
    '\xcf': 'I',
    '\xec': 'i',
    '\xed': 'i',
    '\xee': 'i',
    '\xef': 'i',
    '\xd1': 'N',
    '\xf1': 'n',
    '\xd2': 'O',
    '\xd3': 'O',
    '\xd4': 'O',
    '\xd5': 'O',
    '\xd6': 'O',
    '\xd8': 'O',
    '\xf2': 'o',
    '\xf3': 'o',
    '\xf4': 'o',
    '\xf5': 'o',
    '\xf6': 'o',
    '\xf8': 'o',
    '\xd9': 'U',
    '\xda': 'U',
    '\xdb': 'U',
    '\xdc': 'U',
    '\xf9': 'u',
    '\xfa': 'u',
    '\xfb': 'u',
    '\xfc': 'u',
    '\xdd': 'Y',
    '\xfd': 'y',
    '\xff': 'y',
    '\xc6': 'Ae',
    '\xe6': 'ae',
    '\xde': 'Th',
    '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',
    '\u0102': 'A',
    '\u0104': 'A',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u0105': 'a',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010a': 'C',
    '\u010c': 'C',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010b': 'c',
    '\u010d': 'c',
    '\u010e': 'D',
    '\u0110': 'D',
    '\u010f': 'd',
    '\u0111': 'd',
    '\u0112': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u0118': 'E',
    '\u011a': 'E',
    '\u0113': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u0119': 'e',
    '\u011b': 'e',
    '\u011c': 'G',
    '\u011e': 'G',
    '\u0120': 'G',
    '\u0122': 'G',
    '\u011d': 'g',
    '\u011f': 'g',
    '\u0121': 'g',
    '\u0123': 'g',
    '\u0124': 'H',
    '\u0126': 'H',
    '\u0125': 'h',
    '\u0127': 'h',
    '\u0128': 'I',
    '\u012a': 'I',
    '\u012c': 'I',
    '\u012e': 'I',
    '\u0130': 'I',
    '\u0129': 'i',
    '\u012b': 'i',
    '\u012d': 'i',
    '\u012f': 'i',
    '\u0131': 'i',
    '\u0134': 'J',
    '\u0135': 'j',
    '\u0136': 'K',
    '\u0137': 'k',
    '\u0138': 'k',
    '\u0139': 'L',
    '\u013b': 'L',
    '\u013d': 'L',
    '\u013f': 'L',
    '\u0141': 'L',
    '\u013a': 'l',
    '\u013c': 'l',
    '\u013e': 'l',
    '\u0140': 'l',
    '\u0142': 'l',
    '\u0143': 'N',
    '\u0145': 'N',
    '\u0147': 'N',
    '\u014a': 'N',
    '\u0144': 'n',
    '\u0146': 'n',
    '\u0148': 'n',
    '\u014b': 'n',
    '\u014c': 'O',
    '\u014e': 'O',
    '\u0150': 'O',
    '\u014d': 'o',
    '\u014f': 'o',
    '\u0151': 'o',
    '\u0154': 'R',
    '\u0156': 'R',
    '\u0158': 'R',
    '\u0155': 'r',
    '\u0157': 'r',
    '\u0159': 'r',
    '\u015a': 'S',
    '\u015c': 'S',
    '\u015e': 'S',
    '\u0160': 'S',
    '\u015b': 's',
    '\u015d': 's',
    '\u015f': 's',
    '\u0161': 's',
    '\u0162': 'T',
    '\u0164': 'T',
    '\u0166': 'T',
    '\u0163': 't',
    '\u0165': 't',
    '\u0167': 't',
    '\u0168': 'U',
    '\u016a': 'U',
    '\u016c': 'U',
    '\u016e': 'U',
    '\u0170': 'U',
    '\u0172': 'U',
    '\u0169': 'u',
    '\u016b': 'u',
    '\u016d': 'u',
    '\u016f': 'u',
    '\u0171': 'u',
    '\u0173': 'u',
    '\u0174': 'W',
    '\u0175': 'w',
    '\u0176': 'Y',
    '\u0177': 'y',
    '\u0178': 'Y',
    '\u0179': 'Z',
    '\u017b': 'Z',
    '\u017d': 'Z',
    '\u017a': 'z',
    '\u017c': 'z',
    '\u017e': 'z',
    '\u0132': 'IJ',
    '\u0133': 'ij',
    '\u0152': 'Oe',
    '\u0153': 'oe',
    '\u0149': "'n",
    '\u017f': 's'
};

/*--------------------------------------------------------------------------*/

/** Used to map characters to HTML entities. */
var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

/** Used to map HTML entities to characters. */
var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
};

/** Used to escape characters for inclusion in compiled string literals. */
var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};

/*--------------------------------------------------------------------------*/

/** Built-in method references without a dependency on `root`. */
var freeParseFloat = parseFloat,
    freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function () {
    try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
            return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
    nodeIsDate = nodeUtil && nodeUtil.isDate,
    nodeIsMap = nodeUtil && nodeUtil.isMap,
    nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
    nodeIsSet = nodeUtil && nodeUtil.isSet,
    nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;



/*--------------------------------------------------------------------------*/

var globalObject = typeof global !== 'undefined' ? global : this || window,
    DOC = document,
    HTML = DOC.documentElement,
    body = 'body', // allow the library to be used in <head>

    // function toggle attributes
    dataToggle = 'data-toggle',
    dataDismiss = 'data-dismiss',


    dataSpy = 'data-spy',
    dataRide = 'data-ride',

    // add custom alert message plugin
    stringAlert = 'Alert',

    stringButton = 'Button',
    stringCarousel = 'Carousel',
    stringCollapse = 'Collapse',

    // build script for mega dropdown menu
    stringDropdown = 'Dropdown',

    // add backbone component to sync modal states
    stringModal = 'Modal',


    stringPopover = 'Popover',
    stringScrollSpy = 'ScrollSpy',

    // setup backbone component to sync tab states with indexedDB    
    stringTab = 'Tab',


    stringTooltip = 'Tooltip',
    stringToast = 'Toast',

    // options DATA API
    dataAutohide = 'data-autohide',
    databackdrop = 'data-backdrop',
    dataKeyboard = 'data-keyboard',
    dataTarget = 'data-target',
    dataInterval = 'data-interval',
    dataHeight = 'data-height',
    dataPause = 'data-pause',
    dataTitle = 'data-title',
    dataOriginalTitle = 'data-original-title',
    dataDismissible = 'data-dismissible',
    dataTrigger = 'data-trigger',
    dataAnimation = 'data-animation',
    dataContainer = 'data-container',
    dataPlacement = 'data-placement',
    dataDelay = 'data-delay',

    // option keys
    backdrop = 'backdrop',
    keyboard = 'keyboard',
    delay = 'delay',
    content = 'content',
    target = 'target',
    currentTarget = 'currentTarget',
    interval = 'interval',
    pause = 'pause',
    animation = 'animation',
    placement = 'placement',
    container = 'container',

    // box model
    offsetTop = 'offsetTop',
    offsetBottom = 'offsetBottom',
    offsetLeft = 'offsetLeft',
    scrollTop = 'scrollTop',
    scrollLeft = 'scrollLeft',
    clientWidth = 'clientWidth',
    clientHeight = 'clientHeight',
    offsetWidth = 'offsetWidth',
    offsetHeight = 'offsetHeight',
    innerWidth = 'innerWidth',
    innerHeight = 'innerHeight',
    scrollHeight = 'scrollHeight',
    scrollWidth = 'scrollWidth',
    height = 'height',

    // aria
    // double check aria for compliance
    ariaExpanded = 'aria-expanded',
    ariaHidden = 'aria-hidden',
    ariaSelected = 'aria-selected',

    // event names
    clickEvent = 'click',
    focusEvent = 'focus',
    hoverEvent = 'hover',
    keydownEvent = 'keydown',
    keyupEvent = 'keyup',
    resizeEvent = 'resize', // passive
    scrollEvent = 'scroll', // passive
    mouseHover = ('onmouseleave' in DOC) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'],
    // touch since 2.0.26
    touchEvents = {
        start: 'touchstart',
        end: 'touchend',
        move: 'touchmove'
    }, // passive
    // originalEvents
    showEvent = 'show',
    shownEvent = 'shown',
    hideEvent = 'hide',
    hiddenEvent = 'hidden',
    closeEvent = 'close',
    closedEvent = 'closed',
    slidEvent = 'slid',
    slideEvent = 'slide',
    changeEvent = 'change',

    // other
    getAttribute = 'getAttribute',
    setAttribute = 'setAttribute',
    hasAttribute = 'hasAttribute',
    createElement = 'createElement',
    appendChild = 'appendChild',
    innerHTML = 'innerHTML',
    getElementsByTagName = 'getElementsByTagName',
    preventDefault = 'preventDefault',
    getBoundingClientRect = 'getBoundingClientRect',
    querySelectorAll = 'querySelectorAll',
    getElementsByCLASSNAME = 'getElementsByClassName',
    getComputedStyle = 'getComputedStyle',

    indexOf = 'indexOf',
    parentNode = 'parentNode',
    length = 'length',
    toLowerCase = 'toLowerCase',
    Transition = 'Transition',
    Duration = 'Duration',
    Webkit = 'Webkit',
    style = 'style',
    push = 'push',
    tabindex = 'tabindex',
    contains = 'contains',

    active = 'active',
    showClass = 'show',
    collapsing = 'collapsing',
    disabled = 'disabled',
    loading = 'loading',
    left = 'left',
    right = 'right',
    top = 'top',
    bottom = 'bottom',

    // tooltip / popover
    tipPositions = /\b(top|bottom|left|right)+/,

    // backbone state modals 
    modalOverlay = 0,
    fixedTop = 'fixed-top',
    fixedBottom = 'fixed-bottom',

    // transitionEnd since 2.0.4
    supportTransitions = Webkit + Transition in HTML[style] || Transition[toLowerCase]() in HTML[style],
    transitionEndEvent = Webkit + Transition in HTML[style] ? Webkit[toLowerCase]() + Transition + 'End' : Transition[toLowerCase]() + 'end',
    transitionDuration = Webkit + Duration in HTML[style] ? Webkit[toLowerCase]() + Transition + Duration : Transition[toLowerCase]() + Duration;


/*--------------------------------------------------------------------------*/



document.addEventListener('keyup', function(event){
    switch(event.which){
        case 8 : console.log(event); break;
        case 9 : console.log(event); break;
        case 13 : console.log(event); break;
        case 27 : console.log(event); break;
        case 32 : console.log(event); break;
        case 33 : console.log(event); break;
        case 34 : console.log(event); break;
        case 35 : console.log(event); break;
        case 36 : console.log(event); break;
        case 37 : console.log(event); break;
        case 38 : console.log(event); break;
        case 39 : console.log(event); break;
        case 40 : console.log(event); break;
        case 46 : console.log(event); break;
        case 65 : console.log(event); break;
        case 66 : console.log(event); break;
        case 67 : console.log(event); break;
        case 68 : console.log(event); break;
        case 69 : console.log(event); break;
        case 70 : console.log(event); break;
        case 71 : console.log(event); break;
        case 72 : console.log(event); break;
        case 73 : console.log(event); break;
        case 74 : console.log(event); break;
        case 75 : console.log(event); break;
        case 76 : console.log(event); break;
        case 77 : console.log(event); break;
        case 78 : console.log(event); break;
        case 79 : console.log(event); break;
        case 80 : console.log(event); break;
        case 81 : console.log(event); break;
        case 82 : console.log(event); break;
        case 83 : console.log(event); break;
        case 84 : console.log(event); break;
        case 85 : console.log(event); break;
        case 86 : console.log(event); break;
        case 87 : console.log(event); break;
        case 88 : console.log(event); break;
        case 89 : console.log(event); break;
        case 90 : console.log(event); break;
        case 57 : console.log(event); break;
        case 56 : console.log(event); break;
        case 55 : console.log(event); break;
        case 54 : console.log(event); break;
        case 53 : console.log(event); break;
        case 52 : console.log(event); break;
        case 51 : console.log(event); break;
        case 50 : console.log(event); break;
        case 4 :  console.log(event);break;
        default : console.log(event); break;                
    }
}, false);

/*

  backspace : 8,
  tab : 9,
  return : 13,
  esc : 27,
  space : 32,
  pageup : 33,
  pagedown : 34,
  end : 35,
  home : 36,
  left : 37,
  up : 38,
  right : 39,
  down : 40,
  delete : 46,

  a : 65,
  b : 66,
  c : 67,
  d : 68,
  e : 69,
  f : 70,
  g : 71,
  h : 72,
  i : 73,
  j : 74,
  k : 75,
  l : 76,
  m : 77,
  n : 78,
  o : 79,
  p : 80,
  q : 81,
  r : 82,
  s : 83,
  t : 84,
  u : 85,
  v : 86,
  w : 87,
  x : 88,
  y : 89,
  z : 90,

  9 : 57,
  8 : 56,
  7 : 55,
  6 : 54,
  5 : 53,
  4 : 52,
  3 : 51,
  2 : 50,
  0 : 48
  

{

backspace : {},
tab : {},
return : {},
esc : {},
space : {},
pageup : {},
pagedown : {},
end : {},
home : {},
left : {},
up : {},
right : {},
down : {},
delete : {},

a : {},
b : {},
c : {},
d : {},
e : {},
f : {},
h : {},
i : {},
j : {},
l : {},
m : {},
n : {},
o : {},
p : {},
q : {},
r : {},
s : {},
t : {},
u : {},
v : {},
w : {},
x : {},
y : {},
z : {},

0 : {},
1 : {},
2 : {},
3 : {},
4 : {},
5 : {},
6 : {},
7 : {},
8 : {},
9 : {}

}

*/