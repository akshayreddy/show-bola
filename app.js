let express = require('express');
let path = require('path');
let app = express();
let socket = require('socket.io');
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static('./public/'));

let routes = require('./routes/index');

app.use('/', routes);

// View engine setup
app.set('view engine', 'html');

let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;

// Socket setup

let io = socket(server);

io.on('connection', (socketInstance) => {
	console.log('Socket connection was made', socketInstance.id);
});

io.on('playerGaveCard', (player) => {
	console.log('player gave cards', player);
});
