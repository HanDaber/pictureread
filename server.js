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
	story = require('./routes/story'),
	frame = require('./routes/frame'),
	redis = require('./redis');


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
		secret: process.env.CLIENT_SECRET || "386rujrjr687i8i578o745683334f3r47rgd_PR_83y48fh3u3hef83473747384r7fheuhfd",
		maxAge: Date.now() + 7200000, // 2h Session lifetime
		store: new redis_store({ client: redis })
	}));

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function() { app.use(express.errorHandler()) });

app.configure('development', function() { app.use(express.errorHandler({ dumpExceptions: true, showStack: true })) });




// Routes

// Web root
app.get('/', auth.public, function ( req, res ) {

	res.render('home');
});

// // Web
// app.get('/sections', auth.user, sections.featured, stories.featured, function ( req, res ) {

// 	if( res.locals.user._type === 'writer' ) res.render('index');

// 	else res.render('index'); 	});

// // API
// app.get('/sections/:brand_name', auth.user, stories.by_section, function ( req, res ) {

// 	if( res.locals.user._type === 'writer' ) res.send( res.locals.stories );

// 	else res.send( res.locals.stories );	});



// // Web
// app.get('/stories/:slug', auth.user, stories.by_slug, frames.by_story, function ( req, res ) {

// 	if( res.locals.user._type === 'writer' ) res.render('frame');

// 	else res.render('frame'); 	});

// // API
// app.get('/stories/:slug/:frame', auth.user, stories.by_slug, frames.by_story, function ( req, res ) {

// 	if( res.locals.user._type === 'writer' ) res.send( res.locals.frame );

// 	else res.send( res.locals.frame );	});



// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });















































// admin panel
app.get( '/admin', auth.user, auth.writer, function ( req, res ) {

	res.render('admin');
});



// Stories:
app.namespace('/stories', auth.user, function ( req, res, next ) {

	if( res.locals.user ) next();

	else res.redirect('/');

}, function () {

	// index
	app.get( '/', function ( req, res ) {

		res.render('stories');
	});

	// all json format
	app.get('/json', story.all_json );

	// read one
	app.get('/:id/:frame?', story.get, function ( req, res ) { 

		res.render('frame'); 
	});

	// add edit
	app.post('/:id/:frame/edits', story.add_edit, function ( req, res ) {

		res.send(res.story);
	});

	// get frame:
	app.get('/:s_id/frames/:f_id', frame.get, function ( req, res ) {

		res.send( res.locals.frame );
	});

	// remove interaction
	app.post('/:s_id/:f_id/objects/remove', auth.writer, frame.remove_obj, function ( req, res ) {

		res.send( res.locals.send );
	});
	
	// add interaction
	app.post('/:s_id/:f_id/:x/:y', auth.writer, frame.add_obj, function ( req, res ) {

		res.send( res.locals.interaction );
	});

	// create
	app.post('/', auth.writer, story.create, function ( req, res ) {

		res.send( res.locals.story );
	});

	// destroy
	app.post('/:id', auth.writer, story.destroy, function ( req, res ) {

		res.send(res.story);
	});
});




app.namespace('/users', auth.user, auth.writer, function () {

	// create user
	app.post('/', auth.signup, function ( req, res ) {
		
		res.send(res.user);
	});
});


// Login
app.post('/login', auth.login, function ( req, res ) {
	
	if( req.session.user ) {

		if( req.session.user._type === 'writer' ) res.redirect('/admin');

		else res.redirect('/stories');
	}

	else res.redirect('/');
});

// Logout
app.get('/logout', auth.logout, function ( req, res ) {
	
	res.redirect('/');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});