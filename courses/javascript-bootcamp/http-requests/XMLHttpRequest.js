// global reference for the data we will be requesting
// const jokes = [];

// function dadJokes(url){
//   const req = new XMLHttpRequest();
//   req.open("GET", url)
//   req.responseType = "text";
//   req.send();
//   req.onload = function(){
//     var msg = req.response;
//     // var res = JSON.parse(msg);
//     callback(msg)
//   }
//   function callback(json){
//     console.log(json)
//   }
// }
//dadJokes("https://icanhazdadjoke.com/")

// add a response type

// firstReq.addEventListener('load', function() {
// 	var msg = firstReq.response;
// 	console.log(msg);
// 	
// 	console.log('FIRST REQUEST WORKED!!!');
// 	console.log()
// 	const data = JSON.parse(this.responseText);
// 	const filmURL = data.results[0].films[0];
// 	const filmReq = new XMLHttpRequest();
// 
// 	filmReq.addEventListener('load', function() {
// 		console.log('SECOND REQUEST WORKED!!!');
// 		const filmData = JSON.parse(this.responseText);
// 		console.log(filmData.title);
// 	});
// 
// 	filmReq.addEventListener('error', function(e) {
// 		console.log('ERROR!!', e);
// 	});
// 
// 	filmReq.open('GET', filmURL);
// 	filmReq.send();
// });
// 
// firstReq.addEventListener('error', (e) => {
// 	console.log('ERROR!!!!!!');
// });
// 
// firstReq.open('GET', 'https://swapi.co/api/planets/');
// firstReq.send();
// 
// console.log('Request Sent!');

const arr = [];
const firstReq = new XMLHttpRequest();
firstReq.responseType = "text";
firstReq.addEventListener('load', function() {
	var msg = firstReq.response;
  	var res = JSON.parse(msg);
	console.log(res);
	callback(res);
});

function callback(json){
  const data = json['results'];
  const api = data.map(function(app){
    arr.push(app)
    console.log(app);
  });
}

firstReq.addEventListener('error', (e) => {
	console.log('ERROR!!!!!!');
});

firstReq.open('GET', 'https://swapi.co/api/planets/');
firstReq.send();

// should have our requested data pushed to `arr`

// console.log('Request Sent!');
