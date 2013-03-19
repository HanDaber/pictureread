var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Frame = require('./frame');

// ######## Story #######################################################

var story_properties = {
  	'title' 			: { type: String, default: 'No Title' },
	'frames' 			: [ Frame.schema ],
	'writer'			: Schema.Types.ObjectId,
	'publish'			: { type: Boolean, default: false },
	'created'			: { type: Number, default: Date.now }
};

var story_methods = {

	// frames: [] => []
	'add_frames': function ( frames ) {
		
		for( var i = 0, f = frames.length; i < f; i++) {

			var text = frames[i].text === '' ? undefined : frames[i].text,
				image = frames[i].image === '' ? undefined : frames[i].image,
				thumbnail = frames[i].image === '' ? undefined : frames[i].thumbnail;

			var frame = new Frame({ 'text': text,
									'image': image,
									'thumbnail': thumbnail });

			this.frames.push( frame );
		}

		return this.frames;
	}
};

var storySchema = new Schema( story_properties );

storySchema.methods = story_methods;

var storyModel = mongoose.model( 'Story', storySchema );

module.exports = storyModel;

