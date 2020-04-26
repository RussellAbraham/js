(function(){

    var request, response, blob;

    function getjson(url){
        request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'text';
        request.onload = function(){
            if(request.status === 200){
                response = JSON.parse(request.response);
                populate(response);
            } else {
                console.info('Network request failed ' + request.status + ':' + request.statusText);
            }
        }
        request.send();
    }
     
    function getjson2(url){
        request = new XMLHttpRequest();
        request.responseType = 'text';
        request.open("GET", url);
        request.onreadystatechange = function(){
            if(this.readyState === this.HEADERS_RECEIVED){
                var headers = request.getAllResponseHeaders();
                console.log(headers);
            }
        }
        request.onload = function(){
            response = JSON.parse(request.response);
            populate(response);
        }
        request.send();
    }

    function getimg(url){
        request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';
        request.onload = function(){
            if(request.status === 200){
                response = request.response;
                blob = window.URL.createObjectURL(response);
                populate(blob);
            } else {
                console.info('Network request failed ' + request.status + ':' + request.statusText);            
            }
        }
        request.send();
    }

    function populate(obj){
        //self.postMessage(obj);
    }

})();


var index,
    domNodeParent, 
    domNodeChild, 
    domNodeFragment = new DocumentFragment();

function domNode(target, element, attrs, text) {
    domNodeParent = document.createElement(element);
    domNodeChild = document.createTextNode(text); 
    for (var attr in attrs) { 
        domNodeParent.setAttribute(attr, attrs[attr]) 
    } if (text) { 
        domNodeParent.appendChild(domNodeChild); 
    } 
    return target.appendChild(domNodeParent);
}

function appendToFragment(className, color, target, output) {
    domNodeParent = domNode(domNodeFragment, 'ul', { class: 'standard', style: '' });    
    domNodeChild = domNode(domNodeParent, 'code', { class: className, style: 'color:' + color + ';' }, output);
    target.appendChild(domNodeFragment);
}
	
function insertTextNodeBefore(node){
  var log = document.getElementById("log");
  log.insertBefore(node, log.childNodes[0]);
}


function isObject(obj) {
    return obj === Object(obj);
}

function isArray(obj) {
    return toString.call(obj) === "[object Array]";
}

function isString(obj) {
    return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}

function isBoolean(obj) {
    return obj === true || obj === false;
}

function isNumber(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
}

function isNull(obj) {
    return obj === null;
}

function isUndefined(obj) {
    return obj === void 0;
}

function log(d) {
    isObject(d) && (domNodeParent = domNode(domNodeFragment, "pre", {
        class: "standard",
        style: ""
    }), domNodeChild = domNode(domNodeParent, "code", {
        class: "object",
        style: "color:violet;"
    }, d)), 
    
    isBoolean(d) && (domNodeParent = domNode(domNodeFragment, "pre", {
        class: "standard",
        style: ""
    }), domNodeChild = domNode(domNodeParent, "code", {
        class: "boolean",
        style: "color:indigo"
    }, d)), 
    
    isString(d) && (domNodeParent = domNode(domNodeFragment, "pre", {
        class: "standard",
        style: ""
    }), domNodeChild = domNode(domNodeParent, "code", {
        class: "string",
        style: "color:steelblue;"
    }, d)), 
    
    isNumber(d) && (domNodeParent = domNode(domNodeFragment, "pre", {
        class: "standard",
        style: ""
    }), domNodeChild = domNode(domNodeParent, "code", {
        class: "number",
        style: "color:limegreen;"
    }, d)), 
    
    isNull(d) && (domNodeParent = domNode(domNodeFragment, "pre", {
        class: "",
        style: ""
    }), domNodeChild = domNode(domNodeParent, "code", {
        class: "null",
        style: ""
    }, d)), 
    
    isUndefined(d) && (domNodeParent = domNode(domNodeFragment, "pre", {
        class: "",
        style: ""
    }), domNodeChild = domNode(domNodeParent, "code", {
        class: "undefined",
        style: ""
    }, d)),
			
			insertTextNodeBefore(domNodeFragment)
}

function action(object, events){	
	for(var event in events){
		object.on(event, events[event])
	}
}
function trigger(object, events){	
	for(var event in events){	
		object.trigger(event, events[event])	
	}			
}
function listen(element, events){
	for(var event in events){
		element.addEventListener(event, events[event])
	}
}



const exe = {};
const xhr = new XMLHttpRequest();

_.extend(exe, Backbone.Events);
_.extend(exe, xhr);

action(exe, {
    'test' : function(event){ console.log(event) }
});


xhr.open("GET", "");
xhr.responseType = "text";

xhr.addEventListener('error', function(err){
    console.log(err.stack);
});

xhr.addEventListener('readystatechange', function(){
    if(this.readyState === this.HEADERS_RECEIVED){
        var headers = xhr.getAllResponseHeaders();
        console.log(headers);
    }
});

xhr.addEventListener('load', function(){
    var res = xhr.response;
    console.log(res)
});

xhr.send();
