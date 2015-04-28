var ServerActionCreators = require('../actions/ServerActionCreators');
var Request = require("superagent");

module.exports = {
    
    uploadImage: function(content) {
        Request.post("/upload") //or just "/"
        .send(content)
        .end(function(err, res) {
            if (err) {
                console.log(err);
                throw err;
            }
            ServerActionCreators.uploadImage(res.body); 
        });
    }
};