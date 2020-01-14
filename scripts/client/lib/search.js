//google search
function g() {
    var search_string = arguments_to_array(arguments).join(" ");
    bcl_jump_cgi("https://www.google.ca/search", {
      q: search_string
    });
  }
  
  //google images
  function g_i() {
    var search_string = arguments_to_array(arguments).join(" ");
    bcl_jump_cgi("http://www.google.com/images", {
      q: search_string
    });
  }
  
  //wikipedia
  function wiki() {
    var search_string = arguments_to_array(arguments).join(" ");
    bcl_jump_cgi("http://en.wikipedia.org/wiki/Special:Search", {
      search: search_string
    });
  }
  
  //wolfram
  function wolf() {
    var search_string = arguments_to_array(arguments).join(" ");
    bcl_jump_cgi("http://www.wolframalpha.com/input", {
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
  