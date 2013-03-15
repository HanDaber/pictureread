var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Edit = require('./edit'),
	Interaction = require('./interaction');

// ######## Story #######################################################
// Define story properties
var story_properties = {
  	'title' 			: { type: String, default: 'No Title' },
	'body' 				: { type: String, default: 'Once upon a time...' },
	'image' 			: { type: String, default: 'http://www.google.com' },
	'includes_brands' 	: [ Schema.Types.ObjectId ], // [ Brand_id ]
	'edits' 			: [ Edit ],
	'interactions' 		: [ Interaction ]
};

var story_methods = {

	'category': function() {
		return this.type;
	}

};

// Define Listing schema
var storySchema = new Schema( story_properties );

storySchema.methods = story_methods;

// Define story Model from schema
var storyModel = mongoose.model( 'Story', storySchema );

module.exports = storyModel;

