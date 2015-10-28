var lab = exports.lab = require("lab").script();
var assert = require("chai").assert;
var Hapi = require("hapi");
var mongoose = require("mongoose");
var server = require("../api/server");
var Schema = require("../api/models/schema");


lab.experiment("when a new user signs up successfully: ", function(){
	lab.test("they should be redirected", function(done){
		
		var options = {
			url: "/login",
			method: "GET"
		};
		
		server.inject(options, function(response){
			assert.equal(response.statusCode, 302, "they should get a Found 302 status code");
			done();
		});
	});
});

lab.experiment("when a user visits a homepage: ", function(){
	lab.test("if not authenticated, they should see the landing page", function(done){
		
		var options = {
			url: "/",
			method: "GET"
		};
		
		server.inject(options, function(response){
			
			assert.equal(response.statusCode, 200, "they should get a status code 200");
			assert.include(response.payload, '<input id="login" type="submit"', "there should be a login button");
			done();
		});
	});
});

lab.experiment("when a photo is submitted: ", function(){
	lab.test("they should be redirected to the success page", function(done){
		
		var options = {
			url: "/success",
			method: "GET"
		};
		
		server.inject(options, function(response){
			assert.equal(response.statusCode, 302, "they should get a Found 302 status code");
			done();
		});
	});
});


//lab.experiment("when a photo is submitted: ", function(){
//	lab.test("they should be redirected to the success page", function(done){
//		
//		var options = {
//			url: "/api/image",
//			method: "POST"
//		}
//		
//		server.inject(options, function(response){
//			console.log("IMAGE PAYLOAD***********", response);
//			
//			done();
//		});
//	});
//});
