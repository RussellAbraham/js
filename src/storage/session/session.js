function sessionInit(){
	if(sessionStorage.getItem('sessionKey') === null){
		var sessionKey = [];
		sessionKey.push({name:'sessionKey'});
		sessionStorage.setItem('sessionKey', JSON.stringify(sessionKey));
		console.log(sessionStorage.getItem('sessionKey'));
	} else {
		var sessionKey = JSON.parse(sessionStorage.getItem('sessionKey'));
		console.log(sessionKey);
	}
}
