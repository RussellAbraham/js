
// support for touch events
var msPointerSupported = window.navigator.msPointerEnabled;
var touch = {
  'start': msPointerSupported ? 'MSPointerDown' : 'touchstart',
  'move': msPointerSupported ? 'MSPointerMove' : 'touchmove',
  'end': msPointerSupported ? 'MSPointerUp' : 'touchend'
};
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
    
    
    
}

Component.prototype = {

    open : function(){
        var self = this;
        this._opened = true;
    },

    close : function(){
        var self = this;
        this._opened = false;
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

