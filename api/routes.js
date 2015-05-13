var controller = require('./controller.js');

module.exports = [
	
	{path: "/{file*}",					method: "GET",		config: controller.serveFile},
	{path: '/', 						method: 'GET', 		config: controller.homeView},
	{path: '/login', 					method: 'GET', 		config: controller.loginFacebook},
	{path: '/logout', 					method: 'GET', 		config: controller.logout},
	{path: '/loggedout',				method: 'GET',		config: controller.loggedoutView},
	{path: '/success',				    method: 'GET',		config: controller.success},
	{path: '/api/image',			    method: 'POST',		config: controller.imageUpload},
	{path: '/api/update/rights',    	method: 'POST',		config: controller.updateRights},
	{path: '/api/update/approval',    	method: 'POST',		config: controller.updateIDApproval}
];
