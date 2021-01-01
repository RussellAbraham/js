# JavaScript Output

## Core Constructor

This function is called by new instances of different Constructors.

```javascript
function Ctor(content){
    this.preintialize.apply(this, arguments);
    this.content = content;
    this.initialize.apply(this, arguments);
};
Ctor.prototype.preinitialize = function(){
    /* left empty to allow override from inheritors */
};
Ctor.prototype.initialize = function(){
    /* left empty to allow override from inheritors */
};
Ctor.prototype.toString = function(){
    /*  */
    return ''.concat(this.content);
};
Ctor.prototype.valueOf = function(){
    return this;
};

```
`preintialize` happens before the instance.

`content` is any `Object`, `String`,`Boolean` or other type passed as an immutable argument.

`initialize` happens after the instance.

`toString`

Output is wrapped with string literal. 

If this wraps the message to `[object *]` and that is undesireble, 

then you must provide the logic to preserve your message using the objects `toString` method or rewrite the core for something less agnostic.

---

## Format Constructor Functions


* [Output](#)

- inherits prototypes from `Ctor`

* [RawOutput](#)

- inherits prototypes from `Output`

* [ArrayOutput](#)

- inherits prototypes from `Output`

Checks if object is array before iterating, if it is an array, a max length is applied to the iteration when computing the output.

* [ObjectOutput](#)

- inherits prototypes from `Output`

Computes key value pair output for any object message that did not return true in the array chack. 

If a circular object is in the path of its iteration, 

check `__proto__` and assign a replace to safely get writeable properties for the output buffer. 
