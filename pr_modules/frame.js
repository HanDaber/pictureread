var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Edit = require('./edit'),
	Interaction = require('./interaction');

// ######## Frame #######################################################

var frame_properties = {
  	'src' 				: { type: String, default: '/logo.png' },
	'text' 				: { type: String, default: 'No Story' },
	'edits' 			: [ Edit ],
	'interactions' 		: [ Interaction ]
};

var frame_methods = {};

var frameSchema = new Schema( frame_properties );

frameSchema.methods = frame_methods;

var frameModel = mongoose.model( 'Frame', frameSchema );

module.exports = frameModel;

