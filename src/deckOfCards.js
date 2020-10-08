
const suits = ["hearts", "clubs", "diamonds", "spades"];

const values = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");

const limit = values.length * suits.length;


/* operation test using for length minus */
const decks = [];

function buildDeck() {
	
	let i, 			
	    deck = [],	
	    slen = suits.length;
	
	for (i = limit - 1; i >= 0; i--) {		
		let value = values[Math.floor(i / slen)];		
		let suit = suits[Math.floor(i % slen)];		
		deck.push({ 
			suit : suit, 	
			value : value 
		});		
	}
	
	return decks.push(
		JSON.stringify(deck)
	);
	
}


// Factory Optimized

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

function has(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
}

function identity(object){
  return object;
}

function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = optimizCallback(iteratee, context, 1);
  for (var i = 0; i < n; i++) accum[i] = iteratee(i);
  return accum;
};

function memoize(callback, address){
  var cache = {}, key;
  address || (address = identity);
  return function(){
    key = address.apply(this, arguments);
    return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
  }
}

mins = memoize(mins);

function buildDecks(num){
	times(num, mins);
}
