var Bell 	= require('bell');
var Path 	= require('path');
var members = require('./models/members.js');
var config 	= require('./config');
//var trash 	= require('./models/trash');

/////////////
// Helpers //
/////////////
var findOrAddMember = function( request, reply, profile ) {
	// look up in database and if not found, then add to the database as a publisher
	members.findMemberByEmail( profile.email, function( err1, member ){
		console.log(member)
		if(err1) {
			request.auth.session.clear();
			return reply.redirect( '/loggedout' );
		}
		else if (member) {
			profile.isAdmin = member.isAdmin;
			profile.hasAccount = true;
			request.auth.session.clear();
			request.auth.session.set(profile);
			return reply.redirect('/');
		}
		else {
			delete profile.error;
			members.addMember(profile, function(err3, newMember){
				if (err3) {
					request.auth.session.clear();
					return reply.redirect( '/loggedout' );
				}
				else {
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
			if (request.auth.isAuthenticated) {
				var fb = request.auth.credentials;
				members.findMemberByEmail(fb.email, function(err, member){

					if (err) {

					}
					else if (member) {
						if( member.isAdmin ) {
							members.findAll( function( error, membersList ) {
								if( error ) {
								}
								return reply.view('administratorView', {members: membersList});
							});
						}

						else if (member && !member.isApproved) {
							return reply.view('upload', {member: member});
						}
                        
//                        else if (member && !member.isApproved && (member.IDImage !== null)) {
//                            return reply.view('success', {member: member});
//                        }

						else if (member && member.isApproved) {

							return reply.view('profile', {member: member});
						}

					}
					else {
					}

				});
			}
			else {

				return reply.view('landingPage');

				//return reply('You are not an authorised user.');
			}
		}
	},
    

    
    imageUpload: {
        payload: {
                maxBytes: 209715200,
                output: 'file',
                parse: true
            },
        handler: function(request, reply) {
            var userName = request.auth.credentials.username;
            members.findMemberByUsername(userName, function(err, member){
                if (err) {
                    return reply.view('upload', {error: err});
                } else if (member) {
                    var IDImagePath = request.payload.uploadedIDname.path;
                    members.addID(member, IDImagePath, function(err1){
                            console.log("add id error", err1);
                        if (err1){
                            return reply.view('upload', {error: err1, member: member});
                        } else {
                            console.log("SUCCESSFUL...............");
                            return reply.redirect('/success');
                        }
                    });
                }
            });
        }
    },
	
    success: {
		handler: function (request, reply){
            console.log("success handler working!!");
			return reply.view('success');
		}
	},
    
	updateIDApproval: {
		handler: function( request, reply ) {
			var data = request.payload.data;
			members.updateMember( data, function( error, result ) {
				if( error ) {
					request.auth.session.set('error', error); //TODO don't pass raw errors to user
					return reply('Error updating member');
				}
				else {
					return reply('Updated user: ' + data.username );
				}
			});
		}	
	},
	updateRights  : {
		handler : function( request, reply ) {
			// var alert;
			var data = request.payload.data;
			members.updateMember( data, function( error, result ) {
				if( error ) {
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
