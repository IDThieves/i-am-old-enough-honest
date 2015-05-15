//var lab = exports.lab = require("lab").script();
//var assert = require("chai").assert;
//var Hapi = require("hapi");
//var server = require("../api/server.js");
//
//lab.experiment("Testing our API: ", function(){
//	
//	lab.test("sending a POST request to /api/image", function(done){
//		
//		var options = {
//			url: "/api/image",
//			method: "POST",
//			payload: {
//				IDImage: { large:
//				  { type: 'image/jpeg',
//					name: '1431609540125-43248-f03fd5cb5662d8c1',
//					url: 'https://kiwi-idimage.s3-eu-west-1.amazonaws.com/d092e5d8d0892f2c87e4.jpg',
//					size: 122472,
//					height: 500,
//					width: 500,
//					depth: 8,
//					format: 'JPEG' },
//				 medium:
//				  { type: 'image/jpeg',
//					name: '1431609540125-43248-f03fd5cb5662d8c1',
//					url: 'https://kiwi-idimage.s3-eu-west-1.amazonaws.com/722606a20850fa852fdc.jpg',
//					size: 55289,
//					height: 300,
//					width: 300,
//					depth: 8,
//					format: 'JPEG' },
//				 small:
//				  { type: 'image/jpeg',
//					name: '1431609540125-43248-f03fd5cb5662d8c1',
//					url: 'https://kiwi-idimage.s3-eu-west-1.amazonaws.com/0eddd337f530691cf201.jpg',
//					size: 29253,
//					height: 200,
//					width: 200,
//					depth: 8,
//					format: 'JPEG' },
//				 original:
//				  { type: 'image/png',
//					name: '1431609540125-43248-f03fd5cb5662d8c1',
//					url: 'https://kiwi-idimage.s3-eu-west-1.amazonaws.com/9535527b7d0c6804f7f5.',
//					size: 1819449,
//					height: 1050,
//					width: 1204,
//					depth: 8,
//					format: 'PNG' 
//					} } 
//						}
//		};
//		
//		server.inject(options, function(response){
//			assert.equal(response.statusCode, 200, "they should get a status code (200)");
//			done();
//		});
//		
//	});
//});