// Interaction

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	media_properties = {},
	media_methods = {},
	mediaSchema,
	mediaModel;



media_properties.type = { type: String, default: 'text' };

media_properties.source = { type: String };

mediaSchema = new Schema( media_properties );



mediaSchema.methods = media_methods;



mediaModel = mongoose.model( 'Media', mediaSchema );

module.exports = mediaModel;

