let express = require('express');
let path = require('path');
let app = express();
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static('./public/'));

let routes = require('./routes/index');

app.use('/', routes);

// view engine setup
app.set('view engine', 'html');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
