var mongoose = require('mongoose'),
	basic_auth = require('basic-auth-mongoose');

var Schema = mongoose.Schema;

// ######## User #######################################################

var user_properties = {
  	'email'	 			: { type: String, default: 'No Email' },
	'edits' 			: [ Schema.Types.ObjectId ] // Edit_ids
};

var user_methods = {};

var userSchema = new Schema( user_properties );

userSchema.methods = user_methods;

userSchema.plugin( basic_auth );

var userModel = mongoose.model( 'User', userSchema );

userModel._properties = user_properties;

module.exports = userModel;

userModel.find(function ( err, users ) { console.log(users.length + ' users') });