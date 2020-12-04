var plugins = plugins || {};

(function(object){

    var _window;
  
    object.resizeBy = function(x,y) {
        _window.resizeBy(x,y);
        _window.focus();
    }
      
    return object;

})(plugins.window);