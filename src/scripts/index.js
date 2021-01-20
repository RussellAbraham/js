var Application = {};

/* Store */

(function (Application) {

	'use strict';

	var Store = Application.Store = function () {};

	Store.prototype = Object.create(_.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Store,
			writeable: true
		}
	});

	return Application;

})(Application);

/* Model */

(function (Application) {

	'use strict';

	var Model = Application.Model = function (store) {
		var self = this;
		self.store = store;
	};

	Model.prototype = Object.create(_.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Model,
			writeable: true
		}
	});

	return Application;

})(Application);

/* Template */

(function (Application) {

	'use strict';

	var Template = Application.Template = function () {};

	Template.prototype = Object.create(_.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Template,
			writeable: true
		}
	});

	Template.prototype.blockquote = function (html) {
		return '<blockquote>' + html + '</blockquote>';
	};

	Template.prototype.li = function (html) {
		return '<li>' + html + '</li>';
	};

	Template.prototype.p = function (html) {
		return '<p>' + html + '</p>';
	};

	Template.prototype.strong = function (html) {
		return '<strong>' + html + '</strong>';
	};

	Template.prototype.em = function (html) {
		return '<em>' + html + '</em>';
	};

	Template.prototype.code = function (html) {
		return '<code>' + html + '</code>';
	};

	return Application;

})(Application);

/* View */

(function (Application) {

	'use strict';

	var View = Application.View = function (template) {
		var self = this;
		self.template = template;
	}

	View.prototype = Object.create(_.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: View,
			writeable: true
		}
	});

	return Application;

})(Application);

/* Controller */

(function (Application) {

	'use strict';

	var Controller = Application.Controller = function () {};

	Controller.prototype = Object.create(_.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Controller,
			writeable: true
		}
	});

	return Application;

})(Application);

/* Main */

(function (Application) {

	'use strict';

	var Main = Application.Main = function () {};

	Main.prototype = Object.create(_.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Main,
			writeable: true
		}
	});

	return Application;

})(Application);