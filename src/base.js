/*
todo:
function micro(){};

micro.extend = function(){};
micro.chain = function(){};
micro.mixin = function(){};

['push','pop','shift','unshift','splice','reverse'].forEach()
['join','concat','slice'].forEach()

function Macro(){};

Macro.chain = function(){};
Macro.mixin = function(){};

Macro.extend = inherits;

*/

(function (global) {

    function createAssigner(keysFunc, undefinedOnly) {
        return function (obj) {
            var length = arguments.length,
                index, i;
            if (length < 2 || obj == null) return obj;
            for (index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };

    function names(obj) {
        var result = [];
        for (var key in obj) {
            result.push(key);
        }
        return result;
    };

    var extend = createAssigner(names);

    function inherits(protoProps, staticProps) {
        var parent = this,
            child;
        if (protoProps && Object.prototype.hasOwnProperty(protoProps, "constructor")) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }
        extend(child, parent, staticProps);
        child.prototype = Object.create(parent.prototype, protoProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };


})(this);