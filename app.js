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

io.on('connection', (socketInstance) => {
	socketInstance.on('giveCards', (data) => {
		socketInstance.broadcast.emit('giveCards', data);
	});

});

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
