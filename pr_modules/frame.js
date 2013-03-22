// Frame

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Brand = require('./brand'),
	Rewrite = require('./rewrite'),
	Interaction = require('./interaction'),
	frame_properties = {},
	frame_methods = {},
	frameSchema,
	frameModel;



frame_properties.image = { type: String, default: 'http://pictureread.s3.amazonaws.com/WkVpNxbLRiGU5L75xfPt_3.png' };

frame_properties.thumbnail = { type: String, default: 'http://pictureread.s3.amazonaws.com/WkVpNxbLRiGU5L75xfPt_3.png' };

frame_properties.text = { type: String, default: 'No Story' };

frame_properties.rewrites = [ Rewrite.schema ];

frame_properties.brands = [ Brand.schema ];

frame_properties.interactions = [ Interaction.schema ];

frameSchema = new Schema( frame_properties );



frame_methods.add_text = function ( string ) {

	this.text = string;

	return this;
};

frameSchema.methods = frame_methods;



frameModel = mongoose.model( 'Frame', frameSchema );

module.exports = frameModel;

