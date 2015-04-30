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

$('#submitID').on('click', function() {
	var usernameTag = $(".username");
	console.log(usernameTag);
	console.log(usernameTag["0"].innerHTML);
	var username = usernameTag["0"].innerHTML;
	var imageId = $("input[name='uploadedIDname']");
	console.log(imageId["0"].value);
	// console.log("imageId:", imageId);

	var payload = {
		username: username,

	};

	$.post();
});