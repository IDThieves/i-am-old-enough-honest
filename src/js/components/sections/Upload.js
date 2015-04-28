var React = require('react');


var Upload = React.creatClass({
	render: function() {
		return (
			<div>
                <input type="file" accept="image/*" caption="camera" />
			</div>
		);
	}
});

module.exports = Upload;