function loadImg(input) {
	if (input.files && input.files[0]) {
	  var reader = new FileReader();

	  reader.onload = function(e){
		$('#previewID')
		  .attr('src', e.target.result)
		  .width(450)
		  .height(270);
	  };
		reader.readAsDataURL(input.files[0]);
	}
}