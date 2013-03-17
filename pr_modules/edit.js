var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// ######## Edit #######################################################

var edit_properties = {
  	'text'	 			: { type: String, default: 'No Text' },
	'user_id'			: Schema.Types.ObjectId
};

var edit_methods = {};

var editSchema = new Schema( edit_properties );

editSchema.methods = edit_methods;

var editModel = mongoose.model( 'Edit', editSchema );

module.exports = editModel;

