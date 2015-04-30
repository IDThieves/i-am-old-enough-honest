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
			profile.isAdmin = member.isAdmin;
			profile.hasAccount = true;
			request.auth.session.clear();
			request.auth.session.set(profile);
			return reply.redirect('/');
		}
		else {
			console.log('Member not found, adding new Member');
			console.dir( profile );
			delete profile.error;
			members.addMember(profile, function(err3, newMember){
				if (err3) {
					console.error(err3);
					console.error('Failed to add new member');
					request.auth.session.clear();
					return reply.redirect( '/loggedout' );
				}
				else {
					console.log('New member added to db');
					console.dir(newMember);
					profile.hasAccount = true;
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

				console.dir("fb:", fb);
				console.log("fb.profile:", fb.profile);
				// var username = fb.profile.displayName || fb.profile.email.replace(/[^\w]/g,'') + (Math.random()*100).toFixed(0);
				var profile = {
					username 	: fb.profile.displayName,
					email 		: fb.profile.email,
					firstName	: fb.profile.name.first,
					lastName	: fb.profile.name.last,
					isApproved  : false,
					IDImage		: null,
					hasAccount	: false,
					isAdmin		: false,
					error 		: null,
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
			return reply.view('logout');
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
			console.log( request.auth.credentials );
			if (request.auth.isAuthenticated) {
				var fb = request.auth.credentials;
				console.log(fb);
				members.findMemberByEmail(fb.email, function(err, member){

					if (err) {
						console.log(err);

					}
					else if (member) {
						if( member.isAdmin ) {
							members.findAll( function( error, membersList ) {
								if( error ) {
									console.log( "Error getting all members: " + error );
								}
								return reply.view('administratorView', {members: membersList});
							});
						}

						else if (member && !member.isApproved) {
							return reply.view('upload', {member: member});
						}

						else if (member && member.isApproved) {

							return reply.view('profile', {member: member});
						}

					}
					else {
						console.log("end");
					}

				});
			}
			else {
				console.log( 'You are not authorised');
				return reply.view('landingPage');
				//return reply('You are not an authorised user.');
			}
		}
	},


	// api routes:
	// api routes:
	imageUpload  : {
		handler: function( request, reply ) {
			return reply( 'Upload Image Request received.');
		}

	},

	upload : {
		handler: function( request, reply) {
			return reply.view('upload');
		}
	},

	memberUpdate  : {
		handler : function( request, reply ) {
			// var alert;
			var data = request.payload.data;
			members.updateMember( { query: { username: data.username, email: data.email },
									update: {isAdmin: (data.permissions === "administrator") ? true : false }
								  }, function( error, result ) {
										if( error ) {
											console.error( error );
											request.auth.session.set('error', error); //TODO don't pass raw errors to user
											return reply( 'Error updating member');
										}
										else {
											// update credentials if current user has had permissions changed
											var creds = request.auth.credentials;
											if( creds.username === data.username ) {
												request.auth.session.set('isAdmin', (data.permissions === "administrator") ? true : false);
												// request.auth.session.set('permissions', data.permissions);
												return reply('Updated administrator. ');
											}
											else {
												return reply('Updated user: ' + data.username );
											}
										}
								  });
		}
	}
};
