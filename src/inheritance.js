// __proto__
function Ctor() {};

function Base() {}

Base.prototype = Object.create(Ctor.prototype, {
	constructor: {
		value: Base
	}
});

function Parent() {
	this.base = new Base();
}

Parent.prototype = Object.create(Base.prototype, {
	constructor: {
		value: Parent
	}
});

function Child() {
	this.parent = new Parent();
}

Child.prototype = Object.create(Parent.prototype, {
	constructor: {
		value: Child
	}
});
