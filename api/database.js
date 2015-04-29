var mongoose = require("mongoose");
var creds = require("../creds.json");
var db = mongoose(creds.dbuser + ":" + creds.dbpwd + creds.dburl, ['kiwistudents']);

db.on('error',function(err) {
    console.log('database error', err);
});

db.on('ready',function() {
    console.log('database connected');
});

function post(author, title, text) {
	this.author = author;	
	this.title = title;
	this.text = text;
}

function addPost(author, title, content, callback) {
	var newPost = new post(author, title, content);
	db.users.save(newPost, function (err,data){
		if (err) {
			return callback(err, null);
		}
		else {
			console.log('Saved: ',data);
			return callback(null, data);
		}
	});
}

module.exports = {
	addPost: addPost,
	getPost: getPost,
	getAllPosts: getAllPosts
};