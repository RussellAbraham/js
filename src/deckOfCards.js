/* *** optimizCallback() *** */
var optimizCallback = function (func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1: return function (value) { return func.call(context, value); };
    case 2: return function (value, other) { return func.call(context, value, other); };
    case 3: return function (value, index, collection) { return func.call(context, value, index, collection); };
    case 4: return function (accumulator, value, index, collection) { return func.call(context, accumulator, value, index, collection); };
  }
  return function () {
    return func.apply(context, arguments);
  };
};
/* *** times() *** */
function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = optimizCallback(iteratee, context, 1);
  for (var i = 0; i < n; i++) accum[i] = iteratee(i);
  return accum;
};

const suits = ['hearts', 'clubs', 'diamonds', 'spades'];
const values = '2 3 4 5 6 7 8 9 10 J Q K A'.split(' ');
	
const limit = values.length * suits.length;
	
function offs(){
	const deck = [];
	for (let value of values) {
		for (let suit of suits) {
			deck.push({value:value,suit:suit})
		}
	}
	return deck;
}

function mins(){
	const deck = [];
	let i;
	for (i = limit - 1; i >= 0; i--) {
		let inst = values[Math.floor(i / suits.length)];
		let g = suits[Math.floor(i % suits.length)];
		deck.push({'suit':g,'value':inst})
	}	
	return deck;
}
function testmin(){
	let a = performance.now();
	_.times(10000, mins);
	let b = performance.now();
	console.log(b - a);
}

testmin = _.memoize(testmin);

function testof(){
	let a = performance.now();
	_.times(10000, offs);
	let b = performance.now();
	console.log(b - a);
}

testof = _.memoize(testof);

function test(cb){
	_.times(1000, cb);
}
