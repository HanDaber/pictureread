// Brand

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	brand_properties = {},
	brand_methods = {},
	brandSchema,
	brandModel;



brand_properties.name = { type: String, default: 'No Name' };

brand_properties.image = { type: String, default: 'http://pictureread.s3.amazonaws.com/WkVpNxbLRiGU5L75xfPt_3.png' };

brand_properties.in_stories = [ Schema.Types.ObjectId ];

brandSchema = new Schema( brand_properties );



brand_methods.stories = function() {

	// Story.find
};

brandSchema.methods = brand_methods;



brandModel = mongoose.model( 'Brand', brandSchema );

module.exports = brandModel;

