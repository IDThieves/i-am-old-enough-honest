module.exports = {
	db : {
				dbuser 	: 	process.env.DBUSER 			|| require('./creds.json').database.dbuser,
				dbpwd  	: 	process.env.DBPWD 			|| require('./creds.json').database.dbpwd,
				dburl  	: 	process.env.DBURL 			|| require('./creds.json').database.dburl,
	},
	facebook : {
				secret 	: 	process.env.FBSECRET 		|| require('./creds.json').facebook.secret,
				cKey	: 	process.env.FBCKEY 			|| require('./creds.json').facebook.cKey,
				cSecret	: 	process.env.FBCSECRET 		|| require('./creds.json').facebook.cSecret,
	},
	cookie : {
				password: 	process.env.COOKIESECRET 	|| require('./creds.json').cookieSecret
	},
	
	s3: {
				key 	: process.env.S3KEY 	|| require('./creds.json').s3.key,
				secret 	: process.env.S3SECRET 	|| require('./creds.json').s3.secret,
				bucket 	: process.env.S3BUCKET 	|| require('./creds.json').s3.bucket,
				acl 	: process.env.S3ACL 	|| require('./creds.json').s3.acl,
				region 	: process.env.S3REGION 	|| require('./creds.json').s3.region,
	}
};
