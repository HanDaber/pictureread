var mongoose = require('mongoose'),
	db_host, db_name;

// Connect to db depending on environment
if (process.env.MONGOHQ_URL) {
	db_host = process.env.MONGOHQ_URL;
} else {
	mongoose.set('deug', true);
	console.log('using LOCAL db\n');
	db_host = 'localhost';
	db_name = 'pr-dev-08';
}
module.exports = mongoose.connect(db_host, db_name);