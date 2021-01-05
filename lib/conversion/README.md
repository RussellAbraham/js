
- `constructor : { value : Ctor };`

- `toString();` 

- `valueOf();`


new instances lookup getter points to the correct constructor.

# ![](scope.PNG)


The closures execution is where array, string, and object methods can be mutated and shared.

In this picture `Ctor` is the base constructor that is called within all other constructors. 

Straying just a little bit from the proper notation and name spacing will likely cause the lookup to resolve to `Object`

# ![](temperature.PNG)
