var mongoose = require('mongoose'),
	basic_auth = require('basic-auth-mongoose'),
	User = require('./user');

var Schema = mongoose.Schema;

// ######## Writer #######################################################

var writer_properties = Object.create( User._properties );

 // {
	// 'email'	 			: { type: String, default: 'No Email' },
	// 'edits' 			: [ Schema.Types.ObjectId ], // Edit_ids
writer_properties.stories = [ Schema.Types.ObjectId ]; // [ Story_id ]
// writer_properties._type = 'writer';
// };

var writer_methods = {
	'_type': function () {
		return 'writer';
	}
};

var writerSchema = new Schema( writer_properties );

writerSchema.methods = writer_methods;

writerSchema.plugin( basic_auth );

var writerModel = mongoose.model( 'Writer', writerSchema );

module.exports = writerModel;

writerModel.find(function ( err, writers ) { console.log(writers.length + ' writers') });