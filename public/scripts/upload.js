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
//$('#submitID').on('click', function() {
//	var usernameTag = $(".username");
//	console.log(usernameTag);
//	console.log(usernameTag.text());
////	var username = usernameTag.text();
//	var image = $("input[name='uploadedIDname']");
//	var IDImage = image.val();
//
//	var payload = {
////		username: username,
//		IDImage: IDImage
//	};
//
//	$.post("/api/image", {data: payload}, function(result){
//		console.log("result:",result);
//	});
//});


function upload() {
var file = document.getElementById('uploadedID').files[0];
var fd = new FormData();
var key = file.name;
    fd.append('key', key);
    fd.append("file",file);

    var xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", uploadProgress, false);

    xhr.open('POST', 'https://kiwi-idimage.s3.amazonaws.com/', true);
    xhr.send(fd);
};

upload();