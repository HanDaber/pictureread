// Picture

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Interaction = require('./interaction'),
	Rewrite = require('./rewrite'),
	picture_properties = {},
	picture_methods = {},
	pictureSchema,
	pictureModel;



picture_properties.image = String;

picture_properties.thumbnail = String;

picture_properties.caption = [ String ];

picture_properties.write = [ String ];

picture_properties.interactions = [ Interaction.schema ];

picture_properties.rewrites = [ Rewrite.schema ];

pictureSchema = new Schema( picture_properties );



pictureSchema.methods = picture_methods;



pictureModel = mongoose.model( 'Picture', pictureSchema );

module.exports = pictureModel;

