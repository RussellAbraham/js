
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
	// push to global array, like back buffer
        root.push(parsed)
      }
    },
    push: function (data) {
      var root = this;
      data.forEach(function (obj) {
	// map array to object keys      
        Cache.array.push(obj);
        root.map()
      })
    },

    map: function () {
      var root = this;
      // store objects by name/title
      Cache.array.map(function (data, i) {
        Cache.object[data.title] = data;
      })
      root.shift();
    },
    // optional: clear the back buffer 
    shift: function () {
      Cache.array.forEach(function () {
        Cache.array.shift()
      })
    }
  };
  // environments	
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

// initialize
var cmd = new Cmd();

// get json data, library should cache objects for us
cmd.get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/snippets.json");

/* TextEditor Functions From Cached Objects */

cmd.html(document.body, 'textarea', {
  id: "text", 
  name: "text",
  placeholder: "Greetings: Try The Regex Replace From Cached Values",
  onkeyup: "filter('text')",
  onkeydown: "filter('text')",
  // onkeypress,
  // onblur
});

// bad regex, 
// just for chain demo

// when filter matches these character in textarea, replace
var arr = [
  /!\n/,
  /!css\n/,
  /!js\n/,
  /!svg\n/,
  /!json\n/,
  /!cgi\n/,
  /!base64\n/,
  /!func\n/,
  /!navbar\n/,
  /!myWindow\n/,
  /!html\n/
];

// The data used for snippets was created with html textarea, here we just get it back

// filter function, event, listen to event, match regex pattern and replace with a string from cache
function filter(event) {
  var text = document.getElementById(event)
  text.value = text.value
    .replace(arr[0], Cache.object['HTML'].content)
    .replace(arr[1], Cache.object['CSS'].content)
    .replace(arr[2], Cache.object['JS'].content)
    .replace(arr[3], "")
    .replace(arr[4], JSON.stringify(Cache.object, null, 2))
    .replace(arr[5], Cache.object['cgi'].content)
    .replace(arr[6], "")
    .replace(arr[7], "")
    .replace(arr[8], Cache.object['navbar'].content)
    .replace(arr[9], myWindow)
    .replace(arr[10], Cache.object['PWA'].content)
}

// lots of the json is just js and can be run quickly
function run(){
  var text = document.getElementById("text");
  var value = text.value;
  var result;
  try {
    result = eval.call(window, value);
    text.value = result;
  } catch (er) {
    result = er.stack;
    text.value = result;
  }
  // callstack
}

