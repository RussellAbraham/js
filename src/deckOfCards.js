
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
	


function test(callback){
	console.log(performance.now());
	_.times(500000, callback);
	console.log(performance.now());
}
