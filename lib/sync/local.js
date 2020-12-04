function localInit(){
	if(localStorage.getItem('localKey') === null){
		var localKey = [];
		localKey.push({name:'localKey'});
		localStorage.setItem('localKey', JSON.stringify(localKey));
		console.log(localStorage.getItem('localKey'));
	} else {
		var localKey = JSON.parse(localStorage.getItem('localKey'));
		console.log(localKey);
	}
}
