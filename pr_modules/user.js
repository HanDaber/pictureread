// User Model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	basic_auth = require('basic-auth-mongoose'),
	user_properties = {},
	user_methods = {},
	userSchema,
	userModel;



user_properties.email = { type: String, default: 'No Email' };

user_properties.edits = [ Schema.Types.ObjectId ];

user_properties._type = { type: String, default: 'user' };

userSchema = new Schema( user_properties );



userSchema.methods = user_methods;



userSchema.plugin( basic_auth );



userModel = mongoose.model( 'User', userSchema );

userModel._properties = user_properties;

userModel._methods = user_methods;



module.exports = userModel;