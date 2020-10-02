

const suits = ['hearts', 'clubs', 'diamonds', 'spades'];
const values = '2 3 4 5 6 7 8 9 10 J Q K A'.split(' ');

const limit = values.length * suits.length;

function printGroups(){
	var i;
	for (i = limit - 1; i >= 0; i--) {
	  var inst = values[Math.floor(i / suits.length)];
	  var g = suits[Math.floor(i % suits.length)];
	  console.log("".concat(inst, ":").concat(g));
	}	
}

function build() {
	const suits = ["hearts", "clubs", "diamonds", "spades"];
	const values = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");
	const limit = values.length * suits.length;
	const output = [];

	var i;

	for (i = limit - 1; i >= 0; i--) {
		var inst = values[Math.floor(i / suits.length)];
		var g = suits[Math.floor(i % suits.length)];
		output.push(inst + ":" + g);
	}
	return {
		output: output
	};
}
