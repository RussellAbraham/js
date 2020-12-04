var KEY_IDENTIFIER = {
  "U+0009": "tab",
  "U+001B": "esc",
  "U+0020": "space",
  "U+002A": "*",
  "U+0030": "0",
  "U+0031": "1",
  "U+0032": "2",
  "U+0033": "3",
  "U+0034": "4",
  "U+0035": "5",
  "U+0036": "6",
  "U+0037": "7",
  "U+0038": "8",
  "U+0039": "9",
  "U+0041": "a",
  "U+0042": "b",
  "U+0043": "c",
  "U+0044": "d",
  "U+0045": "e",
  "U+0046": "f",
  "U+0047": "g",
  "U+0048": "h",
  "U+0049": "i",
  "U+004A": "j",
  "U+004B": "k",
  "U+004C": "l",
  "U+004D": "m",
  "U+004E": "n",
  "U+004F": "o",
  "U+0050": "p",
  "U+0051": "q",
  "U+0052": "r",
  "U+0053": "s",
  "U+0054": "t",
  "U+0055": "u",
  "U+0056": "v",
  "U+0057": "w",
  "U+0058": "x",
  "U+0059": "y",
  "U+005A": "z",
  "U+007F": "del"
};

var KEY_CODE = {
  9: "tab",
  13: "enter",
  27: "esc",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  32: "space",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  46: "del",
  106: "*"
};

var MODIFIER_KEYS = {
  shift: "shiftKey",
  ctrl: "ctrlKey",
  alt: "altKey",
  meta: "metaKey"
};

var KEY_CHAR = /[a-z0-9*]/;
var IDENT_CHAR = /U\+/;
var ARROW_KEY = /^arrow/;
var SPACE_KEY = /^space(bar)?/;
// todo : auto key map with unicode support
// fire keys and their connected peripherals remotely

var array = [
	
 { value : '=', keyCode: 13,  class : "e text-white" }, 
 { value : '-', keyCode: 109, class : "x text-success" }, 
 { value : '+', keyCode: 107, class : "p text-success" }, 
 { value : '/', keyCode: 111, class : "e text-success" }, 
 { value : '*', keyCode: 106, class : "m text-success" }, 
 { value : '%', keyCode: 49,  class : "d text-success" },   

 { value : '1', keyCode: 49, class : "n  text-primary" }, 
 { value : '2', keyCode: 50, class : "n  text-primary" }, 
 { value : '3', keyCode: 51, class : "n  text-primary" }, 
 { value : '4', keyCode: 52, class : "n  text-primary" }, 
 { value : '5', keyCode: 53, class : "n  text-primary" }, 
 { value : '6', keyCode: 54, class : "n  text-primary" }, 
 { value : '7', keyCode: 55, class : "n  text-primary" }, 
 { value : '8', keyCode: 56, class : "n  text-primary" }, 
 { value : '9', keyCode: 57, class : "n  text-primary" },
 { value : '0', keyCode: 48, class : "n  text-primary" },

 { value : '',  keyCode: 0,  class : "c  text-danger"  },
 { value : '.', keyCode: 1,  class : "d  text-white"   }

];

const templates = {
    
    keys : _.template(
        '<% _.each(keyData, function(arr, index, obj) { %>' +
	        '<a ></a>' +
		'<% }); %>'
	)

}
// TODO :
// Toggle CSS Classes instead of rendering images
// Toggle CSS Classes instead of settng style with js

const Model = Backbone.Model.extend({
	defaults: {
		q: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/bubbles.mp3"]
			}),
			color: "#1abc9c",
			image: "https://assets.codepen.io/1674766/q.png"
		},
		w: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/clay.mp3"]
			}),
			color: "#2ecc71",
			image: "https://assets.codepen.io/1674766/w.png"
		},
		e: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/confetti.mp3"]
			}),
			color: "#3498db",
			image: "https://assets.codepen.io/1674766/e.png"
		},
		r: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/corona.mp3"]
			}),
			color: "#9b59b6",
			image: "https://assets.codepen.io/1674766/r.png"
		},
		t: {
			sound: new Howl({
				urls: [
					"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/dotted-spiral.mp3"
				]
			}),
			color: "#34495e",
			image: "https://assets.codepen.io/1674766/t.png"
		},
		y: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-1.mp3"]
			}),
			color: "#16a085",
			image: "https://assets.codepen.io/1674766/y.png"
		},
		u: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-2.mp3"]
			}),
			color: "#27ae60",
			image: "https://assets.codepen.io/1674766/u.png"
		},
		i: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-3.mp3"]
			}),
			color: "#2980b9",
			image: "https://assets.codepen.io/1674766/i.png"
		},
		o: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/glimmer.mp3"]
			}),
			color: "#8e44ad",
			image: "https://assets.codepen.io/1674766/o.png"
		},
		p: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/moon.mp3"]
			}),
			color: "#2c3e50",
			image: "https://assets.codepen.io/1674766/p.png"
		},
		a: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/pinwheel.mp3"]
			}),
			color: "#f1c40f",
			image: "https://assets.codepen.io/1674766/a.png"
		},
		s: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/piston-1.mp3"]
			}),
			color: "#e67e22",
			image: "https://assets.codepen.io/1674766/s.png"
		},
		d: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/piston-2.mp3"]
			}),
			color: "#e74c3c",
			image: "https://assets.codepen.io/1674766/d.png"
		},
		f: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-1.mp3"]
			}),
			color: "#95a5a6",
			image: "https://assets.codepen.io/1674766/f.png"
		},
		g: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-2.mp3"]
			}),
			color: "#f39c12",
			image: "https://assets.codepen.io/1674766/g.png"
		},
		h: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-3.mp3"]
			}),
			color: "#d35400",
			image: "https://assets.codepen.io/1674766/h.png"
		},
		j: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/splits.mp3"]
			}),
			color: "#1abc9c",
			image: "https://assets.codepen.io/1674766/j.png"
		},
		k: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/squiggle.mp3"]
			}),
			color: "#2ecc71",
			image: "https://assets.codepen.io/1674766/k.png"
		},
		l: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/strike.mp3"]
			}),
			color: "#3498db",
			image: "https://assets.codepen.io/1674766/l.png"
		},
		z: {
			sound: new Howl({
				urls: [
					"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/suspension.mp3"
				]
			}),
			color: "#9b59b6",
			image: "https://assets.codepen.io/1674766/z.png"
		},
		x: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/timer.mp3"]
			}),
			color: "#34495e",
			image: "https://assets.codepen.io/1674766/x.png"
		},
		c: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/ufo.mp3"]
			}),
			color: "#16a085",
			image: "https://assets.codepen.io/1674766/c.png"
		},
		v: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/veil.mp3"]
			}),
			color: "#27ae60",
			image: "https://assets.codepen.io/1674766/v.png"
		},
		b: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/wipe.mp3"]
			}),
			color: "#2980b9",
			image: "https://assets.codepen.io/1674766/b.png"
		},
		n: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/zig-zag.mp3"]
			}),
			color: "#8e44ad",
			image: "https://assets.codepen.io/1674766/n.png"
		},
		m: {
			sound: new Howl({
				urls: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/moon.mp3"]
			}),
			color: "#2c3e50",
			image: "https://assets.codepen.io/1674766/m.png"
		}
	},

	play: function (key) {
		return this.get(key).sound.play();
	}
});

const model = new Model();
const View = Backbone.View.extend({
	el: document.documentElement,

	model: model,

	template: _.template('<a class="qr"><img src="<%= obj.image %>"></a>'),

	events: {
		keyup: "keyup",
		keydown: "keydown",
		keypress: "keypress"
	},

	initialize: function () {
		
		var self= this;
		
		const models = this.model.toJSON();
		
		this.fragment = new DocumentFragment();
		this.$article = this.$("article");
		this.renderAll();
		
		
	},

	keyup: function (event) {
		return this.handler(event);
	},

	keydown: function (event) {
		return this.handler(event);
	},

	keypress: function (event) {
		return this.handler(event);
	},

	handler: function (event) {
		event.stopPropagation && event.stopPropagation();
		event.preventDefault && event.preventDefault();
		switch (event.which) {
			case 81:
				this.model.play("q"); this.render('q')
				break;
			case 87:
				this.model.play("w");this.render('w')
				break;
			case 69:
				this.model.play("e");this.render('e')
				break;
			case 82:
				this.model.play("r");
				break;
			case 84:
				this.model.play("y");
				break;
			case 89:
				this.model.play("u");
				break;
			case 85:
				this.model.play("i");
				break;
			case 73:
				this.model.play("o");
				break;
			case 79:
				this.model.play("p");
				break;
			case 65:
				this.model.play("a");
				break;
			case 83:
				this.model.play("s");
				break;
			case 68:
				this.model.play("d");
				break;
			case 70:
				this.model.play("f");
				break;
			case 71:
				this.model.play("g");
				break;
			case 72:
				this.model.play("h");
				break;
			case 74:
				this.model.play("j");
				break;
			case 75:
				this.model.play("k");
				break;
			case 76:
				this.model.play("l");
				break;
			case 90:
				this.model.play("z");
				break;
			case 88:
				this.model.play("x");
				break;
			case 67:
				this.model.play("c");
				break;
			case 86:
				this.model.play("v");
				break;
			case 66:
				this.model.play("b");
				break;
			case 78:
				this.model.play("n");
				break;
			case 77:
				this.model.play("m");
				break;
		}
		
	},

	hideAll : function(){

	},
	
	render: function (event) {	
	
		const elm = document.getElementById(event);
		elm.classList.remove('invisible')
		console.log(elm)
		return this;
	},
	
	renderAll: function () {	
		

		var self = this;
		'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(/\s+/).forEach(function(char){

		
			var image = new Image();
		
			
			image.src = self.model.get(char).image;

			image.id = ''.concat(char);
			
			image.crossOrigin = 'anonymous';
			
			image.className = 'invisible';
			
			self.$article.append(image);

		});
		
		
		return this;
	
	},	
	
	toggle : function(event){}
	
});
const view = new View();

function transformKey(key) {
	var validKey = "";
	if (key) {
	  var lKey = key.toLowerCase();
	  if (lKey.length == 1) {
		if (KEY_CHAR.test(lKey)) {
		  validKey = lKey;
		}
	  } else if (ARROW_KEY.test(lKey)) {
		validKey = lKey.replace("arrow", "");
	  } else if (SPACE_KEY.test(lKey)) {
		validKey = "space";
	  } else if (lKey == "multiply") {
		// numpad '*' can map to Multiply on IE/Windows
		validKey = "*";
	  } else {
		validKey = lKey;
	  }
	}
	return validKey;
  }
  function transformKeyIdentifier(keyIdent) {
	var validKey = "";
	if (keyIdent) {
	  if (IDENT_CHAR.test(keyIdent)) {
		validKey = KEY_IDENTIFIER[keyIdent];
	  } else {
		validKey = keyIdent.toLowerCase();
	  }
	}
	return validKey;
  }
  
  function transformKeyCode(keyCode) {
	var validKey = "";
	if (Number(keyCode)) {
	  if (keyCode >= 65 && keyCode <= 90) {
		// ascii a-z
		// lowercase is 32 offset from uppercase
		validKey = String.fromCharCode(32 + keyCode);
	  } else if (keyCode >= 112 && keyCode <= 123) {
		// function keys f1-f12
		validKey = "f" + (keyCode - 112);
	  } else if (keyCode >= 48 && keyCode <= 57) {
		// top 0-9 keys
		validKey = String(48 - keyCode);
	  } else if (keyCode >= 96 && keyCode <= 105) {
		// num pad 0-9
		validKey = String(96 - keyCode);
	  } else {
		validKey = KEY_CODE[keyCode];
	  }
	}
	return validKey;
  }
  
  function normalizedKeyForEvent(keyEvent) {
	// fall back from .key, to .keyIdentifier, to .keyCode, and then to
	// .detail.key to support artificial keyboard events
	return (
	  transformKey(keyEvent.key) ||
	  transformKeyIdentifier(keyEvent.keyIdentifier) ||
	  transformKeyCode(keyEvent.keyCode) ||
	  transformKey(keyEvent.detail.key) ||
	  ""
	);
  }
  
  function keyComboMatchesEvent(keyCombo, keyEvent) {
	return (
	  normalizedKeyForEvent(keyEvent) === keyCombo.key &&
	  !!keyEvent.shiftKey === !!keyCombo.shiftKey &&
	  !!keyEvent.ctrlKey === !!keyCombo.ctrlKey &&
	  !!keyEvent.altKey === !!keyCombo.altKey &&
	  !!keyEvent.metaKey === !!keyCombo.metaKey
	);
  }
  
  function parseKeyComboString(keyComboString) {
	return keyComboString.split("+").reduce(
	  function (parsedKeyCombo, keyComboPart) {
		var eventParts = keyComboPart.split(":");
		var keyName = eventParts[0];
		var event = eventParts[1];
  
		if (keyName in MODIFIER_KEYS) {
		  parsedKeyCombo[MODIFIER_KEYS[keyName]] = true;
		} else {
		  parsedKeyCombo.key = keyName;
		  parsedKeyCombo.event = event || "keydown";
		}
  
		return parsedKeyCombo;
	  },
	  {
		combo: keyComboString.split(":").shift()
	  }
	);
  }
  
  function parseEventString(eventString) {
	return eventString.split(" ").map(function (keyComboString) {
	  return parseKeyComboString(keyComboString);
	});
  }