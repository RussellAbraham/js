// global reference for the data we will be requesting
const jokes = [];

function dadJokes(url){
  const req = new XMLHttpRequest();
  req.open("GET", url)
  req.responseType = "text";
  req.send();
  req.onload = function(){
    var msg = req.response;
    // var res = JSON.parse(msg);
    callback(msg)
  }
  function callback(json){
    console.log(json)
  }
}
//dadJokes("https://icanhazdadjoke.com/")

// add a response type



//req.addEventListener('load', function() {
//	console.log('IT WORKED!!!');
//	const data = JSON.parse(req.response);
//	console.log(data)
//});
//
//req.addEventListener('error', () => {
//	console.log('ERROR!!!!!!');
//});
//
//req.open('GET', 'https://icanhazdadjoke.com/');
//req.send();
//
//console.log('Request Sent!');


// globals we might want
const obj = {};
const arr = [];

const firstReq = new XMLHttpRequest();

// response type text support legacy
firstReq.responseType = "text";



firstReq.addEventListener('load', function() {
	var msg = firstReq.response;
  var res = JSON.parse(msg);
	console.log(res);
	callback(res);
	//console.log('FIRST REQUEST WORKED!!!');
	//console.log()
	//const data = JSON.parse(this.responseText);
	//const filmURL = data.results[0].films[0];
	//const filmReq = new XMLHttpRequest();
  //
	//filmReq.addEventListener('load', function() {
	//	console.log('SECOND REQUEST WORKED!!!');
	//	const filmData = JSON.parse(this.responseText);
	//	console.log(filmData.title);
	//});

// filmReq.addEventListener('error', function(e) {
// 	console.log('ERROR!!', e);
// });

// filmReq.open('GET', filmURL);
// filmReq.send();
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

console.log('Request Sent!');
