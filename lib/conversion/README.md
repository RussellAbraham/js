
- `constructor : { value : Ctor };`

- `toString();` 

- `valueOf();`


new instances lookup getter points to the correct constructor.

# ![](scope.PNG)


The closures execution is where array, string, and object methods can be mutated and shared.

In this picture the function location in the stakc trace, shows `Ctor` as the base constructor. 

`Ctor` is called within all constructors that inherit prototypes from the `Converter` closure.

This sets the scope for sharing context.

Straying just a little bit from the proper notation and name spacing will likely cause the lookup to resolve to `Object`

# ![](temperature.PNG)
