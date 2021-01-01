

function Output(content){
    Ctor.call(this, content);
    this.content = content;
};

Output.prototype.toString = function(){
    return ''.concat(this.content);
};

Output.prototype.valueOf = function(){
    return this;
};

// HTML Output

// Text Output

// Text Node

Output.prototype.print = function(){
    //html    
};

Output.prototype.text = function(){
    //text
};

Output.prototype.log = function(){
    
};
