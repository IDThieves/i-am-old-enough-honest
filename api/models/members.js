var mongoose 	= require("mongoose");
var schema 		= require("./schema.js");
var Member		= schema.Member;

exports.search = function(params, callback) {
	if (params.filter) {
		Member.find(params.query, params.filter, function(err, result){
			if (err) {
				return callback(err);
			}
			return callback(null, result);
		});
	}
	else {
		Member.find(params.query, function(err, result){
			if (err) {
				return callback(err);
			}
			return callback(null, result);
		});
	}
};

exports.findAll = function( callback ) {
	Member.find(function( err, result ) {
		if( err ) {
			callback( err );
		}
		else {
			return callback(null, result);
		}
	});
};
// NB if no member found, returns result of null, not error
exports.findMemberByEmail = function(email, callback) {
	Member.findOne({email: email}, function(err, result){
		if (err) {
			return callback(err);
		}
		else {
			return callback(null, result);
		}
	});
};

exports.findMemberByUsername = function(username, callback) {
	Member.findOne({username: username}, function(err, result){
		if (err) {
			return callback(err);
		}
		else {
			return callback(null, result);
		}
	});
};

exports.addMember = function(newMember, callback) {
	var newMemberObj = new Member(newMember);
	Member.create(newMemberObj, function(err, member){
		if (err) {
			return callback(err);
		}
		else
			return callback(null, member);
	});
};

// sample params: 	{ 	query: {'email': 'foo'},
// 		   				update: {'permissions': 'moderator'}
//
exports.updateMember= function( params, callback ) {
	Member.findOneAndUpdate(params.query, params.update, function(err, result) {
		if (err) {
			return callback(err);
		}
		return callback(null, result);
	});
};

//exports.uploadImage = function(params, imagePath, callback) {
//	Member.findOneAndUpdate(params.query, params.update, function(err, result) {
//		if (err) {
//			return callback(err);
//		} else {
//			if (imagePath) {
//				console.log(result, typeof result);
//				imagePath.attach('receivedImage', {path: imagePath}, function(AttachError){
//					if (AttachError){
//						console.log(AttachError);
//						return callback(AttachError);
//					} else {
//						imagePath.save(function(saveError){
//							if (saveError) {
//								return callback(saveError); 
//							} else {
//								return callback(null, result);
//							}
//						});
//					}
//				});
//			} else {
//				imagePath.save(function(error){
//					if (error) {
//						return callback(error);
//					} else {
//						return callback(null, result);
//					}
//				});
//			}
//		}
//	});
//};
	
//++++++++++++++++++++++//

//exports.uploadID = function(IDData, imagePath, callback) {
//	var newIDObj = new Member(IDData);
//
//	Member.create(newIDObj, function(err0, newID){
//		if (err0) {
//			return callback(err0);
//		}
//		else {
//			newID.attach('IDImage', {path: imagePath}, function(err){
//				if (err) {
//					console.error(err);
//					return callback(err);
//				}
//					
//					else {
//						newID.save(function(err1){
//							if (err) {
//								return callback(err1);
//							}
//							else {
//								return callback(null, newID);
//							}
//						});
//					}
//			});
//		}
//	});
//	
//};



exports.addID = function(memberDocument, imagePath, callback) {
    memberDocument.attach('IDImage', {path: imagePath}, function(err){
        if (err) {
            console.error(err);
            return callback(err);
        }
        else {
            memberDocument.save(function(err1){
                if (err1) {   // <---NB, typo here in your code
                    return callback(err1);
                }
                else {
                    return callback(null, newID);
                }
            });
        }
    });
};
