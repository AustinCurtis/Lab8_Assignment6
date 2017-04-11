// P5 STUFF ONLY
rad = 1;
in2 = 1;
col = 'green';
var xs;
var ys;
win = 0;

var bright=10;

var score;

function newBox(){
	xs = random(windowWidth-25);
	ys = random(windowHeight-25);
	console.log('yes');
	socket.emit('light', 10);
	win++;
	//setTimeout(resetLi, 2000);
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	background('green');
	newBox();
}

function draw() {
	background(col);
	ellipse(rad, in2, 40);
	rect(xs, ys, 50, 50);
	score = "Score: "+ win;
	textSize(32);
	text(score, 20, 50);
}

function resetLi(){
	socket.emit('light', 0);
}

// function newBox(){
// 	xs = random(windowWidth-25);
// 	ys = random(windowHeight-25);
// 	win++;
// }


////////////////////////////////////////////////

// all non-p5 javascript needs to go inside init() 
// so that this code executes only AFTER the page has loaded

// function init(){

// 	// SOCKET STUFF
// 	var socket = io.connect();

// 	socket.on('connect', function() {
// 		console.log("Connected");
// 	});

// 	socket.on('sensor', function(data){
// 		var numbers = split(data, ',');
// 		dataIn = Number(numbers[0]);
// 		data2 = Number(numbers[1]);
// 		//console.log(dataIn);
// 		//console.log(data2);
// 		rad = map(dataIn, 0, 255, 0, windowWidth);
// 		in2 = map(data2, 0, 255, 0, windowHeight);
// 		//rad = Number(data);
// 		//console.log(rad);

// 		if (data2<=85  && col != 'green') {
// 			col = 'green';
// 			console.log('green');
// 		} else if(data2>85 && data2<=170  && col != 'yellow'){
// 			col = 'yellow';
// 			console.log('yellow');
// 		}else if(data2>170 && col != 'red'){
// 			col = 'red';
// 			console.log('red');
// 		}

// 		if (rad > xs && rad < xs+50 && in2 > ys && in2 < ys+50) {
// 			newBox();
// 		}

// 	});

// };

//window.addEventListener('load', init);


