var db = require('./db'),
	User = require('./pr_modules/user'),
	Writer = require('./pr_modules/writer');

var user = new User({
	email: 'test123@test.com',
	username: 'testuser',
	password: 'balls'
});

User.findOne({ 'username': user.username }, function ( err, doc ) {
	
	if( err ) console.log(err)
	
	else if( doc ) {

		doc.remove(function ( err ) {
			if( !err ) save_user();
		});
	} 

	else save_user();
});

function save_user () {
	user.save(function ( err, user ) {

		if( !err ) console.log('user ' + user + ' created.' );

		else console.log('signup error ' + err);

	});
}

var writer = new Writer({
	email: 'test456@test.com',
	username: 'testwriter',
	password: 'balls'
});

Writer.findOne({ 'username': writer.username }, function ( err, doc ) {
	
	if( err ) console.log(err)
	
	else if( doc ) {

		doc.remove(function ( err ) {
			if( !err ) save_writer();
		});
	} 

	else save_writer();
});

function save_writer () {
	writer.save(function ( err, writer ) {

		if( !err ) console.log('writer ' + writer + ' created.' );

		else console.log('signup error ' + err);

	});
}

setTimeout(function () {
	db.connection.close();
}, 1500);