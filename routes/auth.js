exports.login = function ( req, res, next ) {
	req.session.auth = true;
	req.session.user = { name: req.params.name };
	next();
};

exports.logout = function ( req, res, next ) {
	req.session.destroy();
	next();
};