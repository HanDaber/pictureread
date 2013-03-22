// Writer < User

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	basic_auth = require('basic-auth-mongoose'),
	User = require('./user'),
	writer_properties = Object.create( User._properties ),
	writer_methods = Object.create( User._methods ),
	writerSchema,
	writerModel;



writer_properties.stories = [ Schema.Types.ObjectId ];

writer_properties._type = { type: String, default: 'writer' };

writerSchema = new Schema( writer_properties );



writerSchema.methods = writer_methods;



writerSchema.plugin( basic_auth );



writerModel = mongoose.model( 'Writer', writerSchema );

module.exports = writerModel;