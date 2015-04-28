var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher');

// these functions are called from APIUtils, after we have talked to the server/db
// they all dispatch info to the store.
module.exports = {

	uploadImage: function(data){
		AppDispatcher.dispatch({
            type: ActionTypes.UPLOAD_IMAGE,
            data: data
        });
	}
};