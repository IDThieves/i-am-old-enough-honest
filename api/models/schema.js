<<<<<<< HEAD
var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;


var userSchema = new Schema({
	username: 	{type: String, required: true},
	email: 		{type: String, required: true},
	firstName: 	{type: String, required: true},
	lastName: 	{type: String, required: true},
	signUpDate: {type: Date, required: true},
	approved: 	{type: Boolean, required: true}
});


var User = mongoose.model('user', userSchema);

module.exports = {
	User: User
};
=======
var mongoose = require("mongoose");
var Schema 	 = mongoose.Schema;

var memberSchema = new Schema({
	username   : {type: String, required: true},
	email      : {type: String, required: true},
});

var Member 	= mongoose.model("Member", memberSchema);

module.exports = {
	Member 		: Member
};
>>>>>>> master
