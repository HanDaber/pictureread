// Story Model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slug = require('mongoose-slug'),
	Frame = require('./frame'),
	Brand = require('./brand'),
	story_properties = {},
	story_methods = {},
	storySchema,
	storyModel;



story_properties.title = { type: String, default: 'Title ' + Date.now };

story_properties.frames = [ Frame.schema ];

story_properties.brands = [ Brand.schema ];

story_properties.writer = Schema.Types.ObjectId;

story_properties.publish = { type: Boolean, default: false };

story_properties.created = { type: Number, default: Date.now };

storySchema = new Schema( story_properties );



story_methods.add_frames = function ( frames ) {

	for( var i = 0, f = frames.length; i < f; i++ ) {

		var text = frames[i].text === '' ? undefined : frames[i].text,

			image = frames[i].image === '' ? undefined : frames[i].image,

			thumbnail = frames[i].image === '' ? undefined : frames[i].thumbnail;

		var frame = new Frame({ 'text': text,'image': image, 'thumbnail': thumbnail });

		this.frames.push( frame );
	}

	return this.frames;
};

story_methods.frame = function( id, cb ) {

	var frame = this.frames.id( id );

	cb(frame);
};

storySchema.methods = story_methods;



storySchema.plugin( slug('title') );



storyModel = mongoose.model( 'Story', storySchema );

module.exports = storyModel;

