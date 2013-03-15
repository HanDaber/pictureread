/**
 * Module dependencies.
 */

var express = require('express'),
  path = require('path'),
  http = require('http'),
  redis_store = require('connect-redis')(express),
  routes = require('./routes'),
  db = require('./db');

var rtg, redis;

// Heroku redistogo connection
if( process.env.REDISTOGO_URL ) {
  rtg   = require('url').parse( process.env.REDISTOGO_URL );
  redis = require('redis').createClient( rtg.port, rtg.hostname );
  redis.auth( rtg.auth.split(':')[1] ); // auth: 1st part is username and 2nd is password separated by ":"
}
// Localhost
else redis = require("redis").createClient();


// Configure express
var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: process.env.CLIENT_SECRET || "38745683334f3r47rgd_PR_83y48fh3u3hef83473747384r7fheuhfd",
	    maxAge: Date.now() + 7200000, // 2h Session lifetime
    	store: new redis_store({ client: redis }) }));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public'))) });

app.configure('production', function() { app.use(express.errorHandler()) });

app.configure('development', function() { app.use(express.errorHandler({ dumpExceptions: true, showStack: true })) });



// ############ Web routes #############

// Root:
app.get('/', routes.index);

// Stories:
// all
app.get('/stories', routes.stories);

// read
app.get('/stories/:number/:state?', routes.story);

// Editors:
// auth
app.get('/login/:name/:pass', routes.login, function ( req, res ) {
	res.redirect('/stories');
});

// log out
app.get('/logout', routes.logout, function ( req, res ) {
	res.redirect('/');
});



// app.post('/stories', routes.stories.create);

// app.get('/stories/:number/:state', routes.stories.get);

// app.post('/stories/:number', routes.edits.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
