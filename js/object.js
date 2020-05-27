(function (object) {	
	    
	['Arguments', 'Location', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {  
		object['is' + name] = function (obj) {    
			return toString.call(obj) === '[object ' + name + ']';      
		}    
	});

	object['function'] = function (obj) {  
		return Function('"use strict";return (' + obj + ')')();    
	}
	
	object['fragment'] = new DocumentFragment(); 
	object['request'] = new XMLHttpRequest();	
	object['worker'] = function (obj) {
    
	}
	
	
	if (typeof window !== 'undefined') {
  
		window.object = object;
    
	}

})(new Object())


 (function(application){
	application['api'] = function(){
		return {
			get : function(){},
			set : function(){},
			has : function(){}
		}
	}
})(new Object());

// Constructor
function Component(options) {
    options = options || {};    
    this._start = 0;
    this._current = 0;
    this._opened = false;
    this.main = options.main;
    this.aside = options.aside;
    this._duration = parseInt(options.duration, 10) || 300;
}

// Constructor Prototype Functions - emulate logic gate - factory - after instantiation
Component.prototype = {
  
    open : function(){    
      var self = this;
      this._opened = true;
      setTimeout(function() {
        
      }, this._duration + 50);
      return this;
    },

    close : function(){
      var self = this;
      if (!this.isOpen() && !this._opening) { return this; }
      this._opened = false;
      setTimeout(function() {
        
      }, this._duration + 50);
      return this;
    },

    toggle : function(){
        return this.isOpen() ? this.close() : this.open();
    },

    isOpen : function(){
        return this._opened;
    }
}

/*

	Opinion: opinion
		- language
		- framework
		- library

		
	Size: size
		- kb
		- mb
		- gb
		
		

	Shape: undefined
		- rect
		- path
		- arc

	Color: color
		- hex
		- rgb
		- rgba
		- hsl
		- filters

	Origin: origin
		- url
		- location
		- window

	Material: material
		- json

	Purpose: purpose
		- programming tasks

	Noun: noun
		
		
	
*/

// rough draft, todo : decouple, emitter, Constructor { this.component = new Component() } Constructor.prototype { }
// new Constructor()

// try not extending core prototypes, could be faster

(function(application){ /* $Id$ */

	document.getElementById('form').addEventListener('submit', function(event){
		event.preventDefault();
		return bcl_go(this);
	});
	
	var blob = new Blob(Array.prototype.map.call(document.querySelectorAll('script[type=\'text\/js-worker\']'), function (oScript) { 
		return oScript.textContent; 
	}), {
		type: 'text/javascript;charset=UTF-8'	
	});
	

	function extend(obj){
	  Array.prototype.slice.call(arguments, 1).forEach(function(source){
      for (var prop in source) {
	      if (source[prop] !== void 0) obj[prop] = source[prop];	
      }
	  });
	  return obj;
  }
	
	function toArray(list) {
  	return Array.prototype.slice.call(list || [], 0);
	}
	

	
	function pageLog(sMsg) {
	  var oFragm = document.createDocumentFragment();
	  oFragm.appendChild(document.createTextNode(sMsg));
	  oFragm.appendChild(document.createElement('br'));
	  document.querySelector('article pre').appendChild(oFragm);
	}

	document.worker = new Worker(window.URL.createObjectURL(blob));

	document.worker.onmessage = function(oEvent) {
	  pageLog('Received: ' + oEvent.data);
	};
	
	

	
	window.addEventListener('load', function(event){
		document.worker.postMessage('');
	}, false);
	
	
	function arguments_to_array(args) {
	  var arr = new Array();
	  for (var i = 0; i < args.length; ++i) {
	    arr[i] = args[i];
	  }
	  return arr;
	}

	function bcl_go(e) {
	  var cmd = e.input.value;
	  bcl_run(cmd);
	  e.input.focus();
	  return false;
	}

	function bcl_parse(cmd) {
	  return cmd.split(/\s+/);
	}

	function bcl_remove_blank_words(words) {
	  while (words.length > 0 && words[0] === "") {
	    words = words.slice(1);
	  }
	  while (words.length > 0 && words[words.length - 1] === "") {
	    words = words.slice(0, words.length - 1);
	  }
	  return words;
	}

	function bcl_run(cmd) {
	  words = bcl_parse(cmd);
	  words = bcl_remove_blank_words(words);
	  var last_cmd_word = null;
	  for (var i = 0; i < words.length; ++i) {
	    var fun_name = words.slice(0, i + 1).join("_");
	    if (app[fun_name] == undefined) { break; } else { last_cmd_word = i; }
	  }
	  if (last_cmd_word === null || words.length == 0) {
	    alert('No such command "' + words[0] + '"');
	    return;
	  }
	  var fun_name = words.slice(0, last_cmd_word + 1).join("_");
	  var fun = app[fun_name];
	  var args = words.slice(last_cmd_word + 1);
	  fun.apply(this, args);
	}

	function bcl_jump_cgi(url, kvs) {
	  var url = url + "?";
	  for (var k in kvs) {
	    var v = kvs[k];
	    url += k + "=" + escape(v);
	  }
	  location = url;
	}

	/* Define Application Functions / Commands Below */
	
	/* Search Google */
	function g() {
	  var search_string = arguments_to_array(arguments).join(" ");
	  bcl_jump_cgi("https://www.google.ca/search", {
	    q: search_string,
	  });
	}

	/* Search Wikipedia */
	function wiki() {
	  var search_string = arguments_to_array(arguments).join(" ");
	  bcl_jump_cgi("https://en.wikipedia.org/wiki/Special:Search", {
	    search: search_string
	  });
	}

	/* Wolfram Compuatation */
	function wolf() {
	  var search_string = arguments_to_array(arguments).join(" ");
	  bcl_jump_cgi("https://www.wolframalpha.com/input", {
	    i: search_string
	  });
	}

	/* Search DuckDuckGo */
	function duck() {
	  var search_string = arguments_to_array(arguments).join(" ");
	  bcl_jump_cgi("https://duckduckgo.com", {
	    q: search_string
	  });
	}

	/* Search Youtub Videos */
	function you_res() {
	  var search_string = arguments_to_array(arguments).join(" ");
	  bcl_jump_cgi("https://www.youtube.com/results", {
	    search_query: search_string
	  });
	}

	/* Watch Youtube Video  */
	function you_wat() {
	  var search_string = arguments_to_array(arguments).join(" ");
	  bcl_jump_cgi("https://www.youtube.com/watch", {
	    v: search_string
	  });
	}

	/* Mozilla Developer Network */
	function mdn() {
	  var search_string = arguments_to_array(arguments).join(" ");
	  bcl_jump_cgi("https://developer.mozilla.org/en-US/search", {
	    q: search_string
	  });
	}
	
	function settings() {
	  var search_string = arguments_to_array(arguments).join(" ");
		window.open('settings://' + search_string);
	}
	
	function test_driver() {
	  var search_string = arguments_to_array(arguments).join(" ");
		window.open('web+driver://' + search_string);
	}	
	
	function register_driver(){
		navigator.registerProtocolHandler(
	    'web+driver',
	    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/driver.html?driver=%s',
	    'Driver Handler'
		);
	}
	
	function setup_temporary_storage(){
		var search_string = arguments_to_array(arguments).join(" ");
		
	}
	
	function setup_persistent_storage(){
		
	}	
	
	
		
	function bookmarks() {
		bcl_jump_cgi('bookmarks/')
	}
	function scripts() {
		bcl_jump_cgi('scripts/')
	}
	function tasks() {
		bcl_jump_cgi('tasks/')
	}	
	
	function view_javascript(){	
		s = document.getElementsByTagName('SCRIPT');
		d = window.open().document;
		/*140681*/
		d.open();
		d.close();
		b = d.body;
		function trim(s){
		    return s.replace(/^\\s*\\n/, '').replace(/\\s*$/, '');
		};
	
	function add(h){
	    b.appendChild(h);
	}
	
	function makeTag(t){
	    return d.createElement(t);
	}
	
	function makeText(tag,text){
	    t = makeTag(tag);
	    t.appendChild(d.createTextNode(text));
	    return t;
	}

	add(makeText('style', 'iframe{width:100%;height:18em;border:1px solid;'));
	add(makeText('h3', d.title='Scripts in ' + location.href));

	for(i=0; i<s.length; ++i) { 
	    if (s[i].src) { 
	        add(makeText('h4','script src=%22'+ s[i].src + '%22' ));
	        iframe = makeTag('iframe'); 
	        iframe.src = s[i].src; 
	        add(iframe); 
	    } else { 
	        add(makeText('h4','Inline script'));
	        add(makeText('pre', trim(s[i].innerHTML))); 
	    } 
	} 
	}
	
	function view_variables(){
	  var x, d, i, v, st; x = open(); d = x.document; d.open();
  	function hE(s) {
  	  s = s.replace(/&/g, "&");
  	  s = s.replace(/>/g, ">");
  	  s = s.replace(/</g, "<");
  	  return s;
  	}
  d.write(
    "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=0.75,user-scalable=no'><style>td{vertical-align:top; white-space:pre; } table,td,th { font-family: monospace; padding:3px; margin: auto; border-radius:2px; border: 1px solid rgba(0,0,0,0.15); } div.er { color:red }</style></head><body><table border=1><thead><tr><th>Variable</th><th>Type</th><th>Value as string</th></tr></thead>"
  );
  for (i in window) {
    if (!(i in x)) {
      v = window[i];
      d.write(
        "<tr><td>" + hE(i) + "</td><td>" + hE(typeof window[i]) + "</td><td>"
      );
      if (v === null) d.write("null");
      else if (v === undefined) d.write("undefined");
      else
        try {
          st = v.toString();
          if (st.length) d.write(hE(v.toString()));
          else d.write(" ");
        } catch (er) {
          d.write("<div class=er>" + hE(er.toString()) + "</div>");
        }
      d.write("</pre></td></tr>");
    }
  }
  d.write("</table></body></html>");
  d.close();


	}
	/* Map commands so the form can execute them */
	application['init'] = function(){
		return {
			g : g,
			wiki : wiki,
			wolf : wolf,
			duck : duck,
			you_res : you_res,
			you_wat : you_wat,
			mdn : mdn,
			settings : settings,
			test_driver : test_driver,
			register_driver : register_driver,
			bookmarks : bookmarks,
			tasks : tasks,
			scripts : scripts,
			view_javascript : view_javascript,
			view_variables : view_variables
		}
	}	
	
	/* Export the closure as a global variable */
	if(typeof window !== 'undefined'){
		window.app = application.init();
	}
	
})(new Object());


// ideal for me, to wrap everthing app needs and does within this lifecycle of events and logic
document.addEventListener('DOMContentLoaded', function(event){
    try {
        if(event.isTrusted){
            console.info('document event is trusted');
        } else {
            console.warn('document event is not trusted');
        }
    } catch (er){
        console.error(er.stack);
    } finally {
        console.log('document has loaded');
    }
}, false);

window.addEventListener('load', function(event){
    try {
        if(event.isTrusted){
            console.info('window event is trusted');
        } else {
            console.warn('window event is not trusted');
        }
    } catch (er){
        console.error(er.stack);
    } finally {
        console.log('window has loaded');
    }
}, false);
