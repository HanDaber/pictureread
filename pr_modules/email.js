// Emails for more info

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	email_properties = {},
	email_methods = {},
	emailSchema,
	emailModel;



email_properties.address = { type: String, default: '' };

emailSchema = new Schema( email_properties );



emailSchema.methods = email_methods;



emailModel = mongoose.model( 'Email', emailSchema );



module.exports = emailModel;