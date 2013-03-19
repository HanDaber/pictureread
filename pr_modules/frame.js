var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Edit = require('./edit'),
	Interaction = require('./interaction');

// ######## Frame #######################################################

var frame_properties = {
  	'image' 			: { type: String, default: 'http://pictureread.s3.amazonaws.com/WkVpNxbLRiGU5L75xfPt_3.png' },
  	'thumbnail' 		: { type: String, default: 'http://pictureread.s3.amazonaws.com/WkVpNxbLRiGU5L75xfPt_3.png' },
	'text' 				: { type: String, default: 'No Story' },
	'edits' 			: [ Edit.schema ],
	'interactions' 		: [ Interaction.schema ]
};

var frame_methods = {};

var frameSchema = new Schema( frame_properties );

frameSchema.methods = frame_methods;

var frameModel = mongoose.model( 'Frame', frameSchema );

module.exports = frameModel;

