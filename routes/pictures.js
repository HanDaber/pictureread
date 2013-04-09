var Picture = require('../pr_modules/picture');



exports.get = function ( req, res, next ) {

	Picture.findOne({ _id: req.params.id }).populate('_story').exec( handle );

	function handle ( err, picture ) {

		if( !err ) {

			res.locals.picture = picture;

			console.log('pictures.get: ')
			console.dir(picture)

			next();
		}
		else res.redirect('/');
	}
};
