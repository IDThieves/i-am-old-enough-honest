function loadImg(input) {
	if (input.files && input.files[0]) {
	  var reader = new FileReader();

	  reader.onload = function(e){
		$('#previewID')
		  .attr('src', e.target.result)
		  .width(400)
		  .height(400);
	  };
		reader.readAsDataURL(input.files[0]);
	}
}
