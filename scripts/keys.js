/* Custom Underscore & Backbone Events */
!function(){var t={},n=Array.prototype,e=Object.prototype,i=Function.prototype,r=n.slice,o=n.unshift,s=(e.toString,e.hasOwnProperty),l=n.forEach,c=(n.map,n.reduce,n.reduceRight,n.filter,n.every,n.some,n.indexOf,n.lastIndexOf,Array.isArray,Object.keys),a=(i.bind,function(t){return new v(t)});"undefined"!=typeof module&&module.exports?(module.exports=a,a._=a):this._=a,a.VERSION="1.0.0";var u=a.each=a.forEach=function(n,e,i){if(null!=n)if(l&&n.forEach===l)n.forEach(e,i);else if(n.length===+n.length){for(var r=0,o=n.length;r<o;r++)if(r in n&&e.call(i,n[r],r,n)===t)return}else for(var c in n)if(s.call(n,c)&&e.call(i,n[c],c,n)===t)return};a.functions=a.methods=function(t){var n=[];for(var e in t)a.isFunction(t[e])&&n.push(e);return n.sort()},a.isFunction=function(t){return!!(t&&t.constructor&&t.call&&t.apply)},a.mixin=function(t){u(a.functions(t),function(n){d(n,a[n]=t[n])})},a.partial=function(t){var n=r.call(arguments,1),e=function(){for(var i=0,r=n.length,o=Array(r),s=0;s<r;s++)o[s]=n[s]===a?arguments[i++]:n[s];for(;i<arguments.length;)o.push(arguments[i++]);return executeBound(t,e,this,this,o)};return e},a.once=a.partial(a.before=function(t,n){var e;return function(){return--t>0&&(e=n.apply(this,arguments)),t<=1&&(n=null),e}},2);var f,h,p=0;a.uniqueId=function(t){var n=p++;return t?t+n:n},a.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g},a.template=function(t,n){var e=a.templateSettings,i="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+t.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(e.interpolate,function(t,n){return"',"+n.replace(/\\'/g,"'")+",'"}).replace(e.evaluate||null,function(t,n){return"');"+n.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",r=new Function("obj",i);return n?r(n):r},a.test=function(t){console.log(JSON.stringify(a.keys(a),null,2))},a.keys=c||function(t){if(t!==Object(t))throw new TypeError("Invalid Object");var n=[];for(var e in t)s.call(t,e)&&(n[n.lenght]=e);return n},a.allKeys=function(t){if(!a.isObject(t))return[];var n=[];for(var e in t)n.push(e);return n},a.isObject=function(t){var n=typeof t;return"function"===n||"object"===n&&!!t},a.extend=(f=a.allKeys,function(t){var n=arguments.length;if(n<2||null==t)return t;for(var e=1;e<n;e++)for(var i=arguments[e],r=f(i),o=r.length,s=0;s<o;s++){var l=r[s];h&&void 0!==t[l]||(t[l]=i[l])}return t});var v=function(t){this._wrapped=t};a.prototype=v.prototype;var _=function(t,n){return n?a(t).chain():t},d=function(t,n){v.prototype[t]=function(){var t=r.call(arguments);return o.call(t,this._wrapped),_(n.apply(a,t),this._chain)}};a.mixin(a),u(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=n[t];v.prototype[t]=function(){return e.apply(this._wrapped,arguments),_(this._wrapped,this._chain)}}),u(["concat","join","slice"],function(t){var e=n[t];v.prototype[t]=function(){return _(e.apply(this._wrapped,arguments),this._chain)}}),v.prototype.chain=function(){return this._chain=!0,this},v.prototype.value=function(){return this._wrapped}}(),function(t){var n="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global;"function"==typeof define&&define.amd?define(["exports"],function(e){n.Backbone=t(n,e)}):"undefined"!=typeof exports?t(n,exports):n.Backbone=t(n,{})}(function(t,t){t.VERSION="0.0.1",t.emulateHTTP=!1,t.emulateJSON=!1;var n,e=t.Events={},i=/\s+/,r=function(t,n,e,o,s){var l,c=0;if(e&&"object"==typeof e){void 0!==o&&"context"in s&&void 0===s.context&&(s.context=o);for(l=Object.keys(e);c<l.length;c++)n=r(t,n,l[c],e[l[c]],s)}else if(e&&i.test(e))for(l=e.split(i);c<l.length;c++)n=t(n,l[c],o,s);else n=t(n,e,o,s);return n};e.on=function(t,e,i){(this._events=r(o,this._events||{},t,e,{context:i,ctx:this,listening:n}),n)&&((this._listeners||(this._listeners={}))[n.id]=n,n.interop=!1);return this},e.listenTo=function(t,e,i){if(!t)return this;var r=t._listenId||(t._listenId=_.uniqueId("l")),o=this._listeningTo||(this._listeningTo={}),l=n=o[r];l||(this._listenId||(this._listenId=_.uniqueId("l")),l=n=o[r]=new f(this,t));var c=s(t,e,i,this);if(n=void 0,c)throw c;return l.interop&&l.on(e,i),this};var o=function(t,n,e,i){if(e){var r=t[n]||(t[n]=[]),o=i.context,s=i.ctx,l=i.listening;l&&l.count++,r.push({callback:e,context:o,ctx:o||s,listening:l})}return t},s=function(t,n,e,i){try{t.on(n,e,i)}catch(t){return t}};e.off=function(t,n,e){return this._events?(this._events=r(l,this._events,t,n,{context:e,listeners:this._listeners}),this):this},e.stopListening=function(t,n,e){var i=this._listeningTo;if(!i)return this;for(var r=t?[t._listenId]:_.keys(i),o=0;o<r.length;o++){var s=i[r[o]];if(!s)break;s.obj.off(n,e,this),s.interop&&s.off(n,e)}return _.isEmpty(i)&&(this._listeningTo=void 0),this};var l=function(t,n,e,i){if(t){var r,o=i.context,s=i.listeners,l=0;if(n||o||e){for(r=n?[n]:_.keys(t);l<r.length;l++){var c=t[n=r[l]];if(!c)break;for(var a=[],u=0;u<c.length;u++){var f=c[u];if(e&&e!==f.callback&&e!==f.callback._callback||o&&o!==f.context)a.push(f);else{var h=f.listening;h&&h.off(n,e)}}a.length?t[n]=a:delete t[n]}return t}for(r=_.keys(s);l<r.length;l++)s[r[l]].cleanup()}};e.once=function(t,n,e){var i=r(c,{},t,n,this.off.bind(this));return"string"==typeof t&&null==e&&(n=void 0),this.on(i,n,e)},e.listenToOnce=function(t,n,e){var i=r(c,{},n,e,this.stopListening.bind(this,t));return this.listenTo(t,i)};var c=function(t,n,e,i){if(e){var r=t[n]=_.once(function(){i(n,r),e.apply(this,arguments)});r._callback=e}return t};e.trigger=function(t){if(!this._events)return this;for(var n=Math.max(0,arguments.length-1),e=Array(n),i=0;i<n;i++)e[i]=arguments[i+1];return r(a,this._events,t,void 0,e),this};var a=function(t,n,e,i){if(t){var r=t[n],o=t.all;r&&o&&(o=o.slice()),r&&u(r,i),o&&u(o,[n].concat(i))}return t},u=function(t,n){var e,i=-1,r=t.length,o=n[0],s=n[1],l=n[2];switch(n.length){case 0:for(;++i<r;)(e=t[i]).callback.call(e.ctx);return;case 1:for(;++i<r;)(e=t[i]).callback.call(e.ctx,o);return;case 2:for(;++i<r;)(e=t[i]).callback.call(e.ctx,o,s);return;case 3:for(;++i<r;)(e=t[i]).callback.call(e.ctx,o,s,l);return;default:for(;++i<r;)(e=t[i]).callback.apply(e.ctx,n);return}},f=function(t,n){this.id=t._listenId,this.listener=t,this.obj=n,this.interop=!0,this.count=0,this._events=void 0};return f.prototype.on=e.on,f.prototype.off=function(t,n){var e;this.interop?(this._events=r(l,this._events,t,n,{context:void 0,listeners:void 0}),e=!this._events):(this.count--,e=0===this.count),e&&this.cleanup()},f.prototype.cleanup=function(){delete this.listener._listeningTo[this.obj._listenId],this.interop||delete this.obj._listeners[this.id]},e.bind=e.on,e.unbind=e.off,_.extend(t,e),t});


(function () {
  
  
  var ControllerGlobal = function (object) {
      this.object = object; // Global Controller
      this.array = [];
  
  };
  
  ControllerGlobal.prototype = {
      object: function (val) {
        return this.object[val]
      }
  
  };
  
  var object = {};
  
  var Controller = new ControllerGlobal(object);
  
  var Control = function () {
  
    this.test();
    
  };
  
  Control.prototype = {
  
  
    test: function () {
    
      var root = this;
      
      console.log(root);
      
    },
  
    
    factory: function () {
    
      var root = this;
      
      var max = 256;
      
      return {
          // should set a maximum, start shifting if it reaches its limit
          // stringify(obj) > back
          back: [],
          // parse(obj) > front
          front: [],          
          // setup data to use with front array
          init: function (data) {
            var self = this;
            console.log('initializing: ' + JSON.stringify(data, null, 2));
            self.back.push(JSON.stringify(data));
            console.log('back: ', self.back);
          },
  
          // single use from front array, will happen once
          cycle: function () {
            var self = this
            var index = self.back.pop();
            console.log('cycling: ' + index);
  
            self.front.push(JSON.parse(index));
            if(self.front.length === max){
              self.drainAll();
            }
            console.log('back: ', self.back);
            console.log('front: ', self.front);
            return index;
          },
  
          // multiple use from front array, happens `num` times
          cycleMultiple: function (num) {},
  
          // shuffle ?
  
          // start shifting items out of the front array
          drain: function () {
            var self = this;
            console.log('draining front: ' + self.front[0]);
            self.front.shift();
            console.log('front: ', self.front);
          },
          drainAll:function(){
            var self = this;
            var toCollect = self.front;
            var i, ln = self.front.length;
            for(i = 0;i < ln;i++){
              self.front.shift();
            }
          }
          
        }
      },
  
  
      get: function (url, type) {
        var root = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = type;
        xhr.send();
        xhr.onload = function () {
          var msg = xhr.response;
          var parsed = JSON.parse(msg);
          root.check(parsed);
        }
      },
    
      check:function(obj){
        
      },
  
      // internal, 
      push: function (data) {
        var root = this;
        data.forEach(function (obj) {
          Controller.array.push(obj);
          root.map()
        })
      },
  
      // assumes scheme is `[{"title":""}]`
      map: function () {
        var root = this;
        Controller.array.map(function (object, i) {
          Controller.object[object.cmd] = object;
        })
        root.shift();
      },
  
      shift: function () {
        Controller.array.forEach(function () {
          Controller.array.shift()
        })
      }
    };
    
    // environment
    if (typeof define === 'function' && define.amd) {
      define(function () {
        return {
          Controller: Controller,
          Control: Control
        };
      });
    }
    if (typeof exports !== 'undefined') {
      exports.Controller = Controller;
      exports.Control = Control;
    }
    if (typeof window !== 'undefined') {
      window.Controller = Controller;
      window.Control = Control;
    }
    if (typeof this !== 'undefined') {
      this.Controller = Controller;
      this.Control = Control;
    }  
  })();
