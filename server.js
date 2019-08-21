// require express
const express = require('express');
const bodyParser = require("body-parser");
// const path = require('path');
// const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
const db = require('./models');
// Socket.io requires
const http = require('http');
const socketIo = require('socket.io');

// Create PORT
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app)
const io = socketIo(server);
//log all requests to the console
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));
app.use(routes)
// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'game/build')));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', {
	useNewUrlParser: true,
});
mongoose.set('useCreateIndex', true);

// Init the express-jwt middleware
const isAuthenticated = exjwt({
	secret: 'all sorts of code up in here',
});

let allUsers = []
let usersOnline = []
// Socket.io
const getUsers = () => {
	let clients = io.sockets.clients().connected;
	let sockets = Object.values(clients);
	let users = sockets.map(s => s.user);
	return users;
};

const emitUsers = () => {
	io.emit('visitors', getUsers());
};
let rooms = 0;
io.on('connection', socket => {
	console.log(`New user connected: ${socket.id}`);

	socket.on('action', (action) => {
		
		if(action.type === 'server/hello') {
			// console.log('Got hello data!', action.data);
			socket.emit('action', {type:'message', data:'goodday!'});
		}
		if(action.type === 'server/new-connection') {
			// console.log('Got hello data!', action.data);
			socket.emit('action', {type:'new-user', data: socket.id});
		}
	})
	socket.on('CREATE', data => {
		// console.log(data);
		socket.join('room-' + ++rooms);
		socket.emit('NEW_GAME', {
			name: data.name,
			room: 'room-' + rooms,
		});
		socket.broadcast.emit('GAME_CREATED', {
			author: data.name,
			message: `Started a game in [room-${+rooms}]`,
		});
	});
	socket.on('JOIN_GAME', function(data) {
		var room = io.nsps['/'].adapter.rooms[data.room];
		if (room && room.length == 2) {
			socket.join(data.room);
			socket.broadcast.to(data.room).emit('player1', {});
			socket.emit('player2', { name: data.name, room: data.room });
		} else {
			socket.emit('err', { message: 'Sorry, The room is full!' });
		}
	});

	socket.on('NEW_VISITOR', user => {
		// console.log('NEW_VISITOR', user);
		socket.user = user;
		emitUsers();
	});

	socket.on('SEND_MESSAGE', function(data) {
		io.emit('RECEIVE_MESSAGE', data);
	});

	socket.on('disconnect', () => {
		console.log(`User ${socket.id} disconnected`);
	});
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('game/build'));
}
// Store user messages
app.post('/api/message', (req, res) => {
	console.log(req.body);
	db.Message.create(req.body)
		.then(data => res.json(data))
		.catch(err => res.status(400).json(err));
});

app.get(
	'/',
	isAuthenticated /* Using the express jwt MW here */,
	(req, res) => {
		res.send('You are authenticated'); //Sending some response when authenticated
	}
);

// Error handling
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		// Send the error rather than to show it on the console
		res.status(401).send(err);
	} else {
		next(err);
	}
});

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
	const list = cards;
	res.json(list);
});


app.get('/', function (req, res) {
	res.sendFile('index.html')
})


server.listen(PORT, function() {
	console.log(`App is listening on port: ${PORT}`);
});

module.exports = isAuthenticated