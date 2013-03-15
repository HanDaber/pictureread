var Story = require('../pr_modules/story')

exports.all = function ( req, res ) {

	var locals = {
		stories: [
			{title: 'GOBLER B STONE AND SCOTT STERN GO TO THE PARK', body: 'Once upon a time'},
			{title: 'Story 2', body: 'The other day'}
		]
	};

			console.log(req.session);

	if( req.session.auth ) locals.user = { auth: true, name: req.session.user.name }

	res.render('stories', locals);

};

exports.get = function ( req, res ) {

	var edits = [{text: 'is cool.'}, {text: 'farted.'}],
		state = req.params.state ? req.params.state : 1;

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

exports.create = function ( req, res, next ) {

		var story = new Story({
			'title': req.body.title,
			'body': req.body.body,
			'image': 'http://aws.edu/pic.jpg',
			// 'includes_brands': req.body.brands
		});

		return story.save(function (err) {
			if (!err) {
				res.send( story );
			} else {
				res.send( false );
				console.log(err);
			}
		});

};