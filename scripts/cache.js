(function () {
  var CacheGlobal = function (object) {
    this.object = object;
    this.array = [];
  };
  CacheGlobal.prototype = {
    object: function (val) {
      return this.object[val]
    }
  };
  var object = {};
  var Cache = new CacheGlobal(object);
  var Cmd = function () {
    this.test();
  };
  Cmd.prototype = {
    test: function () {
      console.log('test')
    },
    html: function (target, element, attrs, text) {
      const myElement = document.createElement(element);
      const myTextNode = document.createTextNode(text);
      for (var attr in attrs) {
        myElement.setAttribute(attr, attrs[attr])
      }
      if (text) {
        myElement.appendChild(myTextNode);
      }
      return target.appendChild(myElement);
    },
    get: function (url) {
      var root = this;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "text";
      xhr.send();
      xhr.onload = function () {
        var msg = xhr.response;
        var parsed = JSON.parse(msg);
        root.push(parsed)
      }
    },
    push: function (data) {
      var root = this;
      data.forEach(function (obj) {
        Cache.array.push(obj);
        root.map()
      })
    },

    map: function () {
      var root = this;
      Cache.array.map(function (data, i) {
        Cache.object[data.title] = data;
      })
      root.shift();
    },

    shift: function () {
      Cache.array.forEach(function () {
        Cache.array.shift()
      })
    }
  };
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return {
        Cache: Cache,
        Cmd: Cmd
      };
    });
  }
  if (typeof exports !== 'undefined') {
    exports.Cache = Cache;
    exports.Cmd = Cmd;
  }
  if (typeof window !== 'undefined') {
    window.Cache = Cache;
    window.Cmd = Cmd;
  }
})();
