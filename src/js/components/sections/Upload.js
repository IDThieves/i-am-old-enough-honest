var React = require('react');


var Upload = React.creatClass({
    
    _onClick: function() {
      
        var image = React.findDOMNode(this.refs.image).value;
        ActionCreators.uploadImage(image);
    },
    
	render: function() {
		return (
			<div>
                <input type="file" accept="image/*" caption="camera" ref="image" />
                <img />
                <input type="submit" value="Submit ID" onClick={this._onClick}
			</div>
		);
	}
});

module.exports = Upload;