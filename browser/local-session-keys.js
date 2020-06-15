
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

function initKeys(){
	sessionInit();
	localInit();	
}

initKeys();
