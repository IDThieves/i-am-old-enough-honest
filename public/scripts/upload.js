//to preview the image when uploading
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

//sending an AJAX to our API
$('#submitID').on('click', function() {
	var usernameTag = $(".username");
	console.log(usernameTag);
	console.log(usernameTag.text());
	var username = usernameTag.text();
	var imageId = $("input[name='uploadedIDname']");
	console.log( imageId.val());
	// console.log(imageId["0"].value);
	// console.log("imageId:", imageId);

	var payload = {
		username: username,
		IDImage: imageId.val()
	};

	$.post("/api/image", {data: payload}, function(result){
		console.log("result:",result);
	});
});
