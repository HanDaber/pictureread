// Story Model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Picture = require('./picture'),
	slug = require('mongoose-slug'),
	story_properties = {},
	story_methods = {},
	storySchema,
	storyModel;



story_properties.title = { type: String, default: 'Story from ' + Date.now };

story_properties._writer = { type: Schema.Types.ObjectId, ref: 'User' };

story_properties._section = { type: Schema.Types.ObjectId, ref: 'Section' };

story_properties.pictures = [ Picture.schema ];

story_properties.published = { type: Boolean, default: false };

story_properties.created = { type: Number, default: Date.now };

storySchema = new Schema( story_properties );



storySchema.index({ slug: 1 });



storySchema.methods = story_methods;



storySchema.plugin( slug('title') );



storyModel = mongoose.model( 'Story', storySchema );

module.exports = storyModel;

