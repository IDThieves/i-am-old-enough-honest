var keyMirror = require("react/lib/keyMirror");

module.exports = {
    
    ActionTypes: keyMirror({
        
        //user
		NAVIGATE_TO: null,
        UPLOAD_IMAGE: null,
        
        //Server
        RECEIVE_MEMBER: null

    })
};