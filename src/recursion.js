

// Pure Recursion Example

function collection(arr) {

    let array = []

    if (array.length === 0) {
        return array;
    }

    if (arr[0] % 2 !== 0) {
        array.push(arr[0]);
    }

    array = array.concat(collection(arr.slice(1)))

    return array;
}


// Helper Method Recursion Example

function collector(arr) {

    let result = [];

    function helper(helperInput) {

        if (helperInput.length === 0) {
            return;
        }

        if (helperInput[0] % 2 !== 0) {
            result.push(helperInput[0])
        }

        helper(helperInput.slice(1))

    }

    helper(arr);

    return result;

}

 
// recursive parser es6

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {  
  var stack = [], keys = []
  if (cycleReplacer == null) cycleReplacer = function(key, value) {  
    if (stack[0] === value) return "[Circular ~]"  
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"  
  }
  return function(key, value) {  
    if (stack.length > 0) {  
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)      
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)      
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }

    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)

  }

}

function old_stringify(object, plain, iterator) {

    var output = {};

    var string = '';
    var type = '';

    var keys = [];
    var vals = [];

    iterator = iterator || [];

    var circular = false;

    try {
        type = ({}).toString.call(object);
    } catch (er) {
        type = '[object Object]';
    }

    var i, len = iterator.length;
    for (i = 0; i < len; i++) {
        if (object === iterator[i]) {
            circular = true;
            break;
        }
    }

    if (circular) {
        string = '[circular]'
    }

    else if ( isString ( type ) ) {
        string = object.replace( /"/g, '\\"' ) + '';
    }

    else if ( isArray ( type ) ) {
        iterator.push(object);
    }


    // object - recursion


    //number
    
    //boolean
    
    //function
    
    //null
    
    //undefined

    // plain object



}

// native and circular stringify
// shallow serialize object 
(function () {

    function sortci(a, b) {
        return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    }

    function isHash(obj) {
        return (!!obj && (typeof (obj) === 'object') && (typeof (obj.length) === 'undefined'));
    }

    function isArrayLike(obj) {
        if (typeof (obj) == 'array') return true;
        return (!!obj && (typeof (obj) === 'object') && (typeof (obj.length) != 'undefined'));
    }

    function stringify(o, simple, visited) {
        var json = '',
            i, vi, type = '',
            parts = [],
            names = [],
            circular = false;
        visited = visited || [];
        try {
            type = ({}).toString.call(o);
        } catch (e) {
            /* only happens when typeof is protected (...randomly) */
            type = '[object Object]';
        }
        /* check for circular references */
        for (vi = 0; vi < visited.length; vi++) {
            if (o === visited[vi]) {
                circular = true;
                break;
            }
        }
        if (circular) {
            json = '[circular]';
        } else if (type == '[object String]') {
            json = '' + o.replace(/"/g, '\\"') + ''; /*json = '"' + o.replace(/"/g, '\\"') + '"'; */
        } else if (type == '[object Array]') {
            visited.push(o);
            json = '[';
            for (i = 0; i < o.length; i++) {
                parts.push(stringify(o[i], simple, visited));
            }
            json += parts.join(', ') + ']';
            json;
        } else if (type == '[object Object]') {
            visited.push(o);
            json = '{';
            for (i in o) {
                names.push(i);
            }
            names.sort(sortci);
            for (i = 0; i < names.length; i++) {
                parts.push(stringify(names[i], undefined, visited) + ': ' + stringify(o[names[i]], simple, visited));
            }
            json += parts.join(', ') + '}';
        } else if (type == '[object Number]') {
            json = o + '';
        } else if (type == '[object Boolean]') {
            json = o ? 'true' : 'false';
        } else if (type == '[object Function]') {
            json = o.toString();
        } else if (o === null) {
            json = 'null';
        } else if (o === undefined) {
            json = 'undefined';
        } else if (simple == undefined) {
            visited.push(o);
            json = type + '{\n';
            for (i in o) {
                names.push(i);
            }
            names.sort(sortci);
            for (i = 0; i < names.length; i++) {
                try {
                    parts.push(names[i] + ': ' + stringify(o[names[i]], true, visited)); /* safety from max stack*/
                } catch (e) {
                    if (e.name == 'NS_ERROR_NOT_IMPLEMENTED') {
                        /* do nothing - not sure it's useful to show this error when the variable is protected*/ /* parts.push(names[i] + ': NS_ERROR_NOT_IMPLEMENTED');*/ }
                }
            }
            json += parts.join(',\n') + '\n}';
        } else {
            try {
                json = o + ''; /*should look like an object*/
            } catch (e) {}
        }
        return json;
    }

    function serialize(obj, r) {
        r || (r = ":");
        var string = "";
        if ("boolean" == typeof obj) string += obj ? "true" : "false";
        else if ("number" == typeof obj) string += obj;
        else if ("string" == typeof obj) string += '"' + obj
            .replace(/([\"\\])/g, "\\$1")
            .replace(/\r/g, "\\r")
            .replace(/\n/g, "\\n") + '"';
        else if (isHash(obj)) {
            var i = 0,
                n = [];
            for (var t in obj) n[i] = (t.match(/^[A-Za-z]\w*$/) ? t : '"' + t + '"') + r + serialize(obj[t], r), i++;
            string += "{" + n.join(",") + "}"
        } else if (isArrayLike(obj)) {
            n = [];
            for (var o = 0, f = obj.length; o < f; o++) n[o] = serialize(obj[o], r);
            string += "[" + n.join(",") + "]"
        } else string += "0";
        return string
    }

    function looseJsonParse(obj) {
        return Function('"use strict";return (' + obj + ')')();
    }

})();
