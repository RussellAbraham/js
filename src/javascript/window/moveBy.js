var plugins = plugins || {};

(function(object){

    var _window;
  
    object.moveBy = function(x,y) {
        _window.moveBy(x,y);
        _window.focus();
    }
      
    return object;

})(plugins.window);