// __proto__
function Ctor() {};

function Base() {}

Base.prototype = Object.create(Ctor.prototype, {
	constructor: {
		configurable : true,
		enumerable : true,
		value : Base,	
		writable : true		
	}
});

function Parent() {
	this.base = new Base();
}

Parent.prototype = Object.create(Base.prototype, {
	constructor: {
		configurable : true,
		enumerable : true,
		value : Parent,	
		writable : true		
	}
});

function Child() {
	this.parent = new Parent();
}

Child.prototype = Object.create(Parent.prototype, {
	constructor: {
		configurable : true,
		enumerable : true,
		value : Child,	
		writable : true		
	}
});

const testInheritance = new Child();

console.log(testInheritance instanceof Ctor);
console.log(testInheritance instanceof Base);
console.log(testInheritance instanceof Parent);
console.log(testInheritance instanceof Child);