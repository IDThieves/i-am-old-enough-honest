var Bell 	= require('bell');
var Path 	= require('path');
// var Joi 	= require('joi');
var members = require('./models/members.js');
var config 	= require('./config');

/////////////
// Helpers //
/////////////

/////////////
// Handlers//
/////////////

module.exports = {

	serveFile: {
		auth: false,
		handler: {
			directory: {
				path: '../public'
			}
		}
	},

	loginFacebook: {
		 auth: {
			strategy: 'facebook'
		 },
		 handler: function (request, reply) {
			if (request.auth.isAuthenticated) {
				var fb = request.auth.credentials;
				console.dir("fb:", fb);
				console.log("fb.profile:", fb.profile);
				var username = fb.profile.displayName || fb.profile.email.replace(/[^\w]/g,'') + (Math.random()*100).toFixed(0);
				var profile = {
					username 	: username,
					email 		: fb.profile.email,
					error 		: null,
					firstName	: fb.profile.name.first,
					lastName	: fb.profile.name.last,
					IDImage		: null,
					hasAccount	: false,
					isAdmin		: false
				};
				
				members.findMemberByUsername(profile.username, function(err, member){
					if (err) console.log(err);
					
					if (member) profile.hasAccount = true;
					
					console.log('Profile:');
					console.dir(profile);
					request.auth.session.clear();
					request.auth.session.set(profile);
					return profile.hasAccount ? reply.redirect("/") : reply.redirect("/login");
					
				});
				
			}
			else {
				return reply.redirect('/loggedout');
			}
		}
	},

	logout: {
		handler: function (request, reply){
			request.auth.session.clear();
			return reply.redirect('/loggedout');
		}
	},

	loggedoutView: {
		auth: false,
		handler: function (request, reply) {
			return reply('Logged out');
		}
	},

	homeView: {
		handler: function (request, reply ){
			if (request.auth.isAuthenticated) {
				var fb = request.auth.credentials;
				console.log(fb);
				members.findMemberByEmail(fb.email, function(err, member){
					
					if (err) {
						console.log(err);
						
					} else if (member) {
						return reply.view('profile', {members: members});
					} else {
						console.log("end");
					}
					
				}); 
				
			}
			else {
				console.log( 'You are not authorised');
				return reply('You are not an authorised user.');
			}
		}
	},


	// api routes:
	imageUpload  : {
		handler: function( request, reply ) {
			return reply( 'Upload Image Request received.');
		}

	}
};