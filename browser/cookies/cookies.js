
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}


function CookieTree(args) {
	// class constructor
	if (args) {
		for (var key in args) this[key] = args[key];
	}
	
	if (!this.expires) {
		var now = new Date();
		now.setFullYear( now.getFullYear() + 10 ); // 10 years from now
		this.expires = now.toGMTString();
	}
	
	this.parse();
};

CookieTree.prototype.domain = location.hostname;
CookieTree.prototype.path = location.pathname;

CookieTree.prototype.parse = function() {
	// parse document.cookie into hash tree
	this.tree = {};
	var cookies = document.cookie.split(/\;\s*/);
	for (var idx = 0, len = cookies.length; idx < len; idx++) {
		var cookie_raw = cookies[idx];
		if (cookie_raw.match(/^CookieTree=(.+)$/)) {
			var cookie = null;
			var cookie_raw = unescape( RegExp.$1 );
			// Debug.trace("Cookie", "Parsing cookie: " + cookie_raw);
			try {
				eval( "cookie = " + cookie_raw + ";" );
			}
			catch (e) {
				// Debug.trace("Cookie", "Failed to parse cookie.");
				cookie = {}; 
			}
			
			this.tree = merge_objects( this.tree, cookie );
			idx = len;
		}
	}
};

CookieTree.prototype.get = function(key) {
	// get tree branch given value (top level)
	return this.tree[key];
};

CookieTree.prototype.set = function(key, value) {
	// set tree branch to given value (top level)
	this.tree[key] = value;
};

CookieTree.prototype.save = function() {
	// serialize tree and save back into document.cookie
	var cookie_raw = 'CookieTree=' + escape(serialize(this.tree));
	
	if (!this.path.match(/\/$/)) {
		this.path = this.path.replace(/\/[^\/]+$/, "") + '/';
	}
	
	cookie_raw += '; expires=' + this.expires;
	cookie_raw += '; domain=' + this.domain;
	cookie_raw += '; path=' + this.path;
	
	// Debug.trace("Cookie", "Saving cookie: " + cookie_raw);
	
	document.cookie = cookie_raw;
};

CookieTree.prototype.remove = function() {
	// remove cookie from document
	var cookie_raw = 'CookieTree={}';
	
	if (!this.path.match(/\/$/)) {
		this.path = this.path.replace(/\/[^\/]+$/, "") + '/';
	}
	
	var now = new Date();
	now.setFullYear( now.getFullYear() - 1 ); // last year
	cookie_raw += '; expires=' + now.toGMTString();
	
	cookie_raw += '; domain=' + this.domain;
	cookie_raw += '; path=' + this.path;
	
	document.cookie = cookie_raw;
};


/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}
	return init(function () {});
}));