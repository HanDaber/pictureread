// Rewrite Model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	rewrite_properties = {},
	rewrite_methods = {};



rewrite_properties.script = [ String ];

rewrite_properties.edits = [ String ];

rewrite_properties.script_first = { type: Boolean, default: true };

rewrite_properties.user_id = Schema.Types.ObjectId;

rewriteSchema = new Schema( rewrite_properties );



rewriteSchema.methods = rewrite_methods;



rewriteModel = mongoose.model( 'Rewrite', rewriteSchema );

module.exports = rewriteModel;


/*



Rewrite:  script[0]



*/