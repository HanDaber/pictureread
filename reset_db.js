var db = require('./db'),
	User = require('./pr_modules/user'),
	Section = require('./pr_modules/section'),
	Picture = require('./pr_modules/picture'),
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
			if( !err ) save( user );
		});
	} 

	else save( user );
});



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
			if( !err ) save( writer );
		});
	} 

	else save( writer );
});




// // Reset Stories
// Story.find(function (err, stories) {

// 	if( err ) console.log(err);

// 	else {

// 		for( var i = 0, s = stories.length; i < s; i++) {

// 			stories[i].remove(function (err) {
				
// 				if ( err ) console.log(err);

// 			});
// 		}
// 	}
// });



// Reset Sections
Section.find(function (err, sections) {

	if( err ) console.log(err);

	else {

		for( var i = 0, s = sections.length; i < s; i++) {

			sections[i].remove(function (err) {
				
				if ( err ) console.log(err);

			});
		}

		// save_sections();
	}
});

function save_sections () {

	var section_1 = new Section({
			brand_name: 'Scott and Gobler',
			image: '/img/characters.png',
			thumbnail: '/img/characters.png'
		}),
		section_2 = new Section({
			brand_name: 'Philz Coffee',
			image: '/img/philz.png',
			thumbnail: '/img/philz.png'
	});

	var story1 = new Story({
			title: 'Gobbler and Scott go to the park',
			_section: section_1
		}),
		story2 = new Story({
			title: 'Philz grand opening',
			_section: section_2
	});

	var picture1a = {
			image: 'http://pictureread.s3.amazonaws.com/MIuGJLFhS3tTprYw923n_Gob_Sc_AtPark.jpeg',
			thumbnail: 'http://pictureread.s3.amazonaws.com/HRdreCYiQ5OxuFVdFwXH_Gob_Sc_AtPark.jpeg',
			caption: ['Once upon a time', 'went to the', 'and it was', '.']
		},
		picture1b = {
			image: 'http://pictureread.s3.amazonaws.com/RhVQ2BJ6Tc6Ywg1YtePa_Gob_Sc_AtPark_football.jpeg',
			thumbnail: 'http://pictureread.s3.amazonaws.com/DHgUsmlS9SysbqAXRuQA_Gob_Sc_AtPark_football.jpeg'
		},
		picture1c = {
			image: 'http://pictureread.s3.amazonaws.com/DzUobddAQAy6UfpKmpt9_Gob_Sc_AtPark_projecting.jpeg',
			thumbnail: 'http://pictureread.s3.amazonaws.com/3afwAlqTOeMOo4pRGYOp_Gob_Sc_AtPark_projecting.jpeg'
		},
		picture2a = {
			image: 'http://pictureread.s3.amazonaws.com/MIuGJLFhS3tTprYw923n_Gob_Sc_AtPark.jpeg',
			thumbnail: 'http://pictureread.s3.amazonaws.com/HRdreCYiQ5OxuFVdFwXH_Gob_Sc_AtPark.jpeg',
			caption: ['Once upon a time a', 'went to the', 'and it was', '.']
		},
		picture2b = {
			image: 'http://pictureread.s3.amazonaws.com/RhVQ2BJ6Tc6Ywg1YtePa_Gob_Sc_AtPark_football.jpeg',
			thumbnail: 'http://pictureread.s3.amazonaws.com/DHgUsmlS9SysbqAXRuQA_Gob_Sc_AtPark_football.jpeg',
		},
		picture2c = {
			image: 'http://pictureread.s3.amazonaws.com/DzUobddAQAy6UfpKmpt9_Gob_Sc_AtPark_projecting.jpeg',
			thumbnail: 'http://pictureread.s3.amazonaws.com/3afwAlqTOeMOo4pRGYOp_Gob_Sc_AtPark_projecting.jpeg',
	};



	story1.pictures.push( picture1a );
	story1.pictures.push( picture1b );
	story1.pictures.push( picture1c );

	story1.pictures[0].rewrites.push({ text: ['Scott and Gobbler','park','awesome'], _user: user });
	
	story1.pictures[0].interactions.push({ position: [ '22', '67' ], type: 'blurb', media: 'Hello!' });
	story1.pictures[0].interactions.push({ position: [ '62', '42' ], type: 'blurb', media: 'Another!' });

	story1.save(function(err){if(err)console.log(err)});
	
	story2.pictures.push( picture2a );
	story2.pictures.push( picture2b );
	story2.pictures.push( picture2c );

	story2.save(function(err){if(err)console.log(err)});


	
	section_1.stories.push( story1 );

	section_1.save(function(err){if(err)console.log(err)});
	
	section_2.stories.push( story2 );

	section_2.save(function(err){if(err)console.log(err)})
}








function save ( item ) {
	item.save(function ( err, self ) {

		if( !err ) console.log('user' + ' was created.' );

		else console.log('save error ' + err);

	});
}

function print_em () {
	
	Story.find().populate('_section').exec(function (err, stories) {

		console.log(require('util').inspect(stories, true, 10, true));

		setTimeout(function () {

			db.connection.close();

		}, 1000);
	});
}

print_em();

