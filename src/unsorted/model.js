class Model {
	constructor (name) {
		this.name = name;
		this.date = new Date().toDateString();
		this.id = Symbol(this.name);
		
	}
	getID (){
		return this.id;
	}
	getName (){
		return this.name;
	}
	
}

const model1 = new Model('js-model');

console.log(model1, '\n');

console.log('model1 instanceof Model : ', model1 instanceof Model, '\n');

console.log('model1[id] is a '.concat(typeof model1.getID(), ' type'), '\n');

console.log('model1[name] is a '.concat(typeof model1.getName(), ' type'), '\n');
