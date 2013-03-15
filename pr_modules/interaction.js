var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// ######## Interaction #######################################################
// Define interaction properties
var interaction_properties = {
  	'position'	 		: { type: Array, default: [ 0, 0 ] },
  	'icon'				: { type: String, default: 'http://s3.aws.com/pic/82382365' },
  	'action'			: { type: String },
	'for_story' 		: Schema.Types.ObjectId // Story_id
};

var interaction_methods = {

	'category': function() {
		return this.type;
	}

};

// Define Listing schema
var interactionSchema = new Schema( interaction_properties );

interactionSchema.methods = interaction_methods;

// Define interaction Model from schema
var interactionModel = mongoose.model( 'Interaction', interactionSchema );

module.exports = interactionModel;

