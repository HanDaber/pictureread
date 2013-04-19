var Story = require('../pr_modules/story');



exports.add = function ( req, res, next ) {

	console.log(req.body)

	Story.findOne({ slug: req.body.story }).exec( handle_story );

	function handle_story ( err, story ) {

		if( !err ) {

			var pic = story.pictures.id( req.body.picture );

			pic.caption = req.body.caption;

			pic.write = req.body.write;

			story.save(function (err) {

				res.locals.caption = pic.caption;

				next();
			});
		}
		else res.send( false, 500 );
	}
};


exports.rem = function ( req, res, next ) {

	console.log(req.body)

	Story.findOne({ slug: req.body.story }).exec( handle_story );

	function handle_story ( err, story ) {

		if( !err ) {

			var pic = story.pictures.id( req.body.pic );

			pic.caption = [];

			pic.write = [];

			story.save(function (err) {

				res.locals.caption = pic.caption;

				next();
			});
		}
		else res.send( false, 500 );
	}
};

