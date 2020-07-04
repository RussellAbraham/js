(function (window) {
	'use strict';

	function Model(storage) {
		this.storage = storage;
	}

	window.app = window.app || {};
    window.app.Model = Model;
    
})(window);
