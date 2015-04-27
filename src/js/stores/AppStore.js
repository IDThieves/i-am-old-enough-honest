var AppDispatcher   = require('../dispatcher/AppDispatcher');
var EventEmitter    = require('events').EventEmitter;
var assign          = require('object-assign');
var Constants       = require('../constants/Constants');
var ActionTypes     = Constants.ActionTypes;
var CHANGE_EVENT = "change";

//these represent their non-underscore counterpart, when they are in a 'changed' state
var _route = "IdPage";

var AppStore = assign({}, EventEmitter.prototype, {
    

    
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    // this enables React to listen for when the store is updated, so that React can update its state accordingly.
    // this event listener is called on the initial rendering of SquishApp.js
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    // removing the eventlistener when were leaving the page (cleaning up after us.)
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
    
});


// listen for what ActionCreators and ServerActionCreators are dispatching. 
// Each swhich statement updates the store and calls AppStore.emitChange().
// When SquishApp hears this, it updates its state according to the store.

AppDispatcher.register(function(action){
    
    switch (action.type) {
        case ActionTypes.NAVIGATE_TO:
            _route = action.route;
            AppStore.emitChange();
            break;

        default:
            console.log('default');
    }
});


module.exports = AppStore;

