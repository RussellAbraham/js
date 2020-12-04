function dir(obj) {
  var result = "";
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result += prop + " \n ";
    }
  }
  return result;
}

"use strict";

function Main(id){    
    this.preinitialize.apply(this, arguments);    
    this.controller = new Base.Controller(id);    
    this.initialize.apply(this, arguments);
};

Main.prototype = Object.create(Base.prototype, {
    constructor : {
        value : Main,
        writeable : true,
        configurable : true,
        enumerable : false
    }
});

Main.prototype.preinitialize = function(){
    console.log('BEGIN');
};
Main.prototype.initialize = function(){
    console.log('END');
};

function Ctor(){};

function Employee() {
    this.name = '';
    this.dept = 'general';
}

function Manager() {
  Employee.call(this);
  this.reports = [];
}

Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

function WorkerBee() {
  Employee.call(this);
  this.projects = [];
}

WorkerBee.prototype = Object.create(Employee.prototype);
WorkerBee.prototype.constructor = WorkerBee;

function SalesPerson() {
   WorkerBee.call(this);
   this.dept = 'sales';
   this.quota = 100;
}
SalesPerson.prototype = Object.create(WorkerBee.prototype);
SalesPerson.prototype.constructor = SalesPerson;

function Engineer() {
   WorkerBee.call(this);
   this.dept = 'engineering';
   this.machine = '';
}
Engineer.prototype = Object.create(WorkerBee.prototype)
Engineer.prototype.constructor = Engineer;


var jim = new Employee; 
// Parentheses can be omitted if the
// constructor takes no arguments.
// jim.name is ''
// jim.dept is 'general'

var sally = new Manager;
// sally.name is ''
// sally.dept is 'general'
// sally.reports is []

var mark = new WorkerBee;
// mark.name is ''
// mark.dept is 'general'
// mark.projects is []

var fred = new SalesPerson;
// fred.name is ''
// fred.dept is 'sales'
// fred.projects is []
// fred.quota is 100

var jane = new Engineer;
// jane.name is ''
// jane.dept is 'engineering'
// jane.projects is []
// jane.machine is ''