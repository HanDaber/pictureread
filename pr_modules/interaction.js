// Interaction

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	interaction_properties = {},
	interaction_methods = {},
	interactionSchema,
	interactionModel;



interaction_properties.position = { type: Array, default: [ '0', '0' ] };

// interaction_properties.icon = { type: String, default: 'http://s3.aws.com/pic/82382365' };

interaction_properties.type = { type: String, default: 'blurb' };

interaction_properties.title = { type: String, default: 'New Object' };

interaction_properties.media = String;

interactionSchema = new Schema( interaction_properties );



interactionSchema.methods = interaction_methods;



interactionModel = mongoose.model( 'Interaction', interactionSchema );

module.exports = interactionModel;

