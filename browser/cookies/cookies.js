
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

//
var cookiePath="#{facesContext.externalContext.requestContextPath}";
var cookieNameDefault="wsCookie";
var cookieMaxNum=25;
var cookieValueMaxLength=4000;
var cookiePath="/webstore";
var cookieReleaseKey="release";
var serverLagInMS=5000;
var sanitizeStringPattern = /[^a-zA-Z0-9_.()+:\/=\s\-#,]/g;

//creates a cookie.  if the cookieValue is null/emtpy, create the cookie for the first time.  Otherwise, re-create the cookie with the
// values passed into the function (used to 'update' the cookie values)
function createCookie(cookieValue,cookieName)
{
	var cname;
	//either use cookie name passed to method, or default value
	if (cookieName == null || cookieName == "") 
	{
		//name is not set, so create cookie with default name
		cname = cookieNameDefault;
	}
	else 
	{
		//use name passed
		cname = cookieName;
	}
	
	if (cookieValue==null || cookieValue=="")
	{	
		//create blank cookie
		document.cookie = cname+"=; path="+cookiePath +" ;secure";
	}
	else 
	{
		//write entire value to cookies, wrapping to multiple cookies
		var writingComplete = false;
		for (var i = 0; i < cookieMaxNum; i++)
		{
			if (!writingComplete)
			{
				//write current cookie chunk to respective cookie
				if (i>0)
				{
					document.cookie = cname.concat(i)+"="+cookieValue.substring(i*cookieValueMaxLength,((i+1)*cookieValueMaxLength))+"; path="+cookiePath +" ;secure";
				}
				else
				{
					document.cookie = cname+"="+cookieValue.substring(i*cookieValueMaxLength,((i+1)*cookieValueMaxLength))+"; path="+cookiePath +" ;secure";
				}
			}
			else
			{
				//clear remaining cookies
				document.cookie = cname.concat(i)+"=; expires="+generateTimestamp(-1,true)+"; path="+cookiePath +" ;secure";
			}
			
			//check to see if writing of entire cookie contents is complete
			if ((i+1)*cookieValueMaxLength > cookieValue.length)
			{
				writingComplete = true;
			}
		}
	}
}

function deleteCookie(cookieName)
{
	var cname;
	//either use cookie name passed to method, or default value
	if (cookieName==null || cookieName=="")
	{
		cname=cookieNameDefault;
	}
	else
	{
		cname=cookieName;
	}
	document.cookie = cname+"=\"\"; expires="+generateTimestamp(-1,true)+"; path="+cookiePath;
}

//function to remove a key and all it's associated values from the cookie
function deleteKey(key,cookieName)
{
	var keyExists = doesKeyExist(key,cookieName);
	
	if( !(keyExists==null || !keyExists) )
	{
		//key exists, so remove it
		var cookieArray = getCookieDataArray(cookieName);
		
		for (var i=0; i<cookieArray.length; i++)
		{
			if (cookieArray[i].indexOf(key+":")==0)
			{
				//remove key from array and break out of for loop (key is removed)
				cookieArray.splice(i,1);
				break;
			}
		}
		createCookie(cookieArray.join("|"),cookieName);//save new cookie(s)
	}
}

//function to remove a value from the key.  If the value does not exist, do nothing.  If the value is the only value
//  in the key-value pair, remove the key from the cookie
function deleteFromKey(key,value,cookieName)
{
	if (doesExist(key,value,cookieName))
	{
		var cookieArray = getCookieDataArray(cookieName);
		
		for (var i=0; i<cookieArray.length; i++)
		{
			if (cookieArray[i].indexOf(key+":")==0)
			{
				//found key
				var keyValPairs = cookieArray[i].split(":");

				//only one value in the key-value pair, so remove key
				if (keyValPairs.length==2)
				{
					deleteKey(key,cookieName);
				}
				else
				{
					for (var j=0; j < keyValPairs.length; j++)
					{
						if (keyValPairs[j]==value)
						{
							//remove value from set of values
							keyValPairs.splice(j,1);
							break;//end for loop...value is removed
						}
					}
					//replace old value with new value
					cookieArray[i] = keyValPairs.join(":");
					//update cookie
					createCookie(cookieArray.join("|"),cookieName);
					break;
				}
			}
		}
	}
}

// if the key-value pair already exists, do nothing
// if the key-value pair does not exist, add it to the key in the cookie 
// if the flag appendValue is false, replace the value currently associated with the key.  if it is true, append the value
//   to the key, separating the values with ':'
function addToCookie(key, value, cookieName, appendValue)
{
	if (!doesExist(key,value,cookieName))
	{
		var cookieArray = getCookieDataArray(cookieName);
		var keyIndex = -1;
		
		//protect against null pointer exception
		if (cookieArray == null){
			cookieArray = new Array();
		}
		
		for (var i=0; i<cookieArray.length; i++)
		{
			if (cookieArray[i].indexOf(key+":")==0)
			{
				keyIndex = i;
				break
			}
		}
		//if key exists, add to the end of the key-value string
		if (keyIndex >= 0)
		{
			if (appendValue)
			{
				cookieArray[i] = cookieArray[i] + ":" + value;
			}
			else
			{
				cookieArray[i] = key + ":" + value;
			}
		}
		else
		{
			//otherwise, add key and value to the end of the cookie
			cookieArray.push(key+":"+value);
		}
		createCookie(cookieArray.join("|"),cookieName); //save cookie and new value
	}
}

//function to check to see if the provided value exists in the list of values for the provided key
//returns true if the value exists, false if it doesn't
function doesExist(key, value, cookieName, ignoreCase)
{
	var tempData = String(getValue(key, cookieName));
	var discovered = false;
	
	if (tempData.indexOf(':')>0)
	{
		var tempArray = tempData.split(':');
		for (var i=0; i<tempArray.length; i++)
		{
			if (ignoreCase == true){
				if (tempArray[i].toLowerCase()==value.toLowerCase())
				{
					discovered = true;
					break;
				}
			} else {	
				if (tempArray[i]==value)
				{
					discovered = true;
					break;
				}
			}
		}
	}
	else
	{
		if (ignoreCase == true){
			if (tempData.toLowerCase() == value.toLowerCase())
			{
				discovered = true;
			}
		} else {	
			if (tempData == value)
			{
				discovered = true;
			}
		}
		
	}
	
	return discovered;
}

//function to check if the key exists in the cookie
//returns true if the key exists, false if it doesn't, null if an 'error' occurred
function doesKeyExist(key,cookieName)
{
	//key is required
	if (key==null || key=="")
	{
		return null;
	}
	
	var cookieData = retrieveCookie(cookieName);
	var discovered = false; //flag to determine if key is found

	//cookie is not valid
	if (cookieData==null || cookieData=="")
	{
		return null;
	}
	else
	{
		//otherwise, retrieve the value of the key specified
		var pairs = cookieData.split('|'); //split all the key-value pairs
		for (var i=0; i < pairs.length; i++)
		{
			if (pairs[i].indexOf(key+":")==0)
			{
				discovered=true;//key is found
				break;
			}
		}
		return discovered;
	}
}

//reads in the value specified by the key.  returns it as a string (does not parse the values)
//if no key is specified, or key is null, return the entire contents of the cookie
function getValue(key,cookieName)
{
	return getValue(key,cookieName, true);
}

function getValue(key,cookieName, sanitize)
{
	var cookieData = retrieveCookie(cookieName);
	//cookie is not valid
	if (cookieData==null || cookieData=="")
	{
		return null;
	}
	else
	{
		if (key==null || key=="")
		{
			//if key is null or blank, return entire contents of cookie
			return cookieData;
		}
		else
		{
			//otherwise, retrieve the value of the key specified
			var pairs = cookieData.split('|'); //split all the key-value pairs
			for (var i=0; i < pairs.length; i++)
			{
				if (pairs[i].indexOf(key+":")==0)
				{
					var keyString = key + "";
					var index1 = keyString.length+1;
					var index2 = pairs[i].length;
					if (sanitize == null || sanitize == true) {
						return sanitizeCookie(pairs[i].substring(index1, index2), null); //return keys value(s) as a string
					}
					return pairs[i].substring(index1, index2); //return keys value(s) as a string
				}
			}
		}
		return ""; //key is not in the cookie
	}
}

//Use this function instead of decoding after getting the value because it handles the null case, 
//without handling it this way you'll get a string "null" in the null case.
function getValueAndDecodeURI(key,cookieName) {
	var value = getValue(key, cookieName, false);
	if (value == null) {
		return value;
	}
	return sanitizeCookie(decodeURIComponent(value), null);
}

//function to return the release value saved in the cookie for the particular contentID
// if the release is not set for the content id, return null
function getRelease(contentID,cookieName)
{
	var releaseData = getValue(cookieReleaseKey,cookieName);
	
	if (releaseData!=false)
	{
		//release values in the cookie, so check to see if the content ID is present in the release list.  if not, return null
		// if it is present, return the release
		
		if (String(releaseData).indexOf(":")>0)
		{
			//There is more than one contentID-release pair in the release value in the cookie
			var releaseArray = releaseData.split(":");
			var pairs;
			for (var i=0; i<releaseArray.length; i++)
			{
				pairs = releaseArray[i].split(",");
				if (pairs[0] == contentID)
				{
					return pairs[1];
				}
			}
			//contentID-release pair is not present in the list of contentIDs in the cookie, so return null
			return null;
		}
		else
		{
			//only one contentID-release pair is in the cookie
			var pairs = releaseData.split(",");
			if (pairs[0] == contentID)
			{
				return pairs[1];
			}
			else
			{
				return null;
			}
		}
	}
	else
	{
		//no release data in the cookie, so return null
		return null;
	}
}

//function to save the release value in the cookie for the particular contentID
function setRelease(contentID,release,cookieName)
{
	if (!doesExist(cookieReleaseKey,contentID+","+release,cookieName))
	{
		//contentID and release values are not present in the cookie, so add them
		addToCookie(cookieReleaseKey,contentID+","+release,cookieName);
	}
	else
	{
		//release value already set for the content ID specified, so just touch cookie to update expire time
		touchCookie(cookieName);
	}
}

// utility function to retrieve the cookie (if there are multiple cookies set on the page)
function retrieveCookie(cookieName)
{
	var cookieNameEQ;
	var cookieValue = "";
	var tmpCookieValue = "";
	
	if (cookieName == null || cookieName == "") {
		cookieNameEQ = cookieNameDefault;
	}
	else {
		cookieNameEQ = cookieName;
	}
	
	//loop through supported cookies, retrieving values, until cookie value of null is returned
	for (var i=0;i<cookieMaxNum; i++)
	{
		if (i>0)
		{
			tmpCookieValue = getCookiePart(cookieNameEQ+i);
		}
		else
		{
			tmpCookieValue = getCookiePart(cookieNameEQ);
		}
		
		if (tmpCookieValue==null)
		{
			break;//cookie does not exist or expired, so break out of for loop...return null or value(s) retreived so far
		}
		tmpCookieValue = stripQuotes(tmpCookieValue);
		//concatenate returned value to cookie value string
		cookieValue = cookieValue.concat(tmpCookieValue);
	}
	if (cookieValue == "")
	{
		cookieValue = null;
	}
	return cookieValue;
}

function stripQuotes(cookie){
	if (cookie.charAt(0) === "\""){
		cookie = cookie.substring(1,cookie.length-1);
	}
	return cookie;
}

//function to get the cookie (if the cookie value is split into multiple, this function will retrieve them and merge the
// values into one string
function getCookiePart(name)
{
	name = name.concat("=");
	var cookieArray = document.cookie.split(';');
	for (var i=0; i < cookieArray.length; i++)
	{
		var tempCookie = cookieArray[i];
		//loop to clear white space at the beginning of the cookie.
		while(tempCookie.charAt(0)==' ')
		{
			tempCookie = tempCookie.substring(1,tempCookie.length);
		}
		//check if current cookie is the one we're looking for
		if (tempCookie.indexOf(name) == 0)
		{
			return tempCookie.substring(name.length,tempCookie.length);
		}
	}
	//cookie either has not been set, or has expired
	return null;
}

//function to retrieve the entire contents of the cookie data as an array
// used specifically when adding data to the cookie.
// return null if there is no data in the cookie
function getCookieDataArray(cookieName)
{
	var cname;
	if (cookieName==null || cookieName=="")
	{
		cname = cookieNameDefault;
	}
	else
	{
		cname = cookieName;
	}
	
	var cookieData = retrieveCookie(cname);
	//cookie is not valid
	if (cookieData==null || cookieData=="")
	{
		return null;
	}
	else
	{
		var cookieArray = cookieData.split('|');
		return cookieArray;
	}
}


//***** SUPPORT FUNCTIONS ******//


//generates a timestamp.  Needed for expiry date of the cookie
function generateTimestamp(minutes, formatted)
{
	var date = new Date();
	if (minutes == null || minutes == "")
	{
		minutes = cookieLife;
	}
	
	date.setTime(date.getTime() + (minutes*60*1000));
	
	//if formatted is true, return the string formatted to UTC time
	if (formatted==true)
	{
		return date.toUTCString();
	}
	else
	{
		//otherwise, return string in milliseconds
		return date.getTime();
	}
}

// updates the expire time of the cookie to the current system time.
function touchCookie(cookieName)
{
	var now = new Date();
	addToCookie("lastTouch", now.getTime());
}

function decodeCookieValue(key, cookieName){
		var encodedKeyValue = getValue(key, cookieName);
		
		var keyValue = base64_decode(encodedKeyValue);
		
		return keyValue;
}

function isSessionExpired() {
	var cookieData = retrieveCookie();
	if(cookieData == null) {
		//cookie was deleted 
		return true;
	}
	
	return getTimeToExpireInMS() <= 0;
}

function getTimeToExpireInMS() {
	var lastTouch = getValue("lastTouch");
	var sessionLifeInSeconds = getValue("sessionLifeInSeconds");
	
	if(lastTouch == null || sessionLifeInSeconds == null) {
		//cookie exists but values not set yet
		return -1;
	} else {
		var now = new Date();
		var timePassed = now.getTime() - lastTouch;
		var timeRemaining = (sessionLifeInSeconds * 1000) - serverLagInMS - timePassed;
		return timeRemaining;
	}
}

function getTimeToPingServerInMS() {
	var cookieArray = getCookieDataArray();
	if (isSessionExpired())
	{
		return null;
	}
	
	var timeToPingServer = getValue("timeToPingServer");
	var now = new Date();
	
	if(timeToPingServer == null || isNaN(timeToPingServer) || timeToPingServer == "") {
		timeToPingServer = resetTimeToPingServer();
	}
	return timeToPingServer - now.getTime();
}

function resetTimeToPingServer() {
	var now = new Date();
	var sessionLifeInSeconds = parseInt(getValue("sessionLifeInSeconds"));
	if(sessionLifeInSeconds == null || sessionLifeInSeconds == "" ) {
		return;
	}
	timeToPingServer = now.getTime() + sessionLifeInSeconds * 1000 - serverLagInMS;
	
	addToCookie("timeToPingServer", timeToPingServer);
	return timeToPingServer;
}
function getValueFromCookie(key,cookieName) {
	return getValue(key, cookieName);
}

//This function removes all characters except for letters, numbers, underscore, dash and space if a regEx is not specified
function sanitizeCookie(string, regEx) {
	if (regEx == null ) {
		regEx = sanitizeStringPattern;
	}
	return sanitizeString(string, regEx);
}

function setSanitizeCookieStringPattern(pattern) {
	if (pattern != null && pattern != "" && pattern != undefined) {
		sanitizeStringPattern = pattern;
	}
}

function getSanitizeCookieStringPattern() {
	return 	sanitizeStringPattern;
}