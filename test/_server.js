var lab = exports.lab = require("lab").script();
var assert = require("chai").assert;
var Hapi = require("hapi");
var mongoose = require("mongoose");
var server = require("../api/server");
var Schema = require("../api/models/schema");

lab.experiment("when a user visits a homepage: ", function(){
	
	lab.test("if not authenticated, they should see the landing page", function(done){
		
		var options = {
			url: "/",
			method: "GET"
		};
		
		server.inject(options, function(response){
			
			assert.equal(response.statusCode, 200, "they should get a status code 200");
//			assert.include(response.payload, '<input type="submit" />', "there should be a login button");
			done();
		});
	});
});