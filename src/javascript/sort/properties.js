
function extend(object, props){
    for(var prop in props){
        if(props[prop]){
            object[prop] = props[prop]
        }
    }
    return object;
}


function Descriptor(options){

    this.options = extend({
        acceleration : null,
        altitude : null,
        gravity : null,
        latitude : null,
        light : null,
        linearAcceleration : null,
        longitude : null,
        magnetism : null,
        orientation : null,
        pressure : null,
        proximity : null,
        rotationMatrix : null,
        temperature : null
    }, options);

}

Descriptor.prototype = {
    toString : function(){}
}

