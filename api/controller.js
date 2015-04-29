var Bell 	= require('bell');
var Path 	= require('path');
// var Joi 	= require('joi');
var members = require('./models/members.js');
var config 	= require('./config');

/////////////
// Helpers //
/////////////
var findOrAddMember = function( request, reply, profile ) {
	// look up in database and if not found, then add to the database as a publisher
	members.findMemberByEmail( profile.email, function( err1, member ){
		console.log('Looking up member');
		if(err1) {
			console.error(err1);
			request.auth.session.clear();
			return reply.redirect( '/loggedout' );
		}
		else if (member) {
			console.log('Found member:');
			console.dir(member);
			profile.permissions = member.permissions;
			request.auth.session.clear();
			request.auth.session.set(profile);
			return reply.redirect('/');
		}
		else {
			console.log('Member not found, adding new Member');
		
			members.addMember(newMember, function(err3, newMember){
				if (err3) {
					console.error(err3);
					console.error('Failed to add new member');
					request.auth.session.clear();
					return reply.redirect( '/loggedout' );
				}
				else {
					console.log('New member added to db');
					console.dir(newMember);
					profile.permissions = newMember.permissions;
					profile.username = newMember.username;
					request.auth.session.clear();
					request.auth.session.set(profile);
					return reply.redirect('/');
				}
			});
		}
	});
};
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
				console.dir(fb);
				var profile = {
					username 	    : fb.profile.displayName,
					email 		    : fb.profile.email,
					firstName	    : fb.profile.name.first,
					lastName	    : fb.profile.name.last,
					idImage		    : null,
					isAdministrator : false,
					error 		    : null
				};
				console.log('Profile:');
				console.dir(profile);
				// request.auth.session.clear();
				// request.auth.session.set(profile);
				return findOrAddMember( request, reply, profile );
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
		auth: {
			mode: 'try'
		},
		handler: function (request, reply ){
			if (request.auth.isAuthenticated) {
				members.findAll( function( error, membersList ) {
					if( error ) {
						console.log( "Error getting all members: " + error );
					}
					return reply.view('administratorView', {members: membersList});
				});
			}
			else {
				console.log( 'You are not authorised');
				return reply.redirect( '/login');
				//return reply('You are not an authorised user.');
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