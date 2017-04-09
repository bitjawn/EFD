var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
    validator = require('express-validator');

var app = express();

// path to the router
var routes = require('./routes/index');

/// View engine
app.engine('dust',cons.dust);

// Setting view engine and views directory location
app.set('view engine','dust');
app.set('views',__dirname + '/views');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// validation
app.use(validator());

// static resources
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes);

// set port
app.set('port', (process.env.PORT || 2225));

app.listen(app.get('port'), function(){
	console.log('Server started on port ' + app.get('port'));
});