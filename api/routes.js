var controller = require('./controller.js');

module.exports = [
	
	{path: "/{file*}",					method: "GET",		config: controller.serveFile},
	{path: '/', 						method: 'GET', 		config: controller.homeView},
	{path: '/login', 					method: 'GET', 		config: controller.loginFacebook},
	{path: '/logout', 					method: 'GET', 		config: controller.logout},
	{path: '/loggedout',				method: 'GET',		config: controller.loggedoutView},
	{path: '/upload',					method: 'GET',		config: controller.upload},
	{path: '/api/image',			    method: 'POST',		config: controller.imageUpload}
];
