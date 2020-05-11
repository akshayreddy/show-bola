const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static('./public/'));

let routes = require('./routes/index');

app.use('/', routes);

// View engine setup
app.set('view engine', 'html');

module.exports = app;

class Player {
	constructor(args){
		this.name = args.name;
		this.socketId = args.socketId;
		this.timestamp = new Date();
	}
}

class Message {
	constructor(args){
		this.text = args.text;
		this.player = args.player;
	}
}

class Room {
	constructor(args){
		this.id = Math.floor(( Math.random() * 100000 ));
		this.timestamp = new Date();
		this.hostName = args.hostName;
		this.playersLimit = args.playersLimit;
		this.deckType = args.deckType;
		this.playersInRoom = [];
		this.messages = [];
	}

	canAddPlayer() {
		if (this.playersInRoom.length === this.playersLimit){
			return false;
		} else {
			return true;
		}
	}
}

let rooms = {}

io.on('connection', (client) => {

	// create a room
	client.on('create-room', (playerName) => {
		let hostName = playerName;

		let room = new Room({
			hostName: hostName,
			playersLimit: 4,
			deckType: 'standard-single',
		});

		rooms[room.id] = room;

		let player = new Player({
			name: hostName,
			socketId: client.id,
		})

		room.playersInRoom.push(player);

		let clientRoom = client.join(room.id);

		client.emit('room-updates', room);
		client.emit('player-added', player);

		clientRoom.on('join', () => {
			console.log('someone has joined the room');
		});
	});

	// when room is joined
	client.on('join-room', (roomId, playerName) => {

		if(!rooms.hasOwnProperty(roomId)){
			console.log('Ivalid room ID');
			client.emit('join-room-error');
		}

		let room = rooms[roomId];

		let player = new Player({
			name: playerName,
			socketId: client.id,
		});

		room.playersInRoom.push(player);

		client.emit('room-updates', room);
		client.emit('player-added', player);

		// check player count
		client.join(room.id);

		client.to(room.id).emit('room-updates', room);
	})

});

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
