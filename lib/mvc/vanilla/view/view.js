(function (Application) {

	'use strict';

	var View = Application.View = function (template) {
		this.template = template;
		this.$header = $.qs('header');
		this.$footer = $.qs('footer');
	}

	View.prototype = Object.create(_.prototype, {
		constructor : {
			configurable : true,
			enumerable : true,
			value : View,
			writeable : true
		}
	});
	
	View.prototype.render = function () {};

	View.prototype.bind = function () {};

	return Application;

})(Application);