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
