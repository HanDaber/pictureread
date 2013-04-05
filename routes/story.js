var Story = require('../pr_modules/story'),
	fn = require('underscore');

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

exports.all_json = function ( req, res, next ) {

	Story.find().sort('-created').exec(function (err, stories) {

		if (!err) { res.send( stories ); /*console.dir(stories);*/ }

		else res.send( false );
	});
};


exports.get = function ( req, res, next ) {

	Story.findById(req.params.id, function ( err, story ) {

		if( !err ) {

			res.locals.story = story;

			res.locals.frame = req.params.frame ? req.params.frame : 1;

			next();

		} else {
			
			res.send('Error finding story');

			console.log('error fetching story ' + req.params.id + ': ' + err);

			res.redirect('/')
		}

	});
};

exports.read = function ( req, res, next ) {

	console.log('\n'+req.params.story+'\n')

	Story.findOne({ slug: req.params.story }).populate('_section').exec(function ( err, story ) {

		if( !err ) {

			var pic = parseInt(req.params.picture),
				frame = pic ? pic : 1,
				total_frames = story.pictures.length,
				rewrite;

			res.locals.story = story;
			
			res.locals.frame = frame;

			res.locals.total_frames = total_frames;

			res.locals.picture = story.pictures[( frame - 1 )];



			if( req.query.re ) {

				rewrite = fn.filter( res.locals.picture.rewrites, function ( current ) {
					return current.slug === req.query.re;
				});

				res.locals.rewrite = rewrite[0];

				console.log(rewrite[0])
			}

			next();

		} else {
			
			res.send('Error finding story');

			console.log('error fetching story ' + req.params.id + ': ' + err);

			res.redirect('/read')
		}

	});
};

exports.rewrite = function ( req, res, next ) {
console.log('rewrites: \n')
console.dir(res.locals.picture.rewrites)
	// res.locals.rewrite = res.locals.picture.rewrites;
};




exports.create = function ( req, res, next ) {

	var story = new Story({
		'title': req.body.title,
		'writer': res.locals.user._id
	});

	res.locals.frames = story.add_frames(req.body.frames);

	// console.log('made story \n')
	// console.dir(story)

	// console.log('adding frames \n')
	// console.dir(res.locals.frames)

	story.save(function (err) {

		if( !err ) {

			// console.log('created story ' + story)

			res.locals.story = story;

			next();

		} else {

			res.send( false );

			console.log('story.create save error: ' + err);
		}
	});

};

exports.add_frames = function ( req, res, next ) {

	console.log('res.locals.frames: ')
	console.dir(res.locals.frames)

	Story.findOne( { _id: res.locals.story._id }, function ( err, doc ) {

		console.log('updatin\' stawry frames...')

		if( err ) {

			console.log(err);

			res.send(false);
		}

		if( !doc ) res.send(false);

		else {

			var frames = res.locals.frames;

			doc.frames[0] = frames[0];
			doc.frames[1] = frames[1];
			doc.frames[2] = frames[2];

			doc.save(function (err, story) {

				if( err ) {

					console.log(err)

					res.send(false);
				}

				else {

					console.dir(story)

					res.locals.story = story;

					next();
				}
			});
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