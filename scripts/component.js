
// support for touch events
var msPointerSupported = window.navigator.msPointerEnabled;
var touch = {
  'start': msPointerSupported ? 'MSPointerDown' : 'touchstart',
  'move': msPointerSupported ? 'MSPointerMove' : 'touchmove',
  'end': msPointerSupported ? 'MSPointerUp' : 'touchend'
};

var doc = window.document;
var html = doc.documentElement;

// prefix support
var prefix = (function prefix() {
  var regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;
  var styleDeclaration = doc.getElementsByTagName('script')[0].style;
  for (var prop in styleDeclaration) {
    if (regex.test(prop)) {
      return '-' + prop.match(regex)[0].toLowerCase() + '-';
    }
  }
  if ('WebkitOpacity' in styleDeclaration) { return '-webkit-'; }
  if ('KhtmlOpacity' in styleDeclaration) { return '-khtml-'; }
  return '';
}());


function Component(options) {
    options = options || {};
    
    this._start = 0;
    this._current = 0;
    this._opened = false;
    
    this.main = options.main;
    this.aside = options.aside;
  
    this._touch = options.touch === undefined ? true : options.touch && true;
    this._side = options.side || ''; /* string requires value */
  
    this._duration = parseInt(options.duration, 10) || 300;
  
    if (!this.main.classList.contains('component-main')){
      this.main.classList.add('component-main');
    }
    if (!this.main.classList.contains('component-main-' + this._side)){
      this.panel.classList.add('component-main-' + this._side);
    }
    if (!this.aside.classList.contains('component-aside')){
      this.aside.classList.add('component-aside');
    }
    if (!this.aside.classList.contains('component-aside-' + this._side)){
      this.aside.classList.add('component-aside-' + this._side);
    }
  
}

Component.prototype = {

    open : function(){    
      var self = this;
      if (!html.classList.contains('component-open')) { html.classList.add('component-open'); }
      this._opened = true;
      setTimeout(function() {
        self.main.style.transition = self.main.style['-webkit-transition'] = '';
        /*  */
      }, this._duration + 50);
      return this;
    },

    close : function(){
      var self = this;
      if (!this.isOpen() && !this._opening) { return this; }
      this._opened = false;
      setTimeout(function() {
        html.classList.remove('component-open');
        self.main.style.transition = self.main.style['-webkit-transition'] = self.main.style[prefix + 'transform'] = self.main.style.transform = '';
        /*  */
      }, this._duration + 50);
      return this;
    },

    toggle : function(){
        return this.isOpen() ? this.close() : this.open();
    },

    isOpen : function(){
        return this._opened;
    }

}

/*
var x = new Component();
x._opened; // false;
x.toggle();
x._opened; // true;
*/
