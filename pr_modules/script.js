// Script Model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	script_properties = {},
	script_methods = {};



script_properties.script = [ String ];

script_properties.edits = [ Edit ];

script_properties.script_first = { type: Boolean, default: true };

scriptSchema = new Schema( script_properties );



scriptSchema.methods = script_methods;



scriptModel = mongoose.model( 'Script', scriptSchema );

module.exports = scriptModel;


/*



script:  script[0]



*/