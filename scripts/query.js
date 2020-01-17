
function arguments_to_array(args) {
  var arr = new Array();
  for (var i = 0; i < args.length; ++i) {
    arr[i] = args[i];
  }
  return arr;
}

// form onsubmit return bcl_go(this);
// send strings to match query parameters
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
  // Remove leading and trailing blank words.
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
    if (window[fun_name] == undefined) {
      break;
    } else {
      last_cmd_word = i;
    }
  }

  if (last_cmd_word === null || words.length == 0) {
    alert('No such command "' + words[0] + '"');
    return;
  }

  var fun_name = words.slice(0, last_cmd_word + 1).join("_");
  var fun = window[fun_name];
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

function bcl_replace_cgi(url, kvs) {
  var url = url + "?";
  for (var k in kvs) {
    var v = kvs[k];
    url += k + "=" + escape(v);
  }
  location.replace(url);
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

// form takes care of white space

//google search
function g() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://www.google.ca/search", {
    q: search_string,
  });
}

// search?q=javascript&tbm=vid
// search?q=javascript&tbm=isch
// search?q=javascript&tbm=nws
// search?q=javascript&tbm=bks
// search?q=javascript&tbm=fin
// search?q=javascript&tbm=shop
// flights

//google images
function g_f() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://www.google.com/flights", {
    q: search_string,
    
  });
}

function g_m() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://www.google.com/maps", {
    q: search_string,
    
  });
}

//wikipedia
function wiki() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://en.wikipedia.org/wiki/Special:Search", {
    search: search_string
  });
}

//wolfram
function wolf() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://www.wolframalpha.com/input", {
    i: search_string
  });
}

//duckduckgo
function duck() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://duckduckgo.com", {
    q: search_string
  });
}

//youtube search
function you_res() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://www.youtube.com/results", {
    search_query: search_string
  });
}

//youtube watch
function you_wat() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://www.youtube.com/watch", {
    v: search_string
  });
}

// mdn search
function mdn() {
  var search_string = arguments_to_array(arguments).join(" ");
  bcl_jump_cgi("https://developer.mozilla.org/en-US/search", {
    q: search_string
  });
}
