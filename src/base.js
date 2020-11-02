
  (function (global, modules) {
  	var idCounter = 0;

  	function uniqueId(prefix) {
  		var id = idCounter++;
  		return prefix ? prefix + id : id;
  	};

  	function Ctor() {};

  	function has(obj, key) {
  		return obj != null && {}.hasOwnProperty.call(obj, key);
  	};

  	function isObject(obj) {
  		var type = typeof obj;
  		return type === 'function' || type === 'object' && !!obj;
  	};

  	function createAssigner(keysFunc, undefinedOnly) {
  		return function (obj) {
  			var length = arguments.length,
  				index, i;
  			if (length < 2 || obj == null) return obj;
  			for (index = 1; index < length; index++) {
  				var source = arguments[index],
  					keys = keysFunc(source),
  					l = keys.length;
  				for (i = 0; i < l; i++) {
  					var key = keys[i];
  					if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
  				}
  			}
  			return obj;
  		};
  	};

  	const extendOwn = createAssigner(Object.keys);

  	function extend(obj) {
  		[].slice.call(arguments, 1).forEach(function (source) {
  			for (var prop in source) {
  				if (source[prop] !== void 0) obj[prop] = source[prop];
  			}
  		});
  		return obj;
  	};

  	function baseCreate(prototype) {
  		if (!isObject(prototype)) return {};
  		if (Object.create) return Object.create(prototype);
  		Ctor.prototype = prototype;
  		var result = new Ctor;
  		Ctor.prototype = null;
  		return result;
  	}

  	function create(prototype, props) {
  		var result = baseCreate(prototype);
  		if (props) extendOwn(result, props);
  		return result;
  	}

  	function inherits(protoProps, staticProps) {
  		var parent = this;
  		var child;
  		if (protoProps && has(protoProps, 'constructor')) {
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

  	function GlobalModel() {
  		this.cid = uniqueId(this.cidPrefix);
  		this.initialize.apply(this, arguments);
  	}

  	extend(GlobalModel.prototype, {
  		initialize: function () {},
  		idAttribute: 'id',
  		cidPrefix: 'c'
  	});

  	GlobalModel.extend = inherits;

  	modules['exports'] = function () {
  		return {
  			Model: GlobalModel
  		}
  	}

  	if (typeof global !== 'undefined') {
  		global.Base = modules.exports();
  	}

  })(this, {});
