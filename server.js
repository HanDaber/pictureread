/**
 * Module dependencies.
 */

var express = require('express'),
	namespace = require('express-namespace'),
	path = require('path'),
	http = require('http'),
	Redis = require('connect-redis')(express),
	db = require('./db'),
	auth = require('./routes/auth'),
	story = require('./routes/story'),
	sections = require('./routes/sections'),
	rewrites = require('./routes/rewrites'),
	captions = require('./routes/captions'),
	interactions = require('./routes/interactions'),
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
		store: new Redis({ client: redis })
	}));

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function() { app.use(express.errorHandler()) });

app.configure('development', function() { app.use(express.errorHandler({ dumpExceptions: true, showStack: true })) });




// Routes

app.get('/', auth.public, function ( req, res ) {

	res.render('index');
});

app.get('/logout', auth.logout, function ( req, res ) {
	
	res.redirect('/');
});

app.post('/login', auth.login, function ( req, res ) {
	
	if( req.session.user ) {

		if( req.session.user._type === 'writer' ) res.redirect('/read');

		else res.redirect('/read');
	}

	else res.redirect('/');
});

app.get('/admin', auth.user, auth.writer, function ( req, res ) {

	res.render('admin');
});

app.namespace('/read', auth.user, function () {

	app.get('/', sections.all, function ( req, res ) {

		res.render('home');
	});

	app.get('/:story/:picture?*', story.read, function ( req, res ) {

		res.render('picture');
	});

	app.get('/:story/:picture/:rewrite', story.read, story.rewrite, function ( req, res ) {

		res.render('picture');
	});
});

app.namespace('/api', auth.user, function () {

	app.post('/interactions', auth.writer, interactions.add, function ( req, res ) {

		res.send( res.locals.interaction );
	});

	app.post('/interactions/:id', auth.writer, interactions.rem, function ( req, res ) {

		res.send( res.locals.interaction );
	});

	app.post('/stories', auth.writer, story.add, function ( req, res ) {

		res.send('/' + res.locals.section.slug );
	});
	
	app.post('/stories/:id', auth.writer, story.rem, function ( req, res ) {

		res.send('/read');
	});
	
	app.post('/sections', auth.writer, sections.add, function ( req, res ) {

		res.send('/' + res.locals.section.slug );
	});
	
	app.post('/sections/:id', auth.writer, sections.rem, function ( req, res ) {

		res.send('/read');
	});

	app.post('/captions', auth.writer, captions.add, function ( req, res ) {

		res.send('/read/' + req.body.story + '/' + req.body.frame );
	});

	app.post('/rewrites', rewrites.add, function ( req, res ) {

		res.send('/read/' + req.body.story + '/' + req.body.frame + '?re=' + res.locals.re.slug );
	});
});


app.get('/:brand', auth.user, sections.all, sections.highlight, function ( req, res ) {

	res.render('home');
});











http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


