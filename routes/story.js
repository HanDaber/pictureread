var Story = require('../pr_modules/story');

exports.all = function ( req, res, next ) {

	Story.find(function (err, stories) {

		if (!err) res.locals.stories = stories;

		else {

			res.locals.stories = [{
				title: 'GOBLER B STONE AND SCOTT STERN GO TO THE PARK', 
				body: 'Once upon a time'
			}];
			
			console.log('error in stories.all: ' + err);
		}

		next();
	});
};

exports.get = function ( req, res, next ) {

	Story.findById(req.params.id, function (err, story) {

		if (!err) {

			res.locals.story = story;

			res.locals.frame = req.params.frame ? req.params.frame : 1;

			next();

		} else {
			
			res.send('Error finding story');

			console.log('error fetching story ' + req.params.id + ': ' + err);
		}

	});
};

exports.create = function ( req, res, next ) {

		var story = new Story({
			'title': req.body.title,
			'writer': res.locals.user._id
		});

		story.save(function (err) {

			if( !err ) {

				res.story = story;

				next();

			} else {

				res.send( false );

				console.log('story.create save error: ' + err);
			}
		});

};

exports.destroy = function ( req, res, next ) {

	Story.findById( req.params.id, function (err, story) {

		story.remove(function (err) {

			if( !err ) {

				res.story = story;

				next();

			} else {

				res.send( false );

				console.log('story.destroy remove error: ' + err);
			}
		});

	});

};