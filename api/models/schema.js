var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;


var memberSchema = new Schema({
	username: 	{type: String, required: true},
	email: 		{type: String, required: true},
	firstName: 	{type: String, required: true},
	lastName: 	{type: String, required: true},
	signUpDate: {type: Date, required: true},
	approved: 	{type: Boolean, required: true}
});


var Member = mongoose.model('member', memberSchema);

module.exports = {
	Member: Member
};
