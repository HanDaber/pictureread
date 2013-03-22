var Story = require('../pr_modules/story');

exports.text = function ( req, res, next ) {

	console.log(req.params.id)

	if( req.body.text === '' ) res.send(false);

	else {

		Story.findOne({ _id: req.params.s_id }, function ( err, story ) {

			if( err ) res.send('false anus');

			if( !story ) res.send('false poo');

			else {

				var f = story.frame( req.params.f_id, function ( err, frame ) {

					frame.add_text( req.body.text );

					frame.save(function ( err, doc ) {

						if( err ) res.send(false);

						else {

							res.locals.frame = doc;

							next();
						}
					});
				});
			}
		});
	}
};