var User = require('../pr_modules/user'),
	Writer = require('../pr_modules/writer');

exports.public = function ( req, res, next ) {

	console.log('exports.public: \n')
	console.dir(req.session.user)
	// User is logged in
	if( req.session.user ) {

		var type = req.session.user._type,
			username = req.session.user.username;

		console.log(username + " is logged in")

		if( type === 'writer' ) Writer.findOne({ 'username': username }, handle_user );
		
		else User.findOne({ 'username': username }, handle_user );

		function handle_user ( err, user ) {

			if( err ) console.log('login error ' + err);

			else if( !user ) console.log('no such user to log in...');

			else res.locals.user = user;

			next();
		}

	} else {

		next();
	}
};

exports.user = function ( req, res, next ) {

	console.log('exports.user: \n')
	console.dir(req.session.user)
	// User is logged in
	if( req.session.user ) {

		var type = req.session.user._type,
			username = req.session.user.username;

		console.log(username + " is logged in")

		if( type === 'writer' ) Writer.findOne({ 'username': username }, handle_user );
		
		else User.findOne({ 'username': username }, handle_user );

		function handle_user ( err, user ) {

			if( err ) console.log('login error ' + err);

			else if( !user ) console.log('no such user to log in...');

			else res.locals.user = user;

			next();
		}

	} else {

		res.redirect('/');

	}
};

exports.writer = function ( req, res, next ) {

	if( res.locals.user._type === 'writer' ) {

		console.log('Current user is a writer. \n')

		next();
	}

	else res.redirect('/');
};


exports.login = function ( req, res, next ) {

	var type = req.body.type === 'writer' ? 'writer' : '';

	console.log('Finding user ' + req.body.name + '\n')

	if( type === 'writer' ) Writer.findOne({ 'username': req.body.name }, handle_user );
	
	else User.findOne({ 'username': req.body.name }, handle_user );

	function handle_user ( err, user ) {

		if( err ) console.log('login error ' + err);

		else if( !user ) console.log('no such user to log in...');

		else if( user.authenticate( req.body.pass ) ) req.session.user = user;

		// if( type === 'writer' ) req.session.user._type = 'writer';

		req.session.save();

		next();
	}
};

exports.logout = function ( req, res, next ) {

	req.session.destroy();

	next();
};

exports.signup = function ( req, res, next ) {

	var user = new User({
		email: req.params.email,
		username: req.params.name,
		password: req.params.pass
	});

	user.save(function ( err, user ) {

		if( !err ) req.session.user = user;

		else console.log('signup error ' + err);

		next();

	});
};