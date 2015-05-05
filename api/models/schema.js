var mongoose 	= require('mongoose');
var crate 		= require('mongoose-crate');
var S3 			= require('mongoose-crate-s3');
var ImageMagick = require('mongoose-crate-imagemagick');
var config		= require('../config.js').s3;

var Schema 		= mongoose.Schema;
//var ObjectId 	= mongoose.Schema.Types.ObjectId;


var memberSchema = new Schema({
	username: 	{type: String, required: true},
	email: 		{type: String, required: true},
	firstName: 	{type: String, required: true},
	lastName: 	{type: String, required: true},
	isApproved: {type: Boolean, required: true},
	isAdmin:    {type: Boolean, required: true},
	hasAccount: {type: Boolean, required: true},
});


memberSchema.plugin(crate, {
 	storage: new S3({
 		key: 	config.key,
 		secret: config.secret,
 		bucket: config.bucket,
 		acl: 	config.acl,
 		region: config.region,
 	}),
 	fields: {
 		IDImage: {
 			processor: new ImageMagick({
 				// tmpDir: '/tmp', // Where transformed files are placed before storage, defaults to os.tmpdir()
 				// formats: ['JPEG', 'GIF', 'PNG'], // Supported formats, defaults to ['JPEG', 'GIF', 'PNG', 'TIFF']
 				transforms: {
 					original: {
 						// keep the original file
 					},
 					small: {
 						resize: '200x200^',
 						gravity: 'center',
 						extent: '200x200',
 						format: '.jpg'
 					},
 					medium: {
 						resize: '300x300^',
 						gravity: 'center',
 						extent: '300x300',
 						format: '.jpg'
 					},
 					large: {
 						resize: '500x500^',
 						gravity: 'center',
 						extent: '500x500',
 						format: '.jpg'
 					}
 				}
 			})
 		}
 	}
});


var Member = mongoose.model('member', memberSchema);

module.exports = {
	Member: Member
};
