var creditCard = {};

Object.defineProperty(creditCard,"name",{
value: "John"
});

console.log("name" in creditCard);
console.log(creditCard.propertyIsEnumerable("name"));

delete creditCard.name;
console.log("name" in creditCard);

creditCard.name ="Bob";
console.log(creditCard.name);