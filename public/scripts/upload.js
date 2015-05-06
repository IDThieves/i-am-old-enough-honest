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
//	var username = usernameTag.text();
//	var image = $("input[name='uploadedIDname']");
//	var IDImage = image.val();
//
//	var payload = {
//		username: username,
//		IDImage: IDImage
//	};
//
//	$.post("/api/image", {data: payload}, function(result){
//		console.log("result:",result);
//	});
//});

$('#submitID').click(function(){
    var formData = new FormData($('#uploadID')[0]);
    $.ajax({
        url: 'http://localhost/api/image',
        type: 'POST',
				xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ 
                console.log(myXhr.upload);
            }
            return myXhr;
        },
				data: formData,
        cache: false,
        processData: false
    });
});
