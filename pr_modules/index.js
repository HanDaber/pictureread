/*
	PR Module

	PR = require('pr_module')

	// examples:

	app.post( 

		'/stories/:id/:frame/rewrite', 

		PR
			.story( s_id )
			.frame( f_index )
			.rewrite( 

				req.body,

				cb <= err, new_rewrite
			)
	);

	app.get(

		'/brands/:name/stories',

		PR
			.brand( b_id ).stories( cb ) => cb <= err, stories
	);
	

*/


var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	User = require('./user'),
	Brand = require('./brand'),
	Story = require('./story'),
	PR_properties = {},
	PR_methods = {},
	PR_Schema,
	PR_Model;



// .users( u_id, cb ) => cb( err, user )
// .user( {...}, cb ) => cb( err, new_user )
PR_properties.users = [ User ];

// .brands( cb ) => cb( err, brands )
// .brand( b_id, cb )
// .brand( {...}, cb )
PR_properties.brands = [ Brand ];

// all
// one
// new
// etc...
PR_properties.stories = [ Story ];

PR_Schema = new Schema( PR_properties );



PR_methods.story = function ( s_id ) {
	
};

PR_Schema.methods = PR_methods;



PR_Model = mongoose.model( 'PR_Schema', PR_Schema );

module.exports = PR_Model;