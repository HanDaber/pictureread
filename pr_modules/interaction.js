var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// ######## Interaction #######################################################

var interaction_properties = {
  	'position'	 		: { type: Array, default: [ 0, 0 ] },
  	'icon'				: { type: String, default: 'http://s3.aws.com/pic/82382365' },
  	'action'			: { type: String }
};

var interaction_methods = {};

var interactionSchema = new Schema( interaction_properties );

interactionSchema.methods = interaction_methods;

var interactionModel = mongoose.model( 'Interaction', interactionSchema );

module.exports = interactionModel;

