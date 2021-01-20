(function(object){
  
    object.open = function(loc, name, h,w){        
        return window.open(loc,name, 'height='+h+',width='+w);
    };    

    return object;

})(plugins.window);

View.prototype.open = function(options){
    this.options = (options || {});
    window.open(options.location,options.name, 'height='+options.h+',width='+options.w);
}