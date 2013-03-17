/**
 * Module dependencies.
 */

var express = require('express'),
	namespace = require('express-namespace'),
	path = require('path'),
	http = require('http'),
	redis_store = require('connect-redis')(express),
	db = require('./db'),
	routes = require('./routes'),
	auth = require('./routes/auth'),
	story = require('./routes/story');

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
	app.use(express.cookieParser('48tyh984tv9q8eyjtd9reufw98euryt8c4utyufr2yg4fu2hg2894hf984yfh824h8u45fht28984hu'));

	app.use(express.session({
		secret: process.env.CLIENT_SECRET || "38745683334f3r47rgd_PR_83y48fh3u3hef83473747384r7fheuhfd",
		maxAge: Date.now() + 7200000, // 2h Session lifetime
		store: new redis_store({ client: redis })
	}));

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function() { app.use(express.errorHandler()) });

app.configure('development', function() { app.use(express.errorHandler({ dumpExceptions: true, showStack: true })) });



// ############ Web routes #############

// Root:
app.get('/', routes.index);

// Stories:
// app.namespace('/stories', function () {
app.namespace('/stories', auth.authenticate, function () {
	// all
	app.get('/', story.all, function ( req, res ) {

		res.render('stories');
	});

	// read
	app.get('/:id/:frame?', story.get, function ( req, res ) {

		res.render('story');
	});

	// add edit
	app.post('/:id/:frame/edits', story.add_edit, function ( req, res ) {

		res.send(res.story);
	});

	// add frame
	app.post('/:id/frames', auth.writer, story.add_frame, function ( req, res ) {

		res.send(res.story);
	});

	// add interaction
	app.post('/:id/:frame/interactions', auth.writer, story.add_interaction, function ( req, res ) {

		res.send(res.story);
	});

	// create
	app.post('/', auth.writer, story.create, function ( req, res ) {

		res.send(res.story);
	});

	// destroy
	app.post('/:id', auth.writer, story.destroy, function ( req, res ) {

		res.send(res.story);
	});
});


// Admin:
app.namespace('/admin', function () {
	// admin panel
	app.get('/', function ( req, res ) {

		res.render('admin');
	});

	// Login
	app.post('/', auth.admin, function ( req, res ) {
		
		res.redirect('/');
	});

});

app.namespace('/users', auth.authenticate, auth.writer, function () {

	// create user
	app.post('/', auth.signup, function ( req, res ) {
		
		res.send(res.user);
	});

	// Create Writer:
	// app.post('/writer', writer.create, function ( req, res ) {

	// 	res.send(res.user);
	// });
});


// Login
app.post('/login', auth.login, function ( req, res ) {
	
	res.redirect('/');
});

// Logout
app.get('/logout', auth.logout, function ( req, res ) {
	
	res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
