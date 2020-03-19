let express = require('express');
let path = require('path');
let app = express();
const port = 3000

app.use(express.static(path.join(__dirname, 'views')));
app.use("/public", express.static('./public/'));

let routes = require('./routes/index');
let cards = require('./routes/cards');

app.use('/', routes);
app.use('/card', cards);

// view engine setup
app.set('view engine', 'html');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
