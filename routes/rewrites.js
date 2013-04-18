var Story = require('../pr_modules/story');



exports.add = function ( req, res, next ) {

console.log(req.body)

	Story.findOne({ slug: req.body.story }).exec( handle_story );

	function handle_story ( err, story ) {

		if( !err ) {

			var pic = story.pictures.id( req.body.picture );

			var rew = pic.rewrites.create({ text: req.body.edits });

			pic.rewrites.push( rew );

			story.save(function (err) {

				res.locals.re = pic.rewrites[pic.rewrites.length - 1];

console.log('re: '+res.locals.re)

				next();
			});
		}
		else res.send( false, 500 );
	}
};
