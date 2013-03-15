var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// ######## Brand #######################################################
// Define brand properties
var brand_properties = {
  	'name'	 			: { type: String, default: 'No Name' },
	'in_stories' 		: [ Schema.Types.ObjectId ] // [ Story_id ]
};

var brand_methods = {

	'category': function() {
		return this.type;
	}

};

// Define Listing schema
var brandSchema = new Schema( brand_properties );

brandSchema.methods = brand_methods;

// Define brand Model from schema
var brandModel = mongoose.model( 'Brand', brandSchema );

module.exports = brandModel;

