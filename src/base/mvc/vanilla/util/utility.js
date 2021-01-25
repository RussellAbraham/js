(function (global) {
	
	var ObjProto = Object.prototype;
	var hasOwn = ObjProto.hasOwnProperty;

	function _(obj) {
		if (obj instanceof _) return obj;
		if (!(this instanceof _)) return new _(obj);
	}

	global._ = _;

	_.has = function (obj, key) {
		return obj != null && hasOwn.call(obj, key);
	};

	_.identity = function (object) {
		return object;
	};

	_.memoize = function (callback, address) {
		const cache = {};
		var key;
		address || (address = _.identity);
		return function () {
			key = address.apply(this, arguments);
			return _.has(cache, key) ?
				cache[key] :
				(cache[key] = callback.apply(this, arguments));
		};
	};

	_.prototype.valueOf = function () {
		return this;
	};

})(this);