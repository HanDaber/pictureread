var db = require('./db'),
	User = require('./pr_modules/user'),
	Writer = require('./pr_modules/writer'),
	Story = require('./pr_modules/story');

var user = new User({
	email: 'test123@test.com',
	username: 'testuser',
	password: 'pass'
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
	password: 'pass'
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

Story.find(function (err, stories) {

	if( err ) console.log(err);

	else {

		for( var i = 0, s = stories.length; i < s; i++) {

			stories[i].remove(function (err) {
				
				if ( err ) console.log(err);

			});
		}
	}
});

setTimeout(function () {
	db.connection.close();
}, 1500);