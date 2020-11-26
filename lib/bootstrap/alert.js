(function(scope){

    /* helper */
    function element(target, element, attrs, text){
        const node = document.createElement(element);
        for(var attr in attrs){
            node.setAttribute(attr, attrs[attr]);
        }
        if(text){
            node.appendChild(document.createTextNode(text))
        }
        return target.insertBefore(node, target.childNodes[0])
    
        // return target.appendChild(node);

    }

    /* constructor */
    
    function Ctor(){};

    function Alert(options){
          
        // this logic to instance calls made to alert without having to call `new Alert()` instances
        // however, it may not remain
        if (options instanceof Alert) return options;        
        if (!(this instanceof Alert)) return new Alert();
        
        // this logic when used with instancing, allows preprocessing anything before the resolution of the call to a new instance of Alert
        // however, it may not remain
        this.preinitialize.apply(this, arguments);        
        this.initialize.apply(this, arguments);

    };

    // this is probably pointless
    Alert.prototype = Object.create(Ctor.prototype, {
        constructor : {
            value : Alert,
            writeable : true,
            configurable : true,
            enumerable : true
        }
    });

    // methods available to new instances 
    Alert.prototype = {

        preinitialize : function(){
            console.log(0, 'preinitialized Alert');            
        },

        initialize : function(){            
            console.log(1, 'initialized Alert');            
            this.element = element(document.body, 'p', { className : 'para' }, 'Hello World!');
        }

    };

    // methods available as function calls
    Alert.test = function(){
        return alert();
    };

    // export the Alert constructor to an objec scope, here it goes to `self || window || this`
    if(typeof scope !== 'undefined'){
        scope.Alert = Alert;
    }

})(this);


// new window.Alert();
// Alert.test();