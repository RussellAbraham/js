(function (root, factory) {
    if (typeof define === "function" && define.amd) {
       define(["base"], function (Base) {
          return factory(Base || root.Base);
       });
    } else {
       factory(Base);
    }
 }(this, function (Base) {
    // Get element(s) by CSS selector:
    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };
    window.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    // addEventListener wrapper:
    window.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };

    // Attach a handler to event for all elements that match the selector,
    // now or in the future, based on a root element
    window.$delegate = function (target, selector, type, handler) {
        function dispatchEvent(event) {
            var targetElement = event.target;
            var potentialElements = window.qsa(selector, target);
            var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

            if (hasMatch) {
                handler.call(targetElement, event);
            }
        }

        // https://developer.mozilla.org/en-US/docs/Web/Events/blur
        var useCapture = type === 'blur' || type === 'focus';

        window.$on(target, type, dispatchEvent, useCapture);
    };

    // Find the element's parent with the given tag name:
    // $parent(qs('a'), 'div');
    window.$parent = function (element, tagName) {
        if (!element.parentNode) {
            return;
        }
        if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
            return element.parentNode;
        }
        return window.$parent(element.parentNode, tagName);
    };

    function assign(keysCallback, undefinedOnly) {
       return function (object) {
          var length = arguments.length,
             index, i;
          if (length < 2 || object == null) return object;
          for (index = 1; index < length; index++) {
             var source = arguments[index];
             var keys = keysCallback(source),
                l = keys.length;
             for (i = 0; i < l; i++) {
                var key = keys[i];
                if (!undefinedOnly || object[key] === void 0) object[key] = source[key];
             }
          }
          return object;
       }
    }
 
    function names(obj) {
       var result = [];
       for (var key in obj) {
          result.push(key);
       }
       return result;
    };
 
    var extend = assign(names);

    DocumentFragment.prototype.append = function(target){
        this.appendChild(target);
    };
    
    DocumentFragment.prototype.render = function(target){
        target.appendChild(this);
    };

    var View = (Base.View = function () {
       this.preinitialize.apply(this, arguments);
       this.initialize.apply(this, arguments);
    });
 
    extend(View.prototype, Base.Events, {
       preinitialize: function () {},
       initialize: function () {},
       render : function(){
           return this;
       }
    });
    
    var Container = (Base.Container = function () {
       this.preinitialize.apply(this, arguments);
       this.initialize.apply(this, arguments);
    });
 
    extend(Container.prototype, Base.Events, {
       preinitialize: function () {},
       initialize: function () {},
       render : function(){
           return this;
       }
    });
 
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
 
    View.extend = Container.extend = inherits;
 
    return Base;
 
 }));
