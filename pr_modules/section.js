// Section

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slug = require('mongoose-slug'),
	section_properties = {},
	section_methods = {},
	sectionSchema,
	sectionModel;



section_properties.brand_name = { type: String, default: '' };

section_properties.image = { type: String, default: '' };

section_properties.thumbnail = { type: String, default: '' };

section_properties.stories = [{ type: Schema.Types.ObjectId, ref: 'Story' }];

sectionSchema = new Schema( section_properties );



sectionSchema.index({ slug: 1 });



sectionSchema.methods = section_methods;



sectionSchema.plugin( slug('brand_name') );



sectionModel = mongoose.model( 'Section', sectionSchema );

module.exports = sectionModel;

sectionModel.find().exec( handle );

function handle ( err, sections ) {

	if( err ) console.log(err);

	else {
		require('underscore').each( sections, function (s, i) {
			
			console.log('section ' + i)
			console.dir(s.toObject())
		});
	}
}

