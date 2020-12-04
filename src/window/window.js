function View(){
    
}

View.prototype.open = function(options){
    this.options = (options || {});
    window.open(options.location,options.name,options.height+','+options.width);
}