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
		this.playerId = args.playerId;
		this.timestamp = new Date();
	}
}

class Message {
	constructor(args){
		this.text = args.text;
		this.player = args.player;
		this.timestamp = new Date();
	}
}

class Room {
	constructor(args){
		this.id = Math.floor(( Math.random() * 100000 ));
		this.timestamp = new Date();
		this.hostName = args.hostName;
		this.hostId = args.hostId;
		this.playersLimit = args.playersLimit;
		this.deckType = args.deckType;
		this.playersInRoom = [];
		this.playerIdList = [args.hostId];
		this.isTurnOf = undefined;
		this.messages = [];
	}

	canAddPlayer() {
		if (this.playersInRoom.length === this.playersLimit){
			return false;
		} else {
			return true;
		}
	}

	nextTurn() {
		let indexOfCurrentPlayer = this.playerIdList.indexOf(this.isTurnOf);

	  	if (indexOfCurrentPlayer === (this.playerIdList.length - 1)) {
	    	this.isTurnOf = this.playerIdList[0];
	  	} else {
	    	this.isTurnOf = this.playerIdList[indexOfCurrentPlayer + 1];
	  	}

	  	return this.isTurnOf;
	}
}

let rooms = {}

io.on('connection', (client) => {

	// create a room
	client.on('create-room', (data) => {
		let hostName = data.playerName;
		let numberOfPlayers = data.numberOfPlayers;
		let decktype = data.deckType;

		let room = new Room({
			hostName: hostName,
			hostId: client.id,
			playersLimit: parseInt(numberOfPlayers),
			deckType: decktype,
		});

		rooms[room.id] = room;

		let player = new Player({
			name: hostName,
			playerId: client.id,
		})

		room.playersInRoom.push(player);
		room.isTurnOf = player.playerId;

		let clientRoom = client.join(room.id);

		client.emit('room-created', room);
		client.emit('player-added', player);
		client.emit('current-turn', player);

		clientRoom.on('join', () => {
			console.log('someone has joined the room');
		});
	});

	// when room is joined
	client.on('join-room', (data) => {
		let roomId = data.roomCode;
		let playerName = data.playerName;

		if (!rooms.hasOwnProperty(roomId)) {
			client.emit('join-room-error', 'Ivalid room ID');
			return;
		}

		let room = rooms[roomId];

		if (room.playersInRoom.length === room.playersLimit){
			client.emit('join-room-error', 'room full');
			return;
		}

		let player = new Player({
			name: playerName,
			playerId: client.id,
		});

		room.playersInRoom.push(player);
		room.playerIdList.push(player.playerId)

		client.join(room.id);
		client.emit('player-added', player);
		io.in(room.id).emit('room-updates', room);
	});

	// request for next turn
	client.on('next-turn', (data) => {
		let roomId = data.roomCode;
		let room = rooms[roomId];

		io.in(room.id).emit('current-turn', { playerId: room.nextTurn() });
	});

});

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
