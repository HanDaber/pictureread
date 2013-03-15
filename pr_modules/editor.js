var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// ######## Editor #######################################################
// Define editor properties
var editor_properties = {
  	'name'	 			: { type: String, default: 'No Name' },
  	'email'	 			: { type: String, default: 'No Email' },
  	'pass'	 			: { type: String, default: 'No Pass' },
	'stories' 			: [ Schema.Types.ObjectId ], // [ Story_id ]
	'edits' 			: [ Schema.Types.ObjectId ] // [ Edit_id ]
};

var editor_methods = {

	'authenticate': function( pw ) {
		return this.pass === pw ? true : false;
	}

};

// Define Listing schema
var editorSchema = new Schema( editor_properties );

editorSchema.methods = editor_methods;

// Define editor Model from schema
var editorModel = mongoose.model( 'Editor', editorSchema );

module.exports = editorModel;

