var mongoose = require('mongoose'),
	basic_auth = require('basic-auth-mongoose');

var Schema = mongoose.Schema;

// ######## User #######################################################

var user_properties = {
  	'email'	 			: { type: String, default: 'No Email' },
	'edits' 			: [ Schema.Types.ObjectId ] // Edit_ids
};

var user_methods = {
	// 'get_edits': function ( callback ) {
	// 	Edit.find({ 'user_id': this._id }, function ( err, edits ) {
	// 		if( !err ) callback( edits );
	// 		else console.dir('Error in user_methods.edits: ' + err);
	// 	});
	// }
};

var userSchema = new Schema( user_properties, { discriminatorKey : '_type' } );

userSchema.methods = user_methods;

userSchema.plugin( basic_auth );

var userModel = mongoose.model( 'User', userSchema );

module.exports = userModel;

userModel.find(function ( err, users ) { console.log(users.length + ' users') });