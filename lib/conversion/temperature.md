<<<<<<< Updated upstream
### Fahrenheit to Celsius

`℃=(℉-32)/1.8`

```javascript
function f2c(n){
	n = parseFloat(n);
	return (n - 32) / 1.8;
};
```

### Fahrenheit to Kelvin

`K=((℉-32)/1.8)+273.15`

```javascript
function f2k(n){
	n = parseFloat(n);
	return ((n - 32) / 1.8) + 273.15;
};
```

### Celsius to Fahrenheit

`℉=(℃*1.8)+32`

```javascript
function c2f(n){
	n = parseFloat(n);	
	return (n * 1.8) + 32;
};
```

### Celsius to Kelvin

`K=℃+273.15`

```javascript
function c2k(n){
	n = parseFloat(n);	
	return n + 273.15;
};
```

### Kelvin to Fahrenheit

`℉=((K-273.15)*1.8)+32`

```javascript
function k2f(n){
	n = parseFloat(n);	
	return ((n - 273.15) * 1.8) + 32;
};
```

### Kelvin to Celsius

`℃=K-273.15`

```javascript
function k2c(n){
	n = parseFloat(n);	
	return n - 273.15;
};
```
=======

Description	Formula	Example

Convert from Fahrenheit to Celsius	℃=(℉-32)/1.8	
```javascript
function f2c(obj){
    var x = parseFloat(obj);
    return (x - 32) / 1.8;
};
```

Convert from Fahrenheit to Kelvin	K=((℉-32)/1.8)+273.15	
Convert from Celsius to other Measurements

The table below shows how to convert from Celsius to other temperature measurements:

Description	Formula	Example
Convert from Celsius to Fahrenheit	℉=(℃*1.8)+32	
Convert from Celsius to Kelvin	K=℃+273.15	
Convert from Kelvin to other Measurements
The table below shows how to convert from Kelvin to other temperature measurements:

Description	Formula	Example
Convert from Kelvin to Fahrenheit	℉=((K-273.15)*1.8)+32	
Convert from Kelvin to Celsius	℃=K-273.15
>>>>>>> Stashed changes
