```javascript

var Model = Backbone.Model.extend({

});

var Collection = Backbone.Collection.extend({

});

var View = Backbone.View.extend({

});

var Router = Backbone.Router.extend({

});

```

```javascript
(function() {

    var root = this;
    var reference = root._;

    function _(obj) {
      if (obj instanceof _) return obj;
      if (!(this instanceof _)) return new _(obj);
    };

    root._ = _;

    _.VERSION = '0.0.1';

    _.noConflict = function() {
        root._ = reference;
        return this;
    };

}.call(this));

```


```javascript
(function(factory){	
    var root = this;
    root.Base = factory(root, {}); 
})(function(root, Base){
	
	var reference = root.Base;
	
	Base.VERSION = '0.0.1';
    
    Base.noConflict = function () {
		root.Base = reference;
		return this;
    };
    
    return Base;
    
});  
```