// load github account data into session storage
(function() {
  
  const endpoint = "https://api.github.com/users/russellabraham/repos";
  const sessionKey = "githubRepos";

  var data = sessionStorage.getItem(sessionKey);

  function getjson(url) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "text";
    request.send();
    request.onload = function() {
      var msg = request.response;
      var res = JSON.parse(msg);
      storeToSession(res);
    };
  }
  function storeToSession(json) {
    var str = JSON.stringify(json);
    sessionStorage.setItem(sessionKey, str);
  }

  if (data) {
    console.log(JSON.parse(data));
  } else {
    getjson(endpoint);
  }
  
})();
