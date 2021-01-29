function Ctor(content){
    this.preintialize.apply(this, arguments);
    this.content = content;
    this.initialize.apply(this, arguments);
};
Ctor.prototype.preinitialize = function(){
    /* left empty to allow override from inheritors */
};
Ctor.prototype.initialize = function(){
    /* left empty to allow override from inheritors */
};
Ctor.prototype.toString = function(){
    /*  */
    return ''.concat(this.content);
};
Ctor.prototype.valueOf = function(){
    return this;
};