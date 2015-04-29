var mongoose 	= require("mongoose");
var schema 		= require("./schema.js");
var Member		= schema.Member;

function getMember(email, callback) {
	Member.findOne({email: email}, function(err, member){
		if (err) {
			return callback(err);
		} else {
			return callback(null, member);
		}
	});
}

module.exports = {
	getMember: getMember
};