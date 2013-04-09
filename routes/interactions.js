var Story = require('../pr_modules/story');



exports.add = function ( req, res, next ) {

	console.log(req.body)

	Story.findOne({ _id: req.body.story }).exec( handle_story );

	function handle_story ( err, story ) {

		if( !err ) {

			var pic = story.pictures.id( req.body.pic ),
				new_int = {
					position: req.body.position,
					type: req.body.type,
					media: req.body.media
				};

			pic.interactions.push( new_int );

			story.save(function (err) {

				res.locals.interaction = new_int;

				next();
			});
		}
		else res.send( false, 500 );
	}
};


exports.rem = function ( req, res, next ) {

	Story.findOne({ slug: req.body.story }).exec( seek_and_destroy );

	function seek_and_destroy ( err, story ) {

		var pic = story.pictures.id( req.body.pic );

		pic.interactions.id( req.params.id ).remove();
	}
};



