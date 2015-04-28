var Hapi 	= require('hapi');
var Bell 	= require('bell');
var Cookie 	= require('hapi-auth-cookie');
var Path 	= require('path');
var routes 	= require('./routes');
var config 	= require('./config');

var host = 'localhost';
if (process.env.PORT) host = '0.0.0.0';
var serverOptions 	= {port: (process.env.PORT || 3000 ), host: '0.0.0.0' }; //host: host

var server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: Path.join(__dirname, '../public')
			}
		}
	}
});

server.connection(serverOptions);

server.register([Bell, Cookie], function (err) {
	if (err) console.error(err);

	server.auth.strategy('session', 'cookie',{
		password: config.cookie.password,
		cookie: 'sid',
		redirectTo: '/loggedout',
		redirectOnTry: false,
		isSecure: false
	});

	server.auth.strategy('facebook', 'bell', {
		provider: 'facebook',
		password: config.facebook.secret,
		isSecure: false,
		clientId: config.facebook.cKey,
		clientSecret: config.facebook.cSecret
	});

	console.log( 'Secret: ' + config.facebook.secret);
	console.log( 'CID: ' + config.facebook.cKey);
	console.log( 'CSecret: ' + config.facebook.cSecret);
    

	server.auth.default('session');
	server.route(routes);
   
});



// GOOD error reporting
var goodOptions = {
	opsInterval: 60 * 1000,
	reporters: [{
		reporter: require('good-console'),
		events: {log: '*', error: '*', response: '*'}
	}]
};

server.register({
	register: require('good'),
	options: goodOptions
}, function (err) { if (err) console.error(err); });

module.exports = server;




