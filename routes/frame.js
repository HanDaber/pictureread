var Frame = require('../pr_modules/frame');

exports.text = function ( req, res, next ) {

	if( req.body.text === '' ) res.send(false);

	else {

		Frame.findOne({ _id: req.params.id }, function ( err, frame ) {

			if( err ) res.send('false anus');

			if( !frame ) res.send('false poo');

			else {

				var f = frame.add_text( req.body.text );

				f.save(function ( err, doc ) {

					if( err ) res.send(false);

					else {

						res.locals.frame = f;

						next();
					}
				});
			}
		});
	}
};