var Story = require('../pr_modules/story');

exports.get = function ( req, res, next ) {

	Story.findOne({ _id: req.params.s_id }, function ( err, story ) {

		if( err ) res.send('err in frame.js:exports.get');

		if( !story ) res.send('false story');

		else {

			var frame = story.frames.id( req.params.f_id );

			res.locals.frame = frame;

			next();
		}
	});
};

exports.add_obj = function ( req, res, next ) {

	if( req.body.text === '' ) res.send(false);

	else {

		Story.findOne({ _id: req.params.s_id }, function ( err, story ) {

			if( err ) res.send('err in frame.js:exports.add_obj');

			if( !story ) res.send('false story');

			else {

				story.frame( req.params.f_id, function ( frame ) {

					var new_object = frame.add_interaction( req.body );

					story.save(function ( err ) {

						console.log('saving...')

						if( err ) res.send(false);

						else {

							console.log(new_object)

							res.locals.interaction = new_object;

							next();
						}
					});

				});
			}
		});
	}
};