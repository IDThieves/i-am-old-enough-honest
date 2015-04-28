var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var APIUtils = require('../utils/APIUtils')

module.exports = {
    
    navigateTo: function(info) {
        var route = info;
        AppDispatcher.dispatch({
            type: ActionTypes.NAVIGATE_TO,
            route: route
        });
    },
    
    uploadImage: function(content) {
//        AJAX stuff
        APIUtils.uploadImage(content);
    }
    
};