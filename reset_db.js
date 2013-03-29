var db = require('./db'),
	User = require('./pr_modules/user'),
	Story = require('./pr_modules/story');


// Reset test user
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


// Rest test writer
var writer = new User({
	email: 'test456@test.com',
	username: 'testwriter',
	password: 'pass',
	_type: 'writer'
});

User.findOne({ 'username': writer.username }, function ( err, doc ) {
	
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


// Reset stories
var story = new Story({
	title: 'Gobbler and Scott go to the park'
});

Story.find(function (err, stories) {

	if( err ) console.log(err);

	else {

		for( var i = 0, s = stories.length; i < s; i++) {

			stories[i].remove(function (err) {
				
				if ( err ) console.log(err);

			});
		}

		save_story();
	}
});

function save_story () {
	
	story.frames.push({
		image: 'http://pictureread.s3.amazonaws.com/MIuGJLFhS3tTprYw923n_Gob_Sc_AtPark.jpeg',
		thumbnail: 'http://pictureread.s3.amazonaws.com/HRdreCYiQ5OxuFVdFwXH_Gob_Sc_AtPark.jpeg'
	}, {
		image: 'http://pictureread.s3.amazonaws.com/RhVQ2BJ6Tc6Ywg1YtePa_Gob_Sc_AtPark_football.jpeg',
		thumbnail: 'http://pictureread.s3.amazonaws.com/DHgUsmlS9SysbqAXRuQA_Gob_Sc_AtPark_football.jpeg'
	}, {
		image: 'http://pictureread.s3.amazonaws.com/DzUobddAQAy6UfpKmpt9_Gob_Sc_AtPark_projecting.jpeg',
		thumbnail: 'http://pictureread.s3.amazonaws.com/3afwAlqTOeMOo4pRGYOp_Gob_Sc_AtPark_projecting.jpeg'
	});

	// var l = story.frames.length;

	// for( var i = 0; i < l; i++ ) {

	story.frames[0].interactions.push({media: 'hello', position: [20, 20]});
	story.frames[0].interactions.push({media: 'very cool', position: [30, 60]});
	// }

	story.save(function ( err, s ) {

		if( !err ) console.log('writer ' + s + ' created.' );

		else console.log('signup error ' + err);

	});
}


setTimeout(function () {
	db.connection.close();
}, 1500);