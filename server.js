// require express
const express = require('express');
const routes = require('./routes');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
// Socket.io requires
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//log all requests to the console
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));
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
let player1;
let player2;
const players = []
function Player(player, name) {
	this.player = player;
	this.name = name
};
io.on('connection', socket => {
	console.log(`New user connected: ${socket.id}`);

	socket.on('action', action => {
		console.log('action: ');console.log(action)
		switch (action.type) {
			case 'server/hello':
				socket.emit('action', { type: 'message', data: 'goodday!' });
			break;
			case 'server/new-connection':
				socket.emit('action', { type: 'new-user', data: socket.id });
			break;
			default:

		}
	});

	socket.on('CREATE', data => {
		player1 = new Player('player1', data.name)
		players.push(player1)
		console.log(player1)
		console.log(players)

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
		player2 = new Player('player2', data.name)
		var room = io.nsps['/'].adapter.rooms[data.room];
		players.push(player2)
		console.log(player2)
		console.log(players)
		if (room && room.length == 1) {
			socket.join(data.room);
			io.in(data.room).emit('player2', {players: players});
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

app.use(routes);

server.listen(PORT, function() {
	console.log(`App is listening on port: ${PORT}`);
});
