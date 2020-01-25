// global reference for the data we will be requesting
const planets = [];

const firstReq = new XMLHttpRequest();

// add a response type
firstReq.responseType = "text";



firstReq.addEventListener('load', function() {
	console.log('IT WORKED!!!');
	const data = JSON.parse(this.responseText);
	for (let planet of data.results) {
		console.log(planet.name);
		
		// push data to array
		planets.push(planet.name);
	}
});

firstReq.addEventListener('error', () => {
	console.log('ERROR!!!!!!');
});

firstReq.open('GET', 'https://swapi.co/api/planets/');
firstReq.send();

console.log('Request Sent!');
