var db = require('./db'),
	User = require('./pr_modules/user'),
	Writer = require('./pr_modules/writer');

var user = new User({
	email: 'test123@test.com',
	username: 'testuser',
	password: 'balls'
});

user.save(function ( err, user ) {

	if( !err ) console.log('user ' + user + ' created.' );

	else console.log('signup error ' + err);

});


var writer = new Writer({
	email: 'test456@test.com',
	username: 'testwriter',
	password: 'balls'
});

writer.save(function ( err, writer ) {

	if( !err ) console.log('writer ' + writer + ' created.' );

	else console.log('signup error ' + err);

});