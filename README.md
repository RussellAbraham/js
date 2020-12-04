

[Github Repository](https://github.com/RussellAbraham/js/)

------------------------------------------------------

# EcmaScript 2020 Language Specification

https://www.ecma-international.org/ecma-262/

------------------------------------------------------

NodeJS -v15.1.0

https://nodejs.org/dist/latest-v15.x/docs/api/

------------------------------------------------------

# Traversy Media

Github 

https://github.com/bradtraversy

Youtube

https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA

------------------------------------------------------

# Colt Steele

GitHub

https://github.com/colt

Udemy

https://www.udemy.com/user/coltsteele/

YouTube

https://www.youtube.com/channel/UCrqAGUPPMOdo0jfQ6grikZw

------------------------------------------------------

# Bharath Thippireddy

Udemy

https://www.udemy.com/user/bharaththippireddy/

Course

https://www.udemy.com/course/advanced-and-object-oriented-javascript/

------------------------------------------------------

# MDN Web DOCS

https://developer.mozilla.org/en-US/

JavaScript Reference
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

Web API's
https://developer.mozilla.org/en-US/docs/Web/API

Global Objects
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

------------------------------------------------------

# W3 Schools

HTML 5
https://www.w3schools.com/html/default.asp

Graphics
https://www.w3schools.com/graphics/default.asp

CSS
https://www.w3schools.com/css/default.asp

JavaScript
https://www.w3schools.com/js/default.asp

------------------------------------------------------

## Github Trending JavaScript
https://github.com/trending/javascript?since=daily

## CSS Tricks
https://css-tricks.com/

## HTML5 Rocks
https://www.html5rocks.com/en/

## CodePen
https://codepen.io/

------------------------------------------------------


Cross Domain Messaging


DocumentFragment.prototype.append = function(element){
	return this.appendChild(element);
}

DocumentFragment.prototype.render = function(target){
	return target.appendChild(this);
}

DocumentFragment.prototype.$ = function(selector, scope){
	return (scope || this).querySelector(selector);
}

DocumentFragment.prototype.$$ = function(selector, scope){
	return (scope || this).querySelectorAll(selector);
}

const fragment = new DocumentFragment();

function ParseParameters(url) {
	var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
	var obj = {};
	if (queryString) {
		queryString = queryString.split("#")[0];
		var arr = queryString.split("&");
		for (var i = 0; i < arr.length; i++) {
			var a = arr[i].split("=");
			var paramName = a[0];
			var paramValue = typeof a[1] === "undefined" ? true : a[1];
			paramName = paramName.toLowerCase();
			if (typeof paramValue === "string") paramValue = paramValue.toLowerCase();
			if (paramName.match(/\[(\d+)?\]$/)) {
				var key = paramName.replace(/\[(\d+)?\]/, "");
				if (!obj[key]) obj[key] = [];
				if (paramName.match(/\[\d+\]$/)) {
					var index = /\[(\d+)\]/.exec(paramName)[1];
					obj[key][index] = paramValue;
				} else {
					obj[key].push(paramValue);
				}
			} else {
				if (!obj[paramName]) {
					obj[paramName] = paramValue;
				} else if (obj[paramName] && typeof obj[paramName] === "string") {
					obj[paramName] = [obj[paramName]];
					obj[paramName].push(paramValue);
				} else {
					obj[paramName].push(paramValue);
				}
			}
		}
	}
	return obj;
}

function AsyncBinary(string){
	const request = new XMLHttpRequest();
	request.open('GET', string, true);
	request.setRequestHeader('X-CUSTOM', true);
	request.responseType = 'blob';
	request.onload = function(){
		const url = URL.createObjectURL(request.response);
		window.open(url);
	}
	request.send(null);
}


qs('#register').addEventListener('click', function(){
	navigator.registerProtocolHandler(
		"web+driver",
		"https://assets.codepen.io/1674766/handler.html?driver=%s",
		"Driver handler"
	);
});

qs('#unregister').addEventListener('click', function(){
	navigator.unregisterProtocolHandler(
		"web+driver",
		"https://assets.codepen.io/1674766/handler.html?driver=%s",
	);
});

qs('#checkregister').addEventListener('click', function(){
	if('isProtocolHandlerRegistered' in navigator){
		alert(navigator.isProtocolHandlerRegistered(
			"web+driver",
			"https://assets.codepen.io/1674766/handler.html?driver=%s",
		));
	} else {
		return false;
	}
});

qs('#bin').addEventListener('click', function(){
	AsyncBinary('index.html');
});


const s3 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/';
const cdn = 'https://assets.codepen.io/1674766/';

var idCounter = 0;

function uniqueId(prefix) {
	var id = idCounter++;
	return prefix ? prefix + id : id;
}

function time() {
	var now = new Date();
	var time = /(\d+:\d+:\d+)/.exec(now)[0] + ":";
	for (var ms = String(now.getMilliseconds()), i = ms.length - 3; i < 0; ++i) {
		time += "0";
	}
	return time + ms;
}

function S4() {
	return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);
}

function guid() {
	return ( S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4() );
}

function first(array, n, guard){  
	return (n !== null) && !guard ? [].slice.call(array, 0, n) : array[0]
}

function rest(array, index, guard){
    return [].slice.call(array, (index == null) || guard ? 1 : index);
}

function last(array){
    return array[array.length - 1];
}

function toArray(args) {
	var array = [], i, length = args.length;
	for (i = 0; i < length; ++i) {
		array[i] = args[i];
	}
	return array;
}

function toSource(func) {
	if (func != null) {
		try { return Function.prototype.toString.call(func); } catch (er) { throw ""; }
		try { return func + ""; } catch (er) { throw ""; }
	}
	return "";
}

/* *** isFunction() *** */
function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
}

/* *** isDate()      *** */
function isDate(obj) {
	return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
}

/* *** isRegExp()    *** */
function isRegExp(obj) {
	return !!(
		obj &&
		obj.test &&
		obj.exec &&
		(obj.ignoreCase || obj.ignoreCase === false)
	);
}

/* *** isObject()    *** */
function isObject(obj) {
	return obj === Object(obj);
}

/* *** isString()    *** */
function isString(obj) {
	return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}

/* *** isBoolean()   *** */
function isBoolean(obj) {
	return obj === true || obj === false;
}

/* *** isNumber()    *** */
function isNumber(obj) {
	return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
}

/* *** isNull()      *** */
function isNull(obj) {
	return obj === null;
}

/* *** isUndefined() *** */
function isUndefined(obj) {
	return obj === void 0;
}

/* *** isArray()    *** */
function isArray(obj) {
	return toString.call(obj) === "[object Array]";
}

/*  *** isLocation() ***  */
function isLocation(obj) {
	return toString.call(obj) === "[object Location]";
}

/*  *** isCallable() ***  */
function isCallable(obj) {
	return typeof obj === "function";
}

/*  *** isConstructor() ***  */
function isContstructor(obj) {
	return isCallable(obj);
}

/*  *** isElement() ***  */
function isElement(obj) {
	return !!(obj && obj.nodeType === 1);
}

/* *** isWindow ** */
function isWindow(obj) {
	return obj != null && obj === obj.window;
}

/* *** isEven()      *** */
function isEven(num) {
	return num % 2 === 0;
}

/* *** isFinite() *** */
function isFinite(obj) {
	return isFinite(obj) && !isNaN(parseFloat(obj));
}

/* *** isBuffer() *** */
function isBuffer(val) {
	return (
		val !== null &&
		!isUndefined(val) &&
		val.constructor !== null &&
		!isUndefined(val.constructor) &&
		typeof val.constructor.isBuffer === "function" &&
		val.constructor.isBuffer(val)
	);
}

/* *** isArrayBuffer() *** */
function isArrayBuffer(val) {
	return toString.call(val) === "[object ArrayBuffer]";
}

/* *** isFile() *** */
function isFile(val) {
	return toString.call(val) === "[object File]";
}

/* *** isBlob() *** */
function isBlob(val) {
	return toString.call(val) === "[object Blob]";
}

/* *** isStream() *** */
function isStream(val) {
	return isObject(val) && isFunction(val.pipe);
}

/* *** isURLSearchParams() *** */
function isURLSearchParams(val) {
	return (
		typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams
	);
}

/* *** isFormData() *** */
function isFormData(val) {
	return typeof FormData !== "undefined" && val instanceof FormData;
}

/*  *** isPrime() ***  */
function isPrime(value) {
	for (var i = 2; i < value; i++) {
		if (value % i === 0) {
			return false;
		}
	}
	return value > 1;
}

/* *** isUniform()   *** */
function isUniform(arr) {
	var first = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i] !== first) {
			return false;
		}
	}
	return true;
}

/* *** isPlainObject() *** */
function isPlainObject(obj) {
	var proto, Ctor;
	if (!obj || toString.call(obj) !== "[object Object]") {
		return false;
	}
	proto = getProto(obj);
	if (!proto) {
		return true;
	}
	Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
	return (
		typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString
	);
}

/* *** isEmptyObject *** */
function isEmptyObject(obj) {
	var name;
	for (name in obj) {
		return false;
	}
	return true;
}

/*  *** isAlphaNumeric() ***  */
function isAlphaNumeric(str) {
	var code = str.charCodeAt(0);
	if (
		!(code > 47 && code < 58) && // numeric (0-9)
		!(code > 64 && code < 91) && // uppercase (A-Z)
		!(code > 96 && code < 123)
	) {
		// lowercase (a-z)
		return false;
	}
	return true;
}

/* *** isArrayBuffer *** */
function isArrayBufferView(val) {
	var result;
	if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
		result = ArrayBuffer.isView(val);
	} else {
		result = val && val.buffer && val.buffer instanceof ArrayBuffer;
	}
	return result;
}

function isObjectLike(object) {
	return (
		!!object && typeof object === "object" && typeof object.length === "undefined"
	);
}

function isArrayLike(object) {
	if (typeof object == "array") return true;
	return (
		!!object && typeof object === "object" && typeof object.length != "undefined"
	);
}

function identity(object) {
	return object;
}

function memoize(callback, address) {
	const cache = {};
	var key;
	address || (address = identity);
	return function () {
		key = address.apply(this, arguments);
		return has(cache, key)
			? cache[key]
			: (cache[key] = callback.apply(this, arguments));
	};
}

function toEscaped(string) { 
	return String(string)
		.replace(/\\"/g, '"')
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;') 	
}

function output(options) {
	
	options = options || {};
	
	const prefix = '<span class="';
	const suffix = '">';
	const tail = "</span>";
	
	return prefix
		.concat(options.class)
		.concat(suffix)
		.concat(options.value)
		.concat(tail);
	
}

function ParseParameters(url) {
	var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
	var obj = {};
	if (queryString) {
		queryString = queryString.split("#")[0];
		var arr = queryString.split("&");
		for (var i = 0; i < arr.length; i++) {
			var a = arr[i].split("=");
			var paramName = a[0];
			var paramValue = typeof a[1] === "undefined" ? true : a[1];
			paramName = paramName.toLowerCase();
			if (typeof paramValue === "string") paramValue = paramValue.toLowerCase();
			if (paramName.match(/\[(\d+)?\]$/)) {
				var key = paramName.replace(/\[(\d+)?\]/, "");
				if (!obj[key]) obj[key] = [];
				if (paramName.match(/\[\d+\]$/)) {
					var index = /\[(\d+)\]/.exec(paramName)[1];
					obj[key][index] = paramValue;
				} else {
					obj[key].push(paramValue);
				}
			} else {
				if (!obj[paramName]) {
					obj[paramName] = paramValue;
				} else if (obj[paramName] && typeof obj[paramName] === "string") {
					obj[paramName] = [obj[paramName]];
					obj[paramName].push(paramValue);
				} else {
					obj[paramName].push(paramValue);
				}
			}
		}
	}
	return obj;
}

PS C:\Users\russe> heroku
 »   Warning: Our terms of service have changed: https://dashboard.heroku.com/terms-of-service
CLI to interact with Heroku

VERSION
  heroku/7.47.0 win32-x64 node-v12.16.2

USAGE
  $ heroku [COMMAND]

COMMANDS
  access          manage user access to apps
  addons          tools and services for developing, extending, and operating your app
  apps            manage apps on Heroku
  auth            check 2fa status
  authorizations  OAuth authorizations
  autocomplete    display autocomplete installation instructions
  buildpacks      scripts used to compile apps
  certs           a topic for the ssl plugin
  ci              run an application test suite on Heroku
  clients         OAuth clients on the platform
  config          environment variables of apps
  container       Use containers to build and deploy Heroku apps
  domains         custom domains for apps
  drains          forward logs to syslog or HTTPS
  features        add/remove app features
  git             manage local git repository for app
  help            display help for heroku
  keys            add/remove account ssh keys
  labs            add/remove experimental features
  local           run Heroku app locally
  logs            display recent log output
  maintenance     enable/disable access to app
  members         manage organization members
  notifications   display notifications
  orgs            manage organizations
  pg              manage postgresql databases
  pipelines       manage pipelines
  plugins         list installed plugins
  ps              Client tools for Heroku Exec
  psql            open a psql shell to the database
  redis           manage heroku redis instances
  regions         list available regions for deployment
  releases        display the releases for an app
  reviewapps      manage reviewapps in pipelines
  run             run a one-off process inside a Heroku dyno
  sessions        OAuth sessions
  spaces          manage heroku private spaces
  status          status of the Heroku platform
  teams           manage teams
  update          update the Heroku CLI
  webhooks        list webhooks on an app

https://cli-auth.heroku.com/auth/cli/callback?code=652811c5-3acf-44e2-a8b4-4a94f57b975e&state=70858f9c-5dc3-45fe-ad92-4e630ab33dd3


1.

Add Dependecies to the package.json

```
npm install stuff
```

2.

Modify the code with new dependency

3.
Test Locally

```
npm install
```

```
heroku local
```

4.

Add updates to git

```
git add .
```

5.

Commit the changes and comment

``
git commit -m "Add stuff API"
```

6.

Push to Heroku

```
git push heroku main
```

7.

Try it out

```
heroku open cool
```




* require
* define
* debug

```javascript
(function (root) {
	var require, define;

	(function () {
		const modules = {};
		const requireStack = [];
		const inProgressModules = {};
		const separator = ".";
		function build(module) {
			var factory = module.factory,
				localRequire = function (id) {
					var resultantId = id;
					//Its a relative path, so lop off the last portion and add the id (minus "./")
					if (id.charAt(0) === ".") {
						resultantId =
							module.id.slice(0, module.id.lastIndexOf(SEPARATOR)) +
							SEPARATOR +
							id.slice(2);
					}
					return require(resultantId);
				};
			module.exports = {};
			delete module.factory;
			factory(localRequire, module.exports, module);
			return module.exports;
		}

		require = function (id) {
			if (!modules[id]) {
				throw "module " + id + " not found";
			} else if (id in inProgressModules) {
				var cycle =
					requireStack.slice(inProgressModules[id]).join("->") + "->" + id;
				throw "Cycle in require graph: " + cycle;
			}
			if (modules[id].factory) {
				try {
					inProgressModules[id] = requireStack.length;
					requireStack.push(id);
					return build(modules[id]);
				} finally {
					delete inProgressModules[id];
					requireStack.pop();
				}
			}
			return modules[id].exports;
		};

		define = function (id, factory) {
			if (modules[id]) {
				throw "module " + id + " already defined";
			}

			modules[id] = {
				id: id,
				factory: factory
			};
		};

		define.remove = function (id) {
			delete modules[id];
		};

		define.moduleMap = modules;
	})();

	if (typeof root !== "undefined") {
		root.require = require;
		root.define = define;
	}
})(this);

define("debug", function (require, exports, module) {
	const debug = {
		logLevel: 0,
		info: 1,
		warning: 2,
		error: 3,
		exception: 4,
		numMsgs: 0,
		log: function (source, message, debugLevel) {
			if (debugLevel >= this.logLevel) {
				console.log("DEBUG [" + source + "] " + message);
				debug.numMsgs = debug.numMsgs + 1;
			}
		},
		size: function () {
			return debug.numMsgs;
		},
		clear: function () {
			debug.numMsgs = 0;
		}
	};
	module.exports = debug;
});

const debug = require("debug");

if(document in this){
    debug.log(window, "test", 1);
}
else {
    debug.log(self, 'test', 1);
}
```


```javascript

/**/

define('createMemory', function(module, exports, require){
    function createMemory(){
        const buffer = new ArrayBuffer();
        const dataview = new DataView(buffer);
        return dataview;
    }
    module.exports = createMemory;
});

// 24 64KB Buffer



```

```
function Graph() {
    this.adjacencyList = {};
}
Graph.prototype = {
    addVertex: function (vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    },
    addEdge: function (v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    },
    removeEdge: function (vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(function (v) {
            return v !== vertex2;
        });
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(function (v) {
            return v !== vertex1;
        });
    },
    removeVertex: function (vertex) {
        while (this.adjacencyList[vertex].length) {
            var adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
}

const graph = new Graph();
```

```
function randomColor() {
    var r = Math.floor(Math.random() * 256), //pick a "red" from 0 - 255
        g = Math.floor(Math.random() * 256), //pick a "green" from  0 -255
        b = Math.floor(Math.random() * 256); //pick a "blue" from  0 -255
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function randomInstanceOfColor() {
    var r = Math.floor(Math.random() * 256), //pick a "red" from 0 - 255
        g = Math.floor(Math.random() * 256), //pick a "green" from  0 -255
        b = Math.floor(Math.random() * 256); //pick a "blue" from  0 -255
    return new Color(r, g, b, '');
}

function Color(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
}

Color.prototype = {
    
    constructor : Color,

    toRGB : function(){
        return ''.concat(this.r, ', ', this.g, ', ', this.b);
    },

    rgb: function () {
        return "rgb(" + this.toRGB() + ")";
    },

    hex : function(){
        return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    },

    hsl: function () {
        return 'hsl(' + this.h + ',' + this.s + '%,' + this.l + '%)';
    },

    fullySaturated : function(){
        return 'hsl(' + this.h + ', 100%, ' + this.l + '%)';
    },

    opposite : function(){
        return 'hsl(' + ((this.h + 180) % 360) + ',' + this.s + '%,' + '1' + '%)';
    },

    calcHSL: function () {
        var r = this.r,
            g = this.g,
            b = this.b;
        r /= 255;
        g /= 255;
        b /= 255;
        var cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
        this.s = s;
        this.l = l;
    }    

}

const red = new Color(255, 0, 0, 'red');
const green = new Color(0, 0, 255, 'green');
const blue = new Color(0, 0, 255, 'blue');
const orange = new Color(255, 165, 0, 'orange');
const purple = new Color(128, 128, 128, 'purple');
const yello = new Color(255, 255, 0, 'yellow');

```





function Xtor(){
    this.request = new XMLHttpRequest();
    this.request.responseType = 'arraybuffer';
    this.request.addEventListener('load', this.onLoad.bind(this, true), false);
    this.request.addEventListener('readystatechange', this.onChange.bind(this, true), false);    
}

Xtor.prototype = {
    constructor : Xtor,
    onLoad : function(event){ // event is true ^
        
    },
    onChange : function(){}
}

Xtor.prototype.get = function(url){
    this.request.open('GET', url, true);
    this.request.setRequestHeader('X-FRAME', true); // unlicensed.. local this will be fine
    this.request.send(null);
}

Xtor.prototype.populate = function(){}


const MOV_LIT_R1  = 0x10;
const MOV_LIT_R2  = 0x11;
const ADD_REG_REG = 0x12;

const createMemory = sizeInBytes => {
    const ab = new ArrayBuffer(sizeInBytes);
    const dv = new DataView(ab);
    return dv;
};

// temp
function extend(obj, props){
    for(var prop in props){
        if(props[prop]){
            obj[prop] = props[prop];
        }
    }
    return obj;
}

function CPU(memory){
    this.memory = memory;
    this.registerNames = [
        'ip', 'acc',
        'r1', 'r2', 'r3', 'r4',
        'r5', 'r6', 'r7', 'r8'        
    ];
    this.registers = createMemory(this.registerNames.length * 2);
    this.registerMap = this.registerNames.reduce((map, name, i) => {
        map[name] = i * 2;
        return map;
    },{});

}

CPU.prototype = {
    constructor : CPU
}

extend(CPU.prototype, {

    debug : function(){},

    getRegister : function(name){
        if(!(name in this.registerMap)){
            throw new Error(`getRegister : No such register '${name}'`)
        }
        return this.registers.getUint16(this.registerMap[name]);
    },

    setRegister : function(name, value){
        if(!(name in this.registerMap)){
            throw new Error(`setRegister : No such register '${name}'`)
        }
        return this.registers.setUint16(this.registerMap[name], value);        
    },


    fetch : function(){
        const nextInstructionAddress = this.getRegister('ip');
        const instruction = this.memory.getUint8(nextInstructionAddress);
        this.setRegister('ip', nextInstructionAddress + 1);
        return instruction;
    },

    fetch16 : function(){
        const nextInstructionAddress = this.getRegister('ip');
        const instruction = this.memory.getUint16(nextInstructionAddress);
        this.setRegister('ip', nextInstructionAddress + 2);
        return instruction;
    },

    execute : function(instruction){
        switch(instruction){
            case instructions.MOV_LIT_R1: {
                const literal = this.fetch16();
                this.setRegister('r1', literal);
                return;
              }
        
              // Move literal into the r2 register
              case instructions.MOV_LIT_R2: {
                const literal = this.fetch16();
                this.setRegister('r2', literal);
                return;
              }
        
              // Add register to register
              case instructions.ADD_REG_REG: {
                const r1 = this.fetch();
                const r2 = this.fetch();
                const registerValue1 = this.registers.getUint16(r1 * 2);
                const registerValue2 = this.registers.getUint16(r2 * 2);
                this.setRegister('acc', registerValue1 + registerValue2);
                return;
              }
            }
        
        },
    

    step : function(){
        const instruction = this.fetch();
        return this.execute(instruction);
    }

});


# Ingredients

[Mutation Observers](https://codepen.io/collection/AVzKxz)

_Mutation Observer_

_Local Forage_

_Polyfill Promise_

## JSON Cycle - Circular Parser

- This will serialize your static methods to transferable objects

```javascript
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
```

## Array Literal
```javascript
const privateBuffer = [];
```

## Static Method

- reversable

```javascript

const PublicBuffer = new DoublyLinkedList();

```

## Calculate Max iteration Depth Outside:

- 2 separate arrays or lengths

```javascript	
    const limit = values.length * keys.length;
  

```

## Print Reverse Utility Function, for a fast Map

- private, exposition

```javascript

// [Function](Parameter Type = Array)

function printReverse(array){
    
    var i; 
    const length = array.length;
    const keysLength = keys.length; 
    // outside loop
    for(i = length - 1; i >= 0; i--){
        
        // inside loop
        var value = values[Math.floor(i / keysLength)];		
        var key = keys[Math.floor(i % keysLength)];	       

    }
    
}

```


## Require Define or Module Graph Object


## Define a Debug Object

```javascript
define("debug", function (require, exports, module) {

    const debug = {
        
        // IMPORTANT, this debug object will assist in sharing memory, 
        // we need to know how many calls have been made in our program
        logLevel: 0,

        info: 1,
        warning: 2,
	    error: 3,
	    exception: 4,
        numMsgs: 0,
        
	    log: function (source, message, debugLevel) {
            if (debugLevel >= this.logLevel) {
                debug.numMsgs = debug.numMsgs + 1;
                // Dont need to use console.log in here, if you have to console log, console.log(debug.log())
                return "DEBUG [".concat(source,"] ",message);
            }
        },
        
        // Reports Length, 
	    size: function () {
	        return debug.numMsgs;
        },
        
	    clear: function () {
	        debug.numMsgs = 0;
	    }
    
    };
    
    module.exports = debug;

});

```

## Function to Calcate the Scaling of a Block Style Element

```javascript
    if (mutation.type === "childList") {
      if (mutation.target && [...mutation.addedNodes].length) {
        console.log(
          `A child node ${mutation.target} has been added!`,
          mutation.target
        );
      }
      if (mutation.target && [...mutation.removedNodes].length) {
        console.log(
          `A child node ${mutation.target} has been removed!`,
          mutation.target
        );
      }
      // do somwthings
      let list_values = [];
      list_values = [].slice
        .call(list.children)
        .map(function(node) {
          return node.innerHTML;
        })
        .filter(function(str) {
          if (str === "<br>") {
            return false;
          } else {
            return true;
          }
        });
      console.log(list_values);
    }
    if (mutation.type === "attributes") {
      console.log("mutation =", mutation);
      console.log(`The \`${mutation.attributeName}\` attribute was modified.`);
      // console.log("list style =", list.style);
      let { width, height } = list.style;
      let style = {
        width,
        height
      };
      console.log("style =\n", JSON.stringify(style, null, 4));
    }
```
function S4() {  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);  } 
function guid() { return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4(); }

!(function(n){
	
	function e(c) {
		if (t[c]) return t[c].exports;
		var g = (t[c] = { i: c, l: !1, exports: {} });
		return n[c].call(g.exports, g, g.exports, e), (g.l = !0), g.exports;
	}
	var t = {}; (e.m = n), (e.c = t), (e.i = function(n) { 
		return n;	
	}),

		(e.d = function(n, t, c) { e.o(n, t) ||
				Object.defineProperty(n, t, {
					configurable: !1,
					enumerable: !0,
					get: c
				});
		}),
		
		(e.n = function(n) {
			var t = n && n.__esModule ? function() { return n.default; } : function() { return n; };
			return e.d(t, "a", t), t;
		}),
		
		(e.o = function(n, e) {
			return Object.prototype.hasOwnProperty.call(n, e);
		}),
		
		(e.p = ""),
		
		e((e.s = 0));
	
})([ function(module, exports, require) {	 'use strict'; eval( "\n\n// set some constants/vars\nvar SIZE = 1024 * 1024 * 8; // 8MB for our data\nvar arrayBuffer = null;\nvar uInt8View = null;\nvar originalLength = null;\n\n// build our example array of 32MB numbers\n// later in the worker we will work on them with some simple math operations\nfunction setupArray() {\n  arrayBuffer = new ArrayBuffer(SIZE);\n  uInt8View = new Uint8Array(arrayBuffer);\n  originalLength = uInt8View.length;\n\n  for (var i = 0; i < originalLength; ++i) {\n    uInt8View[i] = i;\n  }\n\n  log(source() + 'filled ' + toMB(originalLength) + ' MB buffer');\n}\n\n//\n// helper functions to measure performance\n//\n\n// return time stemp\nfunction time() {\n  var now = new Date();\n  var time = /(\\d+:\\d+:\\d+)/.exec(now)[0] + ':';\n  for (var ms = String(now.getMilliseconds()), i = ms.length - 3; i < 0; ++i) {\n    time += '0';\n  }\n  return time + ms;\n}\n\n// We are now our page (on the worker will have some nice RED color for the answers)\nfunction source() {\n  return '<span style=\"color:green;\">Our page:</span> ';\n}\n\nfunction seconds(since) {\n  return (new Date() - since) / 1000.0;\n}\n\nfunction toMB(bytes) {\n  return Math.round(bytes / 1024 / 1024);\n}\n\n//\n// Initial\nvar worker = null;\nvar startTime = 0;\nvar supported = false;\n\n// Move output panel down further if <details> isn't supported (collapsible).\nvar details = document.querySelector('details');\nif (!('open' in details)) {\n  document.querySelector('section').classList.add('down');\n}\n\nfunction log(str) {\n  var elem = document.getElementById('result');\n  var log = function log(s) {\n    elem.innerHTML += ''.concat(time(), ' ', s, '\\n');\n  };\n  log(str);\n}\n\nfunction init() {\n  worker = new Worker('worker.js');\n\n  // Take care of vendor prefixes.\n  worker.postMessage = worker.webkitPostMessage || worker.postMessage;\n\n  worker.onmessage = function (e) {\n    console.timeEnd('actual postMessage round trip was');\n    // capture elapsed time since the original postMessage();\n    if (!e.data.type) {\n      var elapsed = seconds(startTime);\n    }\n\n    var data = e.data;\n\n    if (data.type && data.type == 'debug') {\n      log(data.msg);\n    } else {\n      if (data.copy) {\n        data.byteLength = data.ourArray.byteLength;\n      }\n      var rate = Math.round(toMB(data.byteLength) / elapsed);\n      log(source() + 'postMessage roundtrip took: ' + elapsed * 1000 + ' ms');\n      log(source() + 'postMessage roundtrip rate: ' + rate + ' MB/s');\n    }\n  };\n\n  log(source() + 'We are good to go!');\n}\n\nfunction test(useIt) {\n  var useTransferrable = useIt;\n  setupArray(); // Need to do this on every run for the repeated runs with transferable arrays. They're cleared out after they're transferred.\n\n  startTime = new Date();\n  console.time('actual postMessage round trip was');\n\n  if (useTransferrable) {\n    console.log(\"## Using Transferrable object method on size: \" + uInt8View.length);\n    worker.postMessage(uInt8View.buffer, [uInt8View.buffer]);\n  } else {\n    console.log(\"## Using old COPY method on size: \" + uInt8View.length);\n    worker.postMessage({ 'copy': 'true', 'ourArray': uInt8View.buffer }); //uInt8View.buffer\n  }\n}\n\nwindow.addEventListener('load', function (e) {\n  init();\n}, false);\n\nwindow.test = test;"	 ); } ]);



"use strict";

const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

(function(XObject){
    
    (e.d = function(n, t, c) { e.o(n, t) ||
        Object.defineProperty(n, t, {
            configurable: !1,
            enumerable: !0,
            get: c
        });
    })

})([ 
    function(module, exports, require) {	 
        'use strict'; 
        eval( "\n\n// set some constants/vars\nvar SIZE = 1024 * 1024 * 8; // 8MB for our data\nvar arrayBuffer = null;\nvar uInt8View = null;\nvar originalLength = null;\n\n// build our example array of 32MB numbers\n// later in the worker we will work on them with some simple math operations\nfunction setupArray() {\n  arrayBuffer = new ArrayBuffer(SIZE);\n  uInt8View = new Uint8Array(arrayBuffer);\n  originalLength = uInt8View.length;\n\n  for (var i = 0; i < originalLength; ++i) {\n    uInt8View[i] = i;\n  }\n\n  log(source() + 'filled ' + toMB(originalLength) + ' MB buffer');\n}\n\n//\n// helper functions to measure performance\n//\n\n// return time stemp\nfunction time() {\n  var now = new Date();\n  var time = /(\\d+:\\d+:\\d+)/.exec(now)[0] + ':';\n  for (var ms = String(now.getMilliseconds()), i = ms.length - 3; i < 0; ++i) {\n    time += '0';\n  }\n  return time + ms;\n}\n\n// We are now our page (on the worker will have some nice RED color for the answers)\nfunction source() {\n  return '<span style=\"color:green;\">Our page:</span> ';\n}\n\nfunction seconds(since) {\n  return (new Date() - since) / 1000.0;\n}\n\nfunction toMB(bytes) {\n  return Math.round(bytes / 1024 / 1024);\n}\n\n//\n// Initial\nvar worker = null;\nvar startTime = 0;\nvar supported = false;\n\n// Move output panel down further if <details> isn't supported (collapsible).\nvar details = document.querySelector('details');\nif (!('open' in details)) {\n  document.querySelector('section').classList.add('down');\n}\n\nfunction log(str) {\n  var elem = document.getElementById('result');\n  var log = function log(s) {\n    elem.innerHTML += ''.concat(time(), ' ', s, '\\n');\n  };\n  log(str);\n}\n\nfunction init() {\n  worker = new Worker('worker.js');\n\n  // Take care of vendor prefixes.\n  worker.postMessage = worker.webkitPostMessage || worker.postMessage;\n\n  worker.onmessage = function (e) {\n    console.timeEnd('actual postMessage round trip was');\n    // capture elapsed time since the original postMessage();\n    if (!e.data.type) {\n      var elapsed = seconds(startTime);\n    }\n\n    var data = e.data;\n\n    if (data.type && data.type == 'debug') {\n      log(data.msg);\n    } else {\n      if (data.copy) {\n        data.byteLength = data.ourArray.byteLength;\n      }\n      var rate = Math.round(toMB(data.byteLength) / elapsed);\n      log(source() + 'postMessage roundtrip took: ' + elapsed * 1000 + ' ms');\n      log(source() + 'postMessage roundtrip rate: ' + rate + ' MB/s');\n    }\n  };\n\n  log(source() + 'We are good to go!');\n}\n\nfunction test(useIt) {\n  var useTransferrable = useIt;\n  setupArray(); // Need to do this on every run for the repeated runs with transferable arrays. They're cleared out after they're transferred.\n\n  startTime = new Date();\n  console.time('actual postMessage round trip was');\n\n  if (useTransferrable) {\n    console.log(\"## Using Transferrable object method on size: \" + uInt8View.length);\n    worker.postMessage(uInt8View.buffer, [uInt8View.buffer]);\n  } else {\n    console.log(\"## Using old COPY method on size: \" + uInt8View.length);\n    worker.postMessage({ 'copy': 'true', 'ourArray': uInt8View.buffer }); //uInt8View.buffer\n  }\n}\n\nwindow.addEventListener('load', function (e) {\n  init();\n}, false);\n\nwindow.test = test;"	 ); 
    } 
]);

var optimizCallback = function (func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
        case 1:
            return function (value) {
                return func.call(context, value);
            };
        case 2:
            return function (value, other) {
                return func.call(context, value, other);
            };
        case 3:
            return function (value, index, collection) {
                return func.call(context, value, index, collection);
            };
        case 4:
            return function (accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
    }
    return function () {
        return func.apply(context, arguments);
    };
};

function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
}

function identity(object) {
    return object;
}

function times(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
};

function memoize(callback, address) {
    var cache = {},
        key;
    address || (address = identity);
    return function () {
        key = address.apply(this, arguments);
        return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
    }
}

const keys = {

    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    checkCookie: function () {
        var user = this.getCookie("username");
        if (user != "") {
            alert('Welcome again ' + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                this.setCookie("username", user, 365);
            }
        }
    }
}


function Node(value) {
	this.value = value;
	this.next = null;
}

function SinglyLinkedList() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}

SinglyLinkedList.prototype = {
	constructor: SinglyLinkedList,
	push: function (val) {
		var newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
		return this;
	},

	pop: function () {
		if (!this.head) return undefined;
		var current = this.head;
		var newTail = current;

		while (current.next) {
			newTail = current;
			current = current.next;
		}

		this.tail = newTail;
		this.tail.next = null;
		this.length--;

		if (this.length === 0) {
			this.head = null;
			this.tail = null;
		}

		return current;
	},

	shift: function () {
		if (!this.head) return undefined;
		var currentHead = this.head;
		this.head = currentHead.next;
		this.length--;

		if (this.length === 0) {
			this.tail = null;
		}

		return currentHead;
	},

	unshift: function (val) {
		var newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		}
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
		return this;
	},

	get: function (index) {
		if (index < 0 || index >= this.length) return null;
		var counter = 0;
		var current = this.head;
		while (counter !== index) {
			current = current.next;
			counter++;
		}
		return current;
	},

	set: function (index, val) {
		var foundNode = this.get(index);
		if (foundNode) {
			foundNode.value = val;
			return true;
		}
		return false;
	},

	insert: function (index, val) {
		if (index < 0 || index > this.length) return false;
		if (index === this.length) return !!this.push(val);
		if (index === 0) return !!this.unshift(val);
		var newNode = new Node(val);
		var prev = this.get(index - 1);
		var temp = prev.next;
		prev.next = newNode;
		newNode.next = temp;
		this.length++;
		return true;
	},

	remove: function (index) {
		if (index < 0 || index >= this.length) return undefined;
		if (index === 0) return this.shift();
		if (index === this.length - 1) return this.pop();
		var previousNode = this.get(index - 1);
		var removed = previousNode.next;
		previousNode.next = removed.next;
		this.length--;
		return removed;
	},

	reverse: function () {
		var node = this.head;
		this.head = this.tail;
		this.tail = node;
		var next;
		var prev = null;
		for (var i = 0; i < this.length; i++) {
			next = node.next;
			node.next = prev;
			prev = node;
			node = next;
		}
		return this;
	},

	print : function () {
		var arr = [];

		var current = this.head;

		while (current) {
			arr.push(current.value);
			current = current.next;
		}

		console.log(arr);
	},
	
	toJSON : function(){
		var arr = [];
		var current = this.head;
		while (current) {
			arr.push(current.value);
			current = current.next;
		}
		return arr[0];
	}
	
};



const cache = [];


const groups = [];
const items = 'a,b c,d e,f gh i,j k,l m,n o,p q,r s,t u,v w,x y,z'.split(' ');

const limit = groups.length * items.length;

function Data(key, value) {
    this.key = key;
    this.value = value;
}

const decks = new SinglyLinkedList();

const suits = ["hearts", "clubs", "diamonds", "spades"];

const values = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");

const limit = values.length * suits.length;

function buildDeck() {

    let i,
        deck = [],
        slen = suits.length;

    for (i = limit - 1; i >= 0; i--) {
        let value = values[Math.floor(i / slen)];
        let suit = suits[Math.floor(i % slen)];
        deck.push({
            suit: suit,
            value: value
        });
    }

    return decks.push(
        JSON.stringify(deck)
    );

}

# Ingredients

[Mutation Observers](https://codepen.io/collection/AVzKxz)

_Mutation Observer_

_Local Forage_

_Polyfill Promise_

## JSON Cycle - Circular Parser

- This will serialize your static methods to transferable objects

```javascript
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
```

## Array Literal
```javascript
const privateBuffer = [];
```

## Static Method

- reversable

```javascript

const PublicBuffer = new DoublyLinkedList();

```

## Calculate Max iteration Depth Outside:

- 2 separate arrays or lengths

```javascript	
    const limit = values.length * keys.length;
  

```

## Print Reverse Utility Function, for a fast Map

- private, exposition

```javascript

// [Function](Parameter Type = Array)

function printReverse(array){
    
    var i; 
    const length = array.length;
    const keysLength = keys.length; 
    // outside loop
    for(i = length - 1; i >= 0; i--){
        
        // inside loop
        var value = values[Math.floor(i / keysLength)];		
        var key = keys[Math.floor(i % keysLength)];	       

    }
    
}

```


## Require Define or Module Graph Object


## Define a Debug Object

```javascript
define("debug", function (require, exports, module) {

    const debug = {
        
        // IMPORTANT, this debug object will assist in sharing memory, 
        // we need to know how many calls have been made in our program
        logLevel: 0,

        info: 1,
        warning: 2,
	    error: 3,
	    exception: 4,
        numMsgs: 0,
        
	    log: function (source, message, debugLevel) {
            if (debugLevel >= this.logLevel) {
                debug.numMsgs = debug.numMsgs + 1;
                // Dont need to use console.log in here, if you have to console log, console.log(debug.log())
                return "DEBUG [".concat(source,"] ",message);
            }
        },
        
        // Reports Length, 
	    size: function () {
	        return debug.numMsgs;
        },
        
	    clear: function () {
	        debug.numMsgs = 0;
	    }
    
    };
    
    module.exports = debug;

});

```

## Function to Calcate the Scaling of a Block Style Element

```javascript
    if (mutation.type === "childList") {
      if (mutation.target && [...mutation.addedNodes].length) {
        console.log(
          `A child node ${mutation.target} has been added!`,
          mutation.target
        );
      }
      if (mutation.target && [...mutation.removedNodes].length) {
        console.log(
          `A child node ${mutation.target} has been removed!`,
          mutation.target
        );
      }
      // do somwthings
      let list_values = [];
      list_values = [].slice
        .call(list.children)
        .map(function(node) {
          return node.innerHTML;
        })
        .filter(function(str) {
          if (str === "<br>") {
            return false;
          } else {
            return true;
          }
        });
      console.log(list_values);
    }
    if (mutation.type === "attributes") {
      console.log("mutation =", mutation);
      console.log(`The \`${mutation.attributeName}\` attribute was modified.`);
      // console.log("list style =", list.style);
      let { width, height } = list.style;
      let style = {
        width,
        height
      };
      console.log("style =\n", JSON.stringify(style, null, 4));
    }
```

# Standard objects by category

## Value properties

- These global properties return a simple value. They have no properties or methods.

* [Infinity]()
* [NaN]()
* [undefined]()
* [globalThis]()

## Function properties

- These global functions—functions which are called globally, rather than on an object—directly return their results to the caller.

eval()
uneval() 
isFinite()
isNaN()
parseFloat()
parseInt()
encodeURI()
encodeURIComponent()
decodeURI()
decodeURIComponent()
    Deprecated
        escape()
        unescape()

---

## Fundamental objects

- These are the fundamental, basic objects upon which all other objects are based. This includes general objects, booleans, functions, and symbols.

Object
Function
Boolean
Symbol

## Error objects

- Error objects are a special type of fundamental object. They include the basic Error type, as well as several specialized error types.

Error
AggregateError 
EvalError
InternalError
RangeError
ReferenceError
SyntaxError
TypeError
URIError

## Numbers and dates

- These are the base objects representing numbers, dates, and mathematical calculations.

Number
BigInt
Math
Date

Text processing
These objects represent strings and support manipulating them.

String
RegExp
Indexed collections
These objects represent collections of data which are ordered by an index value. This includes (typed) arrays and array-like constructs.

Array
Int8Array
Uint8Array
Uint8ClampedArray
Int16Array
Uint16Array
Int32Array
Uint32Array
Float32Array
Float64Array
BigInt64Array
BigUint64Array
Keyed collections
These objects represent collections which use keys. The iterable collections (Map and Set) contain elements which are easily iterated in the order of insertion.

Map
Set
WeakMap
WeakSet
Structured data
These objects represent and interact with structured data buffers and data coded using JavaScript Object Notation (JSON).

ArrayBuffer
SharedArrayBuffer
Atomics
DataView
JSON
Control abstraction objects
Control abstractions can help to structure code, especially async code (without using deeply nested callbacks, for example).

Promise
Generator
GeneratorFunction
AsyncFunction
AsyncGenerator
AsyncGeneratorFunction
Reflection
Reflect
Proxy
Internationalization
Additions to the ECMAScript core for language-sensitive functionalities.

Intl
Intl.Collator
Intl.DateTimeFormat
Intl.ListFormat
Intl.NumberFormat
Intl.PluralRules
Intl.RelativeTimeFormat
Intl.Locale
WebAssembly
WebAssembly
WebAssembly.Module
WebAssembly.Instance
WebAssembly.Memory
WebAssembly.Table
WebAssembly.CompileError
WebAssembly.LinkError
WebAssembly.RuntimeError
Other
arguments