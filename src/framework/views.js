(function (Views) {
	
	Views.Modal = Backbone.View.extend({
		className: "modal",
		events: {
			"keyup .form-control": function (event) {
				event.preventDefault();
				if (event.which === 13) {
					console.log(event.target.value);
					this.close();
				}
			},
			"click .close": function (event) {
				event.preventDefault();
				this.trigger("cancel");
				if (this.options.content && this.options.content.trigger) {
					this.options.content.trigger("cancel", this);
				}
			},
			"click .cancel": function (event) {
				event.preventDefault();
				this.trigger("cancel");
				if (this.options.content && this.options.content.trigger) {
					this.options.content.trigger("cancel", this);
				}
			},
			"click .no": function (event) {
				event.preventDefault();
				this.trigger("ok");
				if (this.options.content && this.options.content.trigger) {
					this.options.content.trigger("ok", this);
				}
				if (this.options.okCloses) {
					this.close();
					console.log(false);
				}
			},
			"click .ok": function (event) {
				event.preventDefault();
				this.trigger("ok");
				if (this.options.content && this.options.content.trigger) {
					this.options.content.trigger("ok", this);
				}
				if (this.options.okCloses) {
					this.close();
					console.log(true);
				}
			},
			keypress: function (event) {
				if (this.options.enterTriggersOk && event.which == 13) {
					event.preventDefault();
					this.trigger("ok");
					if (this.options.content && this.options.content.trigger) {
						this.options.content.trigger("ok", this);
					}
					if (this.options.okCloses) {
						this.close();
					}
				}
			}
		},
		initialize: function (options) {
			this.options = _.extend({
					title: null,
					okText: "Close",
					focusOk: true,
					okCloses: true,
					cancelText: "Cancel",
					showFooter: true,
					allowCancel: true,
					escape: true,
					animate: false,
					template: _.template('<div class="modal-dialog"><div class="modal-content"><% if (title) { %><div class="modal-header"><p><%= title %></p><% if (allowCancel) { %><a class="close">&times;</a><% } %></div><% } %><div class="modal-body"><%= content %></div><% if (showFooter) { %><div class="modal-footer"><% if (allowCancel) { %><% if (cancelText) { %><a href="#" class="btn btn-sm btn-dark cancel"><%= cancelText %></a><% } %><% } %><a href="#" class="btn ok btn-dark btn-sm"><%= okText %></a></div><% } %></div></div>'),
					enterTriggersOk: false
				},
				options
			);
		},
		render: function () {
			var $el = this.$el,
				options = this.options,
				content = options.content;
			$el.html(options.template(options));
			var $content = (this.$content = $el.find(".modal-body"));
			if (content && content.$el) {
				content.render();
				$el.find(".modal-body").html(content.$el);
			}
			if (options.animate) {
				$el.addClass("fade");
			}
			this.isRendered = true;
			return this;
		},
		open: function (cb) {
			if (!this.isRendered) {
				this.render();
			}
			var self = this,
				$el = this.$el;
			$el.modal(
				_.extend({
					keyboard: this.options.allowCancel,
					backdrop: this.options.allowCancel ? true : "static"
				}, this.options.modalOptions)
			);
			$el.one("shown.bs.modal", function () {
				if (self.options.focusOk) {
					$el.find(".btn.ok").focus();
				}
				if (self.options.content && self.options.content.trigger) {
					self.options.content.trigger("shown", self);
				}
				self.trigger("shown");
			});
			var numModals = plugins.Views.Modal.count,
				$backdrop = $(".modal-backdrop:eq(" + numModals + ")"),
				backdropIndex = parseInt($backdrop.css("z-index"), 10),
				elIndex = parseInt($backdrop.css("z-index"), 10);
			$backdrop.css("z-index", backdropIndex + numModals);
			this.$el.css("z-index", elIndex + numModals);
			if (this.options.allowCancel) {
				$backdrop.one("click", function () {
					if (self.options.content && self.options.content.trigger) {
						self.options.content.trigger("cancel", self);
					}
					self.trigger("cancel");
				});
				$(document).one("keyup.dismiss.modal", function (e) {
					e.which == 27 && self.trigger("cancel");
					if (self.options.content && self.options.content.trigger) {
						e.which == 27 && self.options.content.trigger("shown", self);
					}
				});
			}
			this.on("cancel", function () {
				self.close();
			});
			plugins.Views.Modal.count += 1;
			if (cb) {
				self.on("ok", cb);
			}
			return this;
		},
		close: function () {
			var self = this,
				$el = this.$el;
			if (this._preventClose) {
				this._preventClose = false;
				return;
			}
			$el.one("hidden.bs.modal", function onHidden(e) {
				if (e.target !== e.currentTarget) {
					return $el.one("hidden", onHidden);
				}
				self.remove();
				if (self.options.content && self.options.content.trigger) {
					self.options.content.trigger("hidden", self);
				}
				self.trigger("hidden");
			});
			$el.modal("hide");
			plugins.Views.Modal.count -= 1;
		},
		preventClose: function () {
			this._preventClose = true;
		}
	}, {
		count: 0
	});

	return Views;

})(plugins.Views);