var plugins = plugins || {};

(function(object){

    var _window;
  
    object.moveTo = function(x,y) {
        _window.moveTo(x,y);
        _window.focus();
    }
      
    return object;

})(plugins.window);