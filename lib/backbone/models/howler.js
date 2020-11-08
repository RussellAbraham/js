const HowlerBoardModel = Backbone.Model.extend({
    defaults: {
        q: null,
        w: null,
        e: null,
        r: null,
        t: null,
        y: null,
        u: null,
        i: null,
        o: null,
        p: null,
        a: null,
        s: null,
        d: null,
        f: null,
        g: null,
        h: null,
        j: null,
        k: null,
        l: null,
        z: null,
        x: null,
        c: null,
        v: null,
        b: null,
        n: null,
        m: null
    },
    play: function (key) {
        this.get(key).sound.play();
    }
});

const howls = new HowlerBoardModel({
	q: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/bubbles.mp3'] }), color: '#1abc9c' },
	w: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/clay.mp3'] }), color: '#2ecc71' },
	e: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/confetti.mp3'] }), color: '#3498db' },
	r: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/corona.mp3'] }), color: '#9b59b6' },
	t: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/dotted-spiral.mp3'] }), color: '#34495e' },
	y: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-1.mp3'] }), color: '#16a085' },
	u: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-2.mp3'] }), color: '#27ae60' },
	i: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-3.mp3'] }), color: '#2980b9' },
	o: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/glimmer.mp3'] }), color: '#8e44ad' },
	p: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/moon.mp3'] }), color: '#2c3e50' },
	a: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/pinwheel.mp3'] }), color: '#f1c40f' },
	s: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/piston-1.mp3'] }), color: '#e67e22' },
	d: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/piston-2.mp3'] }), color: '#e74c3c' },
	f: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-1.mp3'] }), color: '#95a5a6' },
	g: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-2.mp3'] }), color: '#f39c12' },
	h: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-3.mp3'] }), color: '#d35400' },
	j: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/splits.mp3'] }), color: '#1abc9c' },
	k: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/squiggle.mp3'] }), color: '#2ecc71' },
	l: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/strike.mp3'] }), color: '#3498db' },
	z: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/suspension.mp3'] }), color: '#9b59b6' },
	x: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/timer.mp3'] }), color: '#34495e' },
	c: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/ufo.mp3'] }), color: '#16a085' },
	v: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/veil.mp3'] }), color: '#27ae60' },
	b: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/wipe.mp3'] }), color: '#2980b9' },
	n: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/zig-zag.mp3'] }), color: '#8e44ad' },
	m: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/moon.mp3'] }), color: '#2c3e50' }	
});

howls.play('q');

howls.play('w');

howls.play('e');

howls.play('r');

howls.play('t');

howls.play('y');

// 

/* Testing a debounce with sound board

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function xd(callback){
	return function(param){
		callback(param);
	}
}

function xf(){
	return xd(console.log)(1);
}

// immediate null, after 
var debounced1 = _.debounce(function(){
	console.log('ive been debounced, and after undefined');
}, 0);

function triggerDebounced1(){
	_.times(10, debounced1);
}

// immediate true, before
var debounced2 = _.debounce(function(){
	console.log('ive been debounced, and before undefined');
}, 0, true);
function triggerDebounced2(){
	_.times(10, debounced2);
}

			q: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/bubbles.mp3'] }), color: '#1abc9c' },
			w: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/clay.mp3'] }), color: '#2ecc71' },
			e: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/confetti.mp3'] }), color: '#3498db' },
			r: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/corona.mp3'] }), color: '#9b59b6' },
			t: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/dotted-spiral.mp3'] }), color: '#34495e' },
			y: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-1.mp3'] }), color: '#16a085' },
			u: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-2.mp3'] }), color: '#27ae60' },
			i: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/flash-3.mp3'] }), color: '#2980b9' },
			o: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/glimmer.mp3'] }), color: '#8e44ad' },
			p: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/moon.mp3'] }), color: '#2c3e50' },
			a: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/pinwheel.mp3'] }), color: '#f1c40f' },
			s: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/piston-1.mp3'] }), color: '#e67e22' },
			d: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/piston-2.mp3'] }), color: '#e74c3c' },
			f: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-1.mp3'] }), color: '#95a5a6' },
			g: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-2.mp3'] }), color: '#f39c12' },
			h: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/prism-3.mp3'] }), color: '#d35400' },
			j: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/splits.mp3'] }), color: '#1abc9c' },
			k: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/squiggle.mp3'] }), color: '#2ecc71' },
			l: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/strike.mp3'] }), color: '#3498db' },
			z: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/suspension.mp3'] }), color: '#9b59b6' },
			x: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/timer.mp3'] }), color: '#34495e' },
			c: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/ufo.mp3'] }), color: '#16a085' },
			v: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/veil.mp3'] }), color: '#27ae60' },
			b: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/wipe.mp3'] }), color: '#2980b9' },
			n: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/zig-zag.mp3'] }), color: '#8e44ad' },
			m: { sound: new Howl({ urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/moon.mp3'] }), color: '#2c3e50' }	
*/