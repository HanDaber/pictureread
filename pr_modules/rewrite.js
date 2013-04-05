// Rewrite Model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slug = require('mongoose-slug'),
	rewrite_properties = {},
	rewrite_methods = {};



rewrite_properties.text = [ String ];

rewrite_properties.words = String;

rewrite_properties._user = { type: Schema.Types.ObjectId, ref: 'User' };

rewriteSchema = new Schema( rewrite_properties );



rewriteSchema.pre('save', function (next) {

	this.words = this.text.join(' ')

	next();
});



rewriteSchema.methods = rewrite_methods;



rewriteSchema.plugin( slug('words') );



rewriteModel = mongoose.model( 'Rewrite', rewriteSchema );

module.exports = rewriteModel;


/*



Rewrite:  script[0]



*/