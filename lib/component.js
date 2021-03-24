function extend(obj, props) {
    for (var prop in props) {
        if (props[prop]) {
            obj[prop] = props[prop];
        }
    }
    return obj;
};

function inherits(child, parent) {
    child.prototype = extend(child.prototype || {}, parent.prototype);
};

var Events = (function(){
    
    function Events(){
        if (!(this instanceof Events)) {
            throw new TypeError("not a function");
        }
    };

    Events.prototype.on = function(event, listener){
        this.events = this.events || {};
        this.events[event] = this.events[event] || [];
        this.events[event].push(listener);
        return this;
    };
    
    Events.prototype.once = function(event){
        var self = this;
        function func() {
            self.off(event, func);    
            listener.apply(this, arguments);
        }
        func.listener = listener;
        this.on(event, func);
        return this;        
    };

    Events.prototype.off = function(event, listener){
        var listeners = undefined;
        if(!this.events || !(listeners = this.events[event])){
            return this;
        }
        listeners.forEach(function(func, index){
            if(func === listener || func.listener === listener){
                listeners.splice(index, 1);
            }
        });
        if(listeners.length === 0){
            delete this.events[event];
        }
        return this;
    };

    Events.prototype.emit = function(event){
        var self = this, length = arguments.length;
        for(length, args = Array(length > 1 ? length - 1 : 0), key = 1;key < length;key += 1){
            args[key - 1] = arguments[key];
        }
        var listeners = undefined;
        if(!this.events || !(listeners = this.events[event])){
            return this;
        }
        listeners.forEach(function(func){
            return func.apply(self, args);
        })
    };

    return Events;

})();

function Component() {
    this.active = false;
};

inherits(Component, Events);

Component.prototype.on('beforeopen', function(){
    console.log(0);
});

Component.prototype.on('beforeclose', function(){
    console.log(0);
});

Component.prototype.on('afterclose', function(){
    console.log(1);
});

Component.prototype.on('afteropen', function(){
    console.log(1);
});

Component.prototype.start = function(){
    this.emit('beforeopen');
    this.active = true;
    this.emit('afteropen');
    return this;
};

Component.prototype.stop = function(){
    this.emit('beforeclose');
    this.active = false;
    this.emit('afterclose');
    return this;
};

Component.prototype.isActive = function(){
    return this.active;
};

Component.prototype.toggle = function(){
    return this.isActive() ? this.stope() : this.start();
};

	
function History() {
    this.handlers = [];
    this.checkUrl = this.checkUrl.bind(this);
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  var routeStripper = /^[#\/]|\s+$/g;
  var rootStripper = /^\/+|\/+$/g;
  var pathStripper = /#.*$/;

  History.started = false;

History.prototype = {
    interval: 50,
    atRoot : function() {
      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.getSearch();
    },
    matchRoot: function() {
      var path = this.decodeFragment(this.location.pathname);
      var rootPath = path.slice(0, this.root.length - 1) + '/';
      return rootPath === this.root;
    },
    decodeFragment: function(fragment) {
      return decodeURI(fragment.replace(/%25/g, '%2525'));
    },
    getSearch: function() {
      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
    },
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },
    getPath: function() {
      var path = this.decodeFragment(
        this.location.pathname + this.getSearch()
      ).slice(this.root.length - 1);
      return path.charAt(0) === '/' ? path.slice(1) : path;
    },
    getFragment: function(fragment) {
      if (fragment == null) {
        if (this._usePushState || !this._wantsHashChange) {
          fragment = this.getPath();
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },
    start: function(options) {
      if (History.started) throw new Error('Backbone.history has already been started');
      History.started = true;
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.history && this.history.pushState);
      this._usePushState    = this._wantsPushState && this._hasPushState;
      this.fragment         = this.getFragment();
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');
      if (this._wantsHashChange && this._wantsPushState) {
        if (!this._hasPushState && !this.atRoot()) {
          var rootPath = this.root.slice(0, -1) || '/';
          this.location.replace(rootPath + '#' + this.getPath());
          return true;
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {replace: true});
        }
      }
      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'javascript:0';
        this.iframe.style.display = 'none';
        this.iframe.tabIndex = -1;
        var body = document.body;
        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
        iWindow.document.open();
        iWindow.document.close();
        iWindow.location.hash = '#' + this.fragment;
      }
      var addEventListener = window.addEventListener || function(eventName, listener) {
        return attachEvent('on' + eventName, listener);
      };
      if (this._usePushState) {
        addEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        addEventListener('hashchange', this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }
      if (!this.options.silent) return this.loadUrl();
    },
    stop: function() {
      var removeEventListener = window.removeEventListener || function(eventName, listener) {
        return detachEvent('on' + eventName, listener);
      };
      if (this._usePushState) {
        removeEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        removeEventListener('hashchange', this.checkUrl, false);
      }
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getHash(this.iframe.contentWindow);
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },
    loadUrl: function(fragment) {
      if (!this.matchRoot()) return false;
      fragment = this.fragment = this.getFragment(fragment);
      return _.some(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};
      fragment = this.getFragment(fragment || '');
      var rootPath = this.root;
      if (fragment === '' || fragment.charAt(0) === '?') {
        rootPath = rootPath.slice(0, -1) || '/';
      }
      var url = rootPath + fragment;
      fragment = fragment.replace(pathStripper, '');
      var decodedFragment = this.decodeFragment(fragment);
      if (this.fragment === decodedFragment) return;
      this.fragment = decodedFragment;
      if (this._usePushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
          var iWindow = this.iframe.contentWindow;
          if (!options.replace) {
            iWindow.document.open();
            iWindow.document.close();
          }
          this._updateHash(iWindow.location, fragment, options.replace);
        }
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        location.hash = '#' + fragment;
      }
    }
  });

  Backbone.history = new History;