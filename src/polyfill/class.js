/* helper
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
*/

function proxySuper(superFn, fn) {
  return function() {
    var tmp = this._super;
    this._super = superFn;
    var ret = fn.apply(this, arguments);
    this._super = tmp;

    return ret;
  }
}

function Class() {}

Class.extend = function(protoProps) {
  var parent = this, _super = parent.prototype, child;

  if (protoProps && protoProps.hasOwnProperty('constructor')) {
    child = proxySuper(parent, protoProps.constructor);
    delete protoProps.constructor; // remove constructor
  } else {
    child = function() {
      parent.apply(this, arguments);
    };
  }

  var prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  for (var name in protoProps) {
    prototype[name] = isFunction(protoProps[name]) && isFunction(_super[name]) && /\b_super\b/.test(protoProps[name])
      ? proxySuper(_super[name], protoProps[name]) : protoProps[name];
  }

  child.prototype = prototype;
  child.extend = Class.extend;

  return child;
};
