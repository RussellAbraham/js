# Model Row 

Data Base Record and JSON representation

Worker, Window, and Interval have, by default, null values. These will be overwriten with pointers to a resuorce

```
{
	id : '',
	uid : '',
	name : '',
	worker : null,
	window : null,
	interval : null
}
```


- name

a unique name used to reference the identities of running processes.


- worker

run code asynchronously with postMessage

- window

open, move, resize, close, write, and stream to a separate window matching the name


- interval

Either `setInterval` or `requestAnimationFrame` for polling