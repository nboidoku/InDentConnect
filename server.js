var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//app.use(cookieParser());
//app.use(session({secret: process.env.SESSION_SECRET}));
//app.use(session({secret: "put some text here"}));

app.set('view engine', 'ejs');

app.use(app.express.static(__dirname + '/public'));

require('./assignment/app');

app.listen(process.env.PORT || 3000);