// Frame

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Rewrite = require('./rewrite'),
	Interaction = require('./interaction'),
	frame_properties = {},
	frame_methods = {},
	frameSchema,
	frameModel;



frame_properties.image = { type: String, default: 'http://pictureread.s3.amazonaws.com/WkVpNxbLRiGU5L75xfPt_3.png' };

frame_properties.thumbnail = { type: String, default: 'http://pictureread.s3.amazonaws.com/WkVpNxbLRiGU5L75xfPt_3.png' };

frame_properties.caption = [ String ]; // type: String, default: 'No Caption' };

frame_properties.rewrites = [ Rewrite.schema ];

frame_properties.interactions = [ Interaction.schema ];

frameSchema = new Schema( frame_properties );



frame_methods.add_caption = function ( string ) {

	this.caption.push(string);

	return this;
};

frame_methods.add_interaction = function ( object ) {

	var position = object.position === [] ? undefined : object.position,

		type = object.type === '' ? undefined : object.type,

		media = object.media === '' ? undefined : object.media,

		title = object.title === '' ? undefined : object.title;

	var interaction = new Interaction({ 'title': title,'type': type, 'position': position, 'media': media });

	this.interactions.push( interaction );

	return interaction;
};

frameSchema.methods = frame_methods;



frameModel = mongoose.model( 'Frame', frameSchema );

module.exports = frameModel;

