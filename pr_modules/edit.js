var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// ######## Edit #######################################################
// Define edit properties
var edit_properties = {
  	'text'	 			: { type: String, default: 'No Text' },
	'for_story' 		: Schema.Types.ObjectId, // Story_id
	'edited_by'			: Schema.Types.ObjectId // Editor_id
};

var edit_methods = {

	'category': function() {
		return this.type;
	}

};

// Define Listing schema
var editSchema = new Schema( edit_properties );

editSchema.methods = edit_methods;

// Define edit Model from schema
var editModel = mongoose.model( 'Edit', editSchema );

module.exports = editModel;

