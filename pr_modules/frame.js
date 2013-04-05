// Frame

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	frame_properties = {},
	frame_methods = {},
	frameSchema,
	frameModel;



frame_properties.thumbnail = { type: String, default: '' };

frame_properties.picture = { type: Schema.Types.ObjectId };

frameSchema = new Schema( frame_properties );



frameSchema.methods = frame_methods;



frameModel = mongoose.model( 'Frame', frameSchema );

module.exports = frameModel;

