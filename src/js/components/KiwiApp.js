var React          = require("react");
var AppStore       = require('../stores/AppStore');
var ActionCreators = require('../actions/ActionCreators');

function getStateFromStore() {
    var route = AppStore.getRoute();
    
    return {
        route: route
    };
}

var KiwiApp = React.creatClass({
    getInitialState: function() {
        return getStateFromStore();
    },
    
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },
    
    _onChange: function() {
        this.setState(getStateFromStore());
    },
    
    render: function() {
        return (
            <Profile />
        )
    }
});
        

module.exports = KiwiApp;