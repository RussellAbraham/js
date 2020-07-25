//
var x = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e);


//
var rgx = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

//
var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec();

function o(e) {
    return /^[\x09\x0A\x0D\x20-\x7E]*$/.test(e)
}
function c(e) {
    return /^([\x09\x0A\x0D\x20-\x7E]|[\xA0-\xFF])*$/.test(e)
}
function d(e) {
    return /^([\x09\x0A\x0D\x20-\x7E]|[\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}|\xED[\x80-\x9F][\x80-\xBF])*$/.test(e)
}
function w(e) {
    return o(e) && /=/.test(e) && /^([^=]|=[0-9a-fA-F][0-9a-fA-F]|=\?|=\r?\n)+=?$/.test(e)
}
// 
function getParameters(string) {
    string = string.split('+').join(' ');
    var parameters = {},
        tokens,
        regex = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = regex.exec(string)) {
        parameters[
            decodeURIComponent(tokens[1])
        ] = decodeURIComponent(tokens[2]);
    }
    return parameters;
}

// 
function validateForm(name, url) {
    if (!name || !url) {
        alert('Please fill in the form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!url.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}

//
var _ = (function (_) {
    _.defaults = function (object) {
        if (!object) {
            return object
        }
        for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex += 1) {
            var iterable = arguments[argsIndex];
            if (iterable) {
                for (var key in iterable) {
                    if (object[key] == null) {
                        object[key] = iterable[key]
                    }
                }
            }
        }
        return object
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
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

    _.template = function (text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text
                .slice(index, offset)
                .replace(escaper, function (match) {
                    return '\\' + escapes[match]
                });
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='"
            }
            index = offset + match.length;
            return match
        });
        source += "';\n";
        if (!settings.variable) {
            source = 'with(obj||{}){\n' + source + '}\n'
        }
        source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments" +
            ",'');};\n" + source + "return __p;\n";
        try {
            render = new Function(settings.variable || 'obj', '_', source)
        } catch (e) {
            e.source = source;
            throw e
        }
        if (data) {
            return render(data, _)
        }
        var template = function (data) {
            return render.call(this, data, _)
        };
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
        return template
    };
    return _
})({});