////////////////////////////
/////// HTTP PORTION ///////
////////////////////////////

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	// console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}

/////////////////////////////
///////  WEB SOCKETS  ///////
/////////////////////////////

var led;

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);



		socket.on('light', function(data){
			console.log('light');
			led = data;
			sendBright();

		});

		
		///MY SOCKET EVENTS HERE

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});

	}
);


////////////////////////////
/////// SERIAL STUFF ///////
////////////////////////////

//npm install serialport


var serialport = require('serialport');


var SerialPort = serialport.SerialPort;

serialport.list(function(err, ports){
	ports.forEach(function(port){
		console.log(port.comName)
	});
});

//var portName = '/dev/cu.usbserial-DN02B1B6';
var portName = '/dev/cu.usbmodem1421';

var myPort = new SerialPort(portName, {
	baudRate: 9600,
	parser: serialport.parsers.readline("\n")
});

myPort.on('open', showPortOpen);
myPort.on('close', showPortClose);
myPort.on('error', showError);
myPort.on('data', sendData);



function sendBright(){
	myPort.write(led.toString());
	console.log('led');
}

function showPortOpen(){
	console.log('Port opened. Data Rate: '+ myPort.options.baudRate);
}

function showPortClose(){
	console.log('Port Closed');
}

function showError(error){
	console.log('Error: '+ error);
}

function sendData(data){
	console.log('Sensor Data: '+ data);

	io.sockets.emit('sensor', data);
}
