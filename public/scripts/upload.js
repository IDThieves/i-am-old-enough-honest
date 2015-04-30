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
	console.log(usernameTag["0"].innerHTML);
	var username = usernameTag["0"].innerHTML;
	var IDImage = $("input[type='file'][name='uploadedIDname']");
	console.log(IDImage);
	console.log(IDImage["0"].value);
	// console.log("imageId:", imageId);

	var payload = {
		username: username,
		IDImage: IDImage
	};

	$.post("/api/image", {data: payload}, function(result){
		console.log("result:",result);
	});
});
