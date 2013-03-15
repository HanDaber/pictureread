exports.index = function ( req, res ) {

	var locals = {};

			console.log(req.session);

	if( req.session.auth ) locals.user = { auth: true, name: 'poop' }

	res.render('index', locals);

};

