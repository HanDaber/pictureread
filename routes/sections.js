var Section = require('../pr_modules/section');


exports.add = function ( req, res, next ) {

	var section = new Section({
		brand_name: req.body.brand,
		image: req.body.image,
		thumbnail: req.body.thumbnail
	});

	section.save(function (err) {

		res.locals.section = section;

		next();
	});
};


exports.rem = function ( req, res, next ) {

	Section.findOne({ slug: req.params.id }).exec( delete_it );

	function delete_it( err, section ) {
		 section.remove();
		 next();
	}
};


exports.all = function ( req, res, next ) {

	var collection = {
		highlight: false
	};

	Section.find().populate('stories').exec( handle );

	function handle ( err, sections ) {

		if( !err ) {

			collection.sections = sections;

			res.locals.collection = collection;

			console.log('sections.all: ')
			console.dir(collection)

			next();
		}
		else res.redirect('/');
	}
};

exports.highlight = function ( req, res, next ) {

	res.locals.collection.highlight = req.params.brand;

	next();
};