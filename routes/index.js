exports.index = function ( req, res ) {

	var locals = {};

			console.log(req.session);

	if( req.session.auth ) locals.user = { auth: true, name: 'poop' }

	res.render('index', locals);

};

exports.stories = function ( req, res ) {

	var locals = {};

			console.log(req.session);

	if( req.session.auth ) locals.user = { auth: true, name: req.session.user.name }

	res.render('stories', locals);

};

exports.story = function ( req, res ) {

	var edits = [{text: 'is cool.'}, {text: 'farted.'}],
		state = (typeof( req.params.state ) === 'number') ? req.params.state : 1;

	var story = {
		title: 'Billy\'s story',
		body: 'Billy'
	};

	var PR = {
		
		story: req.params.number,

		state: state
	};

	console.dir(PR)

	res.render( 'story', PR );
};

exports.login = function ( req, res, next ) {
	req.session.auth = true;
	req.session.user = { name: req.params.name };
	next();
};

exports.logout = function ( req, res, next ) {
	req.session.destroy();
	next();
};