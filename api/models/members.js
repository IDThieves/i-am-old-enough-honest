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