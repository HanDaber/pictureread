var url = require('url'),
	redis = require('redis'),
	rtg, 
	redis_export;

// Heroku redistogo connection
if( process.env.REDISTOGO_URL ) {
  rtg   = url.parse( process.env.REDISTOGO_URL );
  redis_export = redis.createClient( rtg.port, rtg.hostname );
  redis_export.auth( rtg.auth.split(':')[1] ); // auth: 1st part is username and 2nd is password separated by ":"
}
// Localhost
else redis_export = redis.createClient();

module.exports = redis_export;