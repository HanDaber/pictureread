var Picture = require('../pr_modules/picture'),
	Story = require('../pr_modules/story');



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


exports.add = function ( req, res, next ) {

	Story.findOne({ slug: req.body.story }).exec(function ( err, story ) {

		if( err ) {

			console.log(err)

			res.send(false)
		}
		else {

			var new_pic = story.pictures.create({ image: req.body.image, thumbnail: req.body.thumbnail });

			story.pictures.push( new_pic );

			story.save(function ( err ) {

				res.locals.pic = new_pic;

				res.locals.frame = req.body.frame + 1;

				next();
			});
		}
	});
}



exports.rem = function ( req, res, next ) {

	console.log(req.body)

	Story.findOne({ slug: req.body.story }).exec(function ( err, story ) {

		if( err ) {

			console.log(err)

			res.send(false)
		}
		else {

			var p = story.pictures.id( req.body.id );

			p.remove();

			story.save(function ( err ) {

				res.locals.story = story;

				next();
			});
		}
	});
}


