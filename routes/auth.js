var User = require('../pr_modules/user'),
	Writer = require('../pr_modules/writer');

exports.authenticate = function ( req, res, next ) {

	// User is logged in
	if( typeof( req.session.user ) !== 'undefined' ) {

		console.log("User " + req.session.name + " is logged in")

		User.findOne({ 'username': req.session.name }, function ( err, user ) {

			// User authenticated
			if( !err ) {
				
				res.locals.user = user;

				console.log('Current user: \n')

				console.dir(res.locals.user)

			}

			else if( !user ) {
			
				console.log('no such user to log in')

				res.redirect('/'); 
			
			}
			
			else res.redirect('/'); //res.locals.user = false;

			next();

		});

	} else {

		res.redirect('/');
		// res.locals.user = false;

		// next();
	}
};

exports.writer = function ( req, res, next ) {

	if( res.locals.user._type === 'writer' ) {

		console.log('Current user is a writer. \n')

		next();
	}

	else res.redirect('/');
};



exports.admin = function ( req, res, next ) {

	Writer.findOne({ 'username': req.body.name }, function( err, user ) {

		if( err ) {
			
			console.log('login error ' + err);

		} 

		else if( !user ) console.log('no such user to log in')

		else if( user.authenticate( req.body.pass ) ) req.session.user = user;

		next();
	});

};


exports.login = function ( req, res, next ) {

	req.session.user = false;

	User.findOne({ 'username': req.body.name }, function( err, user ) {

		if( err ) {
			
			console.log('login error ' + err);

		} 

		else if( !user ) console.log('no such user to log in')

		else if( user.authenticate( req.body.pass ) ) req.session.user = user;

		next();
	});

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