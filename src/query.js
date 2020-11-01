
const api = {};

function toArray(args) {
  var arr = [], i, len = args.length;
  for (i = 0; i < len; ++i) {
    arr[i] = args[i];
  }
  return arr;
}

function parse(string) {
  return string.split(/\s+/);
}

function format(array) {
  while (array.length > 0 && array[0] === "") {
    array = array.slice(1);
  }
  while (array.length > 0 && array[array.length - 1] === "") {
    array = array.slice(0, array.length - 1);
  }
  return array;
}

function reparse(string) {
  var tokens = parse(string);
  var array = format(tokens);
  var last = null, i, len = array.length;
  for (i = 0; i < len; ++i) {
    var callback = array.slice(0, i + 1).join("_");
    var parm = array.slice(0);
    if (api[callback] == undefined) {
      break;
    } else {
      last = i;
    }
  }
  if (last === null || array.length == 0) {
    alert('No such command "' + array[0] + '"');
    return;
  }
  var callback = array.slice(0, last + 1).join("_");
  var wrapper = api[callback];
  var restArguments = array.slice(last + 1);
  wrapper.apply(this, restArguments);
}

function hop(url, kvs) {
  var url = url + "?";
  for (var k in kvs) {
    var v = kvs[k];
    url += k + "=" + escape(v);
  }
  location = url;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}

var parseQuery = function parseQuery() {
  var search = window.location.search;
  var q = {};
  search
    .slice(1)
    .split("&")
    .forEach(function(term) {
      var kv = term.split("=");
      q[kv[0]] = kv[1] !== undefined ? decodeURIComponent(kv[1]) : true;
    });
  return q;
};

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;
  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function getAllUrlParams(url) {
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


api.google = function() {
	hop("https://www.google.ca/search", {
		q: toArray(arguments).join(" ")
	});
};
api.github = function() {
	hop("https://github.com/search", {
		q: toArray(arguments).join(" ")
	});
};
api.debug = function() {
	hop("https://cdpn.io/RJLeyra/debug/" + toArray(arguments));
};
api.bug = function() {
	window.open(
		"https://cdpn.io/RJLeyra/debug/" + toArray(arguments),
		"_window" + Date.now(),
		"height=400,width=600"
	);
};
api.pen = function() {
	hop("https://codepen.io/search/pens", {
		q: toArray(arguments).join(" ")
	});
};
api.mdn = function() {
	hop("https://developer.mozilla.org/en-US/search", {
		q: toArray(arguments).join(" ")
	});
};
api.npm = function() {
	hop("https://www.npmjs.com/search", {
		q: toArray(arguments).join(" ")
	});
};
api.y_s = function() {
	hop("https://www.youtube.com/results", {
		search_query: toArray(arguments).join(" ")
	});
};
api.y_w = function() {
	hop("https://www.youtube.com/watch", {
		v: toArray(arguments).join(" ")
	});
};
api.wiki = function() {
	hop("https://en.wikipedia.org/wiki/Special:Search", {
		search: toArray(arguments).join(" ")
	});
};
api.wolf = function() {
	hop("https://www.wolframalpha.com/input", {
		i: toArray(arguments).join(" ")
	});
};
api.forage = function(){
	hop('https://000455151.codepen.website/');
}
