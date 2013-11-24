var express = require('express'),
	http = require('http');

// Need two of them for parser
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

// USB PORT - change this into your port
// You can check this at youre arduino application 
var portName = "/dev/tty.usbmodemfa131";
var app = express();
 
app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname, 'public'));
});

var sp = new SerialPort(portName, {
	baudRate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,
	// for every new line parse the data!
	parser: serialport.parsers.readline("\n") 
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
 
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket){
	console.log('connected socket');

	sp.on('data', function (data) {
		console.log(data);
		socket.emit('newposition', data);
  	});
 
	sp.on('close', function (err) {
	  console.log('port closed');
	});
	 
	sp.on('error', function (err) {
	  console.error("error", err);
	});
	 
	sp.on('open', function () {
	  console.log('port opened...');
	});
});