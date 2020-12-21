/* This is code from Backbone js, 
 * I have made this file to learn how the `set` functions of Model and Collection work.
 * They provide an excellent abstraction for updating, and merging data sources
 * It *should* run in all major browsers, IE, Android KitKat, and Webkit 10.3
*/

/*
 * With both Underscore and Backbone as whole libraries, a handful of es6 features are provided and run with optimal performance.
 * Perhaps further optimization of these constructs can be made. 
 * Such as reducing random access and copy operations.
 * Creating and interface for Underscore and Backbone in webworkers and other JS environments like NodeJS is the same, 
 * though requirejs will throw an error if the amd wrapper around backbone is configured to expect jquery.
 * Without its Event Emitter, or any for that matter these constructs will not function. 
*/

/*
	Under the impression that, 
	if you are to bother including preinitialize and initialize, 
	a point to use both of these should be made.
	They follow order of operations consistently.
	
	Can preinitialize be used as a preprocessing function, or maybe like http headers.
	
	Initialize is a must if you extend({}) the construct instead of instancing a new one.	

	Something to keep in mind here. 
	
	The `get` and `set` of the model can at times seem clunky, especially when the logic needed is not too high. 
	One obvious approach I stumbled upon is to wrap get and set with shortcut functions. 
	Ok so a named get and set for the models default data values. myModel.getName or myModel.setName
	
	I don't like that solution unless the return values become automatic with a generator function included in a Backbone View. 
	Took me about 2 years to notice this with the content I was studying.. embarrasing. 
	
	I apply this approach all the time when I see it now, and and am more productive because of it. 
	
	Backbone.Model.extend({
		// more typical examples would just use an object literal instead of a function returning an object literal.. 
		// this lets us pass the data to new instances of the model, in a collection, within a nested View interface
		// summarized : abstraction.. not your problem anymore
		defaults : function(){
			return {
				title : ''
			}
		}
	})
	
	// View with function to instance a new nested view, containing the model data, from values of the top level view.
	function generate(){
		return {
			title : document.querySelector('form input').value
		}
	}
	function addOne(model){
		var view = new View({ model : model })
		this.$el.html(view.render.el);
	}
	function create(){
		// closer to home, the object returned has passed through 4 interfaces. Main View Component, a single view, the Collection, and a single model
		this.collection.create(generate());
	}
	
	When attribution is setup well with [model|collection|view] its great, otherwise a few lines to wrap the existing get/set is pointless for optimization.. readability however.
	
*/

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  
var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.preinitialize.apply(this, arguments);
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    var defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // The prefix is used to create the client id which is used to identify models locally.
    // You may want to override this if you're experiencing name clashes with model ids.
    cidPrefix: 'c',

    // preinitialize is an empty function by default. You can override it with a function
    // or object.  preinitialize will run before any instantiation logic is run in the Model.
    preinitialize: function(){},

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Special-cased proxy to underscore's `_.matches` method.
    matches: function(attrs) {
      return !!_.iteratee(attrs, this)(this.attributes);
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      var unset      = options.unset;
      var silent     = options.silent;
      var changes    = [];
      var changing   = this._changing;
      this._changing = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }

      var current = this.attributes;
      var changed = this.changed;
      var prev    = this._previousAttributes;

      // For each `set` attribute, update or delete the current value.
      for (var attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          changed[attr] = val;
        } else {
          delete changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Update the `id`.
      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0; i < changes.length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    }

})


var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    this.preinitialize.apply(this, arguments);
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Splices `insert` into `array` at index `at`.
  var splice = function(array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {
    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
        if (models == null) return;
  
        options = _.extend({}, setOptions, options);
        if (options.parse && !this._isModel(models)) {
          models = this.parse(models, options) || [];
        }
  
        var singular = !_.isArray(models);
        models = singular ? [models] : models.slice();
  
        var at = options.at;
        if (at != null) at = +at;
        if (at > this.length) at = this.length;
        if (at < 0) at += this.length + 1;
  
        var set = [];
        var toAdd = [];
        var toMerge = [];
        var toRemove = [];
        var modelMap = {};
  
        var add = options.add;
        var merge = options.merge;
        var remove = options.remove;
  
        var sort = false;
        var sortable = this.comparator && at == null && options.sort !== false;
        var sortAttr = _.isString(this.comparator) ? this.comparator : null;
  
        // Turn bare objects into model references, and prevent invalid models
        // from being added.
        var model, i;
        for (i = 0; i < models.length; i++) {
          model = models[i];
  
          // If a duplicate is found, prevent it from being added and
          // optionally merge it into the existing model.
          var existing = this.get(model);
          if (existing) {
            if (merge && model !== existing) {
              var attrs = this._isModel(model) ? model.attributes : model;
              if (options.parse) attrs = existing.parse(attrs, options);
              existing.set(attrs, options);
              toMerge.push(existing);
              if (sortable && !sort) sort = existing.hasChanged(sortAttr);
            }
            if (!modelMap[existing.cid]) {
              modelMap[existing.cid] = true;
              set.push(existing);
            }
            models[i] = existing;
  
          // If this is a new, valid model, push it to the `toAdd` list.
          } else if (add) {
            model = models[i] = this._prepareModel(model, options);
            if (model) {
              toAdd.push(model);
              this._addReference(model, options);
              modelMap[model.cid] = true;
              set.push(model);
            }
          }
        }
  
        // Remove stale models.
        if (remove) {
          for (i = 0; i < this.length; i++) {
            model = this.models[i];
            if (!modelMap[model.cid]) toRemove.push(model);
          }
          if (toRemove.length) this._removeModels(toRemove, options);
        }
  
        // See if sorting is needed, update `length` and splice in new models.
        var orderChanged = false;
        var replace = !sortable && add && remove;
        if (set.length && replace) {
          orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
            return m !== set[index];
          });
          this.models.length = 0;
          splice(this.models, set, 0);
          this.length = this.models.length;
        } else if (toAdd.length) {
          if (sortable) sort = true;
          splice(this.models, toAdd, at == null ? this.length : at);
          this.length = this.models.length;
        }
  
        // Silently sort the collection if appropriate.
        if (sort) this.sort({silent: true});
  
        // Unless silenced, it's time to fire all appropriate add/sort/update events.
        if (!options.silent) {
          for (i = 0; i < toAdd.length; i++) {
            if (at != null) options.index = at + i;
            model = toAdd[i];
            model.trigger('add', model, this, options);
          }
          if (sort || orderChanged) this.trigger('sort', this, options);
          if (toAdd.length || toRemove.length || toMerge.length) {
            options.changes = {
              added: toAdd,
              removed: toRemove,
              merged: toMerge
            };
            this.trigger('update', this, options);
          }
        }
  
        // Return the added (or merged) model (or models).
        return singular ? models[0] : models;
      }

    })

    
  // Defining an @@iterator method implements JavaScript's Iterable protocol.
  // In modern ES2015 browsers, this value is found at Symbol.iterator.
  /* global Symbol */
  var $$iterator = typeof Symbol === 'function' && Symbol.iterator;
  if ($$iterator) {
    Collection.prototype[$$iterator] = Collection.prototype.values;
  }

  // CollectionIterator
  // ------------------

  // A CollectionIterator implements JavaScript's Iterator protocol, allowing the
  // use of `for of` loops in modern browsers and interoperation between
  // Backbone.Collection and other JavaScript functions and third-party libraries
  // which can operate on Iterables.
  var CollectionIterator = function(collection, kind) {
    this._collection = collection;
    this._kind = kind;
    this._index = 0;
  };

  // This "enum" defines the three possible kinds of values which can be emitted
  // by a CollectionIterator that correspond to the values(), keys() and entries()
  // methods on Collection, respectively.
  var ITERATOR_VALUES = 1;
  var ITERATOR_KEYS = 2;
  var ITERATOR_KEYSVALUES = 3;

  // All Iterators should themselves be Iterable.
  if ($$iterator) {
    CollectionIterator.prototype[$$iterator] = function() {
      return this;
    };
  }

  CollectionIterator.prototype.next = function() {
    if (this._collection) {

      // Only continue iterating if the iterated collection is long enough.
      if (this._index < this._collection.length) {
        var model = this._collection.at(this._index);
        this._index++;

        // Construct a value depending on what kind of values should be iterated.
        var value;
        if (this._kind === ITERATOR_VALUES) {
          value = model;
        } else {
          var id = this._collection.modelId(model.attributes);
          if (this._kind === ITERATOR_KEYS) {
            value = id;
          } else { // ITERATOR_KEYSVALUES
            value = [id, model];
          }
        }
        return {value: value, done: false};
      }

      // Once exhausted, remove the reference to the collection so future
      // calls to the next method always return done.
      this._collection = void 0;
    }

    return {value: void 0, done: true};
  };

/* 
 * This extend function is from the latest underscore, my understanding of mutability and immutability are not great, but I beleive the concept applies here. 
 *
 * this one returns the same object passed as the first argument, 
 * extending it with the 1st index of the arguments keyword, but formatted as comma separated values first, then loops through the names ussing `for in`
 *
 * see ./extend.js, 5 examples in that file all slightly different. 
 *
 * todo : breakdown differences in those extend functions and define clearly how immutability and mutability apply to them.
 *
*/
function extend(obj){
	// the from object, arguments array sliced to comma separated string, first index passed as argument to the forEach

	// loop through enumerable properties of source
	// copy the attributes.. 
	// but the use of void 0 is a tad confusing, i think it short circuits to = and doesn't bother with the '!==' operator.
	
	// I would hav written it like so.
	/*
		for(var prop in props){
			if(props[prop]){
				obj[prop] = props[prop]
			}
		}
		
		return obj;
	*/
	
	// the Emitter object from backbone is extended to the prototypes of all 4 primitive constructs it provides, 
	// and those constructs can support massive systems, so I would really like to know if,why,and how mutability might affect the implementation 
	
	[].slice.call(arguments, 1).forEach(function(source){
      		for (var prop in source) {
	        		if (source[prop] !== void 0) obj[prop] = source[prop];
      		}
	});
	return obj;
}

function createAssigner(keysFunc, defaults) {
  return function (obj) {
    var length = arguments.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
        _keys = keysFunc(source),
        l = _keys.length;
      for (var i = 0; i < l; i++) {
        var key = _keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
}

function create(prototype, props) {
  var result = Object.create(prototype);
  if (props) createAssigner(Object.keys)(result, props);
  return result;
}

function inherits(protoProps, staticProps) {
    var parent = this;
    var child;
    if (protoProps && {}.hasOwnProperty.call(protoProps, "constructor")) {
      child = protoProps.constructor;
    } else {
      child = function () {
        return parent.apply(this, arguments);
      };
    }

    extend(child, parent, staticProps);
    
    child.prototype = create(parent.prototype, protoProps);
    
    
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    
    return child;

  };
