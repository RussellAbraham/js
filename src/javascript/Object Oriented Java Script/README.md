# [Object Oriented JavaScript]()

## [Section 6 Prototypes]()

### Prototypes]

This lecture will learn what prototypes are in javascript then we create a function.

Every function has a property on it.

Called prototype.

And if we create an object using this function all those objects will share this prototype.

So this prototype is a property on that function.

For example here I have a function called passenger.

```javascript
function Passenger(name){
	if (!(this && this instanceof Passenger)) { return; }
	this.name = name;
}

Passenger.prototype = {
	getName : function(){
		return this.name;
	}
}

var bob = new Passenger('Bob');
var alice = new Passenger('Alice');

bob.getName();
alice.getName();


```

That passenger function will have a property called prototype.

And when we use that passenger function as a constructor to create passenger one and passenger two this

prototype will be reused by passenger one on passenger 2.

That is these object instances inturn have a property called prototype on all of them will point to

the same prototype property on this function the advantage

Is that all these objects now can share whatever properties and methods this prototype have. So a prototype

is it property on a function and that prototype can in turn have functions and also variables defined

on it or properties defined on it.

All those properties and functions can be reused by all the object instances that are created using

that function.

And the way it works is that each object instance that we create in javascript have a property inturn called

prototype and they all point back to the prototype property using the function using which they are created.

If you go back to the flight example that we have worked earlier on when you worked with constructor's.

Here we are creating two flight objects using the flight constructor.

Each of these flight objects will get its own memory space for these properties here as well as this

function.

Although within this function all we do is use that this variable and access the airline sent flight

number so we could reuse this function instead of repeating this function in each and every object instance

when it gets created.

If we put this function on the prototype for the passenger or for the flight in this case then that

function space will be reused saving us a lot of memory that is number one advantage of prototype.

The second advantage as you will see in the next section we can use Prototype chaining to implement inheritance

in Javascript.

So to summarize a prototype is property on each and every function in Javascript.

And when we use such functions to create object instances we can reuse the properties and methods on

that prototypes.

So all the objects that are created using that function can use the same methods and properties defined

on that prototype.

Saving us a lot of memory or space.

---

### Prototypes in Action

Before we going create our own prototype functions and properties.

Let's take a look at the in-built prototypes which we have been using already indirectly.

So grab this script create a new file paste it clean up the script create a new object called passenger

is equal to within flower brackets give it a name.

John is the name of the passenger.

No semicolon here but the literal ends with a semi-colon.

Let's try out a few things Console Dot log

Let's check if Name is a property on the passenger to do that to use a name in passenger.

So we are checking if name is a property inside passenger next console dot log passenger

Dot has own property.

So this function you already know that it checks if the whatever property is passed in.

If it directly exists on that object or is it being referenced from the parent object type console

dot log.

Has own property in passengers so now we are checking if this has own property function is on the passenger.

Let's see what that returns console dot log.

Passenger dot has own property.

This is where it gets tricky.

Has own property so we are checking if this has own property that we are using on the passenger.

Is it directly on the passenger or is it owned by the passenger or is it being referenced from the object

type which is a in-built reference type in javascript save it create a new folder under Object-Oriented

javascript call it prototypes and save it as Prototype dot html.

Open that in the web browser.

And let's check the output by going to view Developer javascript console.

True true true and false

So let's see what those truths are.

The first one is straightforward.

Name is in passenger.

Yes that returns true passenger has own property that is also easy yes name is owned by the passenger

object.

Third one has own property in passenger the operator doesn't care where the has on property comes from

although it comes from the object.

It simply returns true.

But the last line is where we can do a strict check.

We are checking passenger has own property has own property it returns false.

So this is where we are using the object prototype the inbuilt object this is a function which is in built

into javascript using which we can create generic objects dot prototype is a property on this object.

Like every other function this object function also has the prototype property on which this has on

property is defined.

That is the reason every object gets access.

to this has own property. Whatever is defined on the object dot prototype can be shared across object

instances that are created using that function.

So if you do object dot prototype dot has own property within brackets.

If your check has own property do a console dot log and that should return true.

console dot log we are checking here if the object dot prototype has a property called has own

property save it go back to the web browser refresh.

You'll see the true

So now you understand that that is how we have been reusing the Has own property.

Even if you tried tostring method that is how the tosting method is defined it is defined on the

object dot prototype and that is the reason all the objects that are created have access to the Has own

property to string and many other methods that are defined on the object's prototype in a similar fashion.

We can also define our own prototypes on our own constructors.


### Checking the Prototype Property

Every javascript function will have a property called are the prototype.

And if we use those functions as constructors to create object instances the object instances also have

a prototype property which will point back to the function's prototype property.

So let's try to access an object's prototype property and see or compare it to see to which prototype

function or which function prototype it belongs to.

So in javascript it is possible to access the object's prototype and also check to which prototype it is

pointing to.

So go back grab a script create a new one clean it up.

Start by creating a generic object.

my obj is equal to opening close brackets and a semi-colon at the end.

So we are creating a generic object type here using the literal form to access the prototype property

of this object we use object which is the generic type dot get Prototype of O capital of pass in

my OBJ.

So this method get prototype of method on the generic object will return us var Prototype.

So here we are getting back this property on a object.

It's not a passenger.

It is a generic object.

So we are passing in object instance and we get a prototype property back.

Now let's see where this prototype property is pointing back to the console dot log prototype triple equal to will

do.

We are comparing it with object dot prototype because we are creating a generic object.

This prototype property should point to the object constructor's prototype property.

That is what we are comparing here.

Save it and call it Prototype property dot HTML go to the explorer.

Open up the prototype dot or prototype property dot html go to View developer on a javascript console

and you see that it is true because this property this prototype property points to the object prototype

and another way to access is console dot log.

They can also access object dot prototype dot IS prototype

So here we are comparing the other way around object dot prototype Is protocol type of

P is small here is prototype off and pass in the instance which is my OBJ.

So here we are testing if the object is a prototype for another object by using the isprototype of

method.

Save it go back to the console.

refresh and it is true.

So here we are using generic object types but instead of these generic object types later on when you create

your own prototypes on your objects and you create properties and functions on your own prototypes.

You can compare them using the same methods get prototype of from object and you can use is prototype

off on any object that you will create later on.

---

### How a Property is resolved by JS Engine

It's important to understand how the javascript engine works when we access a object's property.

We access the name here using the passenger object the javascript engine first checks if there is a

name property that is owned by the passenger.

If it is there it will simply return the value of that property if it's not there then the javascript

engine will check to see if this name exists on the object's prototype property if it exists on the

prototype.

It will return the value of the name if it even doesn't exist on the prototype.

It will return value undefined.

So let's see that in action by creating a new file you're going to create a new object.

Right now this is an empty object.

Do a console dot log get rid of all other lines do a console dot log

my

OBJ dot tostring.

We haven't defined the two string as a property as a function on this My OBJ but we are accessing

that tosting method directly save this,

Call it how it works.

Dot html

Go back open up the html in the browser go to the console and you should see the object object.

So this tosting method comes from the Object prototype the generic Object prototype has a tostring

method which is available on all the objects.

That is the reason you are able to access it now the key

Let's define a tosting Method on our own object my obj DOT to string.

So here I am shadowing the tostring method which is available on the object's prototype.

Define a function using the literal form within which I will do a return.

within double quotes

My tostring method my tostring method is what I am returning semicolon at the end and a semicolon at

the end of the function as well.

Grab this console dot log paste it after this.

Now if you invoke my obj dot tosting.

Let's see what happens.

go back to the web browser refresh you get my tostring method.

So the java script engine first checks if this tostring exists as a property on the object directly that

is if it is owned by that if it is there it is invoking that function and if it is not there only then

it will use the function from the object's prototype to prove that delete after this delete my OBJ dot

2 strings so we are deleting the property called tostring again.

Grab the console dot log paste it save it go back fresh and you see the prototypes to string back in

action.

So that is how the javascript engine works.

And if you try to delete the tosting method on the prototype that won't work.

So delete object or my obj dot tostring.

I'm deleting that property use the console dot log again save it go back refresh.

It still works because when you invoke this delete operation you cannot delete that tosting on the

property you can delete the property if it directly exists on a particular object but not on the

prototype.

So in this lecture you have learnt that the javascript engine first checks if a particular

property.

It could be a function or it could be a data property if it directly exists on an object.

If it doesn't if the object does not own it then it will go check on the prototype and if it checks

if it exists it will use that if it doesn't exist on that as well then it will return a undefined.

---

### Using prototypes on our objects

You have learnt a lot about prototype and you have.

Also accessed the prototype property on the generic object type

It's time to use or access the prototype on our own custom objects that we have been creating.

So go to the constructor dot html

Here we have defined a constructor using which we are creating multiple flight instances and inside the

constructor we have two properties and a method called display each of these objects here will get their own

copy of this function that is we are wasting a lot of memory if we create hundred flight objects each

of those flight objects will have space for this particular function.

So let's try to reuse this function by pushing it to the prototype to the flights prototype

So grab this script create a new file paste it call it flight prototype flight Prototype dot html

and that goes under object oriented programming or Object-Oriented javascript prototypes Save it to

push this method to the prototype.

We access the prototype property on the constructor so flight is a constructor function.

So flight Dot

prototype is the property prototype dot display.

This is how we define a function on our prototype property for the flight is equal to start the function.

use the literal form and inside that function you can do whatever you want to grab these two console

dot logs cut them paste them here delete that display method entirely from the flight.

It's that simple.

Save it.

So what exactly we have done here is we have moved that display function from the constructor on to the

prototype property of the constructor.

This way and we create the flight objects and invoke that display method all those flight objects

will share the memory space and we are resuing the function by pushing it to the prototype.

Save it open it in the web browser flight prototype dot html go to the console and the output is

still what you are expecting whatever you have coded earlier on it displays all the flight details.

We don't have to do all these checks here

You can get rid of them all we are concerned about is the display method right now.

Go back refresh and you'll see the flight details.

So in this lecture we have successfully used the prototype on our own method on the flights constructor

we have used the prototype property and you have added a property called display that will be shared by all the objects

that are created using that particular constructor.

---

### Adding multiple properties to a prototype

To add prototypes we can do it one property at a time.

That is you can copy this paste it and add another method or data property on the prototype and we can keep

repeating it for as many number of properties as we want.

Instead of that there is an other popular syntax which is to use the literal object.

here

Get rid of this display and this will become a function inside an object literal so the prototype is

equal to start a object literal and we are going to close it right after this function definition.

And within this object literal syntax you can define any number of functions or data properties.

So this function give it a name.

Display is the function colon

So now this becomes a property on this prototype property which again internally user object comma

Let's shadow that tostring method.

All right.

The two string method function within this you can return whatever you want.

But let's return some meaningful information about the flight.

Start with the square bracket flight is the object space.

Plus this dot airlines within double quotes.

comma plus this dot flight number.

plus within double quotes.

Close the square bracket.

Typically this is how we implement a boosting method to return meaningful information about a particular

object.

So here the key is you are using an object literal syntax.

Insert of repeating this flight dot prototype dot method name and repeating the code.

We define all the properties in one single literal object.

Save it go back to the web browser refresh you'll still see the very same output when the display methods

are invoked.

You can also use the tosting method and if you do a console dot log flight one dot to string invoke

that method.

Copy that line paste it flight string.

Go back there fresh and you see the appropriate outputs.

---

### Taking care of the constructor property

When we use literal syntax on a prototype property we need to take care of a property called constructor.

The constructor property exists on the prototype it is a property on the prototype.

And let's see what the problem is by using some console dot logs do a console dot log.

Let's check if Flight 1.

Is a instance of flight

save it go back to the web browser refresh.

No issues that it is true it says that it is an instance of flight because we are creating an object

of flight next console dot log

flight 1 dot constructor

We can access the constructor property to check using which construct we have created this object triple equal to

flight save it go back refresh and you see a strange result which is false this is because the

construct of property exists on the prototype so the prototype is where the constructor property is.

And since we are using this literal form we need to make sure that we define the constructor property here

otherwise it will treat it as a generic object.

So if you compare it with object it will return true.

So grab this line paste it use object go back refresh.

It says true because since we have used the literal syntax here the prototypes constructor property will

be assigned to object to overcome that issue simply define a constructor property on the prototype colon

in flight comma the rest of the properties always.

It is the best practice to put this on the top so that we won't forget about it so that when we use

the comparisons later on in our application we will not have any problem go back to the browser refresh.

Now the results are other way around.

It points to the proper constructor which is flight and not the object.

So always when you are using the literal syntax to assign literal objects syntax to assign a lot

of properties to a proper type at once.

Make sure that you are using the constructor property on the top and assign it the right constructor.

---

### Built-In Object Prototypes

In this lecture you we can use the prototype property on the inbuilt objects and we can assign new

properties to them grab the script create a new file paste it.

Let's use the string type javascript.

All the good types in javascript have a wrapper type so string is a wrapper type or the inbuilt string

type String dot prototype is how we access the prototype property on string constructor dot display displaying

the contents of a string a very simple function.

Display is equal to define the function and within the function body console dot log.

This

with double quotes to invoke this display function use bharath or your own name dot display.

Save it.

Call it

inbuilt prototype dot html type or paste here.

Here we are exploring the prototype of a inbuilt object called String.

We are adding a new method to inbuilt java script type save it open the inbuilt prototype dot html in

the web browser go to view developer javascript console and the output is it say string but it contains all the

contents of it.

So what you are displaying here is showing up on the console you can even set this dot to string that

will give us the exact string.

Go back to the web browser refresh and do you see.

Bharath.

But the key here is that you have accessed the prototype property on a build type called string and

you are able to add additional functionality to it.

add a semicolon at the end.

Additional functionality to it but we should use it with care.

We should avoid using prototypes on inbuilt objects because not all the developers in our team or in

other teams might be aware of what exactly it does and they might use that in build objects so we should

use this with caution.

---

### Summary

In this section you have mastered what constructors are and how to use a constructor to create multiple

objects which have the same exact properties.

You also use the instance of operator to check if a particular object is created using a particular

constructor and you have learned that every object that is created has a constructor property which

carries the value of the constructor.

Then you move on to learn a very powerful concept off prototype every function in Javascript has a referenced

type property called prototype and any properties added to this prototype will be shared across all

the objects.

The javascript engine first checks if a particular property exists on an object directly if it

does then it will use it.

If not it will check on the prototype to see if that property exists.

So prototype is a very powerful concept which you will be using to implement inheritance in the next

section.

---

## [Section 7 Inheritance]()

### Introduction

Know that you have mastered how to create objects and how to achieve encapsulation of properties through

accessor properties.

The next key object oriented concept is inheritance through which we can reuse properties across object

in javascript since we do not have class like hierarchical structure.

We extend the one object from another object.

So it is object based inheritance.

And since you have already learnt what a prototype property is and how it can be used inheritance

will be super easy for you will achieve inheritance through prototype chaining and you will also learn

how to implement inheritance through constructors and how to override the properties on a parent object

in the child object.

---

### Implicit Inheritance

Right from the very first time you have created an object in this course you have already been using inheritance.

Let me prove that by copying one of the scripts create a new file paste it.

Let's create a new object.

Called var project is equal to use the object literal form semicolon at the end add a new property

called name colon the project that we are working on is a roadwork instead of a project or a javascript

project we are working on the road work now let's use console dot log project DOT has own property and

passin name save this by creating a new folder under object oriented javascript.

Call it inheritance inheritance do html

go to the inheritance folder open the file in the browser go to view developer javascript console and the output

is true as expected.

You already know this but what exactly is happening behind scenes.

Is this has own property does not exist on the project.

You can see that it is not directly owned by the project but it is inherited from the parent object

type.

So by default when we create an object like this it uses the inbuilt object reference and the inbuilt

object references are the inbuilt objects.

Prototype is where this property is defined.

Similarly it has tostring a value off and several other methods.

That is the reason we are able to access those as if those properties exist on our object.

So always remember the inbuilt object types.

Prototype has all these properties.

And since when we create an object by default it is created.

The javascript engine uses the inbuilt object type to create it.

All these properties are available to every object to classify that user a console dot log and see what

the prototype property of this project points to.

So you can say get the prototype first by using object dot get prototype off.

Is the method pass in the project that will return as a prototype back.

So assign that to a var Prototype is equal to that

Now we can compare prototype triple equal to object dot prototype save it go back to the web browser refresh

and it is true.

So that proves that any object that we create using the literal form will automatically use the object

type and all the methods that are present on the objects dot prototype are available to every object

we create because they automatically extend the object type or they are automatically created using

the object type.

So in that way we are inheriting everything that the object's prototype has.

That is how inheritance should be done.

---

### Object.create methdo

---