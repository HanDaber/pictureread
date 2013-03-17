var mongoose = require('mongoose'),
	basic_auth = require('basic-auth-mongoose');

var Schema = mongoose.Schema;

// ######## Writer #######################################################

var writer_properties = {
	'email'	 			: { type: String, default: 'No Email' },
	'edits' 			: [ Schema.Types.ObjectId ], // Edit_ids
	'stories' 			: [ Schema.Types.ObjectId ] // [ Story_id ]
};

var writer_methods = {};

var writerSchema = new Schema( writer_properties, { discriminatorKey : '_type' } );

writerSchema.methods = writer_methods;

writerSchema.plugin( basic_auth );

var writerModel = mongoose.model( 'Writer', writerSchema );

module.exports = writerModel;

writerModel.find(function ( err, writers ) { console.log(writers.length + ' writers') });