(function($, _, Backbone) {

	localforage.setDriver(localforage.INDEXEDDB);
  
  var template = _.template('\
    <div class="modal-dialog"><div class="modal-content">\
    <% if (title) { %>\
      <div class="modal-header">\
				<h4><%-title%></h4>\
        <% if (allowCancel) { %>\
          <a class="close">&times;</a>\
        <% } %>\
      </div>\
    <% } %>\
    <div class="modal-body"><%-content%></div>\
    <% if (showFooter) { %>\
      <div class="modal-footer">\
        <% if (allowCancel) { %>\
          <% if (cancelText) { %>\
            <a href="#" class="btn cancel"><%-cancelText%></a>\
          <% } %>\
        <% } %>\
        <a href="#" class="btn ok btn-primary"><%-okText%></a>\
      </div>\
    <% } %>\
    </div></div>\
  ');


  var Modal = Backbone.View.extend({

    className: 'modal',

    events: {
      'click .close': function(event) {
        event.preventDefault();

        this.trigger('cancel');

        if (this.options.content && this.options.content.trigger) {
          this.options.content.trigger('cancel', this);
        }
      },
      'click .cancel': function(event) {
        event.preventDefault();

        this.trigger('cancel');

        if (this.options.content && this.options.content.trigger) {
          this.options.content.trigger('cancel', this);
        }
      },
      'click .ok': function(event) {
        event.preventDefault();

        this.trigger('ok');

        if (this.options.content && this.options.content.trigger) {
          this.options.content.trigger('ok', this);
        }

        if (this.options.okCloses) {
          this.close();
        }
      },
      'keypress': function(event) {
        if (this.options.enterTriggersOk && event.which == 13) {
          event.preventDefault();

          this.trigger('ok');

          if (this.options.content && this.options.content.trigger) {
            this.options.content.trigger('ok', this);
          }

          if (this.options.okCloses) {
            this.close();
          }
        }
      }
    },

    /*
     * @param {Object} options
     * @param {String|View} [options.content]     Modal content. Default: none
     * @param {String} [options.title]            Title. Default: none
     * @param {String} [options.okText]           Text for the OK button. Default: 'OK'
     * @param {String} [options.cancelText]       Text for the cancel button. Default: 'Cancel'. If passed a falsey value, the button will be removed
     * @param {Boolean} [options.allowCancel      Whether the modal can be closed, other than by pressing OK. Default: true
     * @param {Boolean} [options.escape]          Whether the 'esc' key can dismiss the modal. Default: true, but false if options.cancellable is true
     * @param {Boolean} [options.animate]         Whether to animate in/out. Default: false
     * @param {Function} [options.template]       Compiled underscore template to override the default one
     * @param {Boolean} [options.enterTriggersOk] Whether the 'enter' key will trigger OK. Default: false
     */
    initialize: function(options) {
      this.options = _.extend({
        title: null,
        okText: 'Close',
        focusOk: true,
        okCloses: true,
        cancelText: 'Cancel',
        showFooter: true,
        allowCancel: true,
        escape: true,
        animate: false,
        template: template,
        enterTriggersOk: false
      }, options);
    },

    render: function() {
      var $el = this.$el,
          options = this.options,
          content = options.content;

      //Create the modal container
      $el.html(options.template(options));

      var $content = this.$content = $el.find('.modal-body')

      //Insert the main content if it's a view
      if (content && content.$el) {
        content.render();
        $el.find('.modal-body').html(content.$el);
      }

      if (options.animate) $el.addClass('fade');

      this.isRendered = true;

      return this;
    },

    /**
     * Renders and shows the modal
     *
     * @param {Function} [cb]     Optional callback that runs only when OK is pressed.
     */
    open: function(cb) {
      if (!this.isRendered) this.render();

      var self = this,
          $el = this.$el;

      //Create it
      $el.modal(_.extend({
        keyboard: this.options.allowCancel,
        backdrop: this.options.allowCancel ? true : 'static'
      }, this.options.modalOptions));

      //Focus OK button
      $el.one('shown.bs.modal', function() {
        if (self.options.focusOk) {
          $el.find('.btn.ok').focus();
        }

        if (self.options.content && self.options.content.trigger) {
          self.options.content.trigger('shown', self);
        }

        self.trigger('shown');
      });

      //Adjust the modal and backdrop z-index; for dealing with multiple modals
      var numModals = Modal.count,
          $backdrop = $('.modal-backdrop:eq('+numModals+')'),
          backdropIndex = parseInt($backdrop.css('z-index'),10),
          elIndex = parseInt($backdrop.css('z-index'), 10);

      $backdrop.css('z-index', backdropIndex + numModals);
      this.$el.css('z-index', elIndex + numModals);

      if (this.options.allowCancel) {
        $backdrop.one('click', function() {
          if (self.options.content && self.options.content.trigger) {
            self.options.content.trigger('cancel', self);
          }

          self.trigger('cancel');
        });

        $(document).one('keyup.dismiss.modal', function (e) {
          e.which == 27 && self.trigger('cancel');

          if (self.options.content && self.options.content.trigger) {
            e.which == 27 && self.options.content.trigger('shown', self);
          }
        });
      }

      this.on('cancel', function() {
        self.close();
      });

      Modal.count++;

      //Run callback on OK if provided
      if (cb) {
        self.on('ok', cb);
      }

      return this;
    },

    /**
     * Closes the modal
     */
    close: function() {
      var self = this,
          $el = this.$el;

      //Check if the modal should stay open
      if (this._preventClose) {
        this._preventClose = false;
        return;
      }

      $el.one('hidden.bs.modal', function onHidden(e) {
        // Ignore events propagated from interior objects, like bootstrap tooltips
        if(e.target !== e.currentTarget){
          return $el.one('hidden', onHidden);
        }
        self.remove();

        if (self.options.content && self.options.content.trigger) {
          self.options.content.trigger('hidden', self);
        }

        self.trigger('hidden');
      });

      $el.modal('hide');

      Modal.count--;
    },

    /**
     * Stop the modal from closing.
     * Can be called from within a 'close' or 'ok' event listener.
     */
    preventClose: function() {
      this._preventClose = true;
    }
  }, {
    //STATICS

    //The number of modals on display
    count: 0
  });

  if (typeof require == 'function' && typeof module !== 'undefined' && exports) {
    module.exports = Modal;
  }
  if (typeof define === 'function' && define.amd) {
    return define(function() {
      Backbone.BootstrapModal = Modal;
    })
  }
  else {
    Backbone.BootstrapModal = Modal;
  }

})(jQuery, _, Backbone);


(function () {
	
  
	function GlobalBackboneModal(keys) {
  
		this.keys = keys;
    
	}
  
	GlobalBackboneModal.prototype = {
  
		keys: function (key) {
    
			return this.keys[key]
      
		}
    
	}
	
	var array = [],
			object = {}
	
	var fragment = new DocumentFragment();
	
  
	const BackboneModal = new GlobalBackboneModal(object);
  
	function Controller() {
  
		this.test('alert');
    
	}

	Controller.prototype = {
			test : function(string){
				var self = this;
				BackboneModal.keys.alert = self.alert;
				BackboneModal.keys.confirm = self.confirm;
				BackboneModal.keys.prompt = self.prompt;
				BackboneModal.keys.scroll = self.scroll;
				BackboneModal.keys.tab = self.tab;
				console.log(self);
			},
			alert : function(string, callback){
				var self = this;
				var parsed = string.split(':');
				var ModalContent = Backbone.View.extend({	
					render: function() {
						this.$el.html(string);
						return this;
					}
				});				
				var modal = new Backbone.BootstrapModal({
					title : 'test',
          animate: true,
					allowCancel:false,
          content: new ModalContent()
        }).open();
				callback;
			},
			confirm : function(string, callback){
				var self = this;
				console.log(atob(string));
				callback;
			},
			prompt : function(string, callback){
				var self = this;
				console.log(atob(string));
				callback;
			}
    }
    if (typeof window !== 'undefined') {
        window.BackboneModal = BackboneModal;
        window.Controller = Controller;
    }
})();
// everything below is basically a redefinition so I can stack modals, perhaps a Proxy would be better.. Dispatch.. ?
var dispatch = {};

_.extend(dispatch, Backbone.Events);

var BootstrappedModal = new Controller();

var 
	BackboneModalAlert = BootstrappedModal.alert,
 	BackboneModalConfirm = BootstrappedModal.confirm,
 	BackboneModalPrompt = BootstrappedModal.prompt,
 	BackboneModalScroll = BootstrappedModal.scroll,
 	BackboneModalTab = BootstrappedModal.tab;



// converts `arguments` of a function to a real array 
function arrayArguments(args){
	var arr = new Array();
	for(var i = 0;i < args.length;++i){
		arr[i] = args[i]
	}
	return arr;
}

// 
function theCallback(xs){
	var i, len = xs.length;
	var string = arrayArguments(arguments);
	var split = xs.split(':');
	console.log(split);
}

//BackboneModalAlert(atob(base64AlertTemplate), theCallback('modal:alert'));

// BackboneModalConfirm(x, cb('modal:confirm'));


var dispatch = {};
_.extend(dispatch, Backbone.Events);

dispatch.on('modal:show', Handler);

function Handler(callback){
	console.log(callback);
	switch(callback){
		case '#ModalAlert':
			BackboneModalAlert('<h1>Hello World</h1>', theCallback('modal:alert'));			
			break;
		case '#ModalConfirm':
			BackboneModalConfirm(atob(base64AlertTemplate), theCallback('modal:confirm'));			
			break;			
	}
	//BackboneModalAlert(atob(base64AlertTemplate), theCallback('modal:alert'));
}

function listen(ele, evs){
	for(var ev in evs){
		ele.addEventListener(ev, evs[ev])
	}
}

document.querySelectorAll('.btn').forEach(function(btn){
	var data = btn.dataset;
	btn.addEventListener('click', function(){
		dispatch.trigger('modal:show', data.target);
	})
})

