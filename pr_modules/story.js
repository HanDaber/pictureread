var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Frame = require('./frame');

// ######## Story #######################################################

var story_properties = {
  	'title' 			: { type: String, default: 'No Title' },
	'frames' 			: [ Frame ],
	'writer'			: Schema.Types.ObjectId,
	'publish'			: { type: Boolean, default: false }
};

var story_methods = {};

var storySchema = new Schema( story_properties );

storySchema.methods = story_methods;

var storyModel = mongoose.model( 'Story', storySchema );

module.exports = storyModel;

