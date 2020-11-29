var plugins = plugins || {};

(function(object){

    var _window;
  
    object.resizeTo = function(x,y) {
        _window.resizeTo(x,y);
        _window.focus();
    }
      
    return object;

})(plugins.window);