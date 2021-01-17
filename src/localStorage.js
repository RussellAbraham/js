function getLocal(name){
	if(localStorage.getItem(name) === null){
		var cache = [];
		localStorage.setItem(name, JSON.stringify(cache));
	} else {
		var cache = JSON.parse(localStorage.getItem(name));
		return cache;
	}
};

var test = getLocal('test');