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
          
        if (options instanceof Alert) return options;
        
        if (!(this instanceof Alert)) return new Alert();
        
        this.preinitialize.apply(this, arguments);        
        
        this.initialize.apply(this, arguments);

    };

    Alert.prototype = Object.create(Ctor.prototype, {
        constructor : {
            value : Alert,
            writeable : true,
            configurable : true,
            enumerable : true
        }
    });



    Alert.prototype = {
        
        preinitialize : function(){
            console.log(0, 'preinitialized Alert');            
        },

        initialize : function(){            
            console.log(1, 'initialized Alert');            
            this.element = element(document.body, 'p', { className : 'para' }, 'Hello World!');
        }

    };

    Alert.test = function(){
        return alert();
    };

    if(typeof scope !== 'undefined'){
        scope.Alert = Alert;
    }

})(this);


// new window.Alert();