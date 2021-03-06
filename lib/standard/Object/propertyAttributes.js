var creditCard = {
	name: "John"
};

console.log(creditCard.propertyIsEnumerable("name"));

Object.defineProperty(creditCard, "name", {
	enumerable: false

});

console.log("name" in creditCard);
console.log(creditCard.propertyIsEnumerable("name"));


Object.defineProperty(creditCard, "name", {
	configurable: false

});

delete creditCard.name;
console.log("name" in creditCard);
console.log(creditCard.name);

Object.defineProperty(creditCard, "name", {
	configurable: true

});