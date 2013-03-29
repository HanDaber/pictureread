var User = require('../pr_modules/user');




exports.public = function ( req, res, next ) {

	// if a user is logged in, fill in res.locals.user
	if( req.session.user ) {

		res.locals.user = req.session.user;

		next();
	}

	else next();
};


exports.user = function ( req, res, next ) {

	// if a user is logged in, fill in res.locals.user
	if( req.session.user ) {

		var type = req.session.user._type,
			username = req.session.user.username;

			console.log(username + ' : ' + type + " is logged in\n");

		User.findOne({ 'username': username }, handle_user );

		function handle_user ( err, user ) {

			if( err ) {

				console.log('login error ' + err);

				res.redirect('/');
			} 

			else if( !user ) {

				console.log('no such user to log in...');

				res.redirect('/');
			}

			else {
				// Success
				res.locals.user = user;

				next();
			}
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

	// if( type === 'writer' ) Writer.findOne({ 'username': req.body.name }, handle_user );
	
	// else 
	User.findOne({ 'username': req.body.name }, handle_user );

	function handle_user ( err, user ) {

		if( err ) {

			console.log('login error ' + err);

			res.redirect('/');
		}

		else if( !user ) {

			console.log('no such user to log in...');
			
			req.session.destroy();

			res.redirect('/');
		}

		else if( user.authenticate( req.body.pass ) ) {

			req.session.user = user;

			req.session.save();

			next();
		}
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